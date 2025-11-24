'use client';

import { motion } from 'framer-motion';
import { Trophy, Coins, Flame, Sparkles, User } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface TopSectionHeroProps {
  level: number;
  xp: number;
  xpNeeded: number;
  coins: number;
  streak: number;
  userName?: string;
}

export default function TopSectionHero({
  level,
  xp,
  xpNeeded,
  coins,
  streak,
  userName = 'User'
}: TopSectionHeroProps) {
  const { t } = useLanguage();
  const xpPercentage = (xp / xpNeeded) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-4 mt-4 mb-6 rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #7A3CFF, #A45CFF, #C07CFF)',
        boxShadow: '0 8px 32px rgba(122, 60, 255, 0.3)',
      }}
    >
      {/* Glass-like sheen overlay */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      
      <div className="relative z-10 p-6">
        {/* Header with Avatar and User Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">{t('dashboard.profile')}</p>
              <p className="text-white text-xl font-bold">{userName}</p>
            </div>
          </div>
          
          {/* Level Badge */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center relative">
              <Trophy className="w-8 h-8 text-white" />
              <span className="absolute -bottom-1 text-xs font-bold text-white bg-white/30 px-2 py-0.5 rounded-full">
                L{level}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* XP Level */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-white" />
              <p className="text-white/80 text-xs">{t('dashboard.level')}</p>
            </div>
            <p className="text-2xl font-bold text-white">{level}</p>
            <p className="text-white/60 text-xs mt-1">{t('dashboard.levelName')}</p>
          </motion.div>

          {/* Streak */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-white" />
              <p className="text-white/80 text-xs">{t('dashboard.streakLabel')}</p>
            </div>
            <p className="text-2xl font-bold text-white">{streak}</p>
            <p className="text-white/60 text-xs mt-1">{t('dashboard.streak')}</p>
          </motion.div>

          {/* Coins */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-white" />
              <p className="text-white/80 text-xs">MHC</p>
            </div>
            <p className="text-2xl font-bold text-white">{coins}</p>
            <p className="text-white/60 text-xs mt-1">{t('dashboard.coins')}</p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/90 text-sm font-semibold">
              {t('dashboard.level')} {level} Progress
            </span>
            <span className="text-white/80 text-xs">{xp}/{xpNeeded} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-3 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF, #E0E7FF)',
                boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

