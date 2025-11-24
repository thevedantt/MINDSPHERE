'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Languages } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import TopSectionHero from '@/components/dashboard/TopSectionHero';
import MoodChart from '@/components/dashboard/MoodChart';
import SentimentTrend from '@/components/dashboard/SentimentTrend';
import DailyTasks from '@/components/dashboard/DailyTasks';
import WeeklyCheckIn from '@/components/dashboard/WeeklyCheckIn';
import BuddyActivity from '@/components/dashboard/BuddyActivity';
import AIInsights from '@/components/dashboard/AIInsights';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  xp: number;
}

const dummyTasks: Task[] = [
  { id: 1, title: 'Gratitude journal', completed: true, xp: 10 },
  { id: 2, title: '10 min walk', completed: false, xp: 15 },
  { id: 3, title: 'Compliment yourself', completed: false, xp: 5 },
  { id: 4, title: '5 min meditation', completed: false, xp: 20 },
];

export default function GamificationDashboard() {
  const { language, toggleLanguage, t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [coins, setCoins] = useState(40);
  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(65);
  const xpNeeded = 100;

  const handleTaskComplete = (taskId: number) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setCoins(coins + task.xp);
      setXp(Math.min(xp + task.xp, xpNeeded));
      if (xp + task.xp >= xpNeeded) {
        setLevel(level + 1);
        setXp(0);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background-base)] pb-20 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 border-b border-neutral-200 px-4 py-3 sticky top-0 z-10 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary-600" />
            <h1 className="text-xl font-semibold text-neutral-900">{t('dashboard.title')}</h1>
          </div>
          {/* Language Toggle Button */}
          <motion.button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              language === 'hi'
                ? 'bg-secondary-500 text-white shadow-lg'
                : 'bg-neutral-50 border border-primary-300 text-primary-600 hover:border-primary-400 hover:bg-neutral-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages className="w-4 h-4" />
            <span>{language === 'en' ? 'EN' : 'HI'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Top Section Hero with Violet Gradient */}
      <TopSectionHero
        level={level}
        xp={xp}
        xpNeeded={xpNeeded}
        coins={coins}
        streak={streak}
      />

      {/* Analytics Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Mood Chart */}
          <MoodChart />

          {/* Sentiment Trend */}
          <SentimentTrend />
        </div>

        {/* Daily Tasks */}
        <div className="mb-4">
          <DailyTasks onTaskComplete={handleTaskComplete} />
        </div>

        {/* Second Row - Weekly Check-in and Buddy Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <WeeklyCheckIn />
          <BuddyActivity />
        </div>

        {/* AI Insights */}
        <div className="mb-4">
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
