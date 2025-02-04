import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend

export const fetchCartProducts = async () => {
  try {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1]; 
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in Authorization header
        "Content-Type": "application/json", // Optional, ensures proper request format
      },
    });
    console.log(response.data)

    return response.data; // Return the product data
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
