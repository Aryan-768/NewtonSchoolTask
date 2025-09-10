import * as XLSX from 'xlsx';
import { AttendanceRecord } from '../types';

export const exportToExcel = (data: AttendanceRecord[], filename: string = 'attendance-report') => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data.map(record => ({
    'Name': record.name,
    'Email': record.email,
    'Registration ID': record.registration_id,
    'Status': record.status,
    'Timestamp': record.timestamp || 'Not Attended',
    'Event': record.event_name || 'N/A'
  })));
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
  
  // Write the file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};