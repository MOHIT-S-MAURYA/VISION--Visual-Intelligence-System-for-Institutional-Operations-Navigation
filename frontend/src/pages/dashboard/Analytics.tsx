import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared';
import { ChartBar, TrendingUp, BarChart3 } from 'lucide-react';

export function Analytics() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ChartBar className="w-6 h-6 text-muted-foreground" />
              <CardTitle className="text-lg">Data Analytics</CardTitle>
            </div>
            <CardDescription>Real-time data processing and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">Analytics dashboard coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
              <CardTitle className="text-lg">Performance</CardTitle>
            </div>
            <CardDescription>System performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">Performance monitoring coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-muted-foreground" />
              <CardTitle className="text-lg">Reports</CardTitle>
            </div>
            <CardDescription>Generated reports and summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">Report generation coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Analytics;