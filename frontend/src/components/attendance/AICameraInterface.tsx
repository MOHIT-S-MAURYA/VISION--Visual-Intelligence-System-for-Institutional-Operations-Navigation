import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, RotateCcw, Check, AlertCircle, Sparkles, Zap, Focus, Users } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import toast from 'react-hot-toast';

interface AICameraInterfaceProps {
  onCapture: (imageFile: File) => void;
  onClose: () => void;
  isProcessing?: boolean;
}

export function AICameraInterface({ onCapture, onClose, isProcessing = false }: AICameraInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      toast.success('Camera started successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      toast.error(`Camera error: ${errorMessage}`);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    // Add capture animation delay
    setTimeout(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (!context) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageDataUrl);
      stopCamera();
      setIsCapturing(false);
      toast.success('📸 Photo captured successfully', {
        icon: '✨',
        duration: 2000,
      });
    }, 300);
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  }, [startCamera]);

  const confirmPhoto = useCallback(() => {
    if (!capturedImage || !canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `classroom-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file);
      }
    }, 'image/jpeg', 0.9);
  }, [capturedImage, onCapture]);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="camera-title"
    >
      <Card className="w-full max-w-5xl max-h-[95vh] overflow-auto shadow-2xl border-2 animate-in zoom-in-95 duration-300">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
          <CardTitle id="camera-title" className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">AI Attendance Camera</div>
              <div className="text-sm text-muted-foreground font-normal">
                Capture classroom photo for automatic recognition
              </div>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isProcessing}
            className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Error Alert with Animation */}
          {error && (
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top duration-300 shadow-lg">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-red-500 text-lg">Camera Access Error</h4>
                <p className="text-sm text-red-400 mt-1">{error}</p>
                <div className="mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                  <p className="text-xs text-muted-foreground">
                    <strong>Troubleshooting:</strong> Make sure you've granted camera permissions 
                    and no other application is using it. Try refreshing the page.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Camera Preview Area with Enhanced Visual */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden aspect-video border-2 border-border shadow-2xl">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  autoPlay
                />
                {/* Camera Overlay Grid */}
                {isCameraActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-white/10" />
                      ))}
                    </div>
                    {/* Corner Frames */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                  </div>
                )}
                {/* Capture Flash Effect */}
                {isCapturing && (
                  <div className="absolute inset-0 bg-white animate-pulse opacity-70" />
                )}
                {!isCameraActive && !error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                    <div className="text-center space-y-3">
                      <div className="p-4 bg-primary/20 rounded-full inline-block animate-pulse">
                        <Camera className="w-12 h-12 text-primary" />
                      </div>
                      <p className="text-white text-lg font-semibold">Ready to capture</p>
                    </div>
                    <Button 
                      onClick={startCamera} 
                      size="lg"
                      className="gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Zap className="w-5 h-5" />
                      Start Camera
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="relative animate-in zoom-in duration-300">
                <img
                  src={capturedImage}
                  alt="Captured classroom"
                  className="w-full h-full object-contain"
                />
                {/* Success Overlay */}
                <div className="absolute top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-300">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-semibold">Captured Successfully</span>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Action Buttons with Enhanced Styling */}
          {isCameraActive && !capturedImage && (
            <div className="flex items-center justify-center gap-4 animate-in slide-in-from-bottom duration-300">
              <Button
                onClick={capturePhoto}
                size="lg"
                disabled={isProcessing || isCapturing}
                className="gap-2 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary/80"
              >
                <Camera className="w-6 h-6" />
                {isCapturing ? 'Capturing...' : 'Capture Photo'}
              </Button>
            </div>
          )}

          {capturedImage && (
            <div className="flex items-center justify-center gap-4 animate-in slide-in-from-bottom duration-300">
              <Button
                onClick={retakePhoto}
                variant="outline"
                size="lg"
                disabled={isProcessing}
                className="gap-2 px-6 py-6 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Photo
              </Button>
              <Button
                onClick={confirmPhoto}
                size="lg"
                disabled={isProcessing}
                className="gap-2 px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-600 to-green-500"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Use This Photo
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Enhanced Tips Section */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <p className="font-bold text-lg">Pro Tips for Best Results</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <div className="p-1 bg-yellow-500/20 rounded">
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Good Lighting</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Ensure the classroom is well-lit</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <div className="p-1 bg-green-500/20 rounded">
                  <Focus className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Clear Faces</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Students should face the camera</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <div className="p-1 bg-purple-500/20 rounded">
                  <Camera className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Stable Shot</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Keep the camera steady</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <div className="p-1 bg-blue-500/20 rounded">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Full Coverage</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Include all students in frame</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AICameraInterface;
