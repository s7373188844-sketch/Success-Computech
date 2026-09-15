import React, { useState, useEffect } from 'react';
import { ClientApplication, ApplicationStatus } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Printer,
  MessageSquare,
  Calendar,
  Truck,
  ShieldCheck,
  ChevronRight,
  UploadCloud,
  XCircle,
  Info,
  Phone,
  MapPin
} from 'lucide-react';

interface TrackingPortalProps {
  applications: ClientApplication[];
  initialQuery?: string;
  onOpenReceipt: (app: ClientApplication) => void;
  onUpdateApplication: (app: ClientApplication) => void;
}

export const TrackingPortal: React.FC<TrackingPortalProps> = ({
  applications,
  initialQuery = '',
  onOpenReceipt,
  onUpdateApplication
}) => {
  const { t, language, getStatusText, getServiceTitle } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedApp, setSelectedApp] = useState<ClientApplication | null>(null);
  const [searchError, setSearchError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      performSearch(initialQuery);
    } else if (applications.length > 0 && !selectedApp) {
      // Default to first application as a welcoming preview
      setSelectedApp(applications[0]);
    }
  }, [initialQuery, applications]);

  const performSearch = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSearchError(language === 'ta' ? 'தயவுசெய்து ரசீது எண் அல்லது 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.' : 'Please enter an application reference number or 10-digit mobile number.');
      return;
    }

    const cleanNumber = q.replace(/\D/g, '');
    const found = applications.find(
      (app) =>
        app.refNumber.toLowerCase() === q ||
        app.phone.includes(cleanNumber && cleanNumber.length >= 6 ? cleanNumber : '_____') ||
        (app.govtAckNumber && app.govtAckNumber.toLowerCase().includes(q))
    );

    if (found) {
      setSelectedApp(found);
      setSearchError('');
      setUploadSuccess(false);
    } else {
      setSearchError(
        language === 'ta'
          ? `"${query}" என்ற எண்ணில் எந்த விண்ணப்பமும் காணப்படவில்லை. ரசீது எண் அல்லது மொபைல் எண்ணை சரிபார்க்கவும்.`
          : `No application found for "${query}". Please check the reference number or mobile.`
      );
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSampleClick = (ref: string) => {
    setSearchQuery(ref);
    performSearch(ref);
  };

  // Stepper definitions
  const steps: { key: ApplicationStatus; label: string; desc: string }[] = language === 'ta' ? [
    { key: 'submitted', label: '1. பெறப்பட்டது', desc: 'விண்ணப்பம் பதிவு செய்யப்பட்டது' },
    { key: 'verification', label: '2. சரிபார்ப்பு', desc: 'ஆவணங்கள் சரிபார்க்கப்படுகின்றன' },
    { key: 'govt_processing', label: '3. அரசு போர்டல்', desc: 'அரசு இணையதள செயல்முறை' },
    { key: 'appointment_scheduled', label: '4. அப்பாயின்மென்ட்', desc: 'நேரில் ஆஜராகும் தேதி' },
    { key: 'delivered', label: '5. டெலிவரி', desc: 'கார்டு விநியோகம் செய்யப்பட்டது' }
  ] : [
    { key: 'submitted', label: '1. Submitted', desc: 'Application received' },
    { key: 'verification', label: '2. Scrutiny', desc: 'Document verification' },
    { key: 'govt_processing', label: '3. Govt Portal', desc: 'Official processing' },
    { key: 'appointment_scheduled', label: '4. Biometrics/Slot', desc: 'PSK/Govt Office' },
    { key: 'delivered', label: '5. Delivered', desc: 'Dispatched / Completed' }
  ];

  const getStepState = (stepKey: ApplicationStatus, currentStatus: ApplicationStatus) => {
    const order: Record<ApplicationStatus, number> = {
      submitted: 1,
      verification: 2,
      govt_processing: 3,
      appointment_scheduled: 4,
      approved: 4.5,
      delivered: 5,
      action_required: 2,
      cancelled: 0
    };

    const currentOrder = order[currentStatus] || 1;
    const stepOrder = order[stepKey] || 1;

    if (currentStatus === 'action_required' && stepKey === 'verification') {
      return 'alert';
    }
    if (currentOrder > stepOrder || (currentOrder >= stepOrder && currentStatus === stepKey)) {
      return 'completed';
    }
    if (Math.ceil(currentOrder) === Math.ceil(stepOrder)) {
      return 'active';
    }
    return 'upcoming';
  };

  const handleSimulateDocUpload = () => {
    if (!selectedApp) return;
    const updatedDocs = selectedApp.documents.map((d) =>
      d.status === 'rejected' || d.status === 'pending'
        ? { ...d, status: 'uploaded' as const, notes: language === 'ta' ? 'வாடிக்கையாளரால் புதிய நகல் பதிவேற்றப்பட்டது' : 'Fresh copy uploaded by client' }
        : d
    );

    const updatedApp: ClientApplication = {
      ...selectedApp,
      status: 'verification',
      lastUpdated: new Date().toISOString().split('T')[0],
      documents: updatedDocs,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'verification',
          title: language === 'ta' ? 'சரியான ஆவணங்கள் வாடிக்கையாளரால் சமர்ப்பிக்கப்பட்டன' : 'Corrected Documents Uploaded by Applicant',
          note: language === 'ta' ? 'சரிபார்க்கப்பட்ட புதிய ஆவணங்கள் ஆன்லைனில் பதிவேற்றப்பட்டன.' : 'Customer uploaded updated clear document proofs via tracking portal.',
          updatedBy: 'Client Portal'
        },
        ...selectedApp.timeline
      ]
    };

    onUpdateApplication(updatedApp);
    setSelectedApp(updatedApp);
    setUploadSuccess(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {t.trackerBadge}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.trackerTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.trackerSubtitle}
        </p>

        {/* Reassurance Banner for Non-Tech Users */}
        <div className="mt-3 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <Phone className="w-4 h-4 text-blue-800 shrink-0" />
            <span className="font-medium leading-relaxed">
              {t.trackerReassurance}
            </span>
          </div>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs whitespace-nowrap flex items-center space-x-1.5 shadow-xs shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.whatsappHelplineNow}</span>
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t.trackPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="tracking-search-input"
              className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            id="tracking-search-btn"
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{t.checkStatusBtn}</span>
          </button>
        </form>

        {/* Quick chip selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{t.demoTrackPrompt}</span>
          {applications.slice(0, 4).map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => handleSampleClick(app.refNumber)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                selectedApp?.id === app.id
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              {app.refNumber} ({getServiceTitle(app.serviceCategory, app.serviceCategory).split('(')[0].trim()})
            </button>
          ))}
        </div>

        {searchError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* Selected Application Details */}
      {selectedApp && (
        <div className="space-y-6">
          {/* Main Status Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center space-x-2.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-blue-900">
                    {selectedApp.refNumber}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                    {getServiceTitle(selectedApp.serviceCategory, selectedApp.serviceCategory).split('(')[0]}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800">
                  {selectedApp.subService}
                </h2>
                <p className="text-xs text-slate-600">
                  {language === 'ta' ? 'விண்ணப்பதாரர்:' : 'Applicant:'}{' '}
                  <strong className="text-slate-900">{selectedApp.clientName}</strong> • {language === 'ta' ? 'போன்:' : 'Phone:'} +91 {selectedApp.phone}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedApp.status === 'delivered' || selectedApp.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : selectedApp.status === 'action_required'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                        : selectedApp.status === 'appointment_scheduled'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    <span>{getStatusText(selectedApp.status)}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{language === 'ta' ? 'கடைசி புதுப்பிப்பு:' : 'Last Updated:'} <strong>{selectedApp.lastUpdated}</strong></span>
                </div>
              </div>
            </div>

            {/* Stepper Timeline Visualizer */}
            <div className="py-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {steps.map((st, i) => {
                  const state = getStepState(st.key, selectedApp.status);
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-all text-xs ${
                        state === 'completed'
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                          : state === 'alert'
                          ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-500/20'
                          : state === 'active'
                          ? 'bg-blue-50 border-blue-300 text-blue-950 ring-2 ring-blue-600/20'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[11px] uppercase tracking-wider">
                          {st.label}
                        </span>
                        {state === 'completed' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        {state === 'alert' && (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        {state === 'active' && (
                          <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                        )}
                      </div>
                      <p className="text-[11px] leading-tight opacity-90">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Required Banner if applicable */}
            {selectedApp.status === 'action_required' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 space-y-3">
                <div className="flex items-start space-x-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide">
                      {language === 'ta' ? 'வாடிக்கையாளர் கவனத்திற்கு / உடனடி ஆவணம் தேவை' : 'Action Required by Applicant'}
                    </h4>
                    <p className="text-xs mt-1 text-amber-800">
                      {selectedApp.notes || (language === 'ta' ? 'ஒன்று அல்லது அதற்கு மேற்பட்ட ஆவணங்கள் தெளிவாக இல்லை. கீழே சரிபார்க்கவும் அல்லது கடைக்கு வரவும்.' : 'One or more documents require clarification or re-upload. Please see document status below.')}
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSimulateDocUpload}
                    id="reupload-docs-btn"
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'சரிசெய்யப்பட்ட ஆவணத்தை பதிவேற்ற' : 'Upload Corrected Document'}</span>
                  </button>
                  {uploadSuccess && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{language === 'ta' ? 'ஆவணங்கள் பதிவேற்றப்பட்டு மறுசரிபார்ப்புக்கு அனுப்பப்பட்டது!' : 'Documents uploaded & re-submitted for scrutiny!'}</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {language === 'ta' ? 'அரசு ரசீது / ARN எண்' : 'Govt Token / ARN'}
                </span>
                <p className="text-sm font-mono font-bold text-slate-800 truncate">
                  {selectedApp.govtAckNumber || (language === 'ta' ? 'தயாராகி வருகிறது' : 'Under Generation')}
                </p>
                <span className="text-[10px] text-slate-400">{language === 'ta' ? 'அரசு போர்டல் எண்' : 'Official Portal Identifier'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {language === 'ta' ? 'அப்பாயின்மென்ட் தேதி / நேரம்' : 'Appointment / Slot'}
                </span>
                <p className="text-xs font-bold text-slate-800">
                  {selectedApp.appointmentDate
                    ? `${selectedApp.appointmentDate} (${selectedApp.appointmentTime || '10:00 AM'})`
                    : (language === 'ta' ? 'தேவைப்படவில்லை / இன்னும் இல்லை' : 'Not Scheduled')}
                </p>
                <span className="text-[10px] text-slate-500 truncate block">
                  {selectedApp.appointmentLocation || (language === 'ta' ? 'நேரில் செல்ல வேண்டிய அவசியமில்லை' : 'No physical visit required')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {language === 'ta' ? 'தபால் / கூரியர் டிராக்கிங்' : 'Dispatch / Speed Post'}
                </span>
                <p className="text-xs font-mono font-bold text-slate-800">
                  {selectedApp.dispatchTrackingNumber || (language === 'ta' ? 'அனுப்பப்பட உள்ளது' : 'Pending Dispatch')}
                </p>
                <span className="text-[10px] text-slate-500">
                  {selectedApp.courierPartner || (language === 'ta' ? 'இந்தியா ஸ்பீடு போஸ்ட்' : 'India Speed Post')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {language === 'ta' ? 'ரசீது & கட்டணம்' : 'Receipt & Fee'}
                </span>
                <p className="text-xs font-mono font-bold text-slate-800">
                  ₹{selectedApp.feePaid} / ₹{selectedApp.feeAmount}
                </p>
                <span className={`text-[10px] font-bold uppercase ${
                  selectedApp.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  ● {selectedApp.paymentStatus === 'paid' ? (language === 'ta' ? 'முழுவதும் செலுத்தப்பட்டது' : 'PAID') : (language === 'ta' ? 'நிலுவை உள்ளது' : 'PENDING')}
                </span>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => onOpenReceipt(selectedApp)}
                  id="view-receipt-from-tracker-btn"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-2xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.downloadReceiptBtn}</span>
                </button>
              </div>

              <a
                href={BUSINESS_INFO.whatsappApplicationQueryUrl(selectedApp.refNumber, selectedApp.clientName)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'இந்த விண்ணப்பம் பற்றி வாட்ஸ்அப்பில் கேட்க' : 'WhatsApp Desk Regarding This Application'}</span>
              </a>
            </div>
          </div>

          {/* Detailed Timeline & Document Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Timeline Log */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{language === 'ta' ? 'விண்ணப்பத்தின் நிகழ்வுகள் & வரலாறு' : 'Application History & Audit Trail'}</span>
              </h3>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-2.5 before:w-0.5 before:bg-slate-200">
                {selectedApp.timeline.map((event, idx) => (
                  <div key={idx} className="relative flex items-start space-x-3.5 pl-6">
                    <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-xs">{event.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">{event.note}</p>
                      <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-200/60">
                        {language === 'ta' ? 'புதுப்பித்தவர்:' : 'Updated by:'} {event.updatedBy}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Verification Status */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>{language === 'ta' ? 'சமர்ப்பிக்கப்பட்ட ஆவணங்கள்' : 'Documents Verification'}</span>
              </h3>

              <div className="space-y-2.5">
                {selectedApp.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">{doc.name}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          doc.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {doc.status === 'verified'
                          ? (language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified')
                          : doc.status === 'rejected'
                          ? (language === 'ta' ? 'மறுக்கப்பட்டது' : 'Rejected')
                          : (language === 'ta' ? 'நிலுவை' : 'Pending')}
                      </span>
                    </div>
                    {doc.notes && (
                      <p className="text-[10px] text-rose-600 italic leading-tight">
                        {language === 'ta' ? 'குறிப்பு:' : 'Note:'} {doc.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-[11px] text-blue-900 space-y-1">
                <div className="font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>{language === 'ta' ? 'சக்சஸ் கம்ப்யூடெக் அங்கீகாரம்' : 'Verified by Success Computech'}</span>
                </div>
                <p className="text-slate-600 text-[10px]">
                  {language === 'ta'
                    ? 'அனைத்து ஆவணங்களும் பாதுகாப்பாகவும் ரகசியமாகவும் பராமரிக்கப்படுகின்றன.'
                    : 'All documents undergo government standard encryption and confidentiality scrutiny.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
