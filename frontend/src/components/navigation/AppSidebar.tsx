import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ChartBar, BadgeCheck, Building2, Image, Bell, Users, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

type Item = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: Item[] = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: ChartBar },
  { to: '/attendance', label: 'Attendance', icon: BadgeCheck },
  { to: '/departments', label: 'Departments', icon: Building2 },
  { to: '/media', label: 'Media Storage', icon: Image },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r bg-card">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-1">
        {items.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium',
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default AppSidebar;
