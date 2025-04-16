import axios from "axios";
import useAuth from "@/hooks/useAuth";
const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend
export const useFetchCartProducts=()=>{
  const { token } = useAuth({ userType: "user" }); // Get the token from useAuth
  const fetchCartProducts = async () => {
  
    try {
      if (!token) {
        console.error("No token found");
        return [];
      }
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in Authorization header
          "Content-Type": "application/json", // Optional, ensures proper request format
        },
      });
     
  
      return response.data; // Return the product data
    } catch (error) {
      console.error("API Error:", error);
      return [];
    };
  };
    return {fetchCartProducts};
};


