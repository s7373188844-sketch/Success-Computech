import React from 'react';
import { ClientApplication } from '../types';
import { Printer, X, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useLanguage } from '../context/LanguageContext';

interface ReceiptModalProps {
  application: ClientApplication;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ application, onClose }) => {
  const { t, language, getStatusText, getServiceTitle } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:w-full print:max-w-none">
        {/* Modal Top Actions - Hidden on Print */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white print:hidden">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm tracking-wide">
              {language === 'ta' ? 'அதிகாரப்பூர்வ ஒப்புகை ரசீது & பில்' : 'Official Acknowledgment & Invoice Slip'}
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
              {application.refNumber}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              id="print-receipt-btn"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printReceiptSlip}</span>
            </button>
            <button
              onClick={onClose}
              id="close-receipt-btn"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-8 space-y-6 text-slate-800 bg-white" id="printable-area">
          {/* Header */}
          <div className="border-b-2 border-slate-800 pb-6 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-xl shadow-xs">
                  SC
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Success Computech</h1>
                  <p className="text-xs font-semibold text-slate-700">
                    {language === 'ta'
                      ? 'டிஜிட்டல் இ-சேவை மையம் & அரசு நலத்திட்ட விண்ணப்ப அலுவலகம்'
                      : 'Digital Online Citizen Services & E-Governance Facilitation Center'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {language === 'ta' ? '2020 முதல் திருப்பூர் மக்களுக்கான நம்பகமான சேவை' : 'Serving Citizens Reliably Since 2020'} • Reg: CSC/TN/2020/8941
              </p>
              <p className="text-xs text-slate-800 font-bold mt-0.5">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-xs text-slate-600">
                {language === 'ta' ? 'தொடர்புக்கு / வாட்ஸ்அப்:' : 'Contact:'} <strong>{BUSINESS_INFO.phone}</strong> • {BUSINESS_INFO.email}
              </p>
            </div>

            <div className="text-right">
              <div className="inline-block bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-center">
                <QrCode className="w-14 h-14 mx-auto text-slate-700" />
                <span className="text-[10px] font-mono text-slate-600 block mt-1 uppercase font-bold">
                  {language === 'ta' ? 'டிராக்கிங் QR' : 'Scan to Track'}
                </span>
              </div>
            </div>
          </div>

          {/* Reference & Date Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">
                {language === 'ta' ? 'ரசீது எண்' : 'Reference No.'}
              </span>
              <span className="font-mono font-bold text-blue-700 text-sm">{application.refNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">
                {language === 'ta' ? 'பதிவு செய்த தேதி' : 'Date of Booking'}
              </span>
              <span className="font-semibold text-slate-800">{application.dateCreated}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">
                {language === 'ta' ? 'அரசு ஒப்புதல் ARN' : 'Govt Ack / ARN'}
              </span>
              <span className="font-mono font-semibold text-slate-800">
                {application.govtAckNumber || (language === 'ta' ? 'தயாராகி வருகிறது' : 'In Verification')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">
                {language === 'ta' ? 'கட்டண நிலை' : 'Payment Status'}
              </span>
              <span className={`inline-flex items-center font-bold uppercase text-[11px] ${
                application.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                ● {application.paymentStatus === 'paid' ? (language === 'ta' ? 'செலுத்தப்பட்டது' : 'PAID') : (language === 'ta' ? 'நிலுவை' : 'PENDING')} (₹{application.feePaid} / ₹{application.feeAmount})
              </span>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 p-3 rounded-lg bg-slate-50/70 border border-slate-200">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
                {language === 'ta' ? 'விண்ணப்பதாரர் விவரங்கள்' : 'Applicant Details'}
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'ta' ? 'பெயர்:' : 'Applicant Name:'}</span>
                <span className="font-bold text-slate-900">{application.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'ta' ? 'கைபேசி:' : 'Mobile Number:'}</span>
                <span className="font-mono font-bold text-slate-900">+91 {application.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'ta' ? 'மின்னஞ்சல்:' : 'Email Address:'}</span>
                <span className="text-slate-900">{application.email || 'N/A'}</span>
              </div>
              {application.city && (
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'ta' ? 'நகரம் / மாவட்டம்:' : 'City / District:'}</span>
                  <span className="text-slate-900">{application.city}, {application.pincode}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 p-3 rounded-lg bg-slate-50/70 border border-slate-200">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
                {language === 'ta' ? 'சேவை விவரங்கள்' : 'Service Details'}
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'ta' ? 'சேவை பிரிவு:' : 'Category:'}</span>
                <span className="font-semibold text-slate-900">{getServiceTitle(application.serviceCategory, application.serviceName).split('(')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'ta' ? 'குறிப்பிட்ட பணி:' : 'Service Type:'}</span>
                <span className="font-semibold text-blue-700 text-right">{application.subService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'ta' ? 'தற்போதைய நிலை:' : 'Current Status:'}</span>
                <span className="font-bold text-slate-900 uppercase">{getStatusText(application.status)}</span>
              </div>
              {application.appointmentDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'ta' ? 'அப்பாயின்மென்ட்:' : 'Appointment:'}</span>
                  <span className="font-bold text-amber-700">
                    {application.appointmentDate} ({application.appointmentTime || '10:00 AM'})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Fee Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-4 py-2">{language === 'ta' ? 'விவரம் / சேவை வகை' : 'Item / Description'}</th>
                  <th className="px-4 py-2">{language === 'ta' ? 'பிரிவு' : 'Service Type'}</th>
                  <th className="px-4 py-2 text-right">{language === 'ta' ? 'கட்டணம் (₹)' : 'Fee (INR)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {application.subService}
                    <span className="block text-[11px] text-slate-500 font-normal">
                      {language === 'ta'
                        ? 'அரசு போர்டல் விண்ணப்பம், ஆவண சரிபார்ப்பு மற்றும் கண்காணிப்பு வழிகாட்டல் அடங்கும்'
                        : 'Includes Government portal statutory processing, verification & documentation support'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 uppercase">{application.serviceCategory.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold">₹{application.feeAmount}.00</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={2} className="px-4 py-2 text-right text-slate-700">
                    {language === 'ta' ? 'மொத்த கட்டணம்:' : 'Total Amount Payable:'}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-900 font-mono font-bold">₹{application.feeAmount}.00</td>
                </tr>
                <tr className="bg-slate-50 text-emerald-700 font-bold">
                  <td colSpan={2} className="px-4 py-2 text-right">
                    {language === 'ta' ? 'பெறப்பட்ட தொகை:' : 'Amount Received:'}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">₹{application.feePaid}.00</td>
                </tr>
                {application.feeAmount > application.feePaid && (
                  <tr className="bg-amber-50 text-amber-800 font-bold">
                    <td colSpan={2} className="px-4 py-2 text-right">
                      {language === 'ta' ? 'மீதமுள்ள கட்டணம்:' : 'Balance Due:'}
                    </td>
                    <td className="px-4 py-2 text-right font-mono">₹{application.feeAmount - application.feePaid}.00</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Verification Stamps & Signatures */}
          <div className="pt-4 flex items-end justify-between text-xs border-t border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'ta'
                    ? 'சக்சஸ் கம்ப்யூடெக் அங்கீகரிக்கப்பட்ட டிஜிட்டல் ரசீது'
                    : 'Digitally Verified by Success Computech Citizen Portal'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 max-w-sm">
                {language === 'ta'
                  ? `* குறிப்பு: இந்த ரசீது எண்ணை வைத்து ஆன்லைனில் அல்லது 7373188844 வாட்ஸ்அப்பில் நிலவரத்தை அறிந்து கொள்ளலாம்.`
                  : '* Note: Keep this reference receipt safe for tracking status online or via WhatsApp support.'}
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-32 border-b-2 border-slate-400 pb-1 text-[11px] font-mono font-bold text-blue-900 italic">
                Success Computech
              </div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">
                {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட கையொப்பம்' : 'Authorized Signatory / Seal'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
