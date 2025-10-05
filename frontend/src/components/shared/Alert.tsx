import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'default', 
    title, 
    description, 
    dismissible = false,
    onDismiss,
    children,
    ...props 
  }, ref) => {
    const icons = {
      default: Info,
      destructive: XCircle,
      success: CheckCircle,
      warning: AlertCircle,
    };

    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          {
            'bg-background text-foreground border-border': variant === 'default',
            'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive': 
              variant === 'destructive',
            'border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600': 
              variant === 'success',
            'border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600': 
              variant === 'warning',
          },
          className
        )}
        {...props}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon className="h-4 w-4" />
          </div>
          
          <div className="ml-3 flex-1">
            {title && (
              <AlertTitle className={cn(
                'mb-1 font-medium leading-none tracking-tight',
                {
                  'text-destructive': variant === 'destructive',
                  'text-green-600': variant === 'success',
                  'text-yellow-600': variant === 'warning',
                }
              )}>
                {title}
              </AlertTitle>
            )}
            
            {description && (
              <AlertDescription className={cn(
                'text-sm [&_p]:leading-relaxed',
                {
                  'text-destructive/90': variant === 'destructive',
                  'text-green-600/90': variant === 'success',
                  'text-yellow-600/90': variant === 'warning',
                }
              )}>
                {description}
              </AlertDescription>
            )}
            
            {children}
          </div>
          
          {dismissible && onDismiss && (
            <div className="ml-auto flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={onDismiss}
                className={cn(
                  'h-6 w-6 hover:bg-transparent',
                  {
                    'text-destructive hover:text-destructive/80': variant === 'destructive',
                    'text-green-600 hover:text-green-600/80': variant === 'success',
                    'text-yellow-600 hover:text-yellow-600/80': variant === 'warning',
                  }
                )}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };