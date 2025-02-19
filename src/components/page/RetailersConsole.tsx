import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link } from "react-router-dom"; // Use React Router's Link
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import Addproduct from "../personal/Addproduct";
import { Toaster } from "../ui/toaster";
import RetailerDashboard from "../personal/RetailerDashboard";
import { fetchProducts } from "@/api/products-api";
import useAuth from "@/hooks/useAuth";


interface Product {
  _id: string;  //mongodb
  name: string;  //name of product
  price: number;   //price of the product
  discount: number;  //discount on the product
  units:number;       //units of product...actual quantity
  ShopName: string;   
  Address: string;
  description: string;
  image: string;
  owner:string
}

function SidebarDemo() {
  
  const links = [
    {
      label: "Dashboard",
      href: "/retailers/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/retailers/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/retailers/setting",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen w-screen">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
      <Toaster />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/retailers/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        SaveMore
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="retailers/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const userData = useAuth({userType:"owner"}).userData;
  const userId:string = userData?._id || "";
  console.log(userId);

  // Function to load products
  const loadProducts = async () => {
    try {
      if(!userId)return
      const response = await fetchProducts();
      console.log(response);
      const filteredProducts = response.filter((product:Product) => product.owner === userId); //filter only owners products
      console.log(filteredProducts);
      setProducts(filteredProducts); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } 
  };
  // Fetch products on mount
  useEffect(() => {
    if (userId) {
      loadProducts();
    }
  }, [userId]); 

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
        {/* Header */}
        <div className="flex h-20 w-full rounded-lg dark:bg-neutral-800 align-middle justify-between px-2">
          {/* Search bar */}
          <Input className="w-[40%] border-black" placeholder="Search item" />
          {/* Add product */}
          <Addproduct  onProductAdded={()=>loadProducts()} />
        </div>

        {/* Display items added by the retailer */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <RetailerDashboard products={products} />
        </div>
      </div>
    </div>
  );
};
function RetailersConsole() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen overflow-hidden">
      <SidebarDemo />
    </div>
  );
}
export default RetailersConsole;

