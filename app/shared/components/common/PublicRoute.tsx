import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "~/shared/hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />; // hoặc homepage
  return <>{children}</>;
};
