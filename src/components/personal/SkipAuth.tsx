// components/SkipAuth.js
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SkipAuth = ({ children }:{children:ReactNode }) => {
  const { isLoggedIn, loading  ,userRole } = useAuth();

  if (loading) return <div>Loading...</div>;

 
  
if(isLoggedIn && location.pathname === '/') {
    return userRole === "retailer" ?   <Navigate to="/retailers" replace />: <Navigate to="/users" replace />;
}
 


  return  <>{children}</>;
};

export default SkipAuth;
