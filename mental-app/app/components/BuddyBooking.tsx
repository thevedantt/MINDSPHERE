'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Phone, Clock, Languages, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      <div className="flex flex-col h-screen bg-[var(--background-base)] pb-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-neutral-50 border-b border-primary-200 px-4 py-3 rounded-b-3xl"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedBuddy(null)}
            className="mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-neutral-900">{selectedBuddy.name}</h1>
        </motion.div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4 text-center">{selectedBuddy.photo}</div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-primary-500 rounded-2xl p-4 mb-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <p className="text-sm text-white/90 font-semibold">{t('buddy.similarity')}</p>
                </div>
                <p className="text-5xl font-bold text-white">{selectedBuddy.matchScore}%</p>
              </motion.div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-primary-600" />
                    <p className="text-neutral-900"><strong className="text-secondary-600">{t('buddy.language')}:</strong> {selectedBuddy.language}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600" />
                    <p className="text-neutral-900"><strong className="text-secondary-600">{t('buddy.interests')}:</strong> {selectedBuddy.interests.join(', ')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <p className="text-neutral-900"><strong className="text-secondary-600">{t('buddy.availability')}:</strong> {selectedBuddy.availability}</p>
                  </div>
                  <div className="mt-4 p-3 bg-neutral-100 rounded-xl border border-primary-200">
                    <p className="text-sm font-medium text-secondary-600 mb-1">{t('buddy.about')}</p>
                    <p className="text-sm text-neutral-600">{selectedBuddy.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neutral-900">
                <Phone className="w-5 h-5 text-primary-600" />
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
    <div className="flex flex-col h-screen bg-[var(--background-base)] pb-20">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-neutral-50 border-b border-primary-200 px-4 py-3 rounded-b-3xl"
      >
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-secondary-600" />
          <h1 className="text-xl font-semibold text-neutral-900">{t('buddy.title')}</h1>
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
              <Card
                onClick={() => setSelectedBuddy(buddy)}
                className="cursor-pointer hover:border-primary-300 transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-5xl">{buddy.photo}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-neutral-900">{buddy.name}</h3>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          <Badge className="bg-primary-500 text-white">
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
                        <Languages className="w-3 h-3 text-neutral-600" />
                        <p className="text-sm text-neutral-600">{buddy.language}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-secondary-600" />
                        <p className="text-xs text-secondary-600 font-medium">{buddy.availability}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
