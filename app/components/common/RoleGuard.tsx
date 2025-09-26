import type { JSX } from "react";
import { Navigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";

const RoleGuard : React.FC<{ roles: string[],children: JSX.Element}> = ({ roles,children }) => {
  const {user} = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />; // role khong hop le
  return children;
}