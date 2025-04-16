import { fetchProducts } from "@/api/products-api";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import RetailerDashboard from "../personal/RetailerDashboard";
import { Loader, ShoppingCartIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
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

export const Logo = () => {
  return (
    <Link
      to="/users"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
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
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>
  );
};

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    loadProducts();
    loadCartProducts();
    setLoading(false);
  }, [cartProduct]);


  return (


    <div className="flex flex-col flex-1 h-full">
      <div className="flex flex-col items-center flex-1 w-full h-full gap-4 p-2 bg-white border md:p-10 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
        <Logo />
        {/* Header */}
        <div className="flex justify-center w-full h-20 px-2 space-x-3 align-middle rounded-lg dark:bg-neutral-800 ">
          {/* Search bar */}
          <Input className="md:w-[40%] w-[70%] border-black" placeholder="Search item" />
          {/* Cart */}
          <div className="relative">
            <ShoppingCartIcon
              className="w-8 h-8 mt-1 cursor-pointer"
              onClick={() => { navigate("/users/cart", {}); }}
            />
            <Badge
              variant="destructive"
              className="absolute px-2 text-xs cursor-pointer -top-2 -right-2 rounded-xl"
            >
              {cartProduct ? cartProduct.length : 0}
            </Badge>
          </div>
        </div>

        {

          //Display items added by the retailer
          <div className="justify-center flex-1 min-h-0 overflow-hidden">
            <RetailerDashboard products={products} loading={loading} />
          </div>

        }


      </div>
    </div>
  );
}
export default Shop;
