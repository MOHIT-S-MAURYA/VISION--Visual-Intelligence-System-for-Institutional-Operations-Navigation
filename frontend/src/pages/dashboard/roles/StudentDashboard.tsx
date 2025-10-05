import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Bell, 
  Download,
  RefreshCw,
  User,
  BarChart3,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import AttendanceChart from '@/components/charts/AttendanceChart';
import MainLayout from '@/layouts/MainLayout';
import toast from 'react-hot-toast';

// Type definitions
interface AttendanceSummary {
  period_start: string;
  period_end: string;
  present_count: number;
  absent_count: number;
  attendance_percentage: number;
}

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

interface AttendanceData {
  student_id: string;
  attendance_summary: AttendanceSummary;
  records: AttendanceRecord[];
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  read: boolean;
}

interface UpcomingSession {
  id: number;
  subject: string;
  time: string;
  room: string;
  teacher: string;
}

// Mock API calls - replace with real API later
const mockStudentData = {
  student_id: 'student-123',
  attendance_summary: {
    period_start: '2025-09-01',
    period_end: '2025-09-30',
    present_count: 24,
    absent_count: 3,
    attendance_percentage: 88.89
  },
  records: [
    { date: '2025-09-29', status: 'Present' as const },
    { date: '2025-09-28', status: 'Present' as const },
    { date: '2025-09-27', status: 'Absent' as const },
    { date: '2025-09-26', status: 'Present' as const },
    { date: '2025-09-25', status: 'Present' as const },
  ]
};

const mockNotifications = [
  {
    id: 1,
    title: 'Attendance Alert',
    message: 'Your attendance is below 90%. Please ensure regular attendance.',
    time: '2 hours ago',
    type: 'warning',
    read: false
  },
  {
    id: 2,
    title: 'Class Schedule Update',
    message: 'Computer Science class moved to Room 204 today.',
    time: '5 hours ago',
    type: 'info',
    read: false
  },
  {
    id: 3,
    title: 'Welcome to VISION',
    message: 'Complete your profile to get the most out of VISION.',
    time: '1 day ago',
    type: 'success',
    read: true
  }
];

const mockUpcomingSessions = [
  {
    id: 1,
    subject: 'Computer Science',
    time: '10:00 AM - 11:00 AM',
    room: 'Room 204',
    teacher: 'Dr. Smith'
  },
  {
    id: 2,
    subject: 'Mathematics',
    time: '11:30 AM - 12:30 PM',
    room: 'Room 101',
    teacher: 'Prof. Johnson'
  },
  {
    id: 3,
    subject: 'Physics',
    time: '2:00 PM - 3:00 PM',
    room: 'Lab 3',
    teacher: 'Dr. Brown'
  }
];

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

export function StudentDashboard() {
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAttendanceData(mockStudentData);
      setNotifications(mockNotifications);
      setUpcomingSessions(mockUpcomingSessions);

      if (isRefresh) {
        toast.success('Dashboard data refreshed!');
      }
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

  const handleDownloadReport = async () => {
    try {
      toast.success('Report download started...');
      // Mock download - replace with real API call
      console.log('Downloading attendance report...');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <XCircle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Bell className="w-5 h-5 text-blue-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

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

  const { attendance_summary } = attendanceData || {};

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {attendanceData?.student_id}.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => loadDashboardData(true)} disabled={isRefreshing}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Attendance" 
            value={`${attendance_summary?.attendance_percentage?.toFixed(1) || 0}%`} 
            description="This Month"
            icon={TrendingUp}
          />
          <StatCard 
            title="Present Days" 
            value={attendance_summary?.present_count || 0} 
            description="This Month"
            icon={CheckCircle}
          />
          <StatCard 
            title="Absent Days" 
            value={attendance_summary?.absent_count || 0} 
            description="This Month"
            icon={XCircle}
          />
          <StatCard 
            title="Upcoming" 
            value={upcomingSessions.length} 
            description="Sessions Today"
            icon={Calendar}
          />
        </div>

        {/* Attendance Chart */}
        <AttendanceChart 
          data={attendanceData?.records || []} 
          title="Attendance Over Time"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                      <div>
                        <h4 className="font-semibold text-foreground">{session.subject}</h4>
                        <p className="text-muted-foreground text-sm">{session.teacher}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.time}
                          </span>
                          <span>{session.room}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-muted-foreground/60">Upcoming</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No sessions scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className={`flex items-start gap-3 p-4 rounded-lg border ${
                      notification.read 
                        ? 'bg-muted/30' 
                        : 'bg-blue-500/10 border-blue-500/20'
                    }`}>
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium ${notification.read ? 'text-foreground/80' : 'text-foreground'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
                        <p className="text-muted-foreground/60 text-xs mt-2">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      )}
                    </div>
                  ))} 
                  <div className="text-center pt-4 border-t">
                    <Link 
                      to="/notifications"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No new notifications</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickLinkButton to="/attendance" icon={BarChart3} title="My Attendance" description="View detailed records" />
              <QuickLinkButton to="/profile" icon={User} title="My Profile" description="Update information" />
              <QuickLinkButton to="/schedule" icon={Clock} title="My Schedule" description="View class timetable" />
              <QuickLinkButton to="/leave-request" icon={Calendar} title="Request Leave" description="Submit a leave application" />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

const QuickLinkButton = ({ to, icon: Icon, title, description }: { to: string, icon: React.ElementType, title: string, description: string }) => (
  <Link to={to} className="block">
    <Button 
      variant="outline" 
      className="w-full h-full justify-start p-4 text-left"
    >
      <Icon className="w-5 h-5 mr-4 text-primary" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Button>
  </Link>
);

export default StudentDashboard;