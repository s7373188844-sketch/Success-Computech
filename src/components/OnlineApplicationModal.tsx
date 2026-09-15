import React, { useState } from 'react';
import { SERVICES_CATALOG } from '../data/mockData';
import { ClientApplication, ServiceCategory } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle, ArrowRight, ShieldCheck, FileText, Check, Phone, User, MapPin, MessageSquare } from 'lucide-react';

interface OnlineApplicationModalProps {
  onClose: () => void;
  onApplicationCreated: (app: ClientApplication) => void;
  preSelectedCategory?: ServiceCategory;
}

export const OnlineApplicationModal: React.FC<OnlineApplicationModalProps> = ({
  onClose,
  onApplicationCreated,
  preSelectedCategory = 'passport'
}) => {
  const { t, language, getServiceTitle, getServiceDocs } = useLanguage();
  const [category, setCategory] = useState<ServiceCategory>(preSelectedCategory);
  const selectedService = SERVICES_CATALOG.find((s) => s.id === category) || SERVICES_CATALOG[0];
  const [subService, setSubService] = useState<string>(selectedService.subServices[0] || '');

  // Form fields
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Tirupur');
  const [pincode, setPincode] = useState('641602');
  const [notes, setNotes] = useState('');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [submittedApp, setSubmittedApp] = useState<ClientApplication | null>(null);

  const handleCategoryChange = (newCat: ServiceCategory) => {
    setCategory(newCat);
    const s = SERVICES_CATALOG.find((item) => item.id === newCat);
    if (s && s.subServices.length > 0) {
      setSubService(s.subServices[0]);
    }
  };

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert(language === 'ta' ? 'தயவுசெய்து உங்கள் முழுப் பெயர் மற்றும் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.' : 'Please enter your full name and 10-digit mobile number.');
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newRef = `SC-2024-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];

    const currentDocs = getServiceDocs(selectedService.id, selectedService.requiredDocs);
    const docsList = currentDocs.map((doc, idx) => ({
      id: `doc-${idx}`,
      name: doc,
      status: (checkedDocs[doc] ? 'uploaded' : 'pending') as 'uploaded' | 'pending',
      required: true
    }));

    const newApp: ClientApplication = {
      id: `app-${Date.now()}`,
      refNumber: newRef,
      clientName: clientName.trim(),
      phone: phone.trim().replace(/\D/g, '').slice(-10),
      email: email.trim(),
      serviceCategory: category,
      serviceName: getServiceTitle(selectedService.id, selectedService.title),
      subService: subService || selectedService.subServices[0],
      dateCreated: today,
      lastUpdated: today,
      status: 'submitted',
      paymentStatus: 'pending',
      feeAmount: selectedService.startingFee,
      feePaid: 0,
      address: address.trim(),
      city: city.trim() || 'Tirupur',
      pincode: pincode.trim(),
      notes: notes.trim(),
      documents: docsList,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: today,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'submitted',
          title: language === 'ta' ? 'விண்ணப்பம் பதிவு செய்யப்பட்டது' : 'Application Submitted Online',
          note: language === 'ta' ? `${subService} சேவைக்கான கோரிக்கை பதிவு செய்யப்பட்டு சரிபார்ப்புக்கு தயாராக உள்ளது.` : `New online submission received for ${subService}. Initial document review queued.`,
          updatedBy: language === 'ta' ? 'ஆன்லைன் போர்டல்' : 'Online Portal'
        }
      ]
    };

    onApplicationCreated(newApp);
    setSubmittedApp(newApp);
  };

  const localizedDocs = getServiceDocs(selectedService.id, selectedService.requiredDocs);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-white/20 uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full">
                {language === 'ta' ? 'ஆன்லைன் சேவை' : 'Online Portal'}
              </span>
              <span className="text-xs text-blue-200">Success Computech Est. 2020</span>
            </div>
            <h2 className="text-lg font-bold mt-1 text-white">
              {language === 'ta' ? 'டிஜிட்டல் சேவைக்கு விண்ணப்பிக்கவும்' : 'Apply for Digital Citizen Service'}
            </h2>
          </div>
          <button
            onClick={onClose}
            id="close-application-modal-btn"
            className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedApp ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'ta' ? 'விண்ணப்பம் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!' : 'Application Registered Successfully!'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {language === 'ta' ? 'நன்றி' : 'Thank you'}, <strong className="text-slate-800">{submittedApp.clientName}</strong>. {language === 'ta' ? 'உங்கள் விண்ணப்ப விவரங்கள் சக்சஸ் கம்ப்யூடெக்கில் பதிவு செய்யப்பட்டுள்ளன.' : 'Your request has been queued at Success Computech.'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 max-w-md mx-auto text-left space-y-2">
              <span className="text-xs uppercase font-bold text-blue-700 tracking-wider block">
                {language === 'ta' ? 'உங்கள் ரசீது / கண்காணிப்பு எண் (Ref No)' : 'Your Tracking Reference Number'}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-extrabold text-blue-900">{submittedApp.refNumber}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  {language === 'ta' ? 'செயலில் உள்ளது' : 'Active'}
                </span>
              </div>
              <p className="text-xs text-slate-500 pt-2 border-t border-blue-100">
                {language === 'ta' ? 'சேவை:' : 'Service:'} <strong>{submittedApp.subService}</strong> • {language === 'ta' ? 'கால அவகாசம்:' : 'Expected turnaround:'} <strong>{selectedService.turnaroundTime}</strong>
              </p>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl max-w-md mx-auto leading-relaxed border border-slate-200">
              {language === 'ta'
                ? 'எங்கள் பணியாளர் உங்கள் ஆவணங்களை சரிபார்த்து 2-4 மணி நேரத்திற்குள் உங்களுக்கு அழைப்பார் அல்லது வாட்ஸ்அப்பில் செய்தி அனுப்புவார். நீங்கள் எந்த நேரத்திலும் இந்த எண்ணைக் கொண்டு டிராக்கிங் செய்து கொள்ளலாம்.'
                : 'Our operator will verify your documents within 2-4 hours. You will receive SMS / WhatsApp updates. You can track this status anytime on the Live Tracking Portal.'}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                id="done-application-btn"
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
              >
                {language === 'ta' ? 'டிராக்கிங் பக்கத்திற்குச் செல்க' : 'Go to Dashboard / Tracker'}
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Friendly Non-Tech Customer Help Card */}
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-950">
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{t.nonTechFormHelpTitle}</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {t.nonTechFormHelpDesc}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? `அழைக்க: ${BUSINESS_INFO.phone}` : `Call ${BUSINESS_INFO.phone}`}</span>
                </a>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.sendDocsWhatsApp}</span>
                </a>
              </div>
            </div>

            {/* Step 1: Select Service Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {language === 'ta' ? '1. தேவையான டிஜிட்டல் சேவையைத் தேர்ந்தெடுக்கவும்' : '1. Select Digital Service Category'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_CATALOG.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleCategoryChange(s.id)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      category === s.id
                        ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-1 ring-blue-600 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="font-semibold">{getServiceTitle(s.id, s.title).split('(')[0].trim()}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                      {language === 'ta' ? `சுமார் ${s.turnaroundTime.split(' ')[0]} நாட்கள்` : `Est. ${s.turnaroundTime.split(' ')[0]}-${s.turnaroundTime.split(' ')[2]} days`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {language === 'ta' ? 'குறிப்பிட்ட சேவை வகை' : 'Specific Service Requirement'}
              </label>
              <select
                value={subService}
                onChange={(e) => setSubService(e.target.value)}
                id="subservice-select"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
              >
                {selectedService.subServices.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Applicant Information */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {language === 'ta' ? '2. விண்ணப்பதாரர் விவரங்கள்' : '2. Applicant Information'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {language === 'ta' ? 'முழு பெயர் (ஆவணத்தில் உள்ளபடி) *' : 'Full Legal Name *'}
                  </span>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={language === 'ta' ? 'எ.கா: சுப்பிரமணி K' : 'e.g. Subramani K'}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      id="applicant-name-input"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {language === 'ta' ? 'மொபைல் எண் (10 இலக்கங்கள்) *' : 'Mobile Number (10 digits) *'}
                  </span>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder={language === 'ta' ? 'எ.கா: 7373188844' : 'e.g. 7373188844'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="applicant-phone-input"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {language === 'ta' ? 'மின்னஞ்சல் முகவரி (இருந்தால் மட்டும்)' : 'Email Address (Optional)'}
                  </span>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="applicant-email-input"
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {language === 'ta' ? 'ஊர் / நகரம்' : 'City / Town'}
                  </span>
                  <input
                    type="text"
                    placeholder="Tirupur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    id="applicant-city-input"
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  {language === 'ta' ? 'முகவரி' : 'Residential Address'}
                </span>
                <input
                  type="text"
                  placeholder={language === 'ta' ? 'கதவு எண், தெரு பெயர், பகுதி (எ.கா: PN ரோடு, திருப்பூர்)' : 'House No, Street, Landmark'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="applicant-address-input"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Step 3: Required Documents Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {language === 'ta' ? '3. உங்களிடம் உள்ள ஆவணங்களை டிக் செய்யவும்' : '3. Required Documents Ready?'}
                </label>
                <span className="text-[10px] text-slate-500">
                  {language === 'ta' ? 'இருப்பவற்றை மட்டும் தேர்ந்தெடுக்கவும்' : 'Check what you have ready'}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                {localizedDocs.map((doc, idx) => (
                  <label
                    key={idx}
                    className="flex items-start space-x-2 text-xs text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[doc]}
                      onChange={() => toggleDoc(doc)}
                      className="mt-0.5 rounded-sm text-blue-600 focus:ring-blue-500"
                    />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">
                {language === 'ta'
                  ? '* நீங்கள் இப்போது சமர்ப்பிக்கலாம். விடுபட்ட ஆவணங்களை பெற அல்லது ஸ்கேன் செய்ய எங்கள் ஆப்பரேட்டர் உங்களுக்கு வழிகாட்டுவார்.'
                  : '* You can submit the form now. Our operator will call you to collect or scan any missing documents.'}
              </p>
            </div>

            {/* Additional Remarks */}
            <div>
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                {language === 'ta' ? 'ஏதேனும் சிறப்புக் குறிப்பு அல்லது அவசர தேவையா?' : 'Any specific note or urgency?'}
              </span>
              <textarea
                rows={2}
                placeholder={language === 'ta' ? 'எ.கா: அவசரமாக தட்கல் பாஸ்போர்ட் தேவை, ஆதார் அட்டையில் பெயர் பிழை திருத்தம் முதலியன...' : 'E.g. urgent tatkaal required before end of month, address mismatch in marksheet, etc.'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                id="applicant-notes-input"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Fee summary & Submit */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-600">
                  {language === 'ta' ? 'சேவைக் கட்டணம் ஆரம்பம்:' : 'Standard Service Starting Fee:'}
                </span>
                <div className="text-lg font-bold text-blue-950 font-mono">₹{selectedService.startingFee}*</div>
                <span className="text-[10px] text-slate-500">
                  {language === 'ta' ? '*ஆவண சரிபார்ப்புக்குப் பின் செலுத்தலாம்' : '*Payable after operator verification'}
                </span>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {language === 'ta' ? 'ரத்துசெய்' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  id="submit-online-application-btn"
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <span>{language === 'ta' ? 'விண்ணப்பித்து ரசீது பெறவும்' : 'Submit & Generate Ref No'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
