'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface LoginPageProps {
  onBack: () => void;
  onLogin: () => void;
}

export default function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login process - accepts any email/password
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Navigate to app
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any email/password - no validation needed
    handleLogin();
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background-base)] overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-50" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-neutral-50 border-b border-primary-200 px-4 py-3"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 mb-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                  <CardTitle className="text-3xl text-neutral-900 mb-2">{t('login.welcome')}</CardTitle>
                  <CardDescription className="text-neutral-600">
                    {t('login.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">
                        {t('login.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-600" />
                        <Input
                          type="text"
                          placeholder={t('login.emailPlaceholder')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="text-sm font-medium text-neutral-700 mb-2 block">
                        {t('login.password')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-600" />
                        <Input
                          type="password"
                          placeholder={t('login.passwordPlaceholder')}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="pt-4"
                    >
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            {t('login.signingIn')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t('login.signIn')}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </motion.div>

                    {/* Quick Login Option */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="pt-2"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleLogin}
                        disabled={isLoading}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        {t('login.guest')}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Privacy Notice */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-600"
                  >
                    <Shield className="w-3 h-3" />
                    <span>{t('login.privacy')}</span>
                  </motion.div>
                </CardContent>
              </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
