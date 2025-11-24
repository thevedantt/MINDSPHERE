'use client';

import { Heart, Smile, Frown } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const sentimentData = [
  { label: 'Positive', value: 72, color: 'success-500', icon: <Smile className="w-4 h-4" /> },
  { label: 'Neutral', value: 20, color: 'warning-500', icon: <Heart className="w-4 h-4" /> },
  { label: 'Negative', value: 8, color: 'danger-500', icon: <Frown className="w-4 h-4" /> },
];

export default function SentimentTrend() {
  return (
    <AnalyticsCard
      title="Sentiment Trend"
      icon={<Heart className="w-4 h-4" />}
    >
      <div className="space-y-4">
        {sentimentData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={
                  item.color === 'success-500' ? 'text-success-500' :
                  item.color === 'warning-500' ? 'text-warning-500' :
                  'text-danger-500'
                }>{item.icon}</span>
                <span className="text-sm font-medium text-neutral-700">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-neutral-900">{item.value}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  item.color === 'success-500' ? 'bg-success-500' :
                  item.color === 'warning-500' ? 'bg-warning-500' :
                  'bg-danger-500'
                }`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-600">
            Last 7 days • <span className="font-semibold text-success-500">+5% improvement</span>
          </p>
        </div>
      </div>
    </AnalyticsCard>
  );
}

