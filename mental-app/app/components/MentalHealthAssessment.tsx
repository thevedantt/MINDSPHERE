'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, TrendingUp, Heart, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Question {
  id: number;
  text: string;
  emoji: string;
  icon: string;
}

const questions: Question[] = [
  { id: 1, text: 'पिछले 2 हफ्तों में, आपने कितनी बार उदासी या निराशा महसूस की?', emoji: '😔', icon: '😔' },
  { id: 2, text: 'आपको कितनी बार नींद में परेशानी हुई?', emoji: '😴', icon: '😴' },
  { id: 3, text: 'आप कितनी बार थकान या कम ऊर्जा महसूस करते हैं?', emoji: '😓', icon: '😓' },
  { id: 4, text: 'आपकी भूख में कितना बदलाव आया?', emoji: '🍽️', icon: '🍽️' },
  { id: 5, text: 'आप कितनी बार चिंता या घबराहट महसूस करते हैं?', emoji: '😰', icon: '😰' }
];

const scaleOptions = [
  { value: 0, label: 'बिल्कुल नहीं', emoji: '😊', color: 'primary-500' },
  { value: 1, label: 'कुछ दिन', emoji: '😐', color: 'secondary-500' },
  { value: 2, label: 'आधे से ज्यादा दिन', emoji: '😔', color: 'secondary-600' },
  { value: 3, label: 'लगभग हर दिन', emoji: '😢', color: 'secondary-700' }
];

export default function MentalHealthAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, val) => sum + val, 0);
  };

  const getResultMessage = (score: number) => {
    if (score <= 5) {
      return {
        title: 'आप अच्छी स्थिति में हैं ❤️',
        message: 'आपकी मानसिक सेहत अच्छी लग रही है। नियमित self-care जारी रखें।',
        recommendation: 'AI chat और mindfulness exercises के साथ जारी रखें।',
        icon: <CheckCircle2 className="w-8 h-8 text-primary-600" />,
        color: 'primary-500'
      };
    } else if (score <= 10) {
      return {
        title: 'हल्के संकेत हैं',
        message: 'ये चिंता के हल्के संकेत हैं — ये बिल्कुल ठीक किया जा सकता है ❤️',
        recommendation: 'AI chat से बात करें या community में join करें।',
        icon: <AlertCircle className="w-8 h-8 text-secondary-600" />,
        color: 'secondary-500'
      };
    } else if (score <= 15) {
      return {
        title: 'मध्यम स्तर',
        message: 'आपको professional support लेने की सलाह दी जाती है।',
        recommendation: 'Therapist या buddy से बात करने पर विचार करें।',
        icon: <TrendingUp className="w-8 h-8 text-secondary-600" />,
        color: 'secondary-600'
      };
    } else {
      return {
        title: 'तत्काल सहायता',
        message: 'कृपया professional help लें। आप अकेले नहीं हैं।',
        recommendation: 'तुरंत therapist से बुक करें या emergency support लें।',
        icon: <AlertCircle className="w-8 h-8 text-secondary-600" />,
        color: 'secondary-700'
      };
    }
  };

  if (showResults) {
    const score = calculateScore();
    const result = getResultMessage(score);
    
    return (
      <div className="flex flex-col h-screen bg-[var(--background-base)] pb-20">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Card className="mb-4">
            <CardContent className="pt-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center mb-4"
              >
                <div className="inline-block p-4 bg-primary-500 rounded-full mb-3">
                  {result.icon}
                </div>
                <CardTitle className="text-2xl mb-2 text-neutral-900">{result.title}</CardTitle>
                <p className="text-neutral-600">{result.message}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 mb-4 ${
                  result.color === 'primary-500' ? 'bg-primary-500' :
                  result.color === 'secondary-500' ? 'bg-secondary-500' :
                  result.color === 'secondary-600' ? 'bg-secondary-600' :
                  'bg-secondary-700'
                }`}
              >
                <p className="text-sm text-white mb-3 text-center font-semibold">Your Score</p>
                <div className="flex items-end justify-center gap-2 h-32 mb-3">
                  {answers.map((ans, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${(ans / 3) * 100}%` }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`rounded-t-lg w-8 mb-1 shadow-md ${
                          scaleOptions[ans].color === 'primary-500' ? 'bg-primary-500' :
                          scaleOptions[ans].color === 'secondary-500' ? 'bg-secondary-500' :
                          scaleOptions[ans].color === 'secondary-600' ? 'bg-secondary-600' :
                          'bg-secondary-700'
                        }`}
                      />
                      <span className="text-xs text-white/80">Q{idx + 1}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-3xl font-bold text-white">{score}/15</p>
              </motion.div>

                <div className="bg-neutral-100 rounded-2xl p-4 border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary-600" />
                    <p className="font-semibold text-neutral-900">Recommendations:</p>
                  </div>
                  <p className="text-sm text-neutral-600">{result.recommendation}</p>
                </div>
              </CardContent>
            </Card>

          <div className="grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowResults(false);
                }}
              >
                Retake
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="flex flex-col h-screen bg-[var(--background-base)] pb-20">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-neutral-50 border-b border-primary/10 px-4 py-3 rounded-b-3xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h1 className="text-xl font-semibold text-neutral-900">Mental Health Assessment</h1>
          </div>
          <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full border border-primary/20">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-neutral-100 rounded-full h-2 mt-3 overflow-hidden">
          <motion.div
            className="bg-primary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-6xl mb-4"
                  >
                    {question.emoji}
                  </motion.div>
                  <CardTitle className="text-lg leading-relaxed mb-6 text-neutral-900">
                    {question.text}
                  </CardTitle>
                </div>

                <div className="space-y-3">
                  {scaleOptions.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full h-auto py-4 text-white hover:opacity-90 shadow-md font-semibold ${
                          option.color === 'primary-500' ? 'bg-primary-500' :
                          option.color === 'secondary-500' ? 'bg-secondary-500' :
                          option.color === 'secondary-600' ? 'bg-secondary-600' :
                          'bg-secondary-700'
                        }`}
                        size="lg"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-3xl">{option.emoji}</span>
                          <span className="flex-1 text-left font-medium">{option.label}</span>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
