import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, TranslationDictionary, TAMIL_SERVICES } from '../translations';
import { ApplicationStatus } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  getStatusText: (status: ApplicationStatus) => string;
  getServiceTitle: (serviceId: string, fallbackTitle: string) => string;
  getServiceDocs: (serviceId: string, fallbackDocs: string[]) => string[];
  getServiceSubServices: (serviceId: string, fallbackSubs: string[]) => string[];
  getServiceBadge: (serviceId: string, fallbackBadge: string) => string;
  getServiceDesc: (serviceId: string, fallbackDesc: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'success_computech_lang_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default strictly to 'ta' (Tamil) as requested by user ("My Customers dont know english so i want to be in tamil for everyone")
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'ta' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return 'ta';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = TRANSLATIONS[language];

  const getStatusText = (status: ApplicationStatus): string => {
    if (language === 'en') {
      switch (status) {
        case 'submitted':
          return 'Application Submitted';
        case 'verification':
          return 'Document Verification';
        case 'govt_processing':
          return 'Govt Portal Processing';
        case 'appointment_scheduled':
          return 'Appointment Scheduled';
        case 'approved':
          return 'Govt Approved';
        case 'delivered':
          return 'Card Delivered / Ready';
        case 'action_required':
          return 'Action Required';
        case 'cancelled':
          return 'Cancelled';
        default:
          return status;
      }
    }

    // Tamil status labels
    switch (status) {
      case 'submitted':
        return 'விண்ணப்பம் பெறப்பட்டது';
      case 'verification':
        return 'ஆவணங்கள் சரிபார்க்கப்படுகிறது';
      case 'govt_processing':
        return 'அரசு போர்ட்டலில் பதிவு செய்யப்பட்டது';
      case 'appointment_scheduled':
        return 'அப்பாயிண்ட்மென்ட் உறுதி செய்யப்பட்டது';
      case 'approved':
        return 'அரசாங்க ஒப்புதல் பெற்றது';
      case 'delivered':
        return 'கார்டு டெலிவரி / பெற்றுக்கொள்ள தயார்';
      case 'action_required':
        return 'கூடுதல் தகவல் தேவை';
      case 'cancelled':
        return 'ரத்து செய்யப்பட்டது';
      default:
        return status;
    }
  };

  const getServiceTitle = (serviceId: string, fallbackTitle: string): string => {
    if (language === 'ta' && TAMIL_SERVICES[serviceId]) {
      return TAMIL_SERVICES[serviceId].title;
    }
    return fallbackTitle;
  };

  const getServiceDocs = (serviceId: string, fallbackDocs: string[]): string[] => {
    if (language === 'ta' && TAMIL_SERVICES[serviceId]) {
      return TAMIL_SERVICES[serviceId].requiredDocs;
    }
    return fallbackDocs;
  };

  const getServiceSubServices = (serviceId: string, fallbackSubs: string[]): string[] => {
    if (language === 'ta' && TAMIL_SERVICES[serviceId]) {
      return TAMIL_SERVICES[serviceId].subServices;
    }
    return fallbackSubs;
  };

  const getServiceBadge = (serviceId: string, fallbackBadge: string): string => {
    if (language === 'ta' && TAMIL_SERVICES[serviceId]) {
      return TAMIL_SERVICES[serviceId].badge;
    }
    return fallbackBadge;
  };

  const getServiceDesc = (serviceId: string, fallbackDesc: string): string => {
    if (language === 'ta' && TAMIL_SERVICES[serviceId]) {
      return TAMIL_SERVICES[serviceId].shortDesc;
    }
    return fallbackDesc;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getStatusText,
        getServiceTitle,
        getServiceDocs,
        getServiceSubServices,
        getServiceBadge,
        getServiceDesc
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
