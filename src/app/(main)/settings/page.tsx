// ─── Settings Page ─────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useSettingsStore } from '@/store/settings.store';
import {
  Sun,
  Moon,
  Globe,
  Play,
  Subtitles,
  Download,
  Bell,
  Shield,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'hi', label: 'Hindi' },
];

export default function SettingsPage() {
  const { settings, updateSettings } = useSettingsStore();

  const settingSections = [
    {
      title: 'Appearance',
      icon: settings.theme === 'dark' ? Moon : Sun,
      items: [
        {
          label: 'Theme',
          control: (
            <div className="flex gap-2">
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`p-2 rounded-lg border transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-jagflix-500/10 border-jagflix-500/30 text-jagflix-400'
                    : 'border-zinc-800 text-zinc-500 hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`p-2 rounded-lg border transition-all ${
                  settings.theme === 'light'
                    ? 'bg-jagflix-500/10 border-jagflix-500/30 text-jagflix-400'
                    : 'border-zinc-800 text-zinc-500 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
            </div>
          ),
        },
        {
          label: 'Language',
          control: (
            <Select
              value={settings.language}
              onValueChange={(value) => updateSettings({ language: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        },
      ],
    },
    {
      title: 'Playback',
      icon: Play,
      items: [
        {
          label: 'Autoplay next episode',
          control: (
            <Switch
              checked={settings.autoplayNext}
              onCheckedChange={(checked) => updateSettings({ autoplayNext: checked })}
            />
          ),
        },
        {
          label: 'Autoplay previews while browsing',
          control: (
            <Switch
              checked={settings.autoplayPreviews}
              onCheckedChange={(checked) => updateSettings({ autoplayPreviews: checked })}
            />
          ),
        },
      ],
    },
    {
      title: 'Subtitles',
      icon: Subtitles,
      items: [
        {
          label: 'Subtitle Language',
          control: (
            <Select
              value={settings.subtitleLanguage}
              onValueChange={(value) => updateSettings({ subtitleLanguage: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        },
        {
          label: 'Subtitle background',
          control: (
            <Switch
              checked={settings.subtitleBackground}
              onCheckedChange={(checked) => updateSettings({ subtitleBackground: checked })}
            />
          ),
        },
      ],
    },
    {
      title: 'Downloads',
      icon: Download,
      items: [
        {
          label: 'Wi-Fi only downloads',
          control: (
            <Switch
              checked={settings.wifiOnlyDownload}
              onCheckedChange={(checked) => updateSettings({ wifiOnlyDownload: checked })}
            />
          ),
        },
        {
          label: 'Data saver (lower quality)',
          control: (
            <Switch
              checked={settings.dataSaver}
              onCheckedChange={(checked) => updateSettings({ dataSaver: checked })}
            />
          ),
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push notifications',
          control: (
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSettings({ notifications: checked })}
            />
          ),
        },
        {
          label: 'Email notifications',
          control: (
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSettings({ emailNotifications: checked })}
            />
          ),
        },
      ],
    },
    {
      title: 'Content',
      icon: Eye,
      items: [
        {
          label: 'Mature content',
          control: (
            <Switch
              checked={settings.matureContent}
              onCheckedChange={(checked) => updateSettings({ matureContent: checked })}
            />
          ),
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link href="/profile" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Settings</h1>
          </motion.div>

          <div className="space-y-8">
            {settingSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-jagflix-500" />
                    <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                  </div>
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl divide-y divide-zinc-800/50">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-4"
                      >
                        <span className="text-sm text-zinc-300">{item.label}</span>
                        {item.control}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-700">
              JagFlix v1.0.0 &bull; Powered by ZST Labs API
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
