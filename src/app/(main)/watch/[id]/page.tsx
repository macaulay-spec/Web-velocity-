// ─── Watch / Player Page ───────────────────────────────────────────────
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import { usePlayerStore } from '@/store/player.store';
import { formatTime } from '@/lib/utils';
import { KEYBOARD_SHORTCUTS } from '@/constants';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  Subtitles,
  Settings,
  SkipBack,
  SkipForward,
  ChevronLeft,
  Film,
} from 'lucide-react';
import type { MediaData, ItemDetails } from '@/types/api';

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const season = searchParams.get('season');
  const episode = searchParams.get('episode');

  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [media, setMedia] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Load media
  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        const params = new URLSearchParams({ id });
        if (season) params.set('season', season);
        if (episode) params.set('episode', episode);

        const [detailsRes, mediaRes] = await Promise.all([
          fetch(`/api/item-details?id=${id}`),
          fetch(`/api/media?${params.toString()}`),
        ]);

        const detailsJson = await detailsRes.json();
        const mediaJson = await mediaRes.json();

        if (detailsJson.data) setDetails(detailsJson.data);
        if (mediaJson.data) setMedia(mediaJson.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, season, episode]);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  // Player controls
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const seek = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, videoRef.current.duration));
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((KEYBOARD_SHORTCUTS.TOGGLE_PLAY as readonly string[]).includes(e.key)) {
        e.preventDefault();
        togglePlay();
      } else if ((KEYBOARD_SHORTCUTS.FULLSCREEN as readonly string[]).includes(e.key)) {
        e.preventDefault();
        toggleFullscreen();
      } else if ((KEYBOARD_SHORTCUTS.MUTE as readonly string[]).includes(e.key)) {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        seek(10);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seek(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleFullscreen, toggleMute, seek]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <LoadingSpinner fullScreen text="Preparing your stream..." />
      </div>
    );
  }

  if (error || !media) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-3">Playback Error</h1>
            <p className="text-zinc-400 mb-6">{error || 'Unable to load media.'}</p>
            <Link href="/"><Button>Go Home</Button></Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const primarySource = media.sources?.[0];
  const title = details?.title || 'Loading...';
  const episodesTitle = episode ? `S${season}:E${episode}` : '';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
    >
      {/* Video Element */}
      {primarySource && (
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={primarySource.url}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
              setDuration(videoRef.current.duration);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
              setIsBuffering(false);
            }
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          playsInline
          autoPlay
        />
      )}

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-zinc-800 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-jagflix-500 rounded-full animate-spin" />
            </div>
            <p className="text-sm text-zinc-400">Buffering...</p>
          </div>
        </div>
      )}

      {/* Top Gradient + Back Button */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <Link href={details ? (details.type === 'series' ? `/series/${id}` : `/movie/${id}`) : '/'}>
            <Button variant="ghost" size="iconSm">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            {episodesTitle && <p className="text-sm text-zinc-400">{episodesTitle}</p>}
          </div>
        </div>
      </div>

      {/* Center Play Button (when paused) */}
      {!isPlaying && !isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-jagflix-500/90 flex items-center justify-center shadow-2xl shadow-jagflix-500/30"
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = parseFloat(e.target.value);
              }
              setCurrentTime(parseFloat(e.target.value));
            }}
            className="w-full h-1.5 appearance-none bg-zinc-700 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-jagflix-500 [&::-webkit-slider-thumb]:shadow-lg"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-zinc-400">{formatTime(currentTime)}</span>
            <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button onClick={togglePlay} className="p-2 text-white hover:text-jagflix-400 transition-colors">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
          </button>

          {/* Skip Back */}
          <button onClick={() => seek(-10)} className="p-2 text-zinc-400 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Skip Forward */}
          <button onClick={() => seek(10)} className="p-2 text-zinc-400 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="p-2 text-zinc-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 appearance-none bg-zinc-700 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Subtitle */}
          {media.subtitles && media.subtitles.length > 0 && (
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Subtitles className="w-5 h-5" />
            </button>
          )}

          {/* Picture in Picture */}
          <button
            onClick={async () => {
              try {
                if (videoRef.current && document.pictureInPictureElement !== videoRef.current) {
                  await videoRef.current.requestPictureInPicture();
                } else {
                  await document.exitPictureInPicture();
                }
              } catch {
                // PiP not supported
              }
            }}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <PictureInPicture2 className="w-5 h-5" />
          </button>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="p-2 text-zinc-400 hover:text-white transition-colors">
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
