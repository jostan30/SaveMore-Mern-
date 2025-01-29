// hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "./use-toast";

const useAuth = ({userType}:{userType:string}) => {
  const { toast } = useToast()
    const [authStatus, setAuthStatus] = useState<{ 
        isLoggedIn: boolean;
        loading: boolean;
        error: any;
      }>({ 
        isLoggedIn: false, 
        loading: true, 
        error: null 
      });
       
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie
        .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        console.log(token);

        const api = userType==='owner'?  "http://localhost:3000/owners/loggedIn" :"http://localhost:3000/users/loggedIn";
      
        const response = await axios.get(api , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        const Authorized = response.data;
        console.log(Authorized.sucess)

        if (Authorized.sucess) {
          setAuthStatus({ isLoggedIn: true, loading: false, error: null });
        } else {
          setAuthStatus({ isLoggedIn: false, loading: false, error: null });
          toast({
            title: `Login First`,
            description: `Long time no see`
          })
        }
      } catch (error) {
        setAuthStatus({ isLoggedIn: false, loading: false, error:error});
      }
    };

    checkAuth();
  }, []);

  return authStatus;
};

export default useAuth;
