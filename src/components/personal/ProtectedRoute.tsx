// components/ProtectedRoute.js
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children,userType }:{children:ReactNode ,userType:string}) => {
  const { isLoggedIn, loading, error } = useAuth({userType});

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message || "Something went wrong!"}</div>;

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
