'use server'
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "../ui/toaster";
import { fetchCartProducts } from "@/api/cartProducts-api";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  units: number; // This will now show the quantity in the cart
  image: string; // Base64 string
  quantity: number; // Quantity of the product in the cart
}

function Cart() {
  const [CartProduct, setCartProduct] = useState<Product[]>([]);
  console.log(CartProduct);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const handleBuyNow = (productId: string) => {
    console.log(`Buying product with ID: ${productId}`);
    // Add logic for purchasing the product
  };

  const handleRemove = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/delete/${productId}`, {
        method: "GET", // Assuming it's a GET request
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      console.log(response)
      if (response.ok) {
        toast({
          title: "Item Removed Successfully",
          description: `Keep Shopping`,
        });
        loadCartProducts(); // Refresh cart after removal
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Failed to remove Item`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function to load cart products
  const loadCartProducts = async () => {
    try {
      const response = await fetchCartProducts();
      setCartProduct(response); // Set cart products state
    } catch (error) {
      console.log("Error fetching cart products:", error);
    }
  };

  // Use useEffect to load cart products when component mounts
  useEffect(() => {
    loadCartProducts();
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  return (
    <div className="flex flex-col h-screen bg-[#f1f3f6] justify-center items-center ">
      <div className="flex flex-col h-full md:p-10 justify-between md:w-[70%]">
        {/* Address */}
        <div className="flex justify-between p-4 bg-[#fff] mt-2 px-4">
          <span>Address</span>
          <Button variant="outline">Enter Address</Button>
        </div>
        
        {/* Cart Products */}
        <div className="flex-1 justify-center p-4 bg-[#fff] mt-2 overflow-y-auto">
          {Array.isArray(CartProduct) && CartProduct.length > 0 ? (
            CartProduct.map((product: Product, index: number) => (
              <div
              key={index}
                className="flex justify-between items-center p-4 border-b border-gray-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`data:image/png;base64,${product.image}`}
                    alt={product.name}
                    className="md:w-40 md:h-40 h-20 w-20 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600">Price: ${product.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p> {/* Displaying the quantity */}
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={() => handleBuyNow(product._id)}>
                      Buy Now
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(product._id)} // Removing only one instance
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl ">Your cart is empty!</p>
          )}
        </div>
        
      </div>
      <Toaster />
    </div>
  );
}

export default Cart;
