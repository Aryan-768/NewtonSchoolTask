export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  created_at: string;
}

export interface Registration {
  id: string;
  event_id: string;
  name: string;
  email: string;
  registration_id: string;
  qr_code: string;
  created_at: string;
  event?: Event;
}

export interface Attendance {
  id: string;
  registration_id: string;
  attended_at: string;
  created_at: string;
  registration?: Registration;
}

export interface AttendanceRecord {
  name: string;
  email: string;
  registration_id: string;
  status: 'Present' | 'Absent';
  timestamp?: string;
  event_name?: string;
}