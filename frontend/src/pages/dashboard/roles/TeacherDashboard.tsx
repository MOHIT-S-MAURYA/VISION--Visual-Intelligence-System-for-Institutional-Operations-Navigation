import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  UserCheck,
  AlertTriangle,
  FileText,
  BarChart3,
  RefreshCw,
  Camera,
  TrendingUp,
  Clock,
  Play,
  Bell
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import MainLayout from '@/layouts/MainLayout';
import toast from 'react-hot-toast';

// Type definitions
interface ClassSession {
  id: string;
  subject: string;
  class_name: string;
  time_start: string;
  time_end: string;
  room: string;
  student_count: number;
  status: 'upcoming' | 'active' | 'completed';
}

interface AIResult {
  id: string;
  session_id: string;
  session_name: string;
  timestamp: string;
  students_recognized: number;
  total_students: number;
  confidence_average: number;
  status: 'completed';
}

interface PendingLeave {
  id: string;
  student_name: string;
  student_id: string;
  dates: string[];
  reason: string;
  status: 'pending';
  submitted_date: string;
}

interface TeacherData {
  teacher_id: string;
  name: string;
  today_sessions: ClassSession[];
  attendance_stats: {
    today_average: number;
    classes_this_week: number;
    students_present_today: number;
    total_students_today: number;
  };
  ai_results: AIResult[];
  pending_leaves: PendingLeave[];
}


// Mock data
const mockTeacherData: TeacherData = {
  teacher_id: 'teacher-123',
  name: 'Dr. Evelyn Reed',
  today_sessions: [
    { id: 'session-1', subject: 'Computer Science', class_name: 'CS-2023-A', time_start: '09:00', time_end: '10:00', room: 'Room 204', student_count: 45, status: 'completed' },
    { id: 'session-2', subject: 'Data Structures', class_name: 'CS-2023-B', time_start: '11:00', time_end: '12:00', room: 'Lab 3', student_count: 38, status: 'active' },
    { id: 'session-3', subject: 'Algorithms', class_name: 'CS-2022-A', time_start: '14:00', time_end: '15:00', room: 'Room 101', student_count: 42, status: 'upcoming' }
  ],
  attendance_stats: { today_average: 87.5, classes_this_week: 12, students_present_today: 92, total_students_today: 105 },
  ai_results: [
    { id: 'ai-1', session_id: 'session-1', session_name: 'CS-2023-A', timestamp: '2025-09-29T09:15:00Z', students_recognized: 42, total_students: 45, confidence_average: 0.89, status: 'completed' },
    { id: 'ai-2', session_id: 'session-previous', session_name: 'CS-2023-B', timestamp: '2025-09-28T11:20:00Z', students_recognized: 35, total_students: 38, confidence_average: 0.92, status: 'completed' }
  ],
  pending_leaves: [
    { id: 'leave-1', student_name: 'John Doe', student_id: 'student-123', dates: ['2025-10-01', '2025-10-02'], reason: 'Medical appointment', status: 'pending', submitted_date: '2025-09-28' },
    { id: 'leave-2', student_name: 'Jane Smith', student_id: 'student-124', dates: ['2025-10-03'], reason: 'Family emergency', status: 'pending', submitted_date: '2025-09-29' }
  ]
};

const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: string | number, icon: React.ElementType, description: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export function TeacherDashboard() {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTeacherData(mockTeacherData);
      if (isRefresh) toast.success('Dashboard data refreshed!');
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleStartAttendance = (sessionId: string) => {
    toast.success(`Starting attendance for session ${sessionId}...`);
  };

  const handleApproveLeave = (leaveId: string) => {
    toast.success(`Leave request ${leaveId} approved`);
  };

  const handleRejectLeave = (leaveId: string) => {
    toast.error(`Leave request ${leaveId} rejected`);
  };

  const getSessionStatusBadge = (status: ClassSession['status']) => {
    const styles = {
      completed: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
      active: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 animate-pulse",
      upcoming: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    };
    return <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const formatTime = (time: string) => new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!teacherData) return null;

  const { today_sessions, attendance_stats, ai_results, pending_leaves } = teacherData;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {teacherData.name}. Manage your classes and track attendance.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => loadDashboardData(true)} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button asChild>
              <Link to="/attendance/sessions/new">
                <Camera className="w-4 h-4 mr-2" />
                Quick Attendance
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Today's Avg. Attendance" value={`${attendance_stats.today_average.toFixed(1)}%`} description="Across all classes" icon={TrendingUp} />
          <StatCard title="Classes This Week" value={attendance_stats.classes_this_week} description="Total sessions scheduled" icon={BookOpen} />
          <StatCard title="Students Present Today" value={`${attendance_stats.students_present_today} / ${attendance_stats.total_students_today}`} description="In active sessions" icon={UserCheck} />
          <StatCard title="Pending Leave Requests" value={pending_leaves.length} description="Need your approval" icon={AlertTriangle} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" />Today's Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {today_sessions.length > 0 ? (
                <div className="space-y-3">
                  {today_sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-background-alt rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold">{session.subject}</h4>
                          {getSessionStatusBadge(session.status)}
                        </div>
                        <p className="text-muted-foreground text-sm">{session.class_name} • {session.room}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{formatTime(session.time_start)} - {formatTime(session.time_end)}</span>
                          <span className="flex items-center gap-1.5"><Users className="w-3 h-3" />{session.student_count} students</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {session.status === 'upcoming' && <Button size="sm" onClick={() => handleStartAttendance(session.id)}><Play className="w-3 h-3 mr-1.5" />Start</Button>}
                        {session.status === 'active' && <Button size="sm" variant="outline" onClick={() => handleStartAttendance(session.id)}><Camera className="w-3 h-3 mr-1.5" />Mark</Button>}
                        {session.status === 'completed' && <Button asChild size="sm" variant="ghost"><Link to={`/attendance/sessions/${session.id}`}><BarChart3 className="w-3 h-3 mr-1.5" />View</Link></Button>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground"><Calendar className="w-12 h-12 mx-auto mb-3" /><p>No sessions scheduled for today</p></div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5" />Recent AI Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              {ai_results.length > 0 ? (
                <div className="space-y-4">
                  {ai_results.map((result) => (
                    <div key={result.id} className="p-3 bg-background-alt rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{result.session_name}</h4>
                        <span className="text-xs text-muted-foreground">{new Date(result.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="text-muted-foreground">{result.students_recognized}/{result.total_students} students recognized</div>
                        <div className={`font-medium ${result.confidence_average >= 0.9 ? 'text-success' : result.confidence_average >= 0.75 ? 'text-yellow-500' : 'text-destructive'}`}>
                          {(result.confidence_average * 100).toFixed(0)}% confidence
                        </div>
                      </div>
                      <div>
                        <div className="w-full bg-muted/40 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${result.confidence_average >= 0.9 ? 'bg-success' : result.confidence_average >= 0.75 ? 'bg-yellow-500' : 'bg-destructive'}`} style={{ width: `${result.confidence_average * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-3 border-t"><Button asChild variant="link" className="text-sm"><Link to="/attendance/ai-results">View all AI results</Link></Button></div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground"><Camera className="w-12 h-12 mx-auto mb-3" /><p>No AI recognition results yet</p></div>
              )}
            </CardContent>
          </Card>
        </div>

        {pending_leaves.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />Pending Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pending_leaves.map((leave) => (
                  <div key={leave.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-background-alt rounded-lg border gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{leave.student_name} <span className="text-sm text-muted-foreground">({leave.student_id})</span></h4>
                      <p className="text-muted-foreground text-sm mt-1">{leave.reason}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Dates: {leave.dates.join(', ')}</span>
                        <span>Submitted: {new Date(leave.submitted_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Button size="sm" variant="outline" onClick={() => handleRejectLeave(leave.id)}>Reject</Button>
                      <Button size="sm" onClick={() => handleApproveLeave(leave.id)}>Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLinkButton to="/classes" icon={GraduationCap} title="My Classes" description="View all your classes" />
            <QuickLinkButton to="/attendance/reports" icon={BarChart3} title="Attendance Reports" description="Generate and view reports" />
            <QuickLinkButton to="/leave-management" icon={FileText} title="Leave Management" description="View all leave requests" />
            <QuickLinkButton to="/profile" icon={UserCheck} title="My Profile" description="Update your information" />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

const QuickLinkButton = ({ to, icon: Icon, title, description }: { to: string, icon: React.ElementType, title: string, description: string }) => (
  <Link to={to} className="block">
    <div className="p-4 rounded-lg border bg-background-alt hover:bg-accent hover:text-accent-foreground transition-colors h-full">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-primary" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </Link>
);

export default TeacherDashboard;