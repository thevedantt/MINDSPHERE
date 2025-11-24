'use client';

import { useState } from 'react';
import HeroSection from './components/HeroSection';
import LoginPage from './components/LoginPage';
import AIChat from './components/AIChat';
import TherapistBooking from './components/TherapistBooking';
import GroupChat from './components/GroupChat';
import BuddyBooking from './components/BuddyBooking';
import GamificationDashboard from './components/GamificationDashboard';
import MentalHealthAssessment from './components/MentalHealthAssessment';
import BottomNav from './components/BottomNav';

type AppState = 'hero' | 'login' | 'app';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [currentScreen, setCurrentScreen] = useState('chat');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'chat':
        return <AIChat />;
      case 'therapist':
        return <TherapistBooking />;
      case 'groups':
        return <GroupChat />;
      case 'buddy':
        return <BuddyBooking />;
      case 'dashboard':
        return <GamificationDashboard />;
      case 'assessment':
        return <MentalHealthAssessment />;
      default:
        return <AIChat />;
    }
  };

  // Hero Section
  if (appState === 'hero') {
    return (
      <div className="relative max-w-md mx-auto h-screen overflow-hidden bg-black">
        <HeroSection onGetStarted={() => setAppState('login')} />
      </div>
    );
  }

  // Login Page
  if (appState === 'login') {
    return (
      <div className="relative max-w-md mx-auto h-screen overflow-hidden bg-black">
        <LoginPage
          onBack={() => setAppState('hero')}
          onLogin={() => setAppState('app')}
        />
      </div>
    );
  }

  // Main App
  return (
    <div className="relative max-w-md mx-auto h-screen overflow-hidden bg-black">
      <div className="h-full overflow-hidden">
        {renderScreen()}
      </div>
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}
