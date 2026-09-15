import { ClientApplication, ServiceDetail } from '../types';

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: 'passport',
    title: 'Passport Apply & Services',
    shortDesc: 'Fresh passport applications, Tatkaal express processing, reissue/renewal, and PSK appointment scheduling.',
    fullDesc: 'Complete end-to-end assistance for Ministry of External Affairs Passport Seva. We handle online form submission, fee payment, annexures, document scrutinization, and fast-track PSK / POPSK appointment booking.',
    iconName: 'Passport',
    badge: 'Popular Service',
    turnaroundTime: '7 - 15 Working Days',
    govtPortal: 'Passport Seva Kendra (MEA)',
    startingFee: 1500,
    subServices: [
      'Fresh Passport Application (Normal)',
      'Tatkaal Passport Fast-Track',
      'Passport Renewal / Re-issue',
      'Police Clearance Certificate (PCC)',
      'Minor Passport Application',
      'Name / Address Change in Passport'
    ],
    requiredDocs: [
      'Aadhaar Card (Linked with Mobile)',
      '10th Marksheet / Birth Certificate',
      'Bank Passbook with Photo / Utility Bill',
      'Old Passport Copy (For Renewal)',
      '2 Passport Size Photographs'
    ],
    features: [
      'Guaranteed PSK Slot Booking',
      'Zero Error Form Filing',
      'Pre-Verification of Documents',
      'Police Verification Guidance'
    ]
  },
  {
    id: 'voter_id',
    title: 'Voter ID Card Services',
    shortDesc: 'New voter card (Form 6), constituency shift (Form 8), corrections, Aadhaar-Voter linking, and e-EPIC download.',
    fullDesc: 'Authorized National Voters Service Portal (NVSP / ECI) assistance. Whether you just turned 18, moved to a new constituency, or need corrections in your name or date of birth, we process it smoothly with instant reference tracking.',
    iconName: 'Vote',
    badge: 'Govt Citizen Right',
    turnaroundTime: '15 - 30 Working Days',
    govtPortal: 'Election Commission of India (ECI / NVSP)',
    startingFee: 150,
    subServices: [
      'New Voter Registration (Form 6)',
      'Correction in Existing Voter ID (Form 8)',
      'Shifting to New Constituency (Form 8)',
      'Digital e-EPIC Download & PVC Print',
      'Aadhaar - Voter ID Linking (Form 6B)',
      'Duplicate Voter Card Application'
    ],
    requiredDocs: [
      'Aadhaar Card or Age Proof',
      'Current Address Proof (Electricity bill/Rent agreement)',
      'Passport Size Photograph',
      'Family Member EPIC No (optional for reference)'
    ],
    features: [
      'Instant Reference / Tracking Number',
      'Doorstep PVC Card Delivery Support',
      'BLO Verification Assistance',
      'Instant Digital e-EPIC Download'
    ]
  },
  {
    id: 'pan_card',
    title: 'PAN Card Services',
    shortDesc: 'Instant e-PAN card, new physical PVC PAN, name/DOB corrections, minor-to-major PAN, and PAN-Aadhaar linking.',
    fullDesc: 'NSDL & UTIITSL authorized digital PAN processing. Get your 10-digit Permanent Account Number processed within 48 hours for digital e-PAN and direct courier delivery of premium physical PVC PAN card at your doorstep.',
    iconName: 'CreditCard',
    badge: '48 Hr Express e-PAN',
    turnaroundTime: '2 - 7 Working Days',
    govtPortal: 'NSDL / UTIITSL - Income Tax Dept',
    startingFee: 250,
    subServices: [
      'New PAN Card Application (Form 49A)',
      'PAN Correction / Update in Name or DOB',
      'Reprint of Lost / Damaged PAN Card',
      'Minor to Major PAN Update',
      'Mandatory PAN - Aadhaar Linking',
      'Instant e-PAN via Aadhaar OTP'
    ],
    requiredDocs: [
      'Aadhaar Card (Name, DOB & Mobile must match)',
      '2 Passport Size Color Photos',
      'Signature on White Paper',
      'Old PAN Copy (for correction/reprint)'
    ],
    features: [
      'Instant e-PAN delivered on WhatsApp & Email',
      'Original Hologram PVC Card via Speed Post',
      'Aadhaar OTP or Biometric Physical filing',
      'Urgent Same-Day Processing Available'
    ]
  },
  {
    id: 'smart_card',
    title: 'Smart Card & Ration Card',
    shortDesc: 'New family smart card apply, add/remove member, head of family change, address transfer, and e-card download.',
    fullDesc: 'Civil Supplies & Consumer Protection Department online services. Complete assistance for new digital Smart Ration Cards, family member name addition (child or spouse), surrender certificates, and monthly entitlement verification.',
    iconName: 'IdCard',
    badge: 'Family Essential',
    turnaroundTime: '15 - 25 Working Days',
    govtPortal: 'Civil Supplies & Public Distribution (NFSA / PDS)',
    startingFee: 200,
    subServices: [
      'New Smart Ration Card Application',
      'Add New Member (Spouse / Newborn Child)',
      'Remove / Surrender Family Member Name',
      'Change of Family Head (Mother / Father)',
      'Address & Taluk Transfer',
      'Digital e-Ration Card Download & Lamination'
    ],
    requiredDocs: [
      'Aadhaar Cards of All Family Members',
      'Birth Certificate (For Newborn addition)',
      'Marriage Certificate (For Wife name addition)',
      'Gas Connection Consumer Number & Passbook',
      'House Tax Receipt / EB Bill / Rental Agreement'
    ],
    features: [
      'Field Inspection / RI Verification Follow-up',
      'Official Digital Seal e-Ration Card',
      'SMS Status Alerts on Registered Mobile',
      'PDS Shop Transfer Assistance'
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance Services',
    shortDesc: 'Two-wheeler & car insurance, comprehensive health coverage, commercial vehicle insurance, and life insurance.',
    fullDesc: 'Partnered with leading IRDAI-approved insurance providers (Star Health, HDFC ERGO, ICICI Lombard, New India, LIC). Instant digital policy issuance with maximum discounts, zero paper hassles, and dedicated cashless claim support.',
    iconName: 'ShieldCheck',
    badge: 'Instant Digital Policy',
    turnaroundTime: 'Instant (15 Minutes)',
    govtPortal: 'IRDAI Approved Providers',
    startingFee: 650,
    subServices: [
      'Bike / Two-Wheeler Insurance (1st & 3rd Party)',
      'Car / Four-Wheeler Comprehensive Insurance',
      'Commercial Vehicle & Goods Carrier Policy',
      'Family Floater Health Insurance (Mediclaim)',
      'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      'Term Life Insurance & Endowment Plans'
    ],
    requiredDocs: [
      'Vehicle RC (Registration Certificate)',
      'Previous Year Insurance Policy Copy',
      'Owner Aadhaar Card & PAN Card',
      'PUC (Pollution Certificate) copy'
    ],
    features: [
      'Instant PDF Policy on WhatsApp & Email',
      'Up to 75% NCB (No Claim Bonus) Discount Transfer',
      '24/7 Roadside Assistance Add-on',
      'Dedicated Cashless Hospital & Garage Claim Help'
    ]
  },
  {
    id: 'tax_filing',
    title: 'Tax Filing & GST Services',
    shortDesc: 'Individual ITR-1/ITR-4 income tax filing, refund processing, GST registration, monthly return filing, and MSME Udyam.',
    fullDesc: 'Certified tax practitioners for salaried individuals, traders, freelancers, and small business owners. Maximize legal tax exemptions (80C, 80D, HRA), get your income tax refunds credited swiftly, and maintain complete GST compliance.',
    iconName: 'FileSpreadsheet',
    badge: 'Certified Experts',
    turnaroundTime: '2 - 4 Working Days',
    govtPortal: 'Income Tax e-Filing & GST Portal',
    startingFee: 799,
    subServices: [
      'ITR-1 Salaried Individual Tax Return',
      'ITR-3 & ITR-4 Business & Presumptive Tax',
      'GST New Registration & Verification',
      'Monthly GST Return Filing (GSTR-1 & 3B)',
      'MSME / Udyam Certificate Registration',
      'TDS Return Filing & Form 16 Preparation'
    ],
    requiredDocs: [
      'PAN Card & Aadhaar Card',
      'Form 16 / Salary Slips (From Employer)',
      'Bank Account Statement (1 Year)',
      'Interest Certificates / Capital Gain statements',
      'LIC / Medical / Donation investment receipts'
    ],
    features: [
      'Authorized CA / Practitioner Verified Filing',
      'Maximum Tax Deduction & Fast Refund Claim',
      'ITR-V Acknowledgment Download',
      'Notice Handling & Rectification Support'
    ]
  }
];

export const INITIAL_APPLICATIONS: ClientApplication[] = [
  {
    id: 'app-001',
    refNumber: 'SC-2024-1042',
    clientName: 'Rajesh Kumar Sundaram',
    phone: '9840123456',
    email: 'rajesh.kumar92@gmail.com',
    serviceCategory: 'passport',
    serviceName: 'Passport Apply & Services',
    subService: 'Fresh Passport Application (Normal)',
    dateCreated: '2024-10-12',
    lastUpdated: '2024-10-18',
    status: 'appointment_scheduled',
    paymentStatus: 'paid',
    feeAmount: 1800,
    feePaid: 1800,
    govtAckNumber: 'ARN-24-90038102',
    appointmentDate: '2024-10-24',
    appointmentTime: '10:30 AM',
    appointmentLocation: 'Passport Seva Kendra (PSK) - Regional Hub',
    address: 'No 45, Kumaran Road, Near Railway Station',
    city: 'Tirupur',
    pincode: '641601',
    notes: 'Applicant needs fresh 36 pages passport. Documents verified. Slot confirmed for Oct 24.',
    documents: [
      { id: 'd1', name: 'Aadhaar Card', status: 'verified', required: true },
      { id: 'd2', name: '10th Marksheet (ECNR proof)', status: 'verified', required: true },
      { id: 'd3', name: 'Bank Passbook with Photo', status: 'verified', required: true },
      { id: 'd4', name: 'Passport Photos (2 Nos)', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: '2024-10-12',
        time: '11:15 AM',
        status: 'submitted',
        title: 'Application Received & Initiated',
        note: 'Customer approached center for Fresh 36-page normal passport.',
        updatedBy: 'S. Murugan (Operator)'
      },
      {
        id: 'tl-2',
        date: '2024-10-13',
        time: '03:40 PM',
        status: 'verification',
        title: 'Documents Scrutinized & Cleared',
        note: 'Aadhaar name and 10th marksheet DOB verified without discrepancies.',
        updatedBy: 'R. Anitha (Verification Officer)'
      },
      {
        id: 'tl-3',
        date: '2024-10-15',
        time: '05:00 PM',
        status: 'govt_processing',
        title: 'Form Submitted on MEA Passport Portal',
        note: 'Govt fees paid online. Generated ARN: ARN-24-90038102.',
        updatedBy: 'S. Murugan (Operator)'
      },
      {
        id: 'tl-4',
        date: '2024-10-18',
        time: '12:30 PM',
        status: 'appointment_scheduled',
        title: 'PSK Slot Confirmed for Oct 24 at 10:30 AM',
        note: 'Slot confirmed at PSK Central Hub. Appointment receipt generated & shared via WhatsApp.',
        updatedBy: 'S. Murugan (Operator)'
      }
    ]
  },
  {
    id: 'app-002',
    refNumber: 'SC-2024-1188',
    clientName: 'Priya Dharshini M',
    phone: '9790456789',
    email: 'priya.dharshini.m@yahoo.com',
    serviceCategory: 'pan_card',
    serviceName: 'PAN Card Services',
    subService: 'New PAN Card Application (Form 49A)',
    dateCreated: '2024-10-16',
    lastUpdated: '2024-10-21',
    status: 'delivered',
    paymentStatus: 'paid',
    feeAmount: 300,
    feePaid: 300,
    govtAckNumber: 'NSDL-881293019',
    dispatchTrackingNumber: 'EM904128472IN',
    courierPartner: 'India Speed Post',
    expectedDeliveryDate: '2024-10-22',
    address: 'Flat 3B, Sri Sai Apartments, 2nd Cross Street',
    city: 'Coimbatore',
    pincode: '641002',
    notes: 'Physical PAN card dispatched via Speed Post. e-PAN delivered on registered email.',
    documents: [
      { id: 'd1', name: 'Aadhaar Card copy', status: 'verified', required: true },
      { id: 'd2', name: 'Passport size photographs', status: 'verified', required: true },
      { id: 'd3', name: 'Signed Declaration Form 49A', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: '2024-10-16',
        time: '10:00 AM',
        status: 'submitted',
        title: 'New PAN Application Initiated',
        note: 'Applicant requested new physical PAN card with instant e-PAN.',
        updatedBy: 'S. Murugan (Operator)'
      },
      {
        id: 'tl-2',
        date: '2024-10-17',
        time: '02:15 PM',
        status: 'govt_processing',
        title: 'Uploaded to NSDL Server',
        note: 'Biometric e-Sign completed. Acknowledgment number NSDL-881293019.',
        updatedBy: 'S. Murugan (Operator)'
      },
      {
        id: 'tl-3',
        date: '2024-10-19',
        time: '06:00 PM',
        status: 'approved',
        title: 'PAN Allotted & e-PAN Generated',
        note: 'Permanent Account Number allotted: BCDPM8472F. Digital copy sent.',
        updatedBy: 'System Automation'
      },
      {
        id: 'tl-4',
        date: '2024-10-21',
        time: '11:45 AM',
        status: 'delivered',
        title: 'Physical Card Dispatched via Speed Post',
        note: 'Tracking No EM904128472IN. Delivered to applicant address.',
        updatedBy: 'S. Murugan (Operator)'
      }
    ]
  },
  {
    id: 'app-003',
    refNumber: 'SC-2024-1205',
    clientName: 'Venkatesh Ramanathan',
    phone: '9443219876',
    email: 'venkat.raman@rediffmail.com',
    serviceCategory: 'smart_card',
    serviceName: 'Smart Card & Ration Card',
    subService: 'Add New Member (Spouse / Newborn Child)',
    dateCreated: '2024-10-19',
    lastUpdated: '2024-10-23',
    status: 'govt_processing',
    paymentStatus: 'paid',
    feeAmount: 250,
    feePaid: 250,
    govtAckNumber: 'TNPDS-2024-09841',
    address: '12/4 North Car Street',
    city: 'Madurai',
    pincode: '625001',
    notes: 'Adding wife name in existing Smart Card. Marriage certificate & wife Aadhaar submitted.',
    documents: [
      { id: 'd1', name: 'Existing Smart Card copy', status: 'verified', required: true },
      { id: 'd2', name: 'Wife Aadhaar Card', status: 'verified', required: true },
      { id: 'd3', name: 'Marriage Registration Certificate', status: 'verified', required: true },
      { id: 'd4', name: 'Name Deletion Certificate from Parent Card', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: '2024-10-19',
        time: '04:20 PM',
        status: 'submitted',
        title: 'Request Registered for Member Addition',
        note: 'Client provided parent surrender certificate and marriage proof.',
        updatedBy: 'K. Selvi (Front Desk)'
      },
      {
        id: 'tl-2',
        date: '2024-10-21',
        time: '01:10 PM',
        status: 'verification',
        title: 'Documents Scanned and Verified',
        note: 'All certificates validated with parent taluk records.',
        updatedBy: 'R. Anitha (Verification Officer)'
      },
      {
        id: 'tl-3',
        date: '2024-10-23',
        time: '11:00 AM',
        status: 'govt_processing',
        title: 'Submitted on TNPDS Civil Supplies Portal',
        note: 'Application under Revenue Inspector (RI) field verification stage.',
        updatedBy: 'S. Murugan (Operator)'
      }
    ]
  },
  {
    id: 'app-004',
    refNumber: 'SC-2024-1240',
    clientName: 'Anand Mohan',
    phone: '9884102938',
    email: 'anand.mohan.tech@gmail.com',
    serviceCategory: 'tax_filing',
    serviceName: 'Tax Filing & GST Services',
    subService: 'ITR-1 Salaried Individual Tax Return',
    dateCreated: '2024-10-22',
    lastUpdated: '2024-10-24',
    status: 'approved',
    paymentStatus: 'paid',
    feeAmount: 999,
    feePaid: 999,
    govtAckNumber: 'ITR-AY2425-49210491',
    address: 'Tower B, Silicon Enclave, OMR',
    city: 'Chennai',
    pincode: '600096',
    notes: 'ITR-1 filed for FY 2023-24 (AY 2024-25). TDS Refund claimed: ₹14,800. e-Verified via Aadhaar OTP.',
    documents: [
      { id: 'd1', name: 'Form 16 Part A & B', status: 'verified', required: true },
      { id: 'd2', name: 'Annual Information Statement (AIS/TIS)', status: 'verified', required: true },
      { id: 'd3', name: 'Bank Statement with Interest Certificate', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: '2024-10-22',
        time: '02:00 PM',
        status: 'submitted',
        title: 'Form 16 Received for ITR Filing',
        note: 'Customer uploaded Form 16 and bank interest details.',
        updatedBy: 'P. Balaji (Tax Consultant)'
      },
      {
        id: 'tl-2',
        date: '2024-10-23',
        time: '04:30 PM',
        status: 'verification',
        title: 'AIS & 26AS Tax Credit Reconciled',
        note: 'Checked TDS credits and claimed Section 80D & HRA deductions accurately.',
        updatedBy: 'P. Balaji (Tax Consultant)'
      },
      {
        id: 'tl-3',
        date: '2024-10-24',
        time: '06:15 PM',
        status: 'approved',
        title: 'ITR Filed & e-Verified Successfully',
        note: 'Ack No ITR-AY2425-49210491 generated. ITR-V slip shared with client.',
        updatedBy: 'P. Balaji (Tax Consultant)'
      }
    ]
  },
  {
    id: 'app-005',
    refNumber: 'SC-2024-1262',
    clientName: 'Suresh Babu K',
    phone: '9444012984',
    email: 'suresh.babu.k@gmail.com',
    serviceCategory: 'insurance',
    serviceName: 'Insurance Services',
    subService: 'Car / Four-Wheeler Comprehensive Insurance',
    dateCreated: '2024-10-23',
    lastUpdated: '2024-10-23',
    status: 'delivered',
    paymentStatus: 'paid',
    feeAmount: 8450,
    feePaid: 8450,
    govtAckNumber: 'POL-HDFC-992140',
    address: '22 Bazaar Road',
    city: 'Tiruchirappalli',
    pincode: '620001',
    notes: 'Swift Dzire 2021 model comprehensive renewal with 45% NCB transfer and Zero Depreciation add-on.',
    documents: [
      { id: 'd1', name: 'RC Book Copy', status: 'verified', required: true },
      { id: 'd2', name: 'Previous Year Policy Copy', status: 'verified', required: true },
      { id: 'd3', name: 'PUC Certificate', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: '2024-10-23',
        time: '11:00 AM',
        status: 'submitted',
        title: 'Vehicle Renewal Quote Requested',
        note: 'Compared quotes across HDFC ERGO, ICICI Lombard & Star.',
        updatedBy: 'K. Selvi (Front Desk)'
      },
      {
        id: 'tl-2',
        date: '2024-10-23',
        time: '11:45 AM',
        status: 'delivered',
        title: 'Instant Policy Issued & Transmitted',
        note: 'Policy POL-HDFC-992140 issued instantly and delivered via WhatsApp.',
        updatedBy: 'K. Selvi (Front Desk)'
      }
    ]
  },
  {
    id: 'app-006',
    refNumber: 'SC-2024-1275',
    clientName: 'Kavitha Ramachandran',
    phone: '9841289123',
    email: 'kavitha.ram98@outlook.com',
    serviceCategory: 'voter_id',
    serviceName: 'Voter ID Card Services',
    subService: 'New Voter Registration (Form 6)',
    dateCreated: '2024-10-24',
    lastUpdated: '2024-10-25',
    status: 'action_required',
    paymentStatus: 'partial',
    feeAmount: 200,
    feePaid: 100,
    govtAckNumber: 'NVSP-TN24-81920',
    address: 'Old No 14, New No 31, 1st Cross, Ram Nagar',
    city: 'Chennai',
    pincode: '600061',
    notes: 'Electricity bill uploaded was blurred. Applicant requested to provide clear EB bill or Rent Agreement.',
    documents: [
      { id: 'd1', name: 'Aadhaar Card (Age Proof)', status: 'verified', required: true },
      { id: 'd2', name: 'Address Proof (Electricity Bill)', status: 'rejected', required: true, notes: 'Blurred image, consumer number not visible' },
      { id: 'd3', name: 'Passport Size Photo', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: '2024-10-24',
        time: '01:30 PM',
        status: 'submitted',
        title: 'Form 6 Registration Initiated',
        note: 'New voter application for young citizen.',
        updatedBy: 'S. Murugan (Operator)'
      },
      {
        id: 'tl-2',
        date: '2024-10-25',
        time: '10:00 AM',
        status: 'action_required',
        title: 'Action Required: Re-upload Clear Address Proof',
        note: 'Address proof image was unreadable. SMS sent to client to share fresh copy.',
        updatedBy: 'R. Anitha (Verification Officer)'
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'K. Senthil Nathan',
    role: 'Garment Unit Supervisor',
    location: 'PN Road, Tirupur',
    comment: 'I do not have computer knowledge and I was worried about how to apply for my passport. I just went to Success Computech opposite AK Motors on PN Road. The brother took my photo, scanned my Aadhaar, and got my PSK appointment fixed in 15 minutes! Very friendly and honest service.',
    service: 'Passport Application Service',
    rating: 5
  },
  {
    name: 'Lakshmi Narayanan',
    role: 'Homemaker & Mother',
    location: 'Avinashi Road, Tirupur',
    comment: 'Needed to add my newborn child to our Smart Ration Card and apply for a new PAN card. I called 7373188844 and they guided me on what xerox copies to bring. Zero hassle, didn’t have to wait in government office lines.',
    service: 'Smart Card & PAN Card',
    rating: 5
  },
  {
    name: 'M. Thangavel',
    role: 'Powerloom Owner & Farmer',
    location: 'Tirupur District',
    comment: 'Every year Success Computech handles our vehicle insurance and income tax filing. I just WhatsApp my RC book photo to 7373188844, they calculate the best discount policy, and send me the policy PDF immediately.',
    service: 'Vehicle Insurance & Tax Filing',
    rating: 5
  }
];

export const FAQ_LIST = [
  {
    q: 'I do not have computer knowledge and I don’t know how to apply online. Can you help me?',
    a: 'YES! That is our main specialty. 100% of our customers come to us because they do not want to struggle with complicated government portals, OTPs, scanner setups, or online payment failures. You just bring your physical documents (or send clear photos on WhatsApp to 7373188844) to our shop. Our certified operators will type, fill, scan, pay fees, and track your application until your card is delivered.'
  },
  {
    q: 'Where is your shop located in Tirupur?',
    a: 'Our shop is located at: 15/17 Opp AK Motors, PN Road, Tirupur - 641602. We are located right on PN Road opposite AK Motors. You can walk in anytime between 9:00 AM to 8:30 PM (Monday to Saturday).'
  },
  {
    q: 'What is your contact number for calls and WhatsApp inquiries?',
    a: 'You can call or WhatsApp us directly at 7373188844 (+91 73731 88844). We answer citizen inquiries quickly and can tell you the exact documents required before you leave your house.'
  },
  {
    q: 'Can I just send my documents on WhatsApp instead of coming to the shop?',
    a: 'Yes! If you are busy at work or cannot visit immediately, you can take a clear phone photo of your documents (like Aadhaar card, photo, or old card) and send them to 7373188844 on WhatsApp. We will scrutinize the documents, initiate the application, and give you your official tracking reference number.'
  },
  {
    q: 'How can I check the status of my work?',
    a: 'You can check your status in two very simple ways: 1) Call or WhatsApp us at 7373188844 with your name or reference number. 2) Enter your 10-digit mobile number or receipt slip number on the "Live Tracking" tab of this website to see step-by-step progress.'
  },
  {
    q: 'How long has Success Computech been serving in Tirupur?',
    a: 'Success Computech has been serving citizens reliably since 2020. Over the past 4+ years, we have successfully helped thousands of citizens with zero error rejection across Passports, Voter IDs, PAN cards, Smart Ration Cards, Insurance, and Tax filings.'
  }
];
