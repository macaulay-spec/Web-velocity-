'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import { formatTime } from '@/lib/utils';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  PictureInPicture2, Subtitles, SkipBack, SkipForward, ChevronLeft,
} from 'lucide-react';

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const [media, setMedia] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffering, setBuffering] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`/api/media?id=${id}`).then(r => r.json()),
      fetch(`/api/item-details?id=${id}`).then(r => r.json()),
    ]).then(([m, d]) => {
      if (m?.data) setMedia(m.data);
      if (d?.data) setDetails(d.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  }, []);

  const seek = useCallback((s: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.currentTime + s, v.duration));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); }
      if (e.key === 'f') { e.preventDefault(); toggleFullscreen(); }
      if (e.key === 'm') { e.preventDefault(); toggleMute(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); seek(10); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); seek(-10); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [togglePlay, toggleFullscreen, toggleMute, seek]);

  // Auto-hide controls
  useEffect(() => {
    if (!playing) { setShowControls(true); return; }
    const t = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(t);
  }, [playing, currentTime]);

  if (loading) return <div className="h-screen bg-black"><LoadingSpinner fullScreen text="Loading stream..." /></div>;

  const src = media?.sources?.[0]?.url || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={() => { setShowControls(true); }}
      onMouseLeave={() => { if (playing) setShowControls(false); }}
    >
      <video ref={videoRef} className="w-full h-full object-contain cursor-pointer"
        src={src}
        onTimeUpdate={() => { if (videoRef.current) { setCurrentTime(videoRef.current.currentTime); setDuration(videoRef.current.duration); }}}
        onLoadedMetadata={() => { if (videoRef.current) { setDuration(videoRef.current.duration); setBuffering(false); }}}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => { setBuffering(false); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        playsInline
        autoPlay
      />

      {/* Buffering */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-jagflix-500 rounded-full animate-spin" />
            <p className="text-sm text-zinc-400">Buffering...</p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <Link href={details ? (details.type === 'series' ? `/series/${id}` : `/movie/${id}`) : '/'}>
            <Button variant="ghost" size="iconSm"><ChevronLeft className="w-5 h-5" /></Button>
          </Link>
          <h1 className="text-lg font-semibold text-white">{details?.title || 'Playing'}</h1>
        </div>
      </div>

      {/* Center play button */}
      {!playing && !buffering && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-jagflix-500/90 flex items-center justify-center shadow-2xl">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>
        </div>
      )}

      {/* Bottom controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <input type="range" min={0} max={duration || 100} value={currentTime}
          onChange={(e) => { if (videoRef.current) videoRef.current.currentTime = parseFloat(e.target.value); }}
          className="w-full h-1.5 appearance-none bg-zinc-700 rounded-full cursor-pointer mb-2
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-jagflix-500 [&::-webkit-slider-thumb]:shadow-lg"
        />
        <div className="flex justify-between text-xs text-zinc-400 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="p-2 text-white hover:text-jagflix-400">
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
          </button>
          <button onClick={() => seek(-10)} className="p-2 text-zinc-400 hover:text-white"><SkipBack className="w-5 h-5" /></button>
          <button onClick={() => seek(10)} className="p-2 text-zinc-400 hover:text-white"><SkipForward className="w-5 h-5" /></button>
          <div className="flex items-center gap-2 ml-2">
            <button onClick={toggleMute} className="p-2 text-zinc-400 hover:text-white">
              {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input type="range" min={0} max={1} step={0.05} defaultValue={1}
              onChange={(e) => { const v = parseFloat(e.target.value); if (videoRef.current) { videoRef.current.volume = v; videoRef.current.muted = v === 0; } setVolume(v); }}
              className="w-20 h-1 appearance-none bg-zinc-700 rounded-full cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
          <div className="flex-1" />
          {media?.subtitles?.length > 0 && (
            <button className="p-2 text-zinc-400 hover:text-white"><Subtitles className="w-5 h-5" /></button>
          )}
          <button onClick={async () => { try { if (videoRef.current && document.pictureInPictureElement !== videoRef.current) await videoRef.current.requestPictureInPicture(); else await document.exitPictureInPicture(); } catch {} }}
            className="p-2 text-zinc-400 hover:text-white"><PictureInPicture2 className="w-5 h-5" /></button>
          <button onClick={toggleFullscreen} className="p-2 text-zinc-400 hover:text-white">
            {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
