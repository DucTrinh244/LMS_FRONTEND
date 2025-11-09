import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/context/authContext';
import { useToast } from '~/shared/hooks/useToast';
import { UserRole } from '~/types/auth/entities';
import type { LoginFormData } from '~/types/auth/login';
import { mapFormDataToLoginRequest } from '~/utils/helpers/AuthHeper';

// Helper function để lấy dashboard path theo role
const getDashboardByRole = (role?: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return '/admin';
    case UserRole.INSTRUCTOR:
      return '/instructor'; 
    case UserRole.STUDENT:
      return '/student';
    default:
      return '/';
  }
};

const Login: React.FC = () => {
  const { login, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {toast} = useToast();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Lấy trang user muốn truy cập trước khi bị redirect về login
  const from = location.state?.from?.pathname;

  // Nếu đã login rồi thì redirect về dashboard
  useEffect(() => {
    if (user && !authLoading) {
      const dashboardPath = getDashboardByRole(user.roles[0]);
      navigate(dashboardPath, { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const loginRequest = mapFormDataToLoginRequest(formData);
      await login(loginRequest);
      
      toast.success('Login successfully !')

      // Đợi một chút để state update
      setTimeout(() => {
        // Lấy user từ localStorage (vì context có thể chưa update kịp)
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          // Gọi getProfile để lấy thông tin user mới nhất
          import('~/module/auth/services/auth').then(({ authService }) => {
            authService.getProfile().then(res => {
              const userRole = res.user.roles[0];
              
              // Nếu có trang muốn truy cập trước đó và không phải login
              if (from && from !== '/login' && from !== '/register') {
                navigate(from, { replace: true });
              } else {
                console.log('User role after login:', userRole);
                // Navigate đến dashboard theo role
                const dashboardPath = getDashboardByRole(userRole);
                navigate(dashboardPath, { replace: true });
              }
            });
          });
        }
      }, 100);

    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Invalid email or password');
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  // Hiển thị loading khi đang check auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
          <p className="mt-4 text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-300">
          Or{' '}
          <Link to="/register" className="font-medium text-violet-400 hover:text-violet-300">
            create a new account
          </Link>
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow-md rounded-xl sm:px-10 border border-slate-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm 
                    text-white placeholder-slate-400 bg-slate-700 
                    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm ${
                      errors.email ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-600'
                    }`}
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-slate-400 hover:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm 
                    text-white placeholder-slate-400 bg-slate-700 
                    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm ${
                      errors.password ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-600'
                    }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-slate-400 hover:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-slate-400 hover:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-slate-600 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-violet-400 hover:text-violet-300">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                  text-sm font-medium rounded-md text-white bg-gradient-to-r from-violet-600 to-purple-600 
                  hover:shadow-violet-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                  hover:shadow-lg disabled:hover:shadow-none"
              >
                {isLoading && (
                  <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <svg className="h-5 w-5 text-slate-300" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button 
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <svg className="h-5 w-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login