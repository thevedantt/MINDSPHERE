'use client';

import { Brain, TrendingUp, MessageSquare } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

export default function AIInsights() {
  return (
    <AnalyticsCard
      title="AI Companion Stats"
      icon={<Brain className="w-4 h-4" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-50 rounded-xl p-3 border border-primary-200">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-primary-600" />
              <span className="text-xs text-neutral-600">Sessions</span>
            </div>
            <p className="text-2xl font-bold text-primary-600">24</p>
          </div>
          <div className="bg-secondary-50 rounded-xl p-3 border border-secondary-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-secondary-600" />
              <span className="text-xs text-neutral-600">Engagement</span>
            </div>
            <p className="text-2xl font-bold text-secondary-600">87%</p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-600">
            Last session: <span className="font-semibold text-neutral-900">2 hours ago</span>
          </p>
          <p className="text-xs text-success-500 mt-1">
            ✓ Positive sentiment detected
          </p>
        </div>
      </div>
    </AnalyticsCard>
  );
}

