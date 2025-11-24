'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const moodData = [
  { day: 'Mon', mood: 7, trend: 'up' },
  { day: 'Tue', mood: 6, trend: 'down' },
  { day: 'Wed', mood: 8, trend: 'up' },
  { day: 'Thu', mood: 7, trend: 'stable' },
  { day: 'Fri', mood: 9, trend: 'up' },
  { day: 'Sat', mood: 8, trend: 'down' },
  { day: 'Sun', mood: 9, trend: 'up' },
];

export default function MoodChart() {
  const maxMood = 10;
  
  return (
    <AnalyticsCard
      title="Mood Chart"
      icon={<TrendingUp className="w-4 h-4" />}
    >
      <div className="space-y-3">
        <div className="flex items-end justify-between h-32 gap-2">
          {moodData.map((item, index) => {
            const height = (item.mood / maxMood) * 100;
            const getTrendIcon = () => {
              if (item.trend === 'up') return <TrendingUp className="w-3 h-3 text-success-500" />;
              if (item.trend === 'down') return <TrendingDown className="w-3 h-3 text-danger-500" />;
              return <Minus className="w-3 h-3 text-neutral-400" />;
            };
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400 flex items-end justify-center relative group"
                  style={{ height: `${height}%`, minHeight: '8px' }}
                >
                  <span className="absolute -top-6 text-xs font-semibold text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.mood}
                  </span>
                </div>
                <span className="text-xs text-neutral-600 font-medium">{item.day}</span>
                <div className="mt-1">{getTrendIcon()}</div>
              </div>
            );
          })}
        </div>
        <div className="pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-600">
            Average: <span className="font-semibold text-neutral-900">7.7/10</span>
          </p>
        </div>
      </div>
    </AnalyticsCard>
  );
}

