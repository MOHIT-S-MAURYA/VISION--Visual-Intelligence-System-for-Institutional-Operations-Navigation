import { api } from '@/utils/api';
import type { RecognitionResult } from '@/components/attendance/AIRecognitionResults';
import type { StudentAttendance } from '@/components/attendance/AttendanceMarkingInterface';

/**
 * Upload classroom photo and get AI facial recognition results
 * @param sessionId - The session ID for which attendance is being marked
 * @param imageFile - The captured classroom photo file
 * @returns Promise with recognition results
 */
export async function recognizeAttendance(
  sessionId: string,
  imageFile: File
): Promise<RecognitionResult[]> {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('session_id', sessionId);

  const response = await api.post<{ results: RecognitionResult[] }>(
    '/fastapi/attendance/recognize/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  if (!response.data) {
    throw new Error('No data received from recognition API');
  }

  return response.data.results;
}

/**
 * Mark attendance for students in a session
 * @param sessionId - The session ID for which attendance is being marked
 * @param records - Array of student attendance records
 * @returns Promise with success confirmation
 */
export async function markAttendance(
  sessionId: string,
  records: StudentAttendance[]
): Promise<{ success: boolean; message: string }> {
  const response = await api.post<{ success: boolean; message: string }>(
    '/api/attendance/mark/',
    {
      session_id: sessionId,
      attendance_records: records.map(record => ({
        student_id: record.studentId,
        status: record.status,
        marked_by: record.markedBy || 'teacher',
        confidence: record.confidence,
        timestamp: record.timestamp || new Date().toISOString(),
      })),
    }
  );

  if (!response.data) {
    throw new Error('No data received from mark attendance API');
  }

  return response.data;
}

/**
 * Get session details including student roster
 * @param sessionId - The session ID to fetch details for
 * @returns Promise with session details
 */
export async function getSessionDetails(sessionId: string): Promise<{
  sessionId: string;
  subjectName: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  students: Array<{
    studentId: string;
    name: string;
    rollNumber: string;
  }>;
}> {
  const response = await api.get<{
    sessionId: string;
    subjectName: string;
    className: string;
    date: string;
    startTime: string;
    endTime: string;
    students: Array<{
      studentId: string;
      name: string;
      rollNumber: string;
    }>;
  }>(`/api/sessions/${sessionId}`);

  if (!response.data) {
    throw new Error('No data received from session details API');
  }

  return response.data;
}

/**
 * Get attendance history for a session
 * @param sessionId - The session ID to fetch attendance for
 * @returns Promise with attendance records
 */
export async function getAttendanceHistory(
  sessionId: string
): Promise<StudentAttendance[]> {
  const response = await api.get<{ records: StudentAttendance[] }>(
    `/api/attendance/session/${sessionId}`
  );

  if (!response.data) {
    throw new Error('No data received from attendance history API');
  }

  return response.data.records;
}

/**
 * Update individual student attendance status
 * @param sessionId - The session ID
 * @param studentId - The student ID
 * @param status - The attendance status to set
 * @returns Promise with success confirmation
 */
export async function updateAttendanceStatus(
  sessionId: string,
  studentId: string,
  status: StudentAttendance['status']
): Promise<{ success: boolean; message: string }> {
  const response = await api.patch<{ success: boolean; message: string }>(
    `/api/attendance/session/${sessionId}/student/${studentId}`,
    {
      status,
      timestamp: new Date().toISOString(),
    }
  );

  if (!response.data) {
    throw new Error('No data received from update attendance status API');
  }

  return response.data;
}

/**
 * Export attendance report for a session
 * @param sessionId - The session ID
 * @param format - Export format (csv, pdf, or excel)
 * @returns Promise with download URL or blob
 */
export async function exportAttendanceReport(
  sessionId: string,
  format: 'csv' | 'pdf' | 'excel' = 'csv'
): Promise<Blob> {
  const response = await fetch(`/api/attendance/session/${sessionId}/export?format=${format}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to export attendance report');
  }

  return response.blob();
}
