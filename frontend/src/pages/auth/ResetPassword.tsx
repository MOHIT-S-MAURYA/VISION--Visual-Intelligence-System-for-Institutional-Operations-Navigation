import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/shared/Card';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { PasswordStrengthBar } from '@/components/shared/PasswordStrengthBar';
import AuthLayout from '@/layouts/AuthLayout';
import toast from 'react-hot-toast';

const resetPasswordSchema = yup.object({
  newPassword: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
    .required('New password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const token = searchParams.get('token');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const watchedNewPassword = watch('newPassword', '');

  useEffect(() => {
    if (!token) {
      setTokenError('Reset token is missing. Please use the link from your email.');
    } else if (token.length < 10) { // Basic format validation
      setTokenError('Invalid reset token. Please request a new password reset.');
    }
  }, [token]);

  const onSubmit = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you'd call an API: await api.auth.resetPassword(token, data.newPassword);
      console.log('Password reset for token:', token);
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login', { state: { message: 'Please log in with your new password.' } }), 2000);
    } catch (error: unknown) {
      console.error('Reset password error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      if (errorMessage.includes('Invalid or expired')) {
        setTokenError('Reset token is invalid or expired. Please request a new one.');
      } else {
        toast.error(errorMessage || 'Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenError) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-destructive text-destructive-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Invalid Link</CardTitle>
            <CardDescription>{tokenError}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/forgot-password">Request New Reset Link</Link>
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <Link to="/login" className="text-primary hover:underline">
              <ArrowLeft className="inline w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-success text-success-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Password Reset</CardTitle>
            <CardDescription>Your password has been successfully reset.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Redirecting to login...</p>
          </CardContent>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
          <CardDescription>Create a new, strong password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register('newPassword')}
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                icon={Lock}
                error={errors.newPassword?.message}
                disabled={isLoading}
                suffix={<button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-muted-foreground">{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
              />
              {watchedNewPassword && <PasswordStrengthBar password={watchedNewPassword} />}
            </div>
            <Input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              icon={Lock}
              error={errors.confirmPassword?.message}
              disabled={isLoading}
              suffix={<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-muted-foreground">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default ResetPassword;