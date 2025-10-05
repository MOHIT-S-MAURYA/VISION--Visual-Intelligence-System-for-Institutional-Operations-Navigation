import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { BadgeCheck } from 'lucide-react';

export function Attendance() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Attendance</h1>
        <p className="text-muted-foreground mt-1">AI-powered attendance tracking and management</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BadgeCheck className="w-6 h-6 text-muted-foreground" />
            <CardTitle className="text-lg">Attendance Management</CardTitle>
          </div>
          <CardDescription>Facial recognition and attendance tracking system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">Attendance system coming soon...</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default Attendance;