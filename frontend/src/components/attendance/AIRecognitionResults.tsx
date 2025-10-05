import { useState } from 'react';
import { Check, X, AlertTriangle, User, Eye, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';

export interface RecognitionResult {
  student_id: string;
  student_name: string;
  student_photo?: string;
  roll_no?: string;
  confidence: number;
  bbox?: [number, number, number, number];
}

interface AIRecognitionResultsProps {
  results: RecognitionResult[];
  classroomImage?: string;
  onConfirm: (confirmedStudents: string[]) => void;
  onReject: () => void;
  confidenceThreshold?: number;
}

export function AIRecognitionResults({
  results,
  classroomImage,
  onConfirm,
  onReject,
  confidenceThreshold = 0.6
}: AIRecognitionResultsProps) {
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(
    new Set(results.filter(r => r.confidence >= confidenceThreshold).map(r => r.student_id))
  );
  const [showClassroomImage, setShowClassroomImage] = useState(false);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedStudents(new Set(results.map(r => r.student_id)));
  };

  const deselectAll = () => {
    setSelectedStudents(new Set());
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedStudents));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-500 bg-green-500/10 border-green-500/30';
    if (confidence >= confidenceThreshold) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    return 'text-red-500 bg-red-500/10 border-red-500/30';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return { label: 'High', icon: Award };
    if (confidence >= confidenceThreshold) return { label: 'Medium', icon: TrendingUp };
    return { label: 'Low', icon: AlertTriangle };
  };

  const highConfidenceCount = results.filter(r => r.confidence >= 0.8).length;
  const mediumConfidenceCount = results.filter(r => r.confidence >= confidenceThreshold && r.confidence < 0.8).length;
  const lowConfidenceCount = results.filter(r => r.confidence < confidenceThreshold).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              AI Recognition Results
            </CardTitle>
            {classroomImage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClassroomImage(!showClassroomImage)}
              >
                {showClassroomImage ? 'Hide' : 'View'} Classroom Photo
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Classroom Image Preview */}
          {showClassroomImage && classroomImage && (
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={classroomImage}
                alt="Classroom"
                className="w-full h-auto max-h-96 object-contain bg-black"
              />
            </div>
          )}

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-500">{results.length}</div>
              <div className="text-sm text-muted-foreground">Total Detected</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-500">{highConfidenceCount}</div>
              <div className="text-sm text-muted-foreground">High Confidence</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-500">{mediumConfidenceCount}</div>
              <div className="text-sm text-muted-foreground">Medium Confidence</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-500">{lowConfidenceCount}</div>
              <div className="text-sm text-muted-foreground">Low Confidence</div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="text-sm text-muted-foreground">
              {selectedStudents.size} of {results.length} students selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>
                Deselect All
              </Button>
            </div>
          </div>

          {/* Recognition Results List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.student_id}
                className={`
                  flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer
                  ${selectedStudents.has(result.student_id)
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:border-primary/50'
                  }
                `}
                onClick={() => toggleStudent(result.student_id)}
              >
                {/* Checkbox */}
                <div className="flex-shrink-0">
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedStudents.has(result.student_id)
                      ? 'bg-primary border-primary'
                      : 'border-muted-foreground'
                    }
                  `}>
                    {selectedStudents.has(result.student_id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Student Photo */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-muted">
                  {result.student_photo ? (
                    <img
                      src={result.student_photo}
                      alt={result.student_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{result.student_name}</div>
                  {result.roll_no && (
                    <div className="text-sm text-muted-foreground">
                      Roll No: {result.roll_no}
                    </div>
                  )}
                </div>

                {/* Confidence Badge */}
                <div className="flex-shrink-0">
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1
                    ${result.confidence >= 0.8 ? 'bg-green-500/20 text-green-500' :
                      result.confidence >= confidenceThreshold ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }
                  `}>
                    {result.confidence < confidenceThreshold && (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    <span>{getConfidenceBadge(result.confidence).label}</span>
                    <span className={getConfidenceColor(result.confidence)}>
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Low Confidence Warning */}
          {lowConfidenceCount > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-semibold text-yellow-500">
                  {lowConfidenceCount} student{lowConfidenceCount > 1 ? 's' : ''} detected with low confidence.
                </span>
                <p className="text-muted-foreground mt-1">
                  Please review and verify these detections manually before confirming.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onReject}
            >
              <X className="w-4 h-4 mr-2" />
              Reject & Retry
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedStudents.size === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm {selectedStudents.size} Student{selectedStudents.size !== 1 ? 's' : ''}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIRecognitionResults;
