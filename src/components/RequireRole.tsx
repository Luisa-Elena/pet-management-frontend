import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type RequireRoleProps = {
  role: string;
  children: ReactNode;
};

export default function RequireRole({ role, children }: RequireRoleProps) {
  const { userInfo } = useAuth();

  if (userInfo === undefined) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  if (userInfo.role !== role) {
  return <Navigate to="/forbidden" replace />;
}

  return <>{children}</>;
}
