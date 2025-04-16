import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { Routes,Route } from "react-router-dom";
//import Shop from "./Shop";
import {
  IconArrowLeft,
  IconDashboard,
  IconSettings,
  IconUser,
  IconPackage,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import AddProduct from "../personal/Addproduct";
import { Toaster } from "../ui/toaster";
import RetailerDashboard from "../personal/RetailerDashboard";
import { fetchProducts } from "@/api/products-api";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { IconShoppingCart } from "@tabler/icons-react";
import { PurchasedProductsView } from "../personal/OrderRetailer";
interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  units: number;
  ShopName: string;
  Address: string;
  description: string;
  image: string;
  owner: string;
  expiryDate: string; // ISO date string
  daysRemaining: number;
}

function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/retailers",
      icon: (
        <IconDashboard className="flex-shrink-0 w-5 h-5 text-neutral-700" />
      ),
    },
   
    {
      label: "Purchased Products",
      href: "/retailers/orders",
      icon: (
        <IconShoppingCart className="flex-shrink-0 w-5 h-5 text-neutral-700" />
      ),
      badge: "5", // This shows the number of new orders
    },
    {
      label: "Profile",
      href: "/retailers/profile",
      icon: (
        <IconUser className="flex-shrink-0 w-5 h-5 text-neutral-700" />
      ),
    },
    {
      label: "Settings",
      href: "/retailers/settings",
      icon: (
        <IconSettings className="flex-shrink-0 w-5 h-5 text-neutral-700" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-screen h-screen mx-auto overflow-hidden bg-white md:flex-row">
      <Sidebar open={open} setOpen={setOpen} animate={false} className="border-r border-blue-700 bg-gradient-to-b from-blue-600 to-blue-800">
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="flex flex-col gap-2 mt-8">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  className="px-3 py-2 text-white transition-colors rounded-lg hover:bg-blue-700"
                  badge={link.badge ? (
                    <span className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-red-500 rounded-full">
                      {link.badge}
                    </span>
                  ) : null}
                />
              ))}
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-blue-500">
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <div className="relative">
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="flex-shrink-0 border-2 border-white rounded-full h-9 w-9"
                      alt="Avatar"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white"></span>
                  </div>
                ),
              }}
              className="text-white transition-colors rounded-lg hover:bg-blue-700"
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<PurchasedProductsView />} />
         
          <Route path="/profile" />
          <Route path="/setting" />
          {/* Add other routes as needed */}
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/retailers/"
      className="relative z-20 flex items-center p-4 space-x-2 text-lg font-semibold text-white"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
        <span className="text-sm font-bold text-blue-600">SM</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-black whitespace-pre"
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
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
        <span className="text-sm font-bold text-blue-600">SM</span>
      </div>
    </Link>
  );
};

// Dashboard component with improved UI
const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userData = useAuth().userData;
  const userId: string = userData?._id || "";

  // Stats
  const totalProducts = products.length;
  const totalUnits = products.reduce((sum, product) => sum + product.units, 0);
  const averagePrice = products.length > 0 
    ? (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2) 
    : "0.00";

  // Function to load products
  const loadProducts = async () => {
    try {
      if(!userId) return;
      const response = await fetchProducts();
      const filteredProducts = response.filter((product: Product) => product.owner === userId);
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

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex flex-col flex-1 w-full h-full gap-6 p-2 overflow-hidden bg-white md:p-6">
        {/* Header with greeting and date */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userData?.name || "Retailer"}</h1>
            <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-gray-200">
              <IconSettings size={18} className="mr-2" /> Settings
            </Button>
            <div className="relative">
              <img
                src="https://assets.aceternity.com/manu.png"
                className="flex-shrink-0 w-10 h-10 border border-gray-200 rounded-full"
                alt="Avatar"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-1 ring-white"></span>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="text-white bg-gradient-to-r from-blue-500 to-blue-600">
            <CardContent className="flex flex-col p-4">
              <span className="text-blue-100">Total Products</span>
              <span className="text-3xl font-bold">{totalProducts}</span>
            </CardContent>
          </Card>
          <Card className="text-white bg-gradient-to-r from-purple-500 to-purple-600">
            <CardContent className="flex flex-col p-4">
              <span className="text-purple-100">Total Units</span>
              <span className="text-3xl font-bold">{totalUnits}</span>
            </CardContent>
          </Card>
          <Card className="text-white bg-gradient-to-r from-emerald-500 to-emerald-600">
            <CardContent className="flex flex-col p-4">
              <span className="text-emerald-100">Average Price</span>
              <span className="text-3xl font-bold">${averagePrice}</span>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add Product */}
        <div className="flex flex-col justify-between gap-4 mt-2 mb-2 md:flex-row">
          <div className="relative flex-1">
            <IconSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
            <Input 
              className="w-full pl-10 border-gray-200 rounded-lg" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AddProduct onProductAdded={loadProducts}  />
        </div>

        {/* Products area with shadow and rounded corners */}
        <div className="flex-1 min-h-0 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Your Products</h2>
            <p className="text-sm text-gray-500">Manage and monitor your product inventory</p>
          </div>
          <div className="p-4 overflow-auto h-full max-h-[calc(100%-70px)]">
            {/* Passing filtered products to RetailerDashboard component */}
            {filteredProducts.length > 0 ? (
              <RetailerDashboard products={filteredProducts} />
            ) : (
              <div className="py-16 text-center">
                <IconPackage size={64} className="mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-800">No products found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try a different search term" : "Add your first product to get started"}
                </p>
                {!searchTerm && (
                  <Button 
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      const addProductButton = document.querySelector("[data-add-product]");
                      if (addProductButton) {
                        (addProductButton as HTMLElement).click();
                      }
                    }}
                  >
                    <IconPlus size={18} className="mr-2" />
                    Add Product
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function RetailersConsole() {
  return (
    <div className="fixed inset-0 flex w-screen h-screen overflow-hidden">
      <SidebarDemo />
    </div>
  );
}

export default RetailersConsole;
