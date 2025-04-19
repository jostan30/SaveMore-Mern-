import axios from "axios";
import useAuth from '@/hooks/useAuth';

const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend

export const useFetchPurchasedProducts = () => {
  const authStatus = useAuth();  // Assuming useAuth returns { token, loading, isLoggedIn }
  
  const fetchPurchasedProducts = async () => {
    try {
      if (authStatus.loading) {
        console.log("Auth is still loading");
        return []; // Optionally return loading state
      }

      // To check if we have a token
      if (!authStatus.token) {
        console.error("No token found");
        return []; // Optionally display an error message in UI
      }

      const response = await axios.get(`${API_BASE_URL}/fetchPurchase`, {
        headers: {
          Authorization: `Bearer ${authStatus.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Purchased Products:", response.data.purchasedProducts);
      return response.data.purchasedProducts; // Return the product data
    } catch (error) {
      console.error("API Error:", error);
      return []; // Optionally display an error message in UI
    }
  };

  return {
    fetchPurchasedProducts,
    isAuthLoading: authStatus.loading,
    isLoggedIn: authStatus.isLoggedIn,
    token: authStatus.token
  };
};
