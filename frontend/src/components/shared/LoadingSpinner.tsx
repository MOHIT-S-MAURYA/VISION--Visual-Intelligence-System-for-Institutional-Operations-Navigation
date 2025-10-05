/**
 * Loading Spinner Components
 * Reusable loading states for different scenarios
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Basic spinning loader
 */
export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]} ${className}`} />
  );
};

/**
 * Full-screen loading overlay
 */
export const FullPageLoader = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
    <div className="text-center">
      <LoadingSpinner size="lg" className="mx-auto mb-4" />
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  </div>
);

/**
 * Page content loading fallback
 */
export const PageLoadingFallback = ({ message = 'Loading page...' }: { message?: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <LoadingSpinner size="md" className="mx-auto mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

/**
 * Card/Section loading skeleton
 */
export const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-muted rounded w-3/4"></div>
    <div className="h-4 bg-muted rounded w-1/2"></div>
    <div className="h-4 bg-muted rounded w-5/6"></div>
  </div>
);

/**
 * Inline loading indicator
 */
export const InlineLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
    <span className="text-sm">{text}</span>
  </div>
);
