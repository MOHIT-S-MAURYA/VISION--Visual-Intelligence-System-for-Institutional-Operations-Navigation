import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  RefreshCw,
  BarChart3,
  Calendar,
  FileText,
  UserPlus,
  Building2,
  Download,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import MainLayout from '@/layouts/MainLayout';
import toast from 'react-hot-toast';

// Type definitions
interface RecentActivity {
  id: string;
  type: 'user_created' | 'class_created' | 'attendance_marked' | 'leave_approved';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

// Mock data
const mockDepartmentData = {
  department_id: 'dept-cs-001',
  department_name: 'Computer Science',
  admin_name: 'Prof. Eleanor Vance',
  stats: { total_students: 245, total_teachers: 18, total_classes: 12, avg_attendance: 89.2, active_sessions: 3, pending_approvals: 7 },
  classes: [
    { id: 'class-1', name: 'CS-2023-A', teacher_name: 'Dr. Reed', student_count: 45, avg_attendance: 92.3, last_session: '2025-09-29T09:00:00Z', status: 'active' as const },
    { id: 'class-2', name: 'CS-2023-B', teacher_name: 'Prof. Davis', student_count: 38, avg_attendance: 87.5, last_session: '2025-09-29T11:00:00Z', status: 'active' as const },
    { id: 'class-3', name: 'CS-2022-A', teacher_name: 'Dr. Wilson', student_count: 42, avg_attendance: 85.1, last_session: '2025-09-28T14:00:00Z', status: 'active' as const }
  ],
  recent_activities: [
    { id: 'activity-1', type: 'user_created' as const, title: 'New Student Added', description: 'John Doe added to CS-2023-A', timestamp: '2025-09-29T10:30:00Z', user: 'Admin' },
    { id: 'activity-2', type: 'attendance_marked' as const, title: 'Attendance Marked', description: 'CS-2023-B - 35/38 students present', timestamp: '2025-09-29T09:15:00Z', user: 'Prof. Davis' },
    { id: 'activity-3', type: 'leave_approved' as const, title: 'Leave Request Approved', description: 'Jane Smith - Medical leave for 2 days', timestamp: '2025-09-29T08:45:00Z', user: 'Prof. Vance' }
  ],
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

export function DepartmentAdminDashboard() {
  const [departmentData, setDepartmentData] = useState<typeof mockDepartmentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDepartmentData(mockDepartmentData);
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

  const getActivityIcon = (type: RecentActivity['type']) => {
    const icons = {
      user_created: <UserPlus className="w-4 h-4 text-success" />,
      class_created: <BookOpen className="w-4 h-4 text-blue-500" />,
      attendance_marked: <Calendar className="w-4 h-4 text-purple-500" />,
      leave_approved: <FileText className="w-4 h-4 text-yellow-500" />,
    };
    return icons[type] || <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
  };

  const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading Department Dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!departmentData) return null;

  const { department_name, admin_name, stats, classes, recent_activities } = departmentData;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Department Dashboard</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span>{department_name}</span>
              <span className="text-muted-foreground/50">•</span>
              <span>{admin_name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => loadDashboardData(true)} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button asChild>
              <Link to="/admin/department/add-student">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={stats.total_students} icon={Users} description={`in ${stats.total_classes} classes`} />
          <StatCard title="Total Teachers" value={stats.total_teachers} icon={GraduationCap} description="Active faculty" />
          <StatCard title="Avg. Attendance" value={`${stats.avg_attendance}%`} icon={TrendingUp} description="Department average" />
          <StatCard title="Pending Approvals" value={stats.pending_approvals} icon={AlertTriangle} description="Need attention" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Department Classes ({classes.length})
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/department/classes">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classes.map((classInfo) => (
                  <div key={classInfo.id} className="flex items-center justify-between p-3 bg-background-alt rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-semibold">{classInfo.name}</h4>
                      <p className="text-muted-foreground text-sm">{classInfo.teacher_name}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{classInfo.student_count} students</span>
                        <span>{classInfo.avg_attendance}% avg. attendance</span>
                        <span>Last session: {formatTimestamp(classInfo.last_session)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="outline"><Link to={`/admin/classes/${classInfo.id}/attendance`}><BarChart3 className="w-3 h-3 mr-1.5" />Report</Link></Button>
      
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recent_activities.length > 0 ? (
                <div className="space-y-4">
                  {recent_activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <p className="text-muted-foreground text-xs">{activity.description}</p>
                        <div className="text-xs text-muted-foreground/70 mt-1">
                          {formatTimestamp(activity.timestamp)} {activity.user && `by ${activity.user}`}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-3 border-t">
                    <Button asChild variant="link" className="text-sm"><Link to="/admin/activities">View all activities</Link></Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground"><Calendar className="w-12 h-12 mx-auto mb-3" /><p>No recent activities</p></div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Management Tools</CardTitle>
            <CardDescription>Quickly manage your department's students, teachers, and classes.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLinkButton to="/admin/students/new" icon={UserPlus} title="Add Student" description="Register a new student" />
            <QuickLinkButton to="/admin/teachers/new" icon={GraduationCap} title="Add Teacher" description="Register new faculty" />
            <QuickLinkButton to="/admin/classes/new" icon={BookOpen} title="Create Class" description="Set up a new class" />
            <QuickLinkButton to="/admin/reports/department" icon={Download} title="Department Report" description="Download analytics" />
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

export default DepartmentAdminDashboard;