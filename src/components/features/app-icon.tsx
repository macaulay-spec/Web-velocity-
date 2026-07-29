// ─── App Icon / Loading Component ──────────────────────────────────────
'use client';

import { motion } from 'framer-motion';

interface AppIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  showText?: boolean;
}

export function AppIcon({ size = 'md', animate = true, showText = true }: AppIconProps) {
  const sizes = {
    sm: { box: 'w-8 h-8', icon: 'text-sm', text: 'text-lg' },
    md: { box: 'w-12 h-12', icon: 'text-xl', text: 'text-2xl' },
    lg: { box: 'w-16 h-16', icon: 'text-2xl', text: 'text-3xl' },
    xl: { box: 'w-24 h-24', icon: 'text-4xl', text: 'text-5xl' },
  };

  const { box, icon, text } = sizes[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={animate ? {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'easeInOut',
        }}
        className={`relative ${box} flex-shrink-0`}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-jagflix-500/40 to-purple-600/40 blur-2xl rounded-full" />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-2xl rotate-45" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl rotate-45" />
        
        {/* J Letter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${icon} font-black text-white drop-shadow-lg`}>J</span>
        </div>

        {/* Shine effect */}
        <motion.div
          animate={animate ? {
            x: ['-100%', '200%'],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] rounded-2xl"
        />
      </motion.div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={`${text} font-bold text-white tracking-tight`}>
            Jag<span className="text-jagflix-500">Flix</span>
          </span>
        </motion.div>
      )}
    </div>
  );
}
