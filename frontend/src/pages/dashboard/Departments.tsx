import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { Building2 } from 'lucide-react';

export function Departments() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Departments</h1>
        <p className="text-muted-foreground mt-1">Manage institutional departments and organization</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-muted-foreground" />
            <CardTitle className="text-lg">Department Management</CardTitle>
          </div>
          <CardDescription>Organize and manage institutional departments</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">Department management coming soon...</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default Departments;