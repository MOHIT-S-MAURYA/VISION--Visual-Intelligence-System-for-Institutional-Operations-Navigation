import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/shared/Card';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import toast from 'react-hot-toast';

const loginSchema = yup.object({
  username: yup.string().required('Email or username is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
        user: {
          id: '1',
          email: data.username,
          name: 'John Doe',
          role: 'Teacher'
        }
      };

      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success(`Welcome back, ${response.user.name}!`);

      const roleRedirects = {
        Student: '/dashboard/student',
        Teacher: '/dashboard/teacher',
        'Department Admin': '/dashboard/department',
        'Principal Admin': '/dashboard/principal',
      };

      const redirectPath = roleRedirects[response.user.role as keyof typeof roleRedirects] || '/dashboard/student';
      navigate(redirectPath, { replace: true });

    } catch (error: unknown) {
      console.error('Login error:', error);
      setError('username', { message: 'Invalid email or password' });
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md animate-in">
        <Card>
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your VISION account to continue</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('username')}
                label="Email or Username"
                type="text"
                placeholder="Enter your email or username"
                icon={Mail}
                error={errors.username?.message}
                disabled={isLoading}
                autoComplete="username"
              />

              <Input
                {...register('password')}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={Lock}
                error={errors.password?.message}
                disabled={isLoading}
                autoComplete="current-password"
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    {...register('rememberMe')}
                    type="checkbox"
                    className="h-4 w-4 rounded border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full" 
                loading={isLoading}
                disabled={isLoading}
              >
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Don't have an account?
                </span>
              </div>
            </div>

            <Link to="/signup" className="block">
              <Button variant="outline" size="lg" className="w-full">
                Create an Account
              </Button>
            </Link>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <a href="#" className="font-medium text-foreground hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-foreground hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;