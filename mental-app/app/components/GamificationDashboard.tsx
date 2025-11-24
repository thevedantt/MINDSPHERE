'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coins, Gift, Brain, Footprints, Heart, Sparkles, TrendingUp, CheckCircle2, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Task {
  id: number;
  emoji: string;
  title: string;
  completed: boolean;
  xp: number;
  icon: React.ReactNode;
}

const dummyTasks: Task[] = [
  { id: 1, emoji: '🧠', title: 'Gratitude journal', completed: true, xp: 10, icon: <Brain className="w-5 h-5" /> },
  { id: 2, emoji: '🚶‍♂️', title: '10 min walk', completed: false, xp: 15, icon: <Footprints className="w-5 h-5" /> },
  { id: 3, emoji: '😊', title: 'Compliment yourself', completed: false, xp: 5, icon: <Heart className="w-5 h-5" /> },
  { id: 4, emoji: '🧘', title: '5 min meditation', completed: false, xp: 20, icon: <Sparkles className="w-5 h-5" /> }
];

const rewards = [
  { id: 1, name: 'Premium Content', cost: 100, emoji: '📚', icon: <Gift className="w-6 h-6" /> },
  { id: 2, name: 'Avatar Upgrade', cost: 150, emoji: '🎨', icon: <Sparkles className="w-6 h-6" /> },
  { id: 3, name: '10% Therapy Discount', cost: 200, emoji: '💊', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 4, name: 'Custom Theme', cost: 80, emoji: '🎭', icon: <Gift className="w-6 h-6" /> }
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
    <div className="flex flex-col h-screen bg-[var(--background-base)] pb-20">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-neutral-50 border-b border-primary-200 px-4 py-3 rounded-b-3xl"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary-600" />
          <h1 className="text-xl font-semibold text-neutral-900">{t('dashboard.title')}</h1>
        </div>
      </motion.div>

      <div className="px-4 py-4">
        <Card>
          <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-neutral-600">{t('dashboard.profile')}</p>
                      <p className="text-2xl font-bold text-neutral-900">User</p>
                    </div>
                    {/* Language Toggle Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.button
                        onClick={toggleLanguage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          language === 'hi'
                            ? 'bg-secondary-500 text-white shadow-lg'
                            : 'bg-neutral-50 border border-primary-300 text-primary-600 hover:border-primary-400 hover:bg-neutral-100'
                        }`}
                        animate={{
                          scale: language === 'hi' ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: language === 'hi' ? [0, 360] : 0,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        >
                          <Languages className="w-4 h-4" />
                        </motion.div>
                        <span>{language === 'en' ? 'EN' : 'HI'}</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-1">🔥</div>
                  <p className="text-sm font-semibold text-neutral-900">{streak} {t('dashboard.streak')}</p>
                  <p className="text-xs text-neutral-600">{t('dashboard.streakLabel')}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg relative">
                    <Trophy className="w-6 h-6 text-white" />
                    <span className="absolute text-xs font-bold text-white bottom-1">L{level}</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">{t('dashboard.level')}</p>
                </motion.div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-neutral-900 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-primary-600" />
                    {t('dashboard.level')} {level}: {t('dashboard.levelName')}
                  </span>
                  <span className="text-neutral-600">{xp}/{xpNeeded} XP</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-primary-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp / xpNeeded) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary-500 rounded-2xl p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-white" />
                  <p className="text-sm text-white/90 font-semibold">{t('dashboard.coins')}</p>
                </div>
                <p className="text-3xl font-bold text-white">{coins} MHC</p>
                <p className="text-xs text-white/80 mt-1">{t('dashboard.earned')} {coins} {t('dashboard.today')}</p>
              </motion.div>
            </CardContent>
          </Card>
      </div>

      <div className="px-4 pb-2">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary-600" />
          {t('dashboard.tasks')}
        </h2>
        <div className="space-y-2">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={task.completed ? 'opacity-60' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-500 rounded-full">
                        <div className="text-white">{task.icon}</div>
                      </div>
                        <div>
                          <p className="font-medium text-neutral-900">{task.title}</p>
                          <div className="flex items-center gap-1">
                            <Coins className="w-3 h-3 text-secondary-600" />
                            <p className="text-xs text-neutral-600">+{task.xp} XP</p>
                          </div>
                        </div>
                      </div>
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-primary-600" />
                      ) : (
                        <Button
                          onClick={() => handleTaskComplete(task.id)}
                          size="sm"
                        >
                          {t('dashboard.complete')}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5 text-secondary-600" />
          {t('dashboard.rewards')}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-3">
                    <div className="inline-block p-3 bg-primary-500 rounded-full mb-2">
                      <div className="text-white">{reward.icon}</div>
                    </div>
                      <p className="text-sm font-medium text-neutral-900 mb-2">{reward.name}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-secondary-600" />
                          <p className="text-xs text-neutral-600">{reward.cost} MHC</p>
                        </div>
                        <Button
                          size="sm"
                          variant={coins >= reward.cost ? 'default' : 'outline'}
                          disabled={coins < reward.cost}
                          className="text-xs"
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
