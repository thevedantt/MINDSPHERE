'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Stethoscope, Users, Handshake, BarChart3, ClipboardList } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'therapist', label: 'Therapist', icon: Stethoscope },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'buddy', label: 'Buddy', icon: Handshake },
    { id: 'dashboard', label: 'Progress', icon: BarChart3 },
    { id: 'assessment', label: 'Assessment', icon: ClipboardList }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#A7C4B5]/10 backdrop-blur-md z-50"
    >
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#FFB38E]'
                  : 'text-[#C7D9E7] hover:text-[#A7C4B5]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#A7C4B5]/20 to-[#CAB8FF]/20 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-[#FFB38E]' : ''}`} />
              <span className={`text-xs font-medium relative z-10 ${isActive ? 'text-[#FFB38E]' : ''}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
