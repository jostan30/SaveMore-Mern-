import { fetchProducts } from "@/api/products-api";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import RetailerDashboard from "../personal/RetailerDashboard";
import { ShoppingCartIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { useFetchCartProducts } from "@/api/cartProducts-api";

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

export const Logo = () => {
  return (
    <Link
      to="/users"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-purple-800 dark:text-white whitespace-pre"
      >
        SaveMore
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/users"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const {fetchCartProducts}=useFetchCartProducts();
  const navigate = useNavigate();

  // Function to load cart products
  const loadCartProducts = async () => {
    try {
      const response = await fetchCartProducts();
      console.log(response)
      setCartProduct(response); // Set cart products state
    } catch (error) {
      console.log("Error fetching cart products:", error);
    }
  };

  // Function to load products
  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response); // Set products state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products and cart on mount
  useEffect(() => {
    loadProducts();
    loadCartProducts();
  }, [products,cartProduct]);


  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 items-center bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
        <Logo />
        {/* Header */}
        <div className="flex h-20 w-full rounded-lg dark:bg-neutral-800 align-middle justify-center px-2 space-x-3 ">
          {/* Search bar */}
          <Input className="md:w-[40%] w-[70%] border-black" placeholder="Search item" />
          {/* Cart */}
          <div className="relative">
            <ShoppingCartIcon
              className="mt-1 cursor-pointer w-8 h-8"
              onClick={() => { navigate("/users/cart", {});}}
            />
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 text-xs px-2 rounded-xl cursor-pointer"
            >
              {cartProduct ? cartProduct.length : 0}
            </Badge>
          </div>
        </div>

        {/* Display items added by the retailer */}
        <div className="flex-1 justify-center min-h-0 overflow-hidden">
          <RetailerDashboard products={products} />
        </div>
      </div>
    </div>
  );
}
export default Shop;
