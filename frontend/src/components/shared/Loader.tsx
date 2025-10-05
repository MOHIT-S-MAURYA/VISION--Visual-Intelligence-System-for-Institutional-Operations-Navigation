import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  className, 
  text, 
  variant = 'spinner' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const renderSpinner = () => (
    <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />
  );

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-current animate-pulse',
            {
              'h-1 w-1': size === 'sm',
              'h-1.5 w-1.5': size === 'md',
              'h-2 w-2': size === 'lg',
            }
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={cn(
        'rounded-full bg-current animate-pulse',
        sizeClasses[size],
        className
      )}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  if (text) {
    return (
      <div className="flex items-center space-x-2">
        {renderLoader()}
        <span className="text-sm text-muted-foreground">{text}</span>
      </div>
    );
  }

  return renderLoader();
};

// Full-screen loading overlay
export const LoadingOverlay: React.FC<{ 
  isLoading: boolean; 
  text?: string;
  className?: string;
}> = ({ 
  isLoading, 
  text = 'Loading...', 
  className 
}) => {
  if (!isLoading) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <Loader size="lg" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
};

// Inline loading state for components
export const InlineLoader: React.FC<LoaderProps & { 
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ 
  isLoading, 
  children, 
  fallback,
  ...loaderProps 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        {fallback || <Loader {...loaderProps} />}
      </div>
    );
  }

  return <>{children}</>;
};

export { Loader };