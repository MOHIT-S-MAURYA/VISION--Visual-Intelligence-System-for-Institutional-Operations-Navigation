import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { ShieldCheck, Activity, Users, ServerCog } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

export function Overview() {
  return (
    <MainLayout>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Operational status and key indicators</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Health</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold text-foreground">99.98%</div>
            <Activity className="w-8 h-8 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Users</CardTitle>
            <CardDescription>Real-time</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold text-foreground">1,248</div>
            <Users className="w-8 h-8 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Compute Load</CardTitle>
            <CardDescription>Across regions</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold text-foreground">43%</div>
            <ServerCog className="w-8 h-8 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Security</CardTitle>
            <CardDescription>Compliance</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold text-foreground">SOC 2</div>
            <ShieldCheck className="w-8 h-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Secondary content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System events and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-foreground/80">
              <li>• Deployed analytics service v2.4 to us-east</li>
              <li>• Rotated API keys for notification service</li>
              <li>• Auto-scaled attendance service to 5 instances</li>
              <li>• Completed nightly data integrity checks</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security & Compliance</CardTitle>
            <CardDescription>Encryption and certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-foreground/80">
              <div>Encryption at rest: AES-256</div>
              <div>Transport security: TLS 1.3</div>
              <div>Compliance: GDPR, SOC 2, ISO 27001</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Overview;