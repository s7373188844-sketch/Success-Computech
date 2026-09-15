import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  PlusCircle,
  LayoutDashboard,
  Globe,
  Phone,
  MessageSquare,
  Menu,
  X,
  MapPin,
  Clock,
  Languages
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentTab: 'website' | 'tracking' | 'admin';
  onSelectTab: (tab: 'website' | 'tracking' | 'admin') => void;
  onOpenApplyModal: () => void;
  applicationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenApplyModal,
  applicationsCount
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: 'website' | 'tracking' | 'admin') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Quick Contact & Location Ribbon */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
              {t.branchBadge}
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-semibold text-slate-100 truncate">
                {BUSINESS_INFO.address}
              </span>
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-amber-200 hidden md:inline-block font-medium">
              {t.topHelpline}
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center space-x-1 font-bold text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callUs}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-emerald-300 hover:text-white transition-colors font-bold"
            >
              <MessageSquare className="w-3 h-3" />
              <span>{t.whatsappUs}</span>
            </a>

            {/* Language Switcher in Top Ribbon */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700 ml-1">
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-2 py-0.5 rounded text-[10px] font-black transition-all ${
                  language === 'ta'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="தமிழ் மொழியில் பார்க்க"
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-blue-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="View in English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleTabClick('website')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-800 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
              SC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  {language === 'ta' ? 'சக்சஸ் கம்ப்யூடெக்' : 'Success Computech'}
                </span>
                <span className="text-[10px] uppercase font-black tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full border border-blue-200">
                  {language === 'ta' ? '2020 முதல்' : 'Since 2020'}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-600 hidden sm:block">
                {language === 'ta'
                  ? `AK மோட்டார்ஸ் எதிரில், PN ரோடு, திருப்பூர் • Ph: ${BUSINESS_INFO.phone}`
                  : `Opp AK Motors, PN Road, Tirupur • Ph: ${BUSINESS_INFO.phone}`}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleTabClick('website')}
              id="nav-website-btn"
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentTab === 'website'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.navServices}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('tracking')}
              id="nav-tracking-btn"
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentTab === 'tracking'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.navTracking}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('admin')}
              id="nav-admin-btn"
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentTab === 'admin'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.navCrm}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-mono">
                {applicationsCount}
              </span>
            </button>
          </nav>

          {/* Desktop Actions: Language, Phone Call & Assisted Help */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <button
              type="button"
              onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
              className="px-2.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
              title="Change Language / மொழியை மாற்ற"
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'ta' ? 'English மாற்ற' : 'தமிழில் பார்க்க'}</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              id="nav-call-btn"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.navCallBtn}</span>
            </a>

            <button
              type="button"
              onClick={onOpenApplyModal}
              id="nav-apply-btn"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navApplyBtn}</span>
            </button>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-200"
              title="வாட்ஸ்அப் உதவி எண் 7373188844"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu & Quick Actions */}
          <div className="flex md:hidden items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
              className="px-2 py-1 bg-amber-100 text-amber-950 font-black text-[11px] rounded-lg border border-amber-300"
            >
              {language === 'ta' ? 'EN' : 'தமிழ்'}
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-2.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-xs flex items-center space-x-1"
            >
              <Phone className="w-3 h-3" />
              <span>{language === 'ta' ? 'போன்' : 'Call'}</span>
            </a>
            <button
              type="button"
              onClick={onOpenApplyModal}
              className="px-2.5 py-1.5 bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs"
            >
              {language === 'ta' ? 'உதவி' : 'Help'}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <p className="text-[11px] text-slate-700 font-medium">
              {t.topHelpline}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleTabClick('website')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
              currentTab === 'website' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>{t.navServices}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('tracking')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
              currentTab === 'tracking' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-600" />
            <span>{t.navTracking}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('admin')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
              currentTab === 'admin' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-600" />
            <span>{t.navCrm} ({applicationsCount})</span>
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="font-bold text-blue-800 flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 font-bold flex items-center space-x-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>வாட்ஸ்அப் (7373188844)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
