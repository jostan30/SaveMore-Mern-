import axios from "axios";
import useAuth from "@/hooks/useAuth";
const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend
export const useFetchCartProducts=()=>{
  const authStatus = useAuth(); // Get the token from useAuth

  const fetchCartProducts = async () => {
  
    try {
      if (authStatus.loading) {
        console.log("Auth is still loading");
        return [];
      }
      
      // Check if we have a token
      if (!authStatus.token) {
        console.error("No token found");
        return [];
      }
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${authStatus.token}`, // Add token in Authorization header
          "Content-Type": "application/json", // Optional, ensures proper request format
        },
      });
     console.log("Return cart data in api",response);
     
  
      return response.data; // Return the product data
    } catch (error) {
      console.error("API Error:", error);
      return [];
    };
  };
    return {fetchCartProducts,
        isAuthLoading: authStatus.loading,
      isLoggedIn: authStatus.isLoggedIn,
      token: authStatus.token};
};


