import { cn } from '@/utils/cn';

interface PasswordStrengthBarProps {
  password: string;
  className?: string;
}

const passwordStrengthConfig = {
  weak: { color: 'bg-red-500', text: 'Weak' },
  medium: { color: 'bg-yellow-500', text: 'Medium' },
  strong: { color: 'bg-green-500', text: 'Strong' },
};

const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (!password) return 'weak';
  
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  if (passedChecks < 3) return 'weak';
  if (passedChecks < 5) return 'medium';
  return 'strong';
};

export function PasswordStrengthBar({ password, className }: PasswordStrengthBarProps) {
  const strength = calculatePasswordStrength(password);
  const config = passwordStrengthConfig[strength];

  if (!password) return null;

  return (
    <div className={cn('mt-2', className)}>
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 bg-white/20 rounded-full h-1.5">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              config.color,
              {
                'w-1/3': strength === 'weak',
                'w-2/3': strength === 'medium',
                'w-full': strength === 'strong',
              }
            )}
          />
        </div>
        <span className={cn('text-xs font-medium', {
          'text-red-400': strength === 'weak',
          'text-yellow-400': strength === 'medium',
          'text-green-400': strength === 'strong',
        })}>
          {config.text}
        </span>
      </div>
      
      <div className="text-xs text-white/60 space-y-1">
        <div className="flex flex-wrap gap-2">
          <span className={password.length >= 8 ? 'text-green-400' : 'text-white/40'}>
            8+ chars
          </span>
          <span className={/[A-Z]/.test(password) ? 'text-green-400' : 'text-white/40'}>
            Uppercase
          </span>
          <span className={/[a-z]/.test(password) ? 'text-green-400' : 'text-white/40'}>
            Lowercase
          </span>
          <span className={/\d/.test(password) ? 'text-green-400' : 'text-white/40'}>
            Number
          </span>
          <span className={/[^a-zA-Z0-9]/.test(password) ? 'text-green-400' : 'text-white/40'}>
            Special
          </span>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrengthBar;