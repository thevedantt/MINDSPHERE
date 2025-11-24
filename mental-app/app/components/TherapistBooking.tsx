'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Calendar, IndianRupee, Filter, User, Languages, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Therapist {
  id: number;
  name: string;
  photo: string;
  languages: string[];
  price: number;
  experience: number;
  specialty: string[];
  rating: number;
  gender: 'Male' | 'Female' | 'Other';
}

const dummyTherapists: Therapist[] = [
  {
    id: 1,
    name: 'Dr. Vedant Sharma',
    photo: '👨‍⚕️',
    languages: ['Hindi', 'English'],
    price: 800,
    experience: 8,
    specialty: ['Depression', 'Anxiety'],
    rating: 4.8,
    gender: 'Male'
  },
  {
    id: 2,
    name: 'Dr. Harsh Patel',
    photo: '👨‍⚕️',
    languages: ['Hindi', 'English'],
    price: 1000,
    experience: 12,
    specialty: ['Trauma', 'LGBTQ+'],
    rating: 4.9,
    gender: 'Male'
  },
  {
    id: 3,
    name: 'Dr. Mayur Desai',
    photo: '👨‍⚕️',
    languages: ['Hindi', 'English'],
    price: 900,
    experience: 10,
    specialty: ['Student Stress', 'Anxiety'],
    rating: 4.7,
    gender: 'Male'
  },
  {
    id: 4,
    name: 'Dr. Jay Mehta',
    photo: '👨‍⚕️',
    languages: ['Hindi', 'English'],
    price: 950,
    experience: 9,
    specialty: ['Work Burnout', 'Depression'],
    rating: 4.6,
    gender: 'Male'
  },
  {
    id: 5,
    name: 'Dr. Akash Kumar',
    photo: '👨‍⚕️',
    languages: ['Hindi', 'English'],
    price: 850,
    experience: 7,
    specialty: ['Anxiety', 'Stress Management'],
    rating: 4.8,
    gender: 'Male'
  }
];

export default function TherapistBooking() {
  const { t } = useLanguage();
  const [therapists] = useState<Therapist[]>(dummyTherapists);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [filters, setFilters] = useState({
    price: 'all',
    gender: 'all',
    specialty: 'all'
  });

  const specialties = ['Depression', 'Anxiety', 'Trauma', 'LGBTQ+', 'Student Stress', 'Work Burnout'];

  const filteredTherapists = therapists.filter((t) => {
    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(Number);
      if (filters.price === '1500+') {
        if (t.price < 1500) return false;
      } else if (t.price < min || t.price > max) return false;
    }
    if (filters.gender !== 'all' && t.gender !== filters.gender) return false;
    if (filters.specialty !== 'all' && !t.specialty.includes(filters.specialty)) return false;
    return true;
  });

  if (selectedTherapist) {
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
            onClick={() => setSelectedTherapist(null)}
            className="mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-neutral-900">{selectedTherapist.name}</h1>
        </motion.div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4 text-center">{selectedTherapist.photo}</div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-primary-600" />
                  <p className="text-neutral-900"><strong className="text-secondary-600">{t('therapist.languages')}:</strong> {selectedTherapist.languages.join(', ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary-600" />
                  <p className="text-neutral-900"><strong className="text-secondary-600">{t('therapist.experience')}:</strong> {selectedTherapist.experience} {t('therapist.years')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary-600" />
                  <p className="text-neutral-900"><strong className="text-secondary-600">{t('therapist.specialty')}:</strong> {selectedTherapist.specialty.join(', ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                  <p className="text-neutral-900"><strong className="text-secondary-600">{t('therapist.rating')}:</strong> {selectedTherapist.rating}</p>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-secondary-600" />
                  <p className="text-neutral-900"><strong className="text-secondary-600">{t('therapist.price')}:</strong> ₹{selectedTherapist.price}/{t('therapist.session')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neutral-900">
                <Calendar className="w-5 h-5 text-primary-600" />
                {t('therapist.available')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'].map((time) => (
                  <motion.div
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="w-full">
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              {t('therapist.book')} (₹{selectedTherapist.price})
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
        <h1 className="text-xl font-semibold text-neutral-900">{t('therapist.title')}</h1>
      </motion.div>

      <div className="bg-neutral-50 border-b border-primary-200 px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-neutral-900">{t('therapist.filters')}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <select
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="bg-neutral-100 border border-primary-200 rounded-full px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('therapist.allPrice')}</option>
            <option value="0-500">₹0-500</option>
            <option value="500-1000">₹500-1000</option>
            <option value="1000-1500">₹1000-1500</option>
            <option value="1500+">₹1500+</option>
          </select>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="bg-neutral-100 border border-primary-200 rounded-full px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('therapist.allGender')}</option>
            <option value="Male">{t('therapist.male')}</option>
            <option value="Female">{t('therapist.female')}</option>
            <option value="Other">{t('therapist.other')}</option>
          </select>
          <select
            value={filters.specialty}
            onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
            className="bg-neutral-100 border border-primary-200 rounded-full px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('therapist.allSpecialty')}</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {filteredTherapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => setSelectedTherapist(therapist)}
                className="cursor-pointer hover:border-primary-300 transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-5xl">{therapist.photo}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">{therapist.name}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {therapist.specialty.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Languages className="w-3 h-3 text-neutral-600" />
                        <p className="text-sm text-neutral-600">{therapist.languages.join(', ')}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                          <span className="text-sm font-medium text-neutral-900">{therapist.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-primary-600" />
                          <span className="text-sm text-neutral-600">{therapist.experience} {t('therapist.years')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-secondary-600" />
                          <span className="text-lg font-bold text-secondary-600">₹{therapist.price}</span>
                        </div>
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
