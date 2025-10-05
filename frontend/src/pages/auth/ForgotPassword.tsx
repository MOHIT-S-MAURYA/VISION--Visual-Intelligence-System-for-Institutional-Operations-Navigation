import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/shared/Card';
import { Mail, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import toast from 'react-hot-toast';

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Password reset requested for:', data.email);
      setIsSuccess(true);
      toast.success('Reset instructions sent!');
    } catch (error: unknown) {
      console.error('Forgot password error:', error);
      setIsSuccess(true); // For security, always show success
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-success text-success-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              If an account with email <strong className="text-foreground">{getValues('email')}</strong> exists, 
              we've sent instructions to that address.
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your spam folder if you don't see it.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full">
              Try a different email
            </Button>
            <Link to="/login" className="text-sm text-primary hover:underline">
              <ArrowLeft className="inline w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <Send className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email?.message}
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
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

export default ForgotPassword;