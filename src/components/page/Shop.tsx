

import { fetchProducts } from "@/api/products-api";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import RetailerDashboard from "../personal/RetailerDashboard";

import { ShoppingCartIcon, User, Menu, Bell, Tag, Leaf, Apple, Award } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/badge";
import { useFetchCartProducts } from "@/api/cartProducts-api";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  units: number;
  image: string;
  quantity: number;
  expiryDate: string; // ISO date string
  daysRemaining: number;
}

export const Logo = () => {
  return (
    <Link
      to="/users"

      className="relative z-20 flex items-center py-1 space-x-2 text-xl font-normal text-black dark:text-white"
    >
      <div className="flex-shrink-0 h-6 bg-green-600 rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg w-7 dark:bg-green-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre"
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

      <div className="flex-shrink-0 h-6 bg-green-600 rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg w-7 dark:bg-green-500" />
    </Link>
  );
};

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProduct, setCartProduct] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchCartProducts, isAuthLoading, isLoggedIn } = useFetchCartProducts();
  const navigate = useNavigate();

  // Function to load cart products
  const loadCartProducts = async () => {
    if (isAuthLoading) {
      console.log("Auth is still loading, will fetch cart later");
      return;
    }
    
    if (!isLoggedIn) {
      console.log("User is not logged in");
      return;
    }
    
    try {
      const response = await fetchCartProducts();
      setCartProduct(response || []); // Ensure it's always an array
    } catch (error) {
      console.log("Error fetching cart products:", error);
      setCartProduct([]);
    }
  };

  // Function to load products
  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      console.log("The products loaded are", response);
      setProducts(response || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    loadProducts();
  }, []);
  
  // Fetch cart products when auth is ready
  useEffect(() => {
    if (!isAuthLoading) {
      loadCartProducts();
    }
  }, [isAuthLoading, isLoggedIn]);

  // Categories for the sidebar
  const categories = [
    { id: "all", name: "All Products", icon: <Apple className="w-5 h-5" /> },
    { id: "fruits", name: "Fruits & Vegetables", icon: <Leaf className="w-5 h-5" /> },
    { id: "bakery", name: "Bakery Items", icon: <Award className="w-5 h-5" /> },
    { id: "discount", name: "Discounted Items", icon: <Tag className="w-5 h-5" /> }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (

    <div className="flex h-full bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Hidden on mobile unless menu is open */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed md:static z-30 h-full w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none ${
              isMobileMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            {/* Close button for mobile only */}
            <button
              onClick={toggleMobileMenu}
              className="absolute text-gray-600 top-4 right-4 md:hidden"
            >
              &times;
            </button>
            
            <div className="flex flex-col h-full p-4">
              <div className="mt-4 mb-8">
                <Logo />
              </div>
              
              <nav className="flex-1">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Button
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className={`w-full justify-start text-left ${
                          selectedCategory === category.id 
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="mr-3">{category.icon}</span>
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-auto">
                <div className="p-4 mb-4 rounded-lg bg-green-50 dark:bg-green-900/30">
                  <h4 className="mb-2 font-semibold text-green-700 dark:text-green-300">Food Waste Facts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    1/3 of all food produced globally goes to waste. Together, we can make a difference!
                  </p>
                </div>
                
                {isLoggedIn ? (
                  <div className="flex items-center p-3 border-t dark:border-gray-700">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Your Account</p>
                      <p className="text-xs text-gray-500">Manage settings</p>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => navigate("/login")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top navbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left section */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                <Menu className="w-6 h-6" />
              </Button>
              
              {/* Logo for mobile */}
              <div className="ml-2 md:hidden">
                <LogoIcon />
              </div>
            </div>
            
            {/* Search bar */}
            <div className="flex-1 hidden max-w-xl mx-8 md:block">
              <div className="relative">
                <Input 
                  className="pl-10 pr-4 border-gray-300 rounded-full focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600" 
                  placeholder="Search for sustainable groceries..." 
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Right section with cart and notification */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="w-6 h-6" />
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-green-500">
                    2
                  </Badge>
                </Button>
              </div>
              
              {/* Cart */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative"
                  onClick={() => navigate("/users/cart", {})}
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs"
                  >
                    {Array.isArray(cartProduct) ? cartProduct.length : 0}
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile search bar */}
          <div className="px-4 pb-3 md:hidden">
            <Input 
              className="w-full pl-10 pr-4 border-gray-300 rounded-full" 
              placeholder="Search for sustainable groceries..." 
            />
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-7">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-auto md:p-6">
          {/* Featured categories tabs */}
          <Tabs defaultValue="popular" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Explore Sustainable Shopping</h2>
              <TabsList className="bg-gray-100 dark:bg-gray-700">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="expiring">Soon Expiring</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="popular" className="m-0">
              <RetailerDashboard products={products} />
            </TabsContent>
            <TabsContent value="nearby" className="m-0">
              <RetailerDashboard products={products.filter(p => p.ShopName.includes("Local"))} />
            </TabsContent>
            <TabsContent value="expiring" className="m-0">
              <RetailerDashboard products={products.filter(p => p.discount > 20)} />
            </TabsContent>
          </Tabs>

          {/* Impact Section */}
          <div className="p-6 mb-8 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 text-center md:text-left md:mb-0">
                <h3 className="mb-2 text-2xl font-bold text-green-800 dark:text-green-300">Your Impact So Far</h3>
                <p className="max-w-xl text-gray-600 dark:text-gray-300">
                  By shopping with SaveMore, you've helped reduce food waste and contributed to a more sustainable future.
                </p>
              </div>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">23kg</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Food Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">$187</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Money Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Purchases</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Display the products */}
          
        </main>
      </div>
    </div>
  );
}

export default Shop;