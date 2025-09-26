import type { JSX } from "react";
import { Navigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";

const ProtectedRoute : React.FC<{children: JSX.Element}> = ({children}) => {
  const {user} = useAuth(); // hook tra ve user hien tai 
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;