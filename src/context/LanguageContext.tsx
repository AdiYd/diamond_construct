import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    gallery: 'Gallery',
    contact: 'Contact Us',
    // Footer
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    accessibility: 'Accessibility',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    connectWithUs: 'Connect With Us',
    allRightsReserved: 'All rights reserved',
    readMore: 'Read More',
    close: 'Close',
    brandDescription: 'We create innovative solutions for modern challenges.',
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
  he: {
    // Navigation
    home: 'דף הבית',
    about: 'אודות',
    services: 'שירותים',
    gallery: 'גלריה',
    contact: 'צור קשר',
    // Footer
    termsOfService: 'תנאי שימוש',
    privacyPolicy: 'מדיניות פרטיות',
    accessibility: 'הצהרת נגישות',
    quickLinks: 'קישורים מהירים',
    legal: 'מידע משפטי',
    connectWithUs: 'התחברו איתנו',
    allRightsReserved: 'כל הזכויות שמורות',
    readMore: 'קרא עוד',
    close: 'סגור',
    brandDescription: 'שיפוצים • בנייה • תחזוקה •  סטנדרט גבוה',
    // Theme
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
