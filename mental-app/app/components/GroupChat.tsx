'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Users, Shield, MessageCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedGradient } from '@/components/ui/animated-gradient';

interface Group {
  id: number;
  name: string;
  topic: string;
  members: number;
  lastMessage: string;
  lastMessageTime: string;
}

interface GroupMessage {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

const dummyGroups: Group[] = [
  {
    id: 1,
    name: 'Students & Exam Stress',
    topic: 'Students & Exam stress',
    members: 234,
    lastMessage: 'मैं भी परीक्षा से बहुत तनाव में हूँ...',
    lastMessageTime: '2 min ago'
  },
  {
    id: 2,
    name: 'Breakups & Emotional Healing',
    topic: 'Breakups & emotional healing',
    members: 189,
    lastMessage: 'Time and support help in the healing process.',
    lastMessageTime: '15 min ago'
  },
  {
    id: 3,
    name: 'Work Burnout',
    topic: 'Work burnout',
    members: 156,
    lastMessage: 'काम का दबाव बहुत ज्यादा है',
    lastMessageTime: '1 hour ago'
  },
  {
    id: 4,
    name: 'Anxiety Community',
    topic: 'Anxiety community',
    members: 312,
    lastMessage: 'साँस लेने के व्यायाम मदद करते हैं',
    lastMessageTime: '30 min ago'
  }
];

const dummyMessages: GroupMessage[] = [
  {
    id: 1,
    sender: 'User_192',
    text: 'Hello everyone. I am new here and looking for support.',
    timestamp: '10:00 AM'
  },
  {
    id: 2,
    sender: 'User_45',
    text: 'Welcome. This is a safe space for everyone.',
    timestamp: '10:02 AM'
  },
  {
    id: 3,
    sender: 'User_78',
    text: 'We are here to support each other through our challenges.',
    timestamp: '10:05 AM'
  }
];

export default function GroupChat() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages] = useState<GroupMessage[]>(dummyMessages);
  const [inputText, setInputText] = useState('');
  const userIdentity = 'Cloud_Panda_192';

  const handleSend = () => {
    if (inputText.trim()) {
      setInputText('');
    }
  };

  if (selectedGroup) {
    return (
      <div className="flex flex-col h-screen bg-black pb-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#1a1a1a] border-b border-[#A7C4B5]/10 px-4 py-3 rounded-b-3xl"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedGroup(null)}
            className="mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#A7C4B5]" />
            <div>
              <h1 className="text-xl font-semibold text-[#F6F5F3]">{selectedGroup.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Users className="w-3 h-3 text-[#C7D9E7]" />
                <p className="text-xs text-[#C7D9E7]">{selectedGroup.members} सदस्य</p>
                <Shield className="w-3 h-3 text-[#A7C4B5]" />
                <p className="text-xs text-[#C7D9E7]">AI मॉडरेशन सक्रिय</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-3 h-3 text-[#C7D9E7]" />
                  <p className="text-xs text-[#C7D9E7] font-medium">{msg.sender}</p>
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                    msg.sender === userIdentity
                      ? 'bg-gradient-to-br from-[#FFB38E] to-[#FF9D6E] text-[#2B2B2B] rounded-tr-sm self-end ml-auto'
                      : 'bg-[#1a1a1a] border border-[#A7C4B5]/20 text-[#F6F5F3] rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1.5 text-right ${msg.sender === userIdentity ? 'text-[#2B2B2B]/70' : 'text-[#C7D9E7]'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#1a1a1a] border-t border-[#A7C4B5]/10 px-4 py-3 rounded-t-3xl"
        >
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="संदेश टाइप करें..."
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!inputText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Lock className="w-3 h-3 text-[#C7D9E7]" />
            <p className="text-xs text-[#C7D9E7]">
              आपकी पहचान: {userIdentity} (गोपनीय)
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black pb-20">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1a1a1a] border-b border-[#A7C4B5]/10 px-4 py-3 rounded-b-3xl"
      >
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#A7C4B5]" />
          <div>
            <h1 className="text-xl font-semibold text-[#F6F5F3]">गुमनाम समूह चैट</h1>
            <p className="text-xs text-[#C7D9E7] mt-0.5">सुरक्षित समुदाय सहायता</p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {dummyGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatedGradient>
                <Card
                  onClick={() => setSelectedGroup(group)}
                  className="cursor-pointer hover:border-[#A7C4B5]/30 transition-all"
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#F6F5F3] mb-1">{group.name}</h3>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#A7C4B5]" />
                          <Badge variant="secondary" className="text-xs">
                            {group.members} सदस्य
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#C7D9E7] mb-2 mt-3">{group.lastMessage}</p>
                    <p className="text-xs text-[#C7D9E7]/70">{group.lastMessageTime}</p>
                  </CardContent>
                </Card>
              </AnimatedGradient>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
