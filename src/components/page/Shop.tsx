// // import { fetchProducts } from "@/api/products-api";
// // import { useEffect, useState } from "react";
// // import { Input } from "../ui/input";
// // import RetailerDashboard from "../personal/RetailerDashboard";
// // import { ShoppingCartIcon } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { Badge } from "../ui/badge";
// // import { useFetchCartProducts } from "@/api/cartProducts-api";

// // interface Product {
// //   _id: string;
// //   name: string;
// //   price: number;
// //   discount: number;
// //   ShopName: string;
// //   Address: string;
// //   description: string;
// //   units: number; // This will now show the quantity in the cart
// //   image: string; // Base64 string
// //   quantity: number; // Quantity of the product in the cart
// // }

// // export const Logo = () => {
// //   return (
// //     <Link
// //       to="/users"
// //       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
// //     >
// //       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
// //       <motion.span
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         className="font-medium text-black dark:text-white whitespace-pre"
// //       >
// //         SaveMore
// //       </motion.span>
// //     </Link>
// //   );
// // };

// // export const LogoIcon = () => {
// //   return (
// //     <Link
// //       to="/users"
// //       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
// //     >
// //       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
// //     </Link>
// //   );
// // };

// // function Shop() {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [cartProduct, setCartProduct] = useState<Product[]>([]);
// //   const {fetchCartProducts,isAuthLoading,isLoggedIn}=useFetchCartProducts();
// //   const navigate = useNavigate();

// //   // Function to load cart products
// //   const loadCartProducts = async () => {
// //     if (isAuthLoading) {
// //       console.log("Auth is still loading, will fetch cart later");
// //       return;
// //     }
    
// //     if (!isLoggedIn) {
// //       console.log("User is not logged in");
// //       return;
// //     }
// //     try {
// //       const response = await fetchCartProducts();
// //       console.log("The cart products loaded are",response)
// //       setCartProduct(response); // Set cart products state
// //     } catch (error) {
// //       console.log("Error fetching cart products:", error);
// //     }
// //   };

// //   // Function to load products
// //   const loadProducts = async () => {
// //     try {
// //       const response = await fetchProducts();
// //       console.log("Th eproducts loaded are",response);
      
// //       setProducts(response); // Set products state
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //     }
// //   };

// //   // Fetch products and cart on mount
// //   useEffect(() => {
// //     loadProducts();
  
// //   }, []);
// //  // Fetch cart products when auth is ready
// //  useEffect(() => {
// //   if (!isAuthLoading) {
// //     loadCartProducts();
// //   }
// // }, [isAuthLoading]);


// //   return (
// //     <div className="flex flex-1 flex-col h-full">
// //       <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 items-center bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
// //         <Logo />
// //         {/* Header */}
// //         <div className="flex h-20 w-full rounded-lg dark:bg-neutral-800 align-middle justify-center px-2 space-x-3 ">
// //           {/* Search bar */}
// //           <Input className="md:w-[40%] w-[70%] border-black" placeholder="Search item" />
// //           {/* Cart */}
// //           <div className="relative">
// //             <ShoppingCartIcon
// //               className="mt-1 cursor-pointer w-8 h-8"
// //               onClick={() => { navigate("/users/cart", {});}}
// //             />
// //             <Badge
// //               variant="destructive"
// //               className="absolute -top-2 -right-2 text-xs px-2 rounded-xl cursor-pointer"
// //             >
// //               {cartProduct ? cartProduct.length : 0}
// //             </Badge>
// //           </div>
// //         </div>

// //         {/* Display items added by the retailer */}
// //         <div className="flex-1 justify-center min-h-0 overflow-hidden">
// //           <RetailerDashboard products={products} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // export default Shop;
// import { fetchProducts } from "@/api/products-api";
// import { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import RetailerDashboard from "../personal/RetailerDashboard";
// import { ShoppingCartIcon } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Badge } from "../ui/badge";
// import { useFetchCartProducts } from "@/api/cartProducts-api";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discount: number;
//   ShopName: string;
//   Address: string;
//   description: string;
//   units: number;
//   image: string;
//   quantity: number;
// }

// export const Logo = () => {
//   return (
//     <Link
//       to="/users"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//         SaveMore
//       </motion.span>
//     </Link>
//   );
// };

// export const LogoIcon = () => {
//   return (
//     <Link
//       to="/users"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   );
// };

// function Shop() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [cartProduct, setCartProduct] = useState<Product[]>([]);
//   const { fetchCartProducts, isAuthLoading, isLoggedIn } = useFetchCartProducts();
//   const navigate = useNavigate();

//   // Function to load cart products
//   const loadCartProducts = async () => {
//     if (isAuthLoading) {
//       console.log("Auth is still loading, will fetch cart later");
//       return;
//     }
    
//     if (!isLoggedIn) {
//       console.log("User is not logged in");
//       return;
//     }
    
//     try {
//       const response = await fetchCartProducts();
//       console.log("The cart products loaded are", response);
//       setCartProduct(response || []); // Ensure it's always an array
//     } catch (error) {
//       console.log("Error fetching cart products:", error);
//       setCartProduct([]);
//     }
//   };

//   // Function to load products
//   const loadProducts = async () => {
//     try {
//       const response = await fetchProducts();
//       console.log("The products loaded are", response);
//       setProducts(response || []); // Ensure it's always an array
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]);
//     }
//   };

//   // Fetch products on mount
//   useEffect(() => {
//     loadProducts();
//   }, []);
  
//   // Fetch cart products when auth is ready
//   useEffect(() => {
//     if (!isAuthLoading) {
//       loadCartProducts();
//     }
//   }, [isAuthLoading, isLoggedIn]);

//   return (
//     <div className="flex flex-1 flex-col h-full">
//       <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 items-center bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
//         <Logo />
//         {/* Header */}
//         <div className="flex h-20 w-full rounded-lg dark:bg-neutral-800 align-middle justify-center px-2 space-x-3 ">
//           {/* Search bar */}
//           <Input className="md:w-[40%] w-[70%] border-black" placeholder="Search item" />
//           {/* Cart */}
//           <div className="relative">
//             <ShoppingCartIcon
//               className="mt-1 cursor-pointer w-8 h-8"
//               onClick={() => { navigate("/users/cart", {});}}
//             />
//             <Badge
//               variant="destructive"
//               className="absolute -top-2 -right-2 text-xs px-2 rounded-xl cursor-pointer"
//             >
//               {Array.isArray(cartProduct) ? cartProduct.length : 0}
//             </Badge>
//           </div>
//         </div>

//         {/* Auth Status (Optional - you can remove this if you don't want to show it) */}
//         {isAuthLoading && (
//           <div className="p-2 text-sm text-blue-600">Loading authentication...</div>
//         )}
//         {!isAuthLoading && !isLoggedIn && (
//           <div className="p-2 text-sm text-yellow-600">
//             Not logged in. Some features may be limited.
//           </div>
//         )}

//         {/* Display items added by the retailer */}
//         <div className="flex-1 justify-center min-h-0 overflow-hidden">
//           <RetailerDashboard products={products} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shop;
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
}

export const Logo = () => {
  return (
    <Link
      to="/users"
      className="font-normal flex space-x-2 items-center text-xl text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-6 w-7 bg-green-600 dark:bg-green-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-6 w-7 bg-green-600 dark:bg-green-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
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
      console.log("The cart products loaded are", response);
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
    { id: "all", name: "All Products", icon: <Apple className="h-5 w-5" /> },
    { id: "fruits", name: "Fruits & Vegetables", icon: <Leaf className="h-5 w-5" /> },
    { id: "bakery", name: "Bakery Items", icon: <Award className="h-5 w-5" /> },
    { id: "discount", name: "Discounted Items", icon: <Tag className="h-5 w-5" /> }
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
              className="absolute top-4 right-4 text-gray-600 md:hidden"
            >
              &times;
            </button>
            
            <div className="flex flex-col h-full p-4">
              <div className="mb-8 mt-4">
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
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Food Waste Facts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    1/3 of all food produced globally goes to waste. Together, we can make a difference!
                  </p>
                </div>
                
                {isLoggedIn ? (
                  <div className="flex items-center p-3 border-t dark:border-gray-700">
                    <Avatar className="h-8 w-8 mr-3">
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
                    <User className="mr-2 h-4 w-4" />
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
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top navbar */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left section */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                <Menu className="h-6 w-6" />
              </Button>
              
              {/* Logo for mobile */}
              <div className="md:hidden ml-2">
                <LogoIcon />
              </div>
            </div>
            
            {/* Search bar */}
            <div className="hidden md:block flex-1 mx-8 max-w-xl">
              <div className="relative">
                <Input 
                  className="pl-10 pr-4 rounded-full border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600" 
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
                  <Bell className="h-6 w-6" />
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
                  <ShoppingCartIcon className="h-6 w-6" />
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
              className="w-full pl-10 pr-4 rounded-full border-gray-300" 
              placeholder="Search for sustainable groceries..." 
            />
            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Featured categories tabs */}
          <Tabs defaultValue="popular" className="mb-8">
            <div className="flex justify-between items-center mb-4">
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
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Your Impact So Far</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-xl">
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