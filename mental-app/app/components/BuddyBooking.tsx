'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Phone, Clock, Languages, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Buddy {
  id: number;
  name: string;
  photo: string;
  interests: string[];
  language: string;
  availability: string;
  matchScore: number;
  bio: string;
}

const dummyBuddies: Buddy[] = [
  {
    id: 1,
    name: 'Tejas',
    photo: '👨',
    interests: ['Music', 'Reading', 'Meditation'],
    language: 'Hindi, English',
    availability: 'Available now',
    matchScore: 82,
    bio: 'I have experience with student stress and academic pressure. I can provide support and guidance.'
  },
  {
    id: 2,
    name: 'Sanika',
    photo: '👩',
    interests: ['Yoga', 'Art', 'Cooking'],
    language: 'Hindi, English',
    availability: 'Available in 2 hours',
    matchScore: 75,
    bio: 'I am here to provide supportive peer companionship and help you navigate through challenges.'
  },
  {
    id: 3,
    name: 'Shrawani',
    photo: '👩',
    interests: ['Writing', 'Nature', 'Therapy'],
    language: 'Hindi, English',
    availability: 'Available tomorrow',
    matchScore: 90,
    bio: 'I am prepared to assist with emotional healing and provide a supportive listening ear.'
  }
];

export default function BuddyBooking() {
  const { t } = useLanguage();
  const [buddies] = useState<Buddy[]>(dummyBuddies);
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);

  if (selectedBuddy) {
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
            onClick={() => setSelectedBuddy(null)}
            className="mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-[#F6F5F3]">{selectedBuddy.name}</h1>
        </motion.div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AnimatedGradient>
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="text-6xl mb-4 text-center">{selectedBuddy.photo}</div>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-[#A7C4B5] to-[#CAB8FF] rounded-2xl p-4 mb-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-[#2B2B2B]" />
                    <p className="text-sm text-[#2B2B2B]/90 font-semibold">{t('buddy.similarity')}</p>
                  </div>
                  <p className="text-5xl font-bold text-[#2B2B2B]">{selectedBuddy.matchScore}%</p>
                </motion.div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#A7C4B5]" />
                    <p className="text-[#F6F5F3]"><strong className="text-[#CAB8FF]">{t('buddy.language')}:</strong> {selectedBuddy.language}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#A7C4B5]" />
                    <p className="text-[#F6F5F3]"><strong className="text-[#CAB8FF]">{t('buddy.interests')}:</strong> {selectedBuddy.interests.join(', ')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#A7C4B5]" />
                    <p className="text-[#F6F5F3]"><strong className="text-[#CAB8FF]">{t('buddy.availability')}:</strong> {selectedBuddy.availability}</p>
                  </div>
                  <div className="mt-4 p-3 bg-[#252525] rounded-xl border border-[#A7C4B5]/10">
                    <p className="text-sm font-medium text-[#CAB8FF] mb-1">{t('buddy.about')}</p>
                    <p className="text-sm text-[#C7D9E7]">{selectedBuddy.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedGradient>
          
          <AnimatedGradient>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#F6F5F3]">
                  <Phone className="w-5 h-5 text-[#A7C4B5]" />
                  {t('buddy.callDuration')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Clock className="w-4 h-4 mr-1" />
                      15 min
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Clock className="w-4 h-4 mr-1" />
                      30 min
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </AnimatedGradient>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              {t('buddy.bookCall')}
            </Button>
          </motion.div>
        </div>
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
          <User className="w-5 h-5 text-[#FFB38E]" />
          <h1 className="text-xl font-semibold text-[#F6F5F3]">{t('buddy.title')}</h1>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {buddies.map((buddy, index) => (
            <motion.div
              key={buddy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatedGradient>
                <Card
                  onClick={() => setSelectedBuddy(buddy)}
                  className="cursor-pointer hover:border-[#A7C4B5]/30 transition-all"
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="text-5xl">{buddy.photo}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-[#F6F5F3]">{buddy.name}</h3>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            <Badge className="bg-gradient-to-r from-[#A7C4B5] to-[#CAB8FF] text-[#2B2B2B]">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {buddy.matchScore}% Match
                            </Badge>
                          </motion.div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {buddy.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Languages className="w-3 h-3 text-[#C7D9E7]" />
                          <p className="text-sm text-[#C7D9E7]">{buddy.language}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#FFB38E]" />
                          <p className="text-xs text-[#FFB38E] font-medium">{buddy.availability}</p>
                        </div>
                      </div>
                    </div>
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
