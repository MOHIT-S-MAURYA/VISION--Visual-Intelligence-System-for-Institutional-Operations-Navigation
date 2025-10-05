import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { Bell } from 'lucide-react';

export function Notifications() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-1">Manage system notifications and alerts</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-muted-foreground" />
            <CardTitle className="text-lg">Notification Center</CardTitle>
          </div>
          <CardDescription>Real-time notifications and system alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">Notification system coming soon...</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default Notifications;