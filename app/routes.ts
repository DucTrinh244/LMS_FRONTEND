import { type RouteConfig, index, route } from '@react-router/dev/routes';
import ProtectedRoute from '~/components/ProtectedRoute';

// Import pages trực tiếp
import HomePage from '~/routes/home';
import LoginPage from '~/routes/auth/login';
import RegisterPage from '~/routes/auth/register';
import ForgotPasswordPage from '~/routes/auth/forgot-password';
import ResetPasswordPage from '~/routes/auth/reset-password';
import VerifyEmailPage from '~/routes/auth/verify-email';
import DashboardLayout from '~/routes/dashboard/_layout';

export default [
  index(() => <HomePage />),

  // Auth
  route('login', () => <LoginPage />),
  route('register', () => <RegisterPage />),
  route('forgot-password', () => <ForgotPasswordPage />),
  route('reset-password', () => <ResetPasswordPage />),
  route('verify-email', () => <VerifyEmailPage />),

  // Protected Dashboard
  route('dashboard', () => (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  )),
] satisfies RouteConfig;
