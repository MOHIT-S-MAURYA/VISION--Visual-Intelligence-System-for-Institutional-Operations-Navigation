import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared';

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

interface AttendanceChartProps {
  data: AttendanceRecord[];
  title?: string;
  className?: string;
}

export function AttendanceChart({ data, title = "Attendance Over Time", className = "" }: AttendanceChartProps) {
  const chartData = useMemo(() => {
    // Group data by week and calculate attendance percentage
    const weeklyData: { [key: string]: { present: number; total: number } } = {};
    
    data.forEach(record => {
      const date = new Date(record.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = { present: 0, total: 0 };
      }
      
      weeklyData[weekKey].total += 1;
      if (record.status === 'Present' || record.status === 'Late') {
        weeklyData[weekKey].present += 1;
      }
    });
    
    // Convert to array and calculate percentages
    return Object.entries(weeklyData)
      .map(([weekStart, counts]) => ({
        week: new Date(weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        percentage: Math.round((counts.present / counts.total) * 100),
        present: counts.present,
        total: counts.total
      }))
      .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
      .slice(-6); // Show last 6 weeks
  }, [data]);

  const averageAttendance = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.round(chartData.reduce((sum, week) => sum + week.percentage, 0) / chartData.length);
  }, [chartData]);

  const trend = useMemo(() => {
    if (chartData.length < 2) return 'neutral';
    const recent = chartData.slice(-2);
    return recent[1].percentage > recent[0].percentage ? 'up' : 
           recent[1].percentage < recent[0].percentage ? 'down' : 'neutral';
  }, [chartData]);

  return (
    <Card className={`backdrop-blur-xl bg-white/5 border-white/10 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>{title}</span>
          <div className="flex items-center gap-2 text-sm">
            {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
            <span className={`${
              averageAttendance >= 90 ? 'text-green-400' : 
              averageAttendance >= 75 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {averageAttendance}% avg
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="space-y-4">
            {/* Simple Line Chart */}
            <div className="relative h-40 border-b border-white/10">
              <svg className="w-full h-full" viewBox="0 0 400 150">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map(y => (
                  <line
                    key={y}
                    x1="30"
                    y1={130 - (y * 1.0)}
                    x2="390"
                    y2={130 - (y * 1.0)}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[0, 25, 50, 75, 100].map(y => (
                  <text
                    key={y}
                    x="20"
                    y={135 - (y * 1.0)}
                    fill="rgba(255,255,255,0.6)"
                    fontSize="10"
                    textAnchor="end"
                  >
                    {y}%
                  </text>
                ))}
                
                {/* Line chart */}
                {chartData.length > 1 && (
                  <polyline
                    points={chartData.map((item, index) => {
                      const x = 30 + (index * (360 / (chartData.length - 1)));
                      const y = 130 - (item.percentage * 1.0);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                
                {/* Data points */}
                {chartData.map((item, index) => {
                  const x = 30 + (index * (360 / Math.max(chartData.length - 1, 1)));
                  const y = 130 - (item.percentage * 1.0);
                  return (
                    <g key={index}>
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill={item.percentage >= 90 ? '#10B981' : 
                              item.percentage >= 75 ? '#F59E0B' : '#EF4444'}
                        className="hover:r-6 transition-all cursor-pointer"
                      />
                      {/* Tooltip on hover */}
                      <title>{`Week of ${item.week}: ${item.percentage}% (${item.present}/${item.total})`}</title>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-white/60 px-8">
              {chartData.map((item, index) => (
                <span key={index}>{item.week}</span>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>≥90%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>75-89%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>&lt;75%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-white/40 mx-auto mb-3" />
            <p className="text-white/60">No attendance data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AttendanceChart;