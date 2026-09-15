import React, { useState, useMemo } from 'react';
import {
  ClientApplication,
  ApplicationStatus,
  ServiceCategory,
  PaymentStatus,
  DocumentItem
} from '../types';
import { SERVICES_CATALOG } from '../data/mockData';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Plus,
  Filter,
  Printer,
  Edit3,
  Trash2,
  Download,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  TrendingUp,
  DollarSign,
  UserCheck,
  Calendar,
  X,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface ClientManagementProps {
  applications: ClientApplication[];
  onAddApplication: (app: ClientApplication) => void;
  onUpdateApplication: (app: ClientApplication) => void;
  onDeleteApplication: (id: string) => void;
  onOpenReceipt: (app: ClientApplication) => void;
  onResetDemoData: () => void;
}

export const ClientManagement: React.FC<ClientManagementProps> = ({
  applications,
  onAddApplication,
  onUpdateApplication,
  onDeleteApplication,
  onOpenReceipt,
  onResetDemoData
}) => {
  const { t, language, getStatusText, getServiceTitle } = useLanguage();

  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');

  // Modals state
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingApp, setEditingApp] = useState<ClientApplication | null>(null);
  const [whatsAppModalApp, setWhatsAppModalApp] = useState<ClientApplication | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Form states for New Application
  const [newCat, setNewCat] = useState<ServiceCategory>('passport');
  const [newSub, setNewSub] = useState(SERVICES_CATALOG[0].subServices[0]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFee, setNewFee] = useState(SERVICES_CATALOG[0].startingFee);
  const [newFeePaid, setNewFeePaid] = useState(SERVICES_CATALOG[0].startingFee);
  const [newNotes, setNewNotes] = useState('');
  const [newGovtAck, setNewGovtAck] = useState('');

  // Form states for Status Update Modal
  const [statusUpdateVal, setStatusUpdateVal] = useState<ApplicationStatus>('submitted');
  const [statusNoteVal, setStatusNoteVal] = useState('');
  const [officerNameVal, setOfficerNameVal] = useState('S. Murugan (Operator)');
  const [govtAckVal, setGovtAckVal] = useState('');
  const [apptDateVal, setApptDateVal] = useState('');
  const [apptTimeVal, setApptTimeVal] = useState('10:00 AM');
  const [apptLocVal, setApptLocVal] = useState('');
  const [courierTrackVal, setCourierTrackVal] = useState('');
  const [paymentStatusVal, setPaymentStatusVal] = useState<PaymentStatus>('paid');
  const [feePaidVal, setFeePaidVal] = useState<number>(0);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        !searchTerm.trim() ||
        app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm.replace(/\D/g, '')) ||
        (app.govtAckNumber && app.govtAckNumber.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || app.serviceCategory === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      const matchesPayment = selectedPayment === 'all' || app.paymentStatus === selectedPayment;

      return matchesSearch && matchesCat && matchesStatus && matchesPayment;
    });
  }, [applications, searchTerm, selectedCategory, selectedStatus, selectedPayment]);

  // Executive KPI summary calculations
  const stats = useMemo(() => {
    const total = applications.length;
    const active = applications.filter((a) =>
      ['submitted', 'verification', 'govt_processing', 'appointment_scheduled'].includes(a.status)
    ).length;
    const completed = applications.filter((a) => ['approved', 'delivered'].includes(a.status)).length;
    const actionRequired = applications.filter((a) => a.status === 'action_required').length;
    const totalRevenue = applications.reduce((acc, a) => acc + (a.feePaid || 0), 0);
    const totalBilled = applications.reduce((acc, a) => acc + (a.feeAmount || 0), 0);

    return { total, active, completed, actionRequired, totalRevenue, totalBilled };
  }, [applications]);

  // Open Edit/Update Modal
  const openEditModal = (app: ClientApplication) => {
    setEditingApp(app);
    setStatusUpdateVal(app.status);
    setStatusNoteVal('');
    setGovtAckVal(app.govtAckNumber || '');
    setApptDateVal(app.appointmentDate || '');
    setApptTimeVal(app.appointmentTime || '10:00 AM');
    setApptLocVal(app.appointmentLocation || '');
    setCourierTrackVal(app.dispatchTrackingNumber || '');
    setPaymentStatusVal(app.paymentStatus);
    setFeePaidVal(app.feePaid);
  };

  // Save Status Update
  const handleSaveStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let statusTitle = `Status updated to ${statusUpdateVal.replace('_', ' ').toUpperCase()}`;
    if (statusUpdateVal === 'appointment_scheduled' && apptDateVal) {
      statusTitle = `Appointment Scheduled for ${apptDateVal} at ${apptTimeVal}`;
    } else if (statusUpdateVal === 'delivered' && courierTrackVal) {
      statusTitle = `Dispatched via Speed Post (${courierTrackVal})`;
    } else if (statusUpdateVal === 'approved') {
      statusTitle = 'Application Approved by Govt Department';
    }

    const newTimelineEntry = {
      id: `tl-${Date.now()}`,
      date: today,
      time: timeNow,
      status: statusUpdateVal,
      title: statusTitle,
      note: statusNoteVal.trim() || `Application progress updated by ${officerNameVal}.`,
      updatedBy: officerNameVal
    };

    const updated: ClientApplication = {
      ...editingApp,
      status: statusUpdateVal,
      lastUpdated: today,
      govtAckNumber: govtAckVal.trim() || editingApp.govtAckNumber,
      appointmentDate: apptDateVal || editingApp.appointmentDate,
      appointmentTime: apptTimeVal || editingApp.appointmentTime,
      appointmentLocation: apptLocVal.trim() || editingApp.appointmentLocation,
      dispatchTrackingNumber: courierTrackVal.trim() || editingApp.dispatchTrackingNumber,
      paymentStatus: paymentStatusVal,
      feePaid: Number(feePaidVal),
      timeline: [newTimelineEntry, ...editingApp.timeline]
    };

    onUpdateApplication(updated);
    setEditingApp(null);
  };

  // Handle New Application Submission from Admin
  const handleCreateNewApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      alert('Please fill in Applicant Name and Phone Number');
      return;
    }

    const srv = SERVICES_CATALOG.find((s) => s.id === newCat) || SERVICES_CATALOG[0];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newRef = `SC-2024-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];

    const defaultDocs: DocumentItem[] = srv.requiredDocs.map((doc, idx) => ({
      id: `doc-${idx}`,
      name: doc,
      status: 'verified',
      required: true
    }));

    const app: ClientApplication = {
      id: `app-${Date.now()}`,
      refNumber: newRef,
      clientName: newName.trim(),
      phone: newPhone.trim().replace(/\D/g, '').slice(-10),
      email: newEmail.trim(),
      serviceCategory: newCat,
      serviceName: srv.title,
      subService: newSub,
      dateCreated: today,
      lastUpdated: today,
      status: 'submitted',
      paymentStatus: newFeePaid >= newFee ? 'paid' : newFeePaid > 0 ? 'partial' : 'pending',
      feeAmount: Number(newFee),
      feePaid: Number(newFeePaid),
      govtAckNumber: newGovtAck.trim(),
      notes: newNotes.trim(),
      documents: defaultDocs,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: today,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'submitted',
          title: 'Registered at Center Desk',
          note: `New client booking for ${newSub}. Initial fee ₹${newFeePaid} collected.`,
          updatedBy: 'S. Murugan (Operator)'
        }
      ]
    };

    onAddApplication(app);
    setShowNewModal(false);
    // Reset inputs
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewNotes('');
    setNewGovtAck('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Reference Number',
      'Client Name',
      'Phone',
      'Email',
      'Service Category',
      'Sub Service',
      'Filing Date',
      'Status',
      'Govt Ack No',
      'Fee Amount',
      'Fee Paid',
      'Payment Status'
    ];

    const rows = applications.map((a) => [
      `"${a.refNumber}"`,
      `"${a.clientName}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.serviceCategory}"`,
      `"${a.subService}"`,
      `"${a.dateCreated}"`,
      `"${a.status}"`,
      `"${a.govtAckNumber || ''}"`,
      a.feeAmount,
      a.feePaid,
      `"${a.paymentStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `success_computech_clients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate WhatsApp Message text for client updates
  const getWhatsAppMessage = (app: ClientApplication) => {
    if (language === 'ta') {
      let statusText = `தற்போது "${getStatusText(app.status)}" என்ற நிலையில் உள்ளது.`;
      if (app.status === 'appointment_scheduled') {
        statusText = `அப்பாயிண்ட்மென்ட் ${app.appointmentDate || 'வரவிருக்கும் தேதி'} அன்று ${app.appointmentTime || 'காலை 10:00'} மணிக்கு (${app.appointmentLocation || 'அலுவலகம்'}) திட்டமிடப்பட்டுள்ளது. அசல் ஆவணங்களை மறக்காமல் எடுத்து வரவும்.`;
      } else if (app.status === 'delivered') {
        statusText = `கார்டு தபால் / கூரியரில் அனுப்பப்பட்டுள்ளது (டிராக்கிங் எண்: ${app.dispatchTrackingNumber || 'N/A'}).`;
      } else if (app.status === 'action_required') {
        statusText = `கூடுதல் ஆவண தெளிவுரை தேவைப்படுகிறது: ${app.notes || 'தெளிவான முகவரி சான்று கொண்டு வரவும்'}.`;
      } else if (app.status === 'approved') {
        statusText = `அரசு இணையதளத்தில் வெற்றிகரமாக ஒப்புதல் பெறப்பட்டது.`;
      }

      return `*சக்சஸ் கம்ப்யூடெக் - அரசு இ-சேவை மையம்*
வணக்கம் ${app.clientName},
தங்களுடைய *${app.subService}* சேவை விண்ணப்பம் (ரசீது எண்: *${app.refNumber}*) ${statusText}

அரசு டோக்கன் / ஒப்புதல் எண் (ARN): ${app.govtAckNumber || 'செயலாக்கத்தில் உள்ளது'}
விண்ணப்ப நிலவரத்தை அறிய: https://successcomputech.in/track?ref=${app.refNumber}
கடை முகவரி: 15/17 AK மோட்டார்ஸ் எதிரில், PN ரோடு, திருப்பூர் - 641602
உதவி & வாட்ஸ்அப்: 7373188844
சக்சஸ் கம்ப்யூடெக் தேர்வு செய்ததற்கு நன்றி (Since 2020).`;
    }

    let statusText = `is currently in ${app.status.replace('_', ' ').toUpperCase()} status.`;
    if (app.status === 'appointment_scheduled') {
      statusText = `has appointment scheduled on ${app.appointmentDate || 'upcoming date'} at ${app.appointmentTime || '10:00 AM'} (${app.appointmentLocation || 'Office'}). Please bring your original documents.`;
    } else if (app.status === 'delivered') {
      statusText = `has been dispatched via Speed Post (Tracking No: ${app.dispatchTrackingNumber || 'N/A'}).`;
    } else if (app.status === 'action_required') {
      statusText = `requires document clarification: ${app.notes || 'Please provide clear address proof'}.`;
    } else if (app.status === 'approved') {
      statusText = `has been approved successfully by the government portal.`;
    }

    return `*SUCCESS COMPUTECH - Citizen Services Update*
Hello ${app.clientName},
Your application for *${app.subService}* (Ref: *${app.refNumber}*) ${statusText}

Govt ARN: ${app.govtAckNumber || 'In Processing'}
Track live anytime: https://successcomputech.in/track?ref=${app.refNumber}
Shop Location: ${BUSINESS_INFO.address}
Helpline / WhatsApp: ${BUSINESS_INFO.phone}
Thank you for choosing Success Computech (Since 2020).`;
  };

  const copyWhatsAppText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-slate-900 text-white uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-md">
              {t.crmBadge}
            </span>
            <span className="text-xs text-slate-500">Established 2020</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {t.crmTitle}
          </h1>
          <p className="text-xs text-slate-600">
            {t.crmSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onResetDemoData}
            id="reset-demo-data-btn"
            title="Restore default sample records"
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.crmResetDemo}</span>
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            id="export-csv-btn"
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 transition-colors shadow-2xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.crmExportCsv}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowNewModal(true)}
            id="new-client-btn"
            className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.crmNewClient}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.crmTotalClients}</span>
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{stats.total}</div>
          <span className="text-[10px] text-slate-500">Since 2020 active records</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.crmActiveInProgress}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700 font-mono">{stats.active}</div>
          <span className="text-[10px] text-slate-500">At verification / govt portal</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.crmCompleted}</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">{stats.completed}</div>
          <span className="text-[10px] text-slate-500">Cards delivered & ITR filed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.crmActionNeeded}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700 font-mono">{stats.actionRequired}</div>
          <span className="text-[10px] text-slate-500">Docs rejected or blurred</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.crmRevenue}</span>
            <DollarSign className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-900 font-mono">₹{stats.totalRevenue.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">
            {t.crmTotalBilled}: ₹{stats.totalBilled.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Text Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={t.crmSearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="admin-search-input"
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          {/* Service Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              id="filter-category-select"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="all">{t.crmAllServices}</option>
              <option value="passport">{getServiceTitle('passport', 'Passport Services')}</option>
              <option value="voter_id">{getServiceTitle('voter_id', 'Voter ID')}</option>
              <option value="pan_card">{getServiceTitle('pan_card', 'PAN Card')}</option>
              <option value="smart_card">{getServiceTitle('smart_card', 'Smart / Ration Card')}</option>
              <option value="insurance">{getServiceTitle('insurance', 'Insurance Policies')}</option>
              <option value="tax_filing">{getServiceTitle('tax_filing', 'Tax & GST Filing')}</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              id="filter-status-select"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="all">{t.crmAllStatuses}</option>
              <option value="submitted">{t.statusSubmitted}</option>
              <option value="verification">{t.statusVerification}</option>
              <option value="govt_processing">{t.statusGovtProcessing}</option>
              <option value="appointment_scheduled">{t.statusAppointmentScheduled}</option>
              <option value="approved">{t.statusApproved}</option>
              <option value="delivered">{t.statusDelivered}</option>
              <option value="action_required">{t.statusActionRequired}</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              id="filter-payment-select"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="all">{t.crmAllPayments}</option>
              <option value="paid">{t.crmPaid}</option>
              <option value="partial">{t.crmPartial}</option>
              <option value="pending">{t.crmPending}</option>
            </select>
          </div>
        </div>

        {/* Filter count indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            {language === 'ta' ? (
              <><strong>{filteredApps.length}</strong> / {applications.length} {t.crmShowingCount}</>
            ) : (
              <>Showing <strong>{filteredApps.length}</strong> of {applications.length} {t.crmShowingCount}</>
            )}
          </span>
          {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedPayment !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSelectedPayment('all');
              }}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              {t.crmClearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Main Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">{t.crmTableRefDate}</th>
                <th className="px-4 py-3">{t.crmTableClient}</th>
                <th className="px-4 py-3">{t.crmTableService}</th>
                <th className="px-4 py-3">{t.crmTableStatus}</th>
                <th className="px-4 py-3">{t.crmTableGovtAck}</th>
                <th className="px-4 py-3">{t.crmTableFee}</th>
                <th className="px-4 py-3 text-right">{t.crmTableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    {t.crmNoMatching}
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Ref & Date */}
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-blue-700 text-xs">{app.refNumber}</div>
                      <div className="text-[10px] text-slate-400">{app.dateCreated}</div>
                    </td>

                    {/* Client Info */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{app.clientName}</div>
                      <div className="text-[11px] font-mono text-slate-500">+91 {app.phone}</div>
                    </td>

                    {/* Service & Sub-service */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        {getServiceTitle(app.serviceCategory, app.serviceName).split('(')[0]}
                      </span>
                      <div className="text-slate-800 font-medium truncate" title={app.subService}>
                        {app.subService}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'delivered' || app.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'action_required'
                            ? 'bg-rose-100 text-rose-800 animate-pulse'
                            : app.status === 'appointment_scheduled'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {getStatusText(app.status)}
                      </span>
                      {app.appointmentDate && (
                        <div className="text-[10px] text-amber-800 font-semibold mt-0.5">
                          {language === 'ta' ? 'அப்பாயிண்ட்மென்ட்: ' : 'Appt: '}{app.appointmentDate}
                        </div>
                      )}
                    </td>

                    {/* Govt Ack */}
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-700">
                      {app.govtAckNumber ? (
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
                          {app.govtAckNumber}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">{t.crmPending}</span>
                      )}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-slate-900">
                        ₹{app.feePaid} <span className="text-slate-400 font-normal">/ ₹{app.feeAmount}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          app.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        ● {app.paymentStatus === 'paid' ? t.crmPaid : app.paymentStatus === 'partial' ? t.crmPartial : t.crmPending}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(app)}
                          id={`update-status-btn-${app.id}`}
                          title={t.crmUpdateStatusTooltip}
                          className="p-1.5 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setWhatsAppModalApp(app)}
                          id={`whatsapp-alert-btn-${app.id}`}
                          title={t.crmWhatsAppAlertTooltip}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenReceipt(app)}
                          id={`print-slip-btn-${app.id}`}
                          title={t.crmPrintSlipTooltip}
                          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(language === 'ta' ? `வாடிக்கையாளர் பதிவு ${app.refNumber} நீக்கப்பட வேண்டுமா?` : `Delete client record ${app.refNumber}?`)) {
                              onDeleteApplication(app.id);
                            }
                          }}
                          id={`delete-btn-${app.id}`}
                          title={t.crmDeleteTooltip}
                          className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Update Application Status & Timeline */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white">
              <div>
                <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider block">
                  {t.crmEditModalTitle}
                </span>
                <h3 className="text-base font-bold text-white">
                  {editingApp.refNumber} — {editingApp.clientName}
                </h3>
              </div>
              <button
                onClick={() => setEditingApp(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatusUpdate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.crmChangeStatusLabel}
                </label>
                <select
                  value={statusUpdateVal}
                  onChange={(e) => setStatusUpdateVal(e.target.value as ApplicationStatus)}
                  id="status-update-select"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                >
                  <option value="submitted">{t.statusSubmitted}</option>
                  <option value="verification">{t.statusVerification}</option>
                  <option value="govt_processing">{t.statusGovtProcessing}</option>
                  <option value="appointment_scheduled">{t.statusAppointmentScheduled}</option>
                  <option value="approved">{t.statusApproved}</option>
                  <option value="delivered">{t.statusDelivered}</option>
                  <option value="action_required">{t.statusActionRequired}</option>
                  <option value="cancelled">{t.statusCancelled}</option>
                </select>
              </div>

              {/* Conditional Appointment Details */}
              {statusUpdateVal === 'appointment_scheduled' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                  <span className="text-[11px] font-bold text-amber-900 block uppercase">
                    {t.crmApptDetails}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-amber-800">{t.crmApptDate}</span>
                      <input
                        type="date"
                        value={apptDateVal}
                        onChange={(e) => setApptDateVal(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-800">{t.crmApptTime}</span>
                      <input
                        type="text"
                        placeholder="e.g. 10:30 AM"
                        value={apptTimeVal}
                        onChange={(e) => setApptTimeVal(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-800">{t.crmApptLocation}</span>
                    <input
                      type="text"
                      placeholder="e.g. PSK Coimbatore / Tirupur Hub"
                      value={apptLocVal}
                      onChange={(e) => setApptLocVal(e.target.value)}
                      className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Conditional Dispatch Details */}
              {statusUpdateVal === 'delivered' && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-900 block uppercase">
                    {t.crmDispatchDetails}
                  </span>
                  <input
                    type="text"
                    placeholder="Speed Post / Courier Tracking No (e.g. EM904128472IN)"
                    value={courierTrackVal}
                    onChange={(e) => setCourierTrackVal(e.target.value)}
                    className="w-full bg-white border border-emerald-300 rounded-lg p-2 text-xs font-mono"
                  />
                </div>
              )}

              {/* Govt Ack Number */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.crmGovtAckLabel}
                </label>
                <input
                  type="text"
                  placeholder="e.g. ARN-24-90038102 or NSDL-881293019"
                  value={govtAckVal}
                  onChange={(e) => setGovtAckVal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              {/* Timeline Note */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.crmTimelineNoteLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'ta' ? 'வாடிக்கையாளருக்கு தெரிய வேண்டிய விவரங்களை தட்டச்சு செய்யவும்...' : 'Enter details for client timeline...'}
                  value={statusNoteVal}
                  onChange={(e) => setStatusNoteVal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              {/* Payment update */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmPaymentStatusLabel}
                  </label>
                  <select
                    value={paymentStatusVal}
                    onChange={(e) => setPaymentStatusVal(e.target.value as PaymentStatus)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="paid">{t.crmPaid}</option>
                    <option value="partial">{t.crmPartial}</option>
                    <option value="pending">{t.crmPending}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmAmountPaidLabel}
                  </label>
                  <input
                    type="number"
                    value={feePaidVal}
                    onChange={(e) => setFeePaidVal(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-slate-700 cursor-pointer"
                >
                  {t.crmCancelBtn}
                </button>
                <button
                  type="submit"
                  id="save-status-update-btn"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  {t.crmSaveStatusBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Create New Client Application */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white">
              <h3 className="text-base font-bold">{t.crmNewModalTitle}</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewApp} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmServiceCategoryLabel}
                  </label>
                  <select
                    value={newCat}
                    onChange={(e) => {
                      const c = e.target.value as ServiceCategory;
                      setNewCat(c);
                      const s = SERVICES_CATALOG.find((item) => item.id === c);
                      if (s) {
                        setNewSub(s.subServices[0]);
                        setNewFee(s.startingFee);
                        setNewFeePaid(s.startingFee);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                  >
                    {SERVICES_CATALOG.map((s) => (
                      <option key={s.id} value={s.id}>
                        {getServiceTitle(s.id, s.title)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmSubServiceLabel}
                  </label>
                  <select
                    value={newSub}
                    onChange={(e) => setNewSub(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
                  >
                    {SERVICES_CATALOG.find((s) => s.id === newCat)?.subServices.map((sub, i) => (
                      <option key={i} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmApplicantNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ta' ? 'எ.கா. ரமேஷ் குமார்' : 'e.g. Ramesh K'}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmMobileLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9840123456"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.crmEmailLabel}
                </label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmTotalFeeLabel}
                  </label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmAmountPaidLabel}
                  </label>
                  <input
                    type="number"
                    value={newFeePaid}
                    onChange={(e) => setNewFeePaid(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.crmGovtAckLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="ARN / Token"
                    value={newGovtAck}
                    onChange={(e) => setNewGovtAck(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.crmNotesLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'ta' ? 'ஆவணங்கள் பற்றிய குறிப்புகள்...' : 'Notes on documents, special requirements...'}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-slate-700 cursor-pointer"
                >
                  {t.crmCancelBtn}
                </button>
                <button
                  type="submit"
                  id="create-client-submit-btn"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  {t.crmCreateSubmitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: WhatsApp Notification Message Generator */}
      {whatsAppModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 bg-emerald-700 text-white">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <h3 className="text-base font-bold">{t.crmWhatsAppModalTitle}</h3>
              </div>
              <button
                onClick={() => setWhatsAppModalApp(null)}
                className="p-1 text-emerald-100 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600">
                {language === 'ta' ? (
                  <>
                    <strong className="text-slate-900">{whatsAppModalApp.clientName}</strong> (+91 {whatsAppModalApp.phone}) அவர்களுக்கு அனுப்ப தயாராக உள்ள வாட்ஸ்அப் செய்தி:
                  </>
                ) : (
                  <>
                    Pre-formatted WhatsApp message ready to transmit to{' '}
                    <strong className="text-slate-900">{whatsAppModalApp.clientName}</strong> (+91 {whatsAppModalApp.phone}):
                  </>
                )}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-[11px] whitespace-pre-wrap text-slate-800 max-h-56 overflow-y-auto">
                {getWhatsAppMessage(whatsAppModalApp)}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => copyWhatsAppText(getWhatsAppMessage(whatsAppModalApp))}
                  id="copy-whatsapp-text-btn"
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedText ? t.crmWhatsAppCopied : t.crmWhatsAppCopyBtn}</span>
                </button>
                <a
                  href={`https://wa.me/91${whatsAppModalApp.phone}?text=${encodeURIComponent(
                    getWhatsAppMessage(whatsAppModalApp)
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  id="open-whatsapp-web-btn"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>{t.crmOpenWhatsAppWeb}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
