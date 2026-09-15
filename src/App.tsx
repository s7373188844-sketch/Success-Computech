import React, { useState, useEffect } from 'react';
import { ClientApplication, ServiceCategory } from './types';
import { INITIAL_APPLICATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { PublicWebsite } from './components/PublicWebsite';
import { TrackingPortal } from './components/TrackingPortal';
import { ClientManagement } from './components/ClientManagement';
import { OnlineApplicationModal } from './components/OnlineApplicationModal';
import { ReceiptModal } from './components/ReceiptModal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { BUSINESS_INFO } from './data/businessInfo';

const STORAGE_KEY = 'success_computech_applications_v1';

function AppContent() {
  const { t, language } = useLanguage();
  const [applications, setApplications] = useState<ClientApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored applications', e);
    }
    return INITIAL_APPLICATIONS;
  });

  const [currentTab, setCurrentTab] = useState<'website' | 'tracking' | 'admin'>('website');
  const [trackingQuery, setTrackingQuery] = useState<string>('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [preSelectedCategory, setPreSelectedCategory] = useState<ServiceCategory | undefined>(undefined);
  const [activeReceiptApp, setActiveReceiptApp] = useState<ClientApplication | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error('Error saving applications to localStorage', e);
    }
  }, [applications]);

  // Handlers
  const handleOpenApplyModal = (category?: ServiceCategory) => {
    setPreSelectedCategory(category);
    setShowApplyModal(true);
  };

  const handleApplicationCreated = (newApp: ClientApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleUpdateApplication = (updatedApp: ClientApplication) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const handleNavigateToTracker = (refQuery?: string) => {
    if (refQuery) {
      setTrackingQuery(refQuery);
    }
    setCurrentTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset application data to initial demo records?')) {
      setApplications(INITIAL_APPLICATIONS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenApplyModal={() => handleOpenApplyModal()}
        applicationsCount={applications.length}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentTab === 'website' && (
          <PublicWebsite
            onOpenApplyModal={handleOpenApplyModal}
            onNavigateToTracker={handleNavigateToTracker}
            onNavigateToAdmin={() => {
              setCurrentTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'tracking' && (
          <TrackingPortal
            applications={applications}
            initialQuery={trackingQuery}
            onOpenReceipt={(app) => setActiveReceiptApp(app)}
            onUpdateApplication={handleUpdateApplication}
          />
        )}

        {currentTab === 'admin' && (
          <ClientManagement
            applications={applications}
            onAddApplication={handleApplicationCreated}
            onUpdateApplication={handleUpdateApplication}
            onDeleteApplication={handleDeleteApplication}
            onOpenReceipt={(app) => setActiveReceiptApp(app)}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
            <span className="font-bold text-slate-900">சக்சஸ் கம்ப்யூடெக் (Success Computech)</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-500">{t.footerTagline}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-blue-800 font-medium">{BUSINESS_INFO.address}</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentTab('website')}
              className="hover:text-blue-700 cursor-pointer font-medium"
            >
              {t.navServices}
            </button>
            <button
              onClick={() => setCurrentTab('tracking')}
              className="hover:text-blue-700 cursor-pointer font-medium"
            >
              {t.navTracking}
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className="hover:text-blue-700 cursor-pointer font-medium"
            >
              {t.navCrm}
            </button>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 font-bold hover:underline"
            >
              {language === 'ta' ? 'வாட்ஸ்அப் உதவி' : 'WhatsApp Support'}
            </a>
          </div>
        </div>
      </footer>

      {/* Online Application Modal */}
      {showApplyModal && (
        <OnlineApplicationModal
          preSelectedCategory={preSelectedCategory}
          onClose={() => setShowApplyModal(false)}
          onApplicationCreated={(newApp) => {
            handleApplicationCreated(newApp);
            // Also update tracking query so user can jump straight to tracking
            setTrackingQuery(newApp.refNumber);
          }}
        />
      )}

      {/* Receipt Modal */}
      {activeReceiptApp && (
        <ReceiptModal
          application={activeReceiptApp}
          onClose={() => setActiveReceiptApp(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
