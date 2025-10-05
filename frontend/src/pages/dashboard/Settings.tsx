import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">System configuration and preferences</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-muted-foreground" />
            <CardTitle className="text-lg">System Settings</CardTitle>
          </div>
          <CardDescription>Configure system preferences and options</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">Settings panel coming soon...</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default Settings;