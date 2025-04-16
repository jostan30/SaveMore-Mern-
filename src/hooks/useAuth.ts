import { useState, useEffect } from "react";
import axios from "axios";

interface UserData {
  _id: string;
  email:string;
  name: string;
  products:Product[];
}
interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  units: number;
  ShopName: string;
  Address: string;
  description: string;
  image: string;
  owner: string;
  expiryDate: string; // ISO date string
  daysRemaining: number;
}

// Define types for the state
interface AuthStatus {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  userRole: string | null;
  userData :UserData |null
  token: string | null;
}

interface AuthResponse {
  success: boolean;
  data: UserData;
  role: string;
}

const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isLoggedIn: false,
    loading: true,
    error: null,
    userRole: null,
    token: null,
    userData:null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is missing");
        }

        const api = "http://localhost:3000/verifyToken"
        const response = await axios.get<AuthResponse>(api, {
          headers: { Authorization: `Bearer ${token}` },
        });



        if (!response.data.success) {
          throw new Error("Authentication failed");
        }
   

        setAuthStatus({
          isLoggedIn: true,
          loading: false,
          error: null,
          userData:response.data.data,
          userRole: response.data.role,
          token
        });
      } catch (error: any) {
        setAuthStatus({
          isLoggedIn: false,
          loading: false,
          userData: null,
          error: error.message || "An error occurred",
          userRole: null,
          token: null
        });
      }
    };

    checkAuth();
  }, []);

  return authStatus;
};

export default useAuth;
