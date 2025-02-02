import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shop`);
    return response.data; // Return the product data
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
