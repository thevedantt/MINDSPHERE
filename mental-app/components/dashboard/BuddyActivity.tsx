'use client';

import { Users, MessageCircle, Clock } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

export default function BuddyActivity() {
  return (
    <AnalyticsCard
      title="Buddy Activity"
      icon={<Users className="w-4 h-4" />}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-neutral-900">Active Buddies</p>
            <p className="text-xs text-neutral-600">3 connections</p>
          </div>
        </div>
        
        <div className="space-y-2 pt-2 border-t border-neutral-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary-600" />
              <span className="text-neutral-700">Messages</span>
            </div>
            <span className="font-semibold text-neutral-900">12</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary-600" />
              <span className="text-neutral-700">This week</span>
            </div>
            <span className="font-semibold text-neutral-900">+3</span>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  );
}

