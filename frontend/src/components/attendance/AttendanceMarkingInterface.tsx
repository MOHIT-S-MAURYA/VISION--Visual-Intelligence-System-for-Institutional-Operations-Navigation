import { useState, useEffect } from 'react';
import { Users, Camera, CheckCircle, XCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardHeader } from '@/components/shared/Card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/shared/Select';
import { AICameraInterface } from './AICameraInterface';
import { AIRecognitionResults } from './AIRecognitionResults';
import type { RecognitionResult } from './AIRecognitionResults';
import { AIProcessingStatus } from './AIProcessingStatus';
import type { ProcessingStage } from './AIProcessingStatus';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface StudentAttendance {
  studentId: string;
  name: string;
  rollNumber: string;
  status: AttendanceStatus;
  timestamp?: string;
  markedBy?: 'teacher' | 'ai';
  confidence?: number;
}

export interface Session {
  sessionId: string;
  subjectName: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  students: {
    studentId: string;
    name: string;
    rollNumber: string;
  }[];
}

interface AttendanceMarkingInterfaceProps {
  session: Session;
  onSave: (attendance: StudentAttendance[]) => Promise<void>;
  onCancel: () => void;
}

interface ProcessingStatus {
  stage: ProcessingStage;
  progress: number;
  message: string;
  details?: string;
}

export function AttendanceMarkingInterface({
  session,
  onSave,
  onCancel
}: AttendanceMarkingInterfaceProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<StudentAttendance[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [recognitionResults, setRecognitionResults] = useState<RecognitionResult[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<AttendanceStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize attendance records
  useEffect(() => {
    const initialRecords: StudentAttendance[] = session.students.map(student => ({
      studentId: student.studentId,
      name: student.name,
      rollNumber: student.rollNumber,
      status: 'absent' // Default to absent
    }));
    setAttendanceRecords(initialRecords);
  }, [session.students]);

  const handlePhotoCapture = async (imageFile: File) => {
    // Convert File to data URL for preview
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageDataUrl = e.target?.result as string;
      setCapturedImage(imageDataUrl);
    };
    reader.readAsDataURL(imageFile);

    setShowCamera(false);
    setProcessing(true);

    try {
      // Simulate upload progress
      setProcessingStatus({
        stage: 'uploading',
        progress: 0,
        message: 'Uploading classroom photo',
        details: 'Please wait while we upload the image...'
      });

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProcessingStatus({
          stage: 'uploading',
          progress: i,
          message: 'Uploading classroom photo',
          details: `${i}% complete`
        });
      }

      // Start AI recognition
      setProcessingStatus({
        stage: 'analyzing',
        progress: 30,
        message: 'Analyzing faces',
        details: 'AI is processing the image to detect and recognize students...'
      });

      // TODO: Replace with actual API call
      // const results = await recognizeAttendance(session.sessionId, imageFile);
      
      // Simulate AI processing with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock recognition results
      const mockResults: RecognitionResult[] = session.students
        .slice(0, Math.floor(Math.random() * session.students.length) + 1)
        .map(student => ({
          student_id: student.studentId,
          student_name: student.name,
          student: {
            name: student.name,
            rollNumber: student.rollNumber
          },
          confidence: 0.6 + Math.random() * 0.35, // Random confidence between 60-95%
          bbox: [
            Math.random() * 800,
            Math.random() * 600,
            100 + Math.random() * 50,
            100 + Math.random() * 50
          ] as [number, number, number, number]
        }));

      setRecognitionResults(mockResults);

      setProcessingStatus({
        stage: 'complete',
        progress: 100,
        message: 'Recognition complete',
        details: `Recognized ${mockResults.length} students`
      });

      // Auto-mark recognized students as present
      const updatedRecords = attendanceRecords.map(record => {
        const recognized = mockResults.find(r => r.student_id === record.studentId);
        if (recognized) {
          return {
            ...record,
            status: 'present' as AttendanceStatus,
            markedBy: 'ai' as const,
            confidence: recognized.confidence,
            timestamp: new Date().toISOString()
          };
        }
        return record;
      });
      setAttendanceRecords(updatedRecords);

      setTimeout(() => {
        setProcessing(false);
        setShowResults(true);
      }, 1500);

    } catch (error) {
      console.error('Recognition failed:', error);
      setProcessingStatus({
        stage: 'error',
        progress: 0,
        message: 'Recognition failed',
        details: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      });
      setTimeout(() => {
        setProcessing(false);
      }, 3000);
    }
  };

  const handleRecognitionConfirm = (selectedIds: string[]) => {
    // Update attendance based on confirmed recognition
    const updatedRecords = attendanceRecords.map(record => {
      if (selectedIds.includes(record.studentId)) {
        return {
          ...record,
          status: 'present' as AttendanceStatus,
          markedBy: 'ai' as const,
          timestamp: new Date().toISOString()
        };
      }
      return record;
    });
    setAttendanceRecords(updatedRecords);
    setShowResults(false);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords(records =>
      records.map(record =>
        record.studentId === studentId
          ? {
              ...record,
              status,
              markedBy: 'teacher',
              timestamp: new Date().toISOString()
            }
          : record
      )
    );
  };

  const handleBulkAction = (status: AttendanceStatus) => {
    const updatedRecords = attendanceRecords.map(record => ({
      ...record,
      status,
      markedBy: 'teacher' as const,
      timestamp: new Date().toISOString()
    }));
    setAttendanceRecords(updatedRecords);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(attendanceRecords);
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'excused':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'absent':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'late':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'excused':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  const filteredRecords = filterStatus === 'all'
    ? attendanceRecords
    : attendanceRecords.filter(record => record.status === filterStatus);

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    excused: attendanceRecords.filter(r => r.status === 'excused').length,
    total: attendanceRecords.length
  };

  const attendancePercentage = stats.total > 0
    ? Math.round(((stats.present + stats.late) / stats.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Session Info Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{session.subjectName}</h2>
              <p className="text-muted-foreground">
                {session.className} • {new Date(session.date).toLocaleDateString()} • {session.startTime} - {session.endTime}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{attendancePercentage}%</div>
              <div className="text-sm text-muted-foreground">Attendance Rate</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-500">{stats.present}</div>
                <div className="text-xs text-muted-foreground">Present</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-500">{stats.absent}</div>
                <div className="text-xs text-muted-foreground">Absent</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-500">{stats.late}</div>
                <div className="text-xs text-muted-foreground">Late</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-500">{stats.excused}</div>
                <div className="text-xs text-muted-foreground">Excused</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recognition Section */}
      {!showCamera && !processing && !showResults && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Attendance</h3>
                  <p className="text-sm text-muted-foreground">
                    Capture a classroom photo for automatic attendance marking
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowCamera(true)} className="gap-2">
                <Camera className="w-4 h-4" />
                Start Camera
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera Interface Modal */}
      {showCamera && (
        <AICameraInterface
          onCapture={handlePhotoCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Processing Status */}
      {processing && processingStatus && (
        <AIProcessingStatus
          status={processingStatus}
          totalStudents={session.students.length}
          recognizedCount={recognitionResults.length}
        />
      )}

      {/* Recognition Results */}
      {showResults && capturedImage && (
        <AIRecognitionResults
          results={recognitionResults}
          classroomImage={capturedImage}
          onConfirm={handleRecognitionConfirm}
          onReject={() => {
            setShowResults(false);
            setCapturedImage(null);
          }}
        />
      )}

      {/* Manual Attendance Marking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Student Roster</h3>
              <span className="text-sm text-muted-foreground">
                ({filteredRecords.length} {filterStatus !== 'all' ? filterStatus : 'students'})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as AttendanceStatus | 'all')}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="excused">Excused</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              >
                <Eye className="w-4 h-4 mr-2" />
                {viewMode === 'list' ? 'Grid' : 'List'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
            <span className="text-sm font-semibold">Bulk Actions:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('present')}
              className="gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              Mark All Present
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('absent')}
              className="gap-1"
            >
              <XCircle className="w-3 h-3" />
              Mark All Absent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('late')}
              className="gap-1"
            >
              <Clock className="w-3 h-3" />
              Mark All Late
            </Button>
          </div>

          {/* Student List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
            {filteredRecords.map((record) => (
              <div
                key={record.studentId}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                  getStatusColor(record.status)
                }`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <div className="font-semibold">{record.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Roll: {record.rollNumber}
                      {record.markedBy === 'ai' && record.confidence && (
                        <span className="ml-2 text-primary">
                          • AI: {Math.round(record.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Select
                  value={record.status}
                  onValueChange={(value) => handleStatusChange(record.studentId, value as AttendanceStatus)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="excused">Excused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Save Attendance
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default AttendanceMarkingInterface;
