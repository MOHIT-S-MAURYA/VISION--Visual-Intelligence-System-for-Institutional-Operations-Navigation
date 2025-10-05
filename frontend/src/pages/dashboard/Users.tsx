import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { Users as UsersIcon } from 'lucide-react';

export function Users() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-1">Manage users, roles, and permissions</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <UsersIcon className="w-6 h-6 text-muted-foreground" />
            <CardTitle className="text-lg">User Management</CardTitle>
          </div>
          <CardDescription>Control user access and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">User management system coming soon...</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default Users;