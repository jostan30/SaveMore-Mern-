import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "./use-toast";

// Define types for the state
interface AuthStatus {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  userData: Record<string, any> | null; // Allow any object or null
  token:string | null;
}

interface AuthResponse {
  success: boolean;
  owner?: { _id: string } & Record<string, any>; // Owner object with any additional fields
  user?: { _id: string } & Record<string, any>;  // User object with any additional fields
}

const useAuth = ({ userType }: { userType: string }) => {
  const { toast } = useToast();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isLoggedIn: false,
    loading: true,
    error: null,
    userData: null,
    token:null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("No token found at useAuth")
        if (!token) {
          throw new Error("Token is missing");
        }

        const api =
          userType === "owner"
            ? "http://localhost:3000/owners/loggedIn"
            : "http://localhost:3000/users/loggedIn";

        const response = await axios.get<AuthResponse>(api, {
          headers: { Authorization: `Bearer ${token}` },
          
        });
        
        if (!response.data.success) {
          throw new Error("Authentication failed");
        }

        // Extract the user/owner object
        const userData = response.data.owner || response.data.user || null;

        setAuthStatus({
          isLoggedIn: true,
          loading: false,
          error: null,
          userData:  userData || null, 
          token
        });
      } catch (error: any) {
        toast({
          title: `Login First`,
          description: `Long time no see`,
        });

        setAuthStatus({
          isLoggedIn: false,
          loading: false,
          error: error.message || "An error occurred",
          userData: null,
          token:null
        });
      }
    };

    checkAuth();
  }, [userType]);

  return authStatus;
};

export default useAuth;
