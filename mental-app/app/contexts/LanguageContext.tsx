'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero Section
    'hero.title': 'MindSphere',
    'hero.tagline': 'Your Safe Space for Mental Wellness',
    'hero.description': 'A compassionate AI-powered platform connecting you with professional therapists, supportive communities, and personalized mental health resources. Your journey to wellness starts here.',
    'hero.feature1': 'AI-Powered Support',
    'hero.feature2': '100% Confidential',
    'hero.feature3': 'Community Support',
    'hero.getStarted': 'Get Started',
    'hero.trust': 'Your privacy is our priority',
    
    // Login
    'login.welcome': 'Welcome Back',
    'login.subtitle': 'Sign in to continue your wellness journey',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.emailPlaceholder': 'Enter any email',
    'login.passwordPlaceholder': 'Enter any password',
    'login.signIn': 'Sign In',
    'login.signingIn': 'Signing in...',
    'login.guest': 'Continue as Guest',
    'login.privacy': 'Your data is encrypted and secure',
    
    // AI Chat
    'chat.title': 'AI Assistant',
    'chat.safety': 'You are safe. Your identity is confidential.',
    'chat.breathing': 'Breathing Exercise',
    'chat.mindfulness': 'Mindfulness',
    'chat.placeholder': 'Type your message...',
    'chat.emergency': 'In crisis? Long press for emergency support',
    'chat.greeting': 'Hello. I am here to assist you. How are you feeling today?',
    'chat.response': 'I understand. Would you like to discuss this further?',
    
    // Therapist
    'therapist.title': 'Recommended Specialists for You',
    'therapist.filters': 'Filters',
    'therapist.allPrice': 'All Prices',
    'therapist.allGender': 'All Genders',
    'therapist.allSpecialty': 'All Specialties',
    'therapist.male': 'Male',
    'therapist.female': 'Female',
    'therapist.other': 'Other',
    'therapist.languages': 'Languages',
    'therapist.experience': 'Experience',
    'therapist.specialty': 'Specialty',
    'therapist.rating': 'Rating',
    'therapist.price': 'Price',
    'therapist.available': 'Available Times',
    'therapist.book': 'Book',
    'therapist.session': 'session',
    'therapist.years': 'years',
    
    // Groups
    'groups.title': 'Anonymous Group Chat',
    'groups.subtitle': 'Safe community support',
    'groups.members': 'members',
    'groups.moderation': 'AI Moderation Active',
    'groups.identity': 'Your identity',
    'groups.confidential': '(Confidential)',
    'groups.messagePlaceholder': 'Type your message...',
    
    // Buddy
    'buddy.title': 'Find someone who understands you',
    'buddy.similarity': 'Similarity Score',
    'buddy.language': 'Language',
    'buddy.interests': 'Interests',
    'buddy.availability': 'Availability',
    'buddy.about': 'About',
    'buddy.callDuration': 'Call Duration',
    'buddy.bookCall': 'Book Call',
    'buddy.availableNow': 'Available now',
    'buddy.availableIn': 'Available in',
    'buddy.availableTomorrow': 'Available tomorrow',
    'buddy.hours': 'hours',
    
    // Dashboard
    'dashboard.title': 'Your Progress',
    'dashboard.profile': 'Profile',
    'dashboard.streak': 'days',
    'dashboard.streakLabel': 'Streak',
    'dashboard.level': 'Level',
    'dashboard.levelName': 'Mind Explorer',
    'dashboard.coins': 'Mental Health Coins',
    'dashboard.earned': 'You earned',
    'dashboard.today': 'MHC today',
    'dashboard.tasks': 'Daily Mini Tasks',
    'dashboard.rewards': 'Redeem Rewards',
    'dashboard.complete': 'Complete',
    
    // Assessment
    'assessment.title': 'Mental Health Assessment',
    'assessment.retake': 'Retake',
    'assessment.dashboard': 'Dashboard',
    'assessment.yourScore': 'Your Score',
    'assessment.recommendations': 'Recommendations',
    'assessment.good': 'You are in good shape',
    'assessment.goodDesc': 'Your mental health appears stable. Continue regular self-care practices.',
    'assessment.goodRec': 'Continue with AI chat and mindfulness exercises.',
    'assessment.mild': 'Mild Signs',
    'assessment.mildDesc': 'These are mild signs of anxiety. This can be addressed with proper support.',
    'assessment.mildRec': 'Talk to AI chat or join the community.',
    'assessment.moderate': 'Moderate Level',
    'assessment.moderateDesc': 'You are advised to seek professional support.',
    'assessment.moderateRec': 'Consider talking to a therapist or buddy.',
    'assessment.severe': 'Immediate Support',
    'assessment.severeDesc': 'Please seek professional help. You are not alone.',
    'assessment.severeRec': 'Book a therapist immediately or seek emergency support.',
    'assessment.scale0': 'Not at all',
    'assessment.scale1': 'Several days',
    'assessment.scale2': 'More than half the days',
    'assessment.scale3': 'Nearly every day',
  },
  hi: {
    // Hero Section
    'hero.title': 'MindSphere',
    'hero.tagline': 'मानसिक स्वास्थ्य के लिए आपकी सुरक्षित जगह',
    'hero.description': 'एक दयालु AI-संचालित प्लेटफॉर्म जो आपको पेशेवर चिकित्सकों, सहायक समुदायों और व्यक्तिगत मानसिक स्वास्थ्य संसाधनों से जोड़ता है। आपकी कल्याण यात्रा यहीं से शुरू होती है।',
    'hero.feature1': 'AI-संचालित सहायता',
    'hero.feature2': '100% गोपनीय',
    'hero.feature3': 'समुदाय सहायता',
    'hero.getStarted': 'शुरू करें',
    'hero.trust': 'आपकी गोपनीयता हमारी प्राथमिकता है',
    
    // Login
    'login.welcome': 'वापसी पर स्वागत है',
    'login.subtitle': 'अपनी कल्याण यात्रा जारी रखने के लिए साइन इन करें',
    'login.email': 'ईमेल',
    'login.password': 'पासवर्ड',
    'login.emailPlaceholder': 'कोई भी ईमेल दर्ज करें',
    'login.passwordPlaceholder': 'कोई भी पासवर्ड दर्ज करें',
    'login.signIn': 'साइन इन करें',
    'login.signingIn': 'साइन इन हो रहा है...',
    'login.guest': 'अतिथि के रूप में जारी रखें',
    'login.privacy': 'आपका डेटा एन्क्रिप्टेड और सुरक्षित है',
    
    // AI Chat
    'chat.title': 'AI सहायक',
    'chat.safety': 'आप सुरक्षित हैं। आपकी पहचान गोपनीय है।',
    'chat.breathing': 'साँस लेने का व्यायाम',
    'chat.mindfulness': 'माइंडफुलनेस',
    'chat.placeholder': 'संदेश टाइप करें...',
    'chat.emergency': 'संकट में? लंबे दबाव से आपातकालीन सहायता',
    'chat.greeting': 'नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। आज आप कैसा महसूस कर रहे हैं?',
    'chat.response': 'मैं समझ गया। क्या आप इसके बारे में और बात करना चाहेंगे?',
    
    // Therapist
    'therapist.title': 'आपके लिए सुझाए विशेषज्ञ',
    'therapist.filters': 'फ़िल्टर',
    'therapist.allPrice': 'सभी कीमत',
    'therapist.allGender': 'सभी लिंग',
    'therapist.allSpecialty': 'सभी विशेषज्ञता',
    'therapist.male': 'पुरुष',
    'therapist.female': 'महिला',
    'therapist.other': 'अन्य',
    'therapist.languages': 'भाषाएँ',
    'therapist.experience': 'अनुभव',
    'therapist.specialty': 'विशेषज्ञता',
    'therapist.rating': 'रेटिंग',
    'therapist.price': 'कीमत',
    'therapist.available': 'उपलब्ध समय',
    'therapist.book': 'बुक करें',
    'therapist.session': 'सत्र',
    'therapist.years': 'वर्ष',
    
    // Groups
    'groups.title': 'गुमनाम समूह चैट',
    'groups.subtitle': 'सुरक्षित समुदाय सहायता',
    'groups.members': 'सदस्य',
    'groups.moderation': 'AI मॉडरेशन सक्रिय',
    'groups.identity': 'आपकी पहचान',
    'groups.confidential': '(गोपनीय)',
    'groups.messagePlaceholder': 'संदेश टाइप करें...',
    
    // Buddy
    'buddy.title': 'Find someone who understands you',
    'buddy.similarity': 'Similarity Score',
    'buddy.language': 'भाषा',
    'buddy.interests': 'रुचियाँ',
    'buddy.availability': 'उपलब्धता',
    'buddy.about': 'About',
    'buddy.callDuration': 'Call Duration',
    'buddy.bookCall': 'Book Call',
    'buddy.availableNow': 'Available now',
    'buddy.availableIn': 'Available in',
    'buddy.availableTomorrow': 'Available tomorrow',
    'buddy.hours': 'hours',
    
    // Dashboard
    'dashboard.title': 'Your Progress',
    'dashboard.profile': 'Profile',
    'dashboard.streak': 'दिन',
    'dashboard.streakLabel': 'Streak',
    'dashboard.level': 'Level',
    'dashboard.levelName': 'Mind Explorer',
    'dashboard.coins': 'Mental Health Coins',
    'dashboard.earned': 'You earned',
    'dashboard.today': 'MHC today',
    'dashboard.tasks': 'Daily Mini Tasks',
    'dashboard.rewards': 'Redeem Rewards',
    'dashboard.complete': 'Complete',
    
    // Assessment
    'assessment.title': 'Mental Health Assessment',
    'assessment.retake': 'Retake',
    'assessment.dashboard': 'Dashboard',
    'assessment.yourScore': 'Your Score',
    'assessment.recommendations': 'Recommendations',
    'assessment.good': 'आप अच्छी स्थिति में हैं',
    'assessment.goodDesc': 'आपकी मानसिक सेहत अच्छी लग रही है। नियमित self-care जारी रखें।',
    'assessment.goodRec': 'AI chat और mindfulness exercises के साथ जारी रखें।',
    'assessment.mild': 'हल्के संकेत हैं',
    'assessment.mildDesc': 'ये चिंता के हल्के संकेत हैं। उचित सहायता से इसे संबोधित किया जा सकता है।',
    'assessment.mildRec': 'AI chat से बात करें या community में join करें।',
    'assessment.moderate': 'मध्यम स्तर',
    'assessment.moderateDesc': 'आपको professional support लेने की सलाह दी जाती है।',
    'assessment.moderateRec': 'Therapist या buddy से बात करने पर विचार करें।',
    'assessment.severe': 'तत्काल सहायता',
    'assessment.severeDesc': 'कृपया professional help लें। आप अकेले नहीं हैं।',
    'assessment.severeRec': 'तुरंत therapist से बुक करें या emergency support लें।',
    'assessment.scale0': 'बिल्कुल नहीं',
    'assessment.scale1': 'कुछ दिन',
    'assessment.scale2': 'आधे से ज्यादा दिन',
    'assessment.scale3': 'लगभग हर दिन',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

