import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Shield, 
  RefreshCw,
  BarChart3,
  FileText,
  Settings,
  AlertTriangle,
  Activity,
  Database,
  Cpu,
  Server,
  UserCog,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import MainLayout from '@/layouts/MainLayout';
import toast from 'react-hot-toast';

// Type definitions
// interface SystemStats {
//   total_departments: number;
//   total_users: number;
//   total_students: number;
//   total_teachers: number;
//   system_health: number;
//   active_sessions: number;
// }

// interface DepartmentOverview {
//   id: string;
//   name: string;
//   code: string;
//   admin_name: string;
//   student_count: number;
//   teacher_count: number;
//   class_count: number;
//   avg_attendance: number;
//   status: 'active' | 'inactive';
// }

interface SystemActivity {
  id: string;
  type: 'user_login' | 'department_created' | 'system_error' | 'backup_completed' | 'security_alert';
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  user?: string;
}

// interface AuditLog {
//   id: string;
//   action: string;
//   user: string;
//   resource: string;
//   timestamp: string;
//   ip_address: string;
//   status: 'success' | 'failed';
// }

// Mock data
const mockPrincipalData = {
  principal_name: 'Dr. Anderson',
  institution_name: 'Vision Institute of Technology',
  system_stats: { total_departments: 8, total_users: 1247, total_students: 985, total_teachers: 124, system_health: 98.5, active_sessions: 45 },
  departments: [
    { id: 'dept-1', name: 'Computer Science', code: 'CS', admin_name: 'Prof. Johnson', student_count: 245, teacher_count: 18, class_count: 12, avg_attendance: 89.2, status: 'active' as const },
    { id: 'dept-2', name: 'Information Technology', code: 'IT', admin_name: 'Prof. Smith', student_count: 198, teacher_count: 15, class_count: 10, avg_attendance: 91.5, status: 'active' as const },
    { id: 'dept-3', name: 'Electronics', code: 'ECE', admin_name: 'Prof. Davis', student_count: 156, teacher_count: 12, class_count: 8, avg_attendance: 87.8, status: 'active' as const }
  ],
  recent_activities: [
    { id: 'activity-1', type: 'user_login' as const, title: 'Bulk User Login', description: '45 users logged in during peak hours', timestamp: '2025-09-29T10:30:00Z', severity: 'info' as const, user: 'System' },
    { id: 'activity-2', type: 'department_created' as const, title: 'New Department Created', description: 'Mechanical Engineering department added', timestamp: '2025-09-29T09:15:00Z', severity: 'success' as const, user: 'Dr. Anderson' },
    { id: 'activity-3', type: 'backup_completed' as const, title: 'System Backup Completed', description: 'Daily backup completed successfully', timestamp: '2025-09-29T02:00:00Z', severity: 'success' as const, user: 'System' }
  ],
  audit_logs: [
    { id: 'audit-1', action: 'CREATE_USER', user: 'prof.johnson@vision.edu', resource: '/api/users/', timestamp: '2025-09-29T10:45:00Z', ip_address: '192.168.1.100', status: 'success' as const },
    { id: 'audit-2', action: 'UPDATE_DEPARTMENT', user: 'dr.anderson@vision.edu', resource: '/api/departments/cs-001', timestamp: '2025-09-29T09:30:00Z', ip_address: '192.168.1.50', status: 'success' as const }
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

export function PrincipalAdminDashboard() {
  const [principalData, setPrincipalData] = useState<typeof mockPrincipalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrincipalData(mockPrincipalData);
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

  const getActivityIcon = (type: SystemActivity['type']) => {
    const icons = {
      user_login: <Users className="w-4 h-4 text-blue-500" />,
      department_created: <Building2 className="w-4 h-4 text-success" />,
      system_error: <AlertTriangle className="w-4 h-4 text-destructive" />,
      backup_completed: <Database className="w-4 h-4 text-purple-500" />,
      security_alert: <Shield className="w-4 h-4 text-yellow-500" />,
    };
    return icons[type] || <Activity className="w-4 h-4 text-muted-foreground" />;
  };

  const getSeverityClass = (severity: SystemActivity['severity']) => {
    const classes = {
      success: 'text-success',
      warning: 'text-yellow-500',
      error: 'text-destructive',
      info: 'text-blue-500',
    };
    return classes[severity] || 'text-muted-foreground';
  };

  const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading Principal Dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!principalData) return null;

  const { principal_name, institution_name, system_stats, departments, recent_activities, audit_logs } = principalData;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Principal Dashboard</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>{institution_name}</span>
              <span className="text-muted-foreground/50">•</span>
              <span>{principal_name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => loadDashboardData(true)} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button asChild>
              <Link to="/departments/new">
                <Building2 className="w-4 h-4 mr-2" />
                New Department
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Departments" value={system_stats.total_departments} icon={Building2} description="Active departments" />
          <StatCard title="Total Users" value={system_stats.total_users.toLocaleString()} icon={Users} description={`${system_stats.total_students} students, ${system_stats.total_teachers} teachers`} />
          <StatCard title="System Health" value={`${system_stats.system_health}%`} icon={Server} description="All systems operational" />
          <StatCard title="Active Sessions" value={system_stats.active_sessions} icon={Activity} description="Current users online" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cpu className="w-5 h-5" />System Performance</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><p className="text-sm text-muted-foreground">Server Uptime</p><p className="text-xl font-bold mt-1">99.9%</p></div>
            <div><p className="text-sm text-muted-foreground">Response Time</p><p className="text-xl font-bold mt-1">125ms</p></div>
            <div><p className="text-sm text-muted-foreground">Database Size</p><p className="text-xl font-bold mt-1">2.4GB</p></div>
            <div><p className="text-sm text-muted-foreground">API Calls</p><p className="text-xl font-bold mt-1">1.2M</p></div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Building2 className="w-5 h-5" />Departments Overview</div>
                <Button asChild variant="ghost" size="sm"><Link to="/departments">View All</Link></Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-3 bg-background-alt rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-semibold">{dept.name} <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full ml-2">{dept.code}</span></h4>
                      <p className="text-muted-foreground text-sm">Admin: {dept.admin_name}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{dept.student_count} students</span>
                        <span>{dept.teacher_count} teachers</span>
                        <span>{dept.avg_attendance}% attendance</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="outline"><Link to={`/departments/${dept.id}/analytics`}><BarChart3 className="w-3 h-3 mr-1.5" />Analytics</Link></Button>
                      <Button asChild size="sm"><Link to={`/departments/${dept.id}`}><Settings className="w-3 h-3 mr-1.5" />Manage</Link></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5" />System Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recent_activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${getSeverityClass(activity.severity)}`}>{activity.title}</h4>
                      <p className="text-muted-foreground text-xs">{activity.description}</p>
                      <div className="text-xs text-muted-foreground/70 mt-1">{formatTimestamp(activity.timestamp)} {activity.user && `by ${activity.user}`}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText className="w-5 h-5" />Recent Audit Logs</div>
              <Button asChild variant="ghost" size="sm"><Link to="/admin/audit-logs">View All</Link></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b"><th className="text-left py-2 font-normal text-muted-foreground">Action</th><th className="text-left py-2 font-normal text-muted-foreground">User</th><th className="text-left py-2 font-normal text-muted-foreground">Resource</th><th className="text-left py-2 font-normal text-muted-foreground">Timestamp</th><th className="text-left py-2 font-normal text-muted-foreground">Status</th></tr>
                </thead>
                <tbody>
                  {audit_logs.map((log) => (
                    <tr key={log.id} className="border-b border-border/50">
                      <td className="py-3">{log.action}</td>
                      <td className="py-3 text-muted-foreground">{log.user}</td>
                      <td className="py-3 text-muted-foreground font-mono text-xs">{log.resource}</td>
                      <td className="py-3 text-muted-foreground">{formatTimestamp(log.timestamp)}</td>
                      <td className="py-3"><span className={`px-2 py-1 text-xs rounded-full ${log.status === 'success' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>{log.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
            <CardDescription>Quick access to key system management tools.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLinkButton to="/admin/users" icon={UserCog} title="Manage Users" description="Add, edit, or remove users" />
            <QuickLinkButton to="/admin/system-settings" icon={Settings} title="System Settings" description="Configure global settings" />
            <QuickLinkButton to="/admin/reports" icon={Download} title="Generate Reports" description="Download system-wide data" />
            <QuickLinkButton to="/admin/security" icon={Shield} title="Security Center" description="Monitor and manage security" />
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

export default PrincipalAdminDashboard;