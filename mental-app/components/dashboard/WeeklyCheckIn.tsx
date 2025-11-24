'use client';

import { Calendar, Check } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const checkIns = [true, true, true, true, false, false, false]; // Last 7 days

export default function WeeklyCheckIn() {
  const completedCount = checkIns.filter(Boolean).length;
  const completionRate = (completedCount / checkIns.length) * 100;
  
  return (
    <AnalyticsCard
      title="Weekly Check-in"
      icon={<Calendar className="w-4 h-4" />}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Completion Rate</span>
          <span className="text-lg font-bold text-neutral-900">{Math.round(completionRate)}%</span>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  checkIns[index]
                    ? 'bg-success-500 border-success-600 text-white'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-400'
                }`}
              >
                {checkIns[index] ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-xs font-semibold">{day[0]}</span>
                )}
              </div>
              <span className="text-xs text-neutral-600">{day}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-600">
            {completedCount} of {checkIns.length} days completed this week
          </p>
        </div>
      </div>
    </AnalyticsCard>
  );
}

