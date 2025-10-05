import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { Image } from 'lucide-react';

export function Media() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Media Storage</h1>
        <p className="text-muted-foreground mt-1">Secure media storage and management system</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image className="w-6 h-6 text-muted-foreground" />
            <CardTitle className="text-lg">Media Management</CardTitle>
          </div>
          <CardDescription>Store and manage media files securely</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">Media storage system coming soon...</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

export default Media;