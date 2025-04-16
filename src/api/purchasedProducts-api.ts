import axios from "axios";
import useAuth from '@/hooks/useAuth';

const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend

export const useFetchPurchasedProducts =() => {
  const authStatus=useAuth();
  const fetchPurchasedProducts=async()=>{
    try {
      if(authStatus.loading){
        console.log("Auth is stil loading");
        return [];
      }
      //to check if we have a token
      if(!authStatus.token){
        console.error("No token found");
        return [];
      }
      
      const response = await axios.get(`${API_BASE_URL}/fetchPurchase`,{
        headers:{
          Authorization:`Bearer ${authStatus.token}`, 
          "Content-Type":"application/json",
        },
      });
      console.log("The orders data has been returned from the api",response);
      
      return response.data; // Return the product data
    } catch (error) {
      console.error("API Error:", error);
      return [];
    };
  };
  return {
    fetchPurchasedProducts,
    isAuthLoading: authStatus.loading,
    isLoggedIn: authStatus.isLoggedIn,
    token: authStatus.token
  }
};