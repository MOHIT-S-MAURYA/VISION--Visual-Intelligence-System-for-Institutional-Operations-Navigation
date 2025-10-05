import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/shared/Card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shared/Select';
import { User, Mail, Lock, Eye, EyeOff, Building, GraduationCap, UserPlus } from 'lucide-react';
import { PasswordStrengthBar } from '@/components/shared/PasswordStrengthBar';
import AuthLayout from '@/layouts/AuthLayout';
import toast from 'react-hot-toast';

const mockDepartments = [
	{ value: '1', label: 'Computer Science' },
	{ value: '2', label: 'Information Technology' },
	{ value: '3', label: 'Electronics Engineering' },
];

const roleOptions = [
	{ value: 'Student', label: 'Student' },
	{ value: 'Teacher', label: 'Teacher' },
	{ value: 'Department Admin', label: 'Department Admin' },
];

const signupSchema = yup.object({
	name: yup.string().required('Full name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
	confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
	role: yup.string().required('Please select your role'),
	departmentId: yup.string().when('role', {
		is: (role: string) => role === 'Student' || role === 'Teacher',
		then: (schema) => schema.required('Please select your department'),
		otherwise: (schema) => schema.notRequired(),
	}),
	acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

type SignupFormData = yup.InferType<typeof signupSchema>;

export function Signup() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [departments, setDepartments] = useState(mockDepartments);

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: yupResolver(signupSchema) as any,
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			role: '',
			departmentId: '',
			acceptTerms: false,
		}
	});

	const watchedPassword = watch('password', '');
	const watchedRole = watch('role', '');

	useEffect(() => {
		// In a real app, you would fetch departments from an API
		setDepartments(mockDepartments);
	}, []);

	const onSubmit = async (data: SignupFormData) => {
		setIsLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));

			console.log('Registration data:', data);

			toast.success('Account created successfully! Redirecting to login...');

			setTimeout(() => {
				navigate('/login');
			}, 2000);
		    } catch (error: unknown) {
			console.error('Signup error:', error);
			toast.error('Registration failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const shouldShowDepartment = watchedRole === 'Student' || watchedRole === 'Teacher';

	return (
		<AuthLayout>
			<Card className="w-full max-w-lg">
				<CardHeader className="text-center">
					<div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
						<UserPlus className="w-6 h-6" />
					</div>
					<CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
					<CardDescription>Join VISION to transform your institution</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								{...register('name')}
								placeholder="Full Name"
								icon={User}
								error={errors.name?.message}
								disabled={isLoading}
							/>
							<Input
								{...register('email')}
								type="email"
								placeholder="Email Address"
								icon={Mail}
								error={errors.email?.message}
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-2">
							<Input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								icon={Lock}
								error={errors.password?.message}
								disabled={isLoading}
								suffix={
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="text-muted-foreground"
									>
										{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								}
							/>
							{watchedPassword && <PasswordStrengthBar password={watchedPassword} />}
						</div>

						<Input
							{...register('confirmPassword')}
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder="Confirm Password"
							icon={Lock}
							error={errors.confirmPassword?.message}
							disabled={isLoading}
							suffix={
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="text-muted-foreground"
								>
									{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							}
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Controller
								name="role"
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isLoading}
									>
										<SelectTrigger>
											<div className="flex items-center gap-2">
												<GraduationCap className="w-4 h-4 text-muted-foreground" />
												<span>
													{field.value
														? roleOptions.find((r) => r.value === field.value)?.label
														: 'Select your role'}
												</span>
											</div>
										</SelectTrigger>
										<SelectContent>
											{roleOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
							{shouldShowDepartment && (
								<Controller
									name="departmentId"
									control={control}
									render={({ field }) => (
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={isLoading}
										>
											<SelectTrigger>
												<div className="flex items-center gap-2">
													<Building className="w-4 h-4 text-muted-foreground" />
													<span>
														{field.value
															? departments.find((d) => d.value === field.value)?.label
															: 'Select department'}
													</span>
												</div>
											</SelectTrigger>
											<SelectContent>
												{departments.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							)}
						</div>
						{errors.role && <p className="text-sm font-medium text-destructive">{errors.role.message}</p>}
						{errors.departmentId && <p className="text-sm font-medium text-destructive">{errors.departmentId.message}</p>}

						<div className="flex items-start space-x-2 pt-2">
							<input
								type="checkbox"
								id="acceptTerms"
								{...register('acceptTerms')}
								className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
							/>
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="acceptTerms"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I accept the{' '}
									<Link to="/terms" className="text-primary hover:underline">
										terms and conditions
									</Link>
								</label>
								{errors.acceptTerms && (
									<p className="text-sm font-medium text-destructive">{errors.acceptTerms.message}</p>
								)}
							</div>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Creating Account...' : 'Create Account'}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="text-center text-sm">
					<p className="text-muted-foreground">
						Already have an account?{' '}
						<Link to="/login" className="text-primary hover:underline font-medium">
							Sign In
						</Link>
					</p>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}

export default Signup;