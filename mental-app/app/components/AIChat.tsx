'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Sparkles, Headphones, Shield, Smile, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  mood?: string;
}

export default function AIChat() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chat.greeting'),
      sender: 'ai',
      timestamp: '10:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Down' },
    { emoji: '😐', label: 'Neutral' }
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: t('chat.response'),
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1a1a1a] border-b border-[#A7C4B5]/10 px-4 py-3 rounded-b-3xl"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-[#A7C4B5] to-[#CAB8FF] rounded-full">
            <Sparkles className="w-5 h-5 text-[#2B2B2B]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#F6F5F3]">{t('chat.title')}</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield className="w-3 h-3 text-[#A7C4B5]" />
              <p className="text-xs text-[#C7D9E7]">{t('chat.safety')}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-[#FFB38E] to-[#FF9D6E] text-[#2B2B2B] rounded-tr-sm'
                    : 'bg-[#1a1a1a] border border-[#A7C4B5]/20 text-[#F6F5F3] rounded-tl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1.5 text-right ${msg.sender === 'user' ? 'text-[#2B2B2B]/70' : 'text-[#C7D9E7]'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 py-2 bg-[#1a1a1a] border-t border-[#A7C4B5]/10"
      >
        <div className="flex gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#A7C4B5]" />
            <span className="text-xs">{t('chat.breathing')}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
          >
            <Headphones className="w-4 h-4 text-[#CAB8FF]" />
            <span className="text-xs">{t('chat.mindfulness')}</span>
          </Button>
        </div>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1a1a1a] border-t border-[#A7C4B5]/10 px-4 py-3 rounded-t-3xl"
      >
        <AnimatePresence>
          {showMoodPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex gap-2 mb-3 pb-3 border-b border-[#A7C4B5]/20 overflow-hidden"
            >
              {moods.map((mood, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowMoodPicker(false);
                    setInputText(mood.emoji + ' ');
                  }}
                  className="text-2xl hover:scale-110 transition-transform p-2 rounded-full hover:bg-[#252525]"
                  title={mood.label}
                >
                  {mood.emoji}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMoodPicker(!showMoodPicker)}
          >
            <Smile className="w-5 h-5 text-[#CAB8FF]" />
          </Button>
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('chat.placeholder')}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputText.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="rounded-full p-3"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <AlertCircle className="w-3 h-3 text-[#C7D9E7]" />
          <p className="text-xs text-[#C7D9E7]">
            {t('chat.emergency')}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
