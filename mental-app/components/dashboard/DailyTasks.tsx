'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  xp: number;
}

const tasks: Task[] = [
  { id: 1, title: 'Gratitude journal', completed: true, xp: 10 },
  { id: 2, title: '10 min walk', completed: false, xp: 15 },
  { id: 3, title: 'Compliment yourself', completed: false, xp: 5 },
  { id: 4, title: '5 min meditation', completed: false, xp: 20 },
];

export default function DailyTasks({ onTaskComplete }: { onTaskComplete?: (taskId: number) => void }) {
  const { t } = useLanguage();
  
  return (
    <AnalyticsCard
      title={t('dashboard.tasks')}
      icon={<CheckCircle2 className="w-4 h-4" />}
    >
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              task.completed
                ? 'bg-success-50 border-success-200 opacity-75'
                : 'bg-neutral-50 border-neutral-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-success-500" />
              ) : (
                <Circle className="w-5 h-5 text-neutral-400" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${task.completed ? 'text-neutral-500 line-through' : 'text-neutral-900'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-neutral-600">+{task.xp} XP</p>
              </div>
            </div>
            {!task.completed && (
              <Button
                size="sm"
                onClick={() => onTaskComplete?.(task.id)}
                className="text-xs"
              >
                {t('dashboard.complete')}
              </Button>
            )}
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}

