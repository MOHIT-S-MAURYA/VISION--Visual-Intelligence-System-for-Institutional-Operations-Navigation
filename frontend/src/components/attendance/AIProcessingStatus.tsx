import { useEffect, useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Upload, Brain, FileCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/shared/Card';

export type ProcessingStage = 'uploading' | 'analyzing' | 'complete' | 'error';

interface ProcessingStatus {
  stage: ProcessingStage;
  progress: number;
  message: string;
  details?: string;
}

interface AIProcessingStatusProps {
  status: ProcessingStatus;
  totalStudents?: number;
  recognizedCount?: number;
}

export function AIProcessingStatus({
  status,
  totalStudents,
  recognizedCount
}: AIProcessingStatusProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (status.stage === 'uploading' || status.stage === 'analyzing') {
      const interval = setInterval(() => {
        setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status.stage]);

  const getStageIcon = () => {
    switch (status.stage) {
      case 'uploading':
        return (
          <div className="relative">
            <Upload className="w-6 h-6 text-blue-500 animate-bounce" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          </div>
        );
      case 'analyzing':
        return (
          <div className="relative">
            <Brain className="w-6 h-6 text-purple-500 animate-pulse" />
            <Sparkles className="w-3 h-3 text-purple-400 absolute -top-1 -right-1 animate-spin" />
          </div>
        );
      case 'complete':
        return (
          <div className="relative animate-in zoom-in duration-500">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        );
      case 'error':
        return (
          <div className="relative animate-in shake duration-500">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
        );
      default:
        return <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />;
    }
  };

  const getStageColor = () => {
    switch (status.stage) {
      case 'uploading':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'analyzing':
        return 'border-purple-500/30 bg-purple-500/10';
      case 'complete':
        return 'border-green-500/30 bg-green-500/10';
      case 'error':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-border bg-card';
    }
  };

  const getProgressColor = () => {
    switch (status.stage) {
      case 'uploading':
        return 'bg-blue-500';
      case 'analyzing':
        return 'bg-purple-500';
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className={`border-2 ${getStageColor()} transition-all duration-500 shadow-lg hover:shadow-xl animate-in slide-in-from-top duration-300`}>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Status Header with Enhanced Visual */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1 p-3 rounded-xl bg-gradient-to-br from-background to-muted shadow-inner">
              {getStageIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {status.message}
                {(status.stage === 'uploading' || status.stage === 'analyzing') && (
                  <span className="inline-block w-8 text-primary animate-pulse">{dots}</span>
                )}
              </h3>
              {status.details && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  {status.details}
                </p>
              )}
            </div>
          </div>

          {/* Progress Bar with Gradient */}
          {status.stage !== 'error' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-semibold">Progress</span>
                <span className="font-bold text-lg text-primary">{status.progress}%</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${getProgressColor()} transition-all duration-500 ease-out relative`}
                  style={{ width: `${status.progress}%` }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          )}

          {/* Processing Stages with Enhanced Visual */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-dashed">
            <div className={`text-center p-4 rounded-xl transition-all duration-500 ${
              status.stage === 'uploading' ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500/50 shadow-lg scale-105' : 
              status.progress > 0 ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/30' : 'bg-muted border border-border'
            }`}>
              <div className={`${
                status.stage === 'uploading' ? 'animate-bounce' : 
                status.progress > 0 ? 'animate-in zoom-in' : ''
              }`}>
                <Upload className={`w-6 h-6 mx-auto mb-2 ${
                  status.stage === 'uploading' ? 'text-blue-500' :
                  status.progress > 0 ? 'text-green-500' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-xs font-bold">Uploading</div>
              {status.stage === 'uploading' && (
                <div className="text-xs text-blue-500 mt-1 animate-pulse">In Progress</div>
              )}
            </div>
            
            <div className={`text-center p-4 rounded-xl transition-all duration-500 ${
              status.stage === 'analyzing' ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-500/50 shadow-lg scale-105' : 
              status.progress > 33 ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/30' : 'bg-muted border border-border'
            }`}>
              <div className={`${
                status.stage === 'analyzing' ? 'animate-pulse' : 
                status.progress > 33 ? 'animate-in zoom-in' : ''
              }`}>
                <Brain className={`w-6 h-6 mx-auto mb-2 ${
                  status.stage === 'analyzing' ? 'text-purple-500' :
                  status.progress > 33 ? 'text-green-500' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-xs font-bold">Analyzing</div>
              {status.stage === 'analyzing' && (
                <div className="text-xs text-purple-500 mt-1 animate-pulse">AI Processing</div>
              )}
            </div>
            
            <div className={`text-center p-4 rounded-xl transition-all duration-500 ${
              status.stage === 'complete' ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/50 shadow-lg scale-105 animate-in zoom-in' : 'bg-muted border border-border'
            }`}>
              <FileCheck className={`w-6 h-6 mx-auto mb-2 ${
                status.stage === 'complete' ? 'text-green-500 animate-bounce' : 'text-muted-foreground'
              }`} />
              <div className="text-xs font-bold">Complete</div>
              {status.stage === 'complete' && (
                <div className="text-xs text-green-500 mt-1">✓ Done</div>
              )}
            </div>
          </div>

          {/* Results Summary with Enhanced Visual */}
          {status.stage === 'complete' && totalStudents !== undefined && recognizedCount !== undefined && (
            <div className="bg-gradient-to-r from-green-500/10 via-green-600/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-5 mt-6 shadow-lg animate-in slide-in-from-bottom duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-500 flex items-center gap-2">
                      Recognition Complete
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Successfully recognized <span className="font-bold text-green-600">{recognizedCount}</span> out of <span className="font-bold">{totalStudents}</span> students
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-green-500 animate-in zoom-in duration-500">
                    {totalStudents > 0 ? Math.round((recognizedCount / totalStudents) * 100) : 0}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Success Rate</div>
                </div>
              </div>
              {/* Progress bar for success rate */}
              <div className="mt-4 h-2 bg-green-500/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                  style={{ width: `${totalStudents > 0 ? (recognizedCount / totalStudents) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message with Enhanced Visual */}
          {status.stage === 'error' && (
            <div className="bg-gradient-to-r from-red-500/10 via-red-600/10 to-rose-500/10 border-2 border-red-500/30 rounded-xl p-5 mt-6 shadow-lg animate-in shake duration-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-red-500">Processing Failed</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {status.details || 'An error occurred during AI processing. Please try again.'}
                  </div>
                  <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-xs text-muted-foreground">
                      <strong>Tip:</strong> Check your internet connection and try capturing another photo. 
                      If the issue persists, contact support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AIProcessingStatus;
