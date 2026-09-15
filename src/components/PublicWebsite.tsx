import React, { useState } from 'react';
import { SERVICES_CATALOG, TESTIMONIALS, FAQ_LIST } from '../data/mockData';
import { ServiceCategory } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useLanguage } from '../context/LanguageContext';
import { TAMIL_TESTIMONIALS, TAMIL_FAQ_LIST } from '../translations';
import {
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  FileCheck,
  Search,
  ArrowRight,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight,
  Send,
  Navigation,
  Check,
  Languages,
  HelpCircle as QuestionIcon
} from 'lucide-react';

interface PublicWebsiteProps {
  onOpenApplyModal: (category?: ServiceCategory) => void;
  onNavigateToTracker: (refQuery?: string) => void;
  onNavigateToAdmin: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  onOpenApplyModal,
  onNavigateToTracker,
  onNavigateToAdmin
}) => {
  const {
    t,
    language,
    setLanguage,
    getServiceTitle,
    getServiceDocs,
    getServiceBadge,
    getServiceDesc
  } = useLanguage();

  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [activeDocTab, setActiveDocTab] = useState<ServiceCategory>('passport');

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      onNavigateToTracker(quickTrackInput.trim());
    }
  };

  const selectedServiceForDocs = SERVICES_CATALOG.find((s) => s.id === activeDocTab) || SERVICES_CATALOG[0];
  const activeDocsList = getServiceDocs(selectedServiceForDocs.id, selectedServiceForDocs.requiredDocs);
  const activeServiceTitle = getServiceTitle(selectedServiceForDocs.id, selectedServiceForDocs.title);

  const testimonialsList = language === 'ta' ? TAMIL_TESTIMONIALS : TESTIMONIALS;
  const faqList = language === 'ta' ? TAMIL_FAQ_LIST : FAQ_LIST;

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-blue-50/80 via-white to-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Top trust ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              <span>{language === 'ta' ? '2020 முதல் திருப்பூர் மக்களின் நம்பகமான சேவை' : 'Serving Tirupur Since 2020'}</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-950 border border-amber-200">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>{BUSINESS_INFO.address}</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-950 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'ta' ? 'அங்கீகரிக்கப்பட்ட இ-சேவை மையம்' : 'Govt Certified Seva Desk'}</span>
            </span>
          </div>

          <div className="text-center max-w-4xl mx-auto space-y-4">
            {/* Friendly reassurance banner */}
            <div className="inline-block bg-amber-50 border border-amber-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold text-amber-950 shadow-2xs">
              {t.heroReassurance}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t.heroTitle1}{' '}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 bg-clip-text text-transparent block sm:inline">
                {t.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Direct High-Impact Contact Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                id="hero-call-btn"
                className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callHelplineNow}</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.whatsappHelplineNow}</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenApplyModal()}
                id="hero-apply-btn"
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{t.requestAssistedService}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Track Input Bar in Hero */}
            <div className="pt-6 max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-3 text-left">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5 px-1">
                  {t.trackBoxTitle}
                </span>
                <form
                  onSubmit={handleQuickTrackSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2"
                >
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder={t.trackPlaceholder}
                      value={quickTrackInput}
                      onChange={(e) => setQuickTrackInput(e.target.value)}
                      id="hero-track-input"
                      className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                    />
                  </div>
                  <button
                    type="submit"
                    id="hero-track-btn"
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{t.checkStatusBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 mt-2 px-1">
                  <span>{t.demoTrackPrompt}</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToTracker('SC-2024-1042')}
                    className="text-blue-700 hover:underline font-mono font-medium cursor-pointer"
                  >
                    SC-2024-1042 ({language === 'ta' ? 'பாஸ்போர்ட்' : 'Passport'})
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToTracker('SC-2024-1188')}
                    className="text-blue-700 hover:underline font-mono font-medium cursor-pointer"
                  >
                    SC-2024-1188 ({language === 'ta' ? 'பான் கார்டு' : 'PAN'})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance 3-Box Informational Feature */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80 max-w-5xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t.feature1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.feature1Desc}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t.feature2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.feature2Desc}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t.feature3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section with clear document requirements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            {t.catalogBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.catalogTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.catalogSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATALOG.map((service) => {
            const title = getServiceTitle(service.id, service.title);
            const badge = getServiceBadge(service.id, service.badge);
            const desc = getServiceDesc(service.id, service.shortDesc);
            const docs = getServiceDocs(service.id, service.requiredDocs);

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {badge}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-500 text-xs">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{service.turnaroundTime}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* What to bring */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {t.whatToBring}
                    </span>
                    <ul className="text-xs space-y-1 text-slate-700">
                      {docs.slice(0, 3).map((doc, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="truncate font-medium">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">{t.startingFee}</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">₹{service.startingFee}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal(service.id)}
                      id={`apply-btn-${service.id}`}
                      className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{t.getAssistedHelp}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quick WhatsApp helper for this service */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <a
                      href={BUSINESS_INFO.whatsappDocsUrl(title)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-bold flex items-center space-x-1 hover:underline"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>{t.whatsappDocsChecklist}</span>
                    </a>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-slate-600 font-medium hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{BUSINESS_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works for Citizens Who Don't Know Computers */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
            {t.zeroKnowledgeBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.zeroKnowledgeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {t.zeroKnowledgeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-base">
              1
            </div>
            <h3 className="font-bold text-base text-white">{t.step1Title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-base">
              2
            </div>
            <h3 className="font-bold text-base text-white">{t.step2Title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-base">
              3
            </div>
            <h3 className="font-bold text-base text-white">{t.step3Title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Document Checklist Helper Interactive Tab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {t.docsChecklistBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {t.docsChecklistTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.docsChecklistSubtitle}
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 no-scrollbar">
            {SERVICES_CATALOG.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setActiveDocTab(srv.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeDocTab === srv.id
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {getServiceTitle(srv.id, srv.title).split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Active Checklist display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>{t.docsToBringFor} {activeServiceTitle}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeDocsList.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950">
                <span className="font-bold block mb-0.5">{language === 'ta' ? 'ஜெராக்ஸ் அல்லது பாஸ்போர்ட் போட்டோ இல்லையா?' : "Don't have xerox copies or passport photos?"}</span>
                {t.noXeroxWarning}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {t.officialPortalLabel}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {selectedServiceForDocs.govtPortal}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {t.turnaroundLabel}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {selectedServiceForDocs.turnaroundTime}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <a
                  href={BUSINESS_INFO.whatsappDocsUrl(activeServiceTitle)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.whatsappDocsBtn}</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-700" />
                  <span>{t.callToConfirmBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials from Tirupur Citizens */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {t.testimonialsBadge}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {t.testimonialsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500 text-xs">
                  {'★'.repeat(item.rating)}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <span className="text-[11px] text-slate-500 font-medium">{item.role} • {item.location}</span>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  {item.service.split('&')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Center Location & Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {t.visitShopBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t.visitShopTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.visitShopDesc}
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white text-sm block">{t.shopAddressLabel}</span>
                    <span className="text-slate-100 text-sm font-semibold">
                      {BUSINESS_INFO.address}
                    </span>
                    <span className="text-[11px] text-amber-300 block mt-0.5">
                      {t.landmarkLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">{t.directPhoneLabel}</span>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="font-mono font-bold text-emerald-300 text-sm hover:underline">
                      {BUSINESS_INFO.phone} (+91 73731 88844)
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">{t.shopTimingsLabel}</span>
                    <span>{t.shopTimingsText}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={BUSINESS_INFO.mapDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.getDrivingDirections}</span>
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">{t.needFastHelpCardTitle}</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                {t.needFastHelpCardDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.sendDocsWhatsAppBtn}</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>{t.navCallBtn}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 text-right">
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  id="footer-admin-btn"
                  className="text-[11px] text-slate-300 hover:text-white flex items-center space-x-1 ml-auto cursor-pointer"
                >
                  <Layers className="w-3 h-3" />
                  <span>{t.navCrm}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {t.faqBadge}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">{t.faqTitle}</h2>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-xl border border-slate-200 p-4 transition-all open:ring-1 open:ring-blue-600/30"
            >
              <summary className="font-semibold text-xs sm:text-sm text-slate-900 cursor-pointer flex items-center justify-between select-none">
                <span>{faq.q}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs text-slate-600 mt-2.5 pt-2.5 border-t border-slate-100 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

