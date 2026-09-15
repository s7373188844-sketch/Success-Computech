export type ServiceCategory =
  | 'passport'
  | 'voter_id'
  | 'pan_card'
  | 'smart_card'
  | 'insurance'
  | 'tax_filing'
  | 'other_services';

export type ApplicationStatus =
  | 'submitted'
  | 'verification'
  | 'govt_processing'
  | 'appointment_scheduled'
  | 'approved'
  | 'delivered'
  | 'action_required'
  | 'cancelled';

export type PaymentStatus = 'paid' | 'partial' | 'pending';

export interface DocumentItem {
  id: string;
  name: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  required: boolean;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  status: ApplicationStatus;
  title: string;
  note: string;
  updatedBy: string;
}

export interface ClientApplication {
  id: string;
  refNumber: string; // e.g. SC-2024-1042
  clientName: string;
  phone: string;
  email: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  subService: string;
  dateCreated: string;
  lastUpdated: string;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  feeAmount: number;
  feePaid: number;
  govtAckNumber?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentLocation?: string;
  dispatchTrackingNumber?: string;
  courierPartner?: string;
  expectedDeliveryDate?: string;
  address?: string;
  city?: string;
  pincode?: string;
  notes?: string;
  documents: DocumentItem[];
  timeline: TimelineEvent[];
}

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  turnaroundTime: string;
  govtPortal: string;
  startingFee: number;
  subServices: string[];
  requiredDocs: string[];
  features: string[];
}
