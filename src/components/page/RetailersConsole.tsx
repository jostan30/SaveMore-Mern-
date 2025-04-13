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
        <IconDashboard className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
   
    {
      label: "Purchased Products",
      href: "/retailers/orders",
      icon: (
        <IconShoppingCart className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      badge: "5", // This shows the number of new orders
    },
    {
      label: "Profile",
      href: "/retailers/profile",
      icon: (
        <IconUser className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/retailers/settings",
      icon: (
        <IconSettings className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-white flex-1 mx-auto overflow-hidden h-screen w-screen">
      <Sidebar open={open} setOpen={setOpen} animate={false} className="bg-gradient-to-b from-blue-600 to-blue-800 border-r border-blue-700">
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  className="text-white hover:bg-blue-700 transition-colors rounded-lg px-3 py-2"
                  badge={link.badge ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {link.badge}
                    </span>
                  ) : null}
                />
              ))}
            </div>
          </div>
          <div className="border-t border-blue-500 pt-4 mt-4">
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <div className="relative">
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-9 w-9 flex-shrink-0 rounded-full border-2 border-white"
                      alt="Avatar"
                    />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
                  </div>
                ),
              }}
              className="text-white hover:bg-blue-700 transition-colors rounded-lg"
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
      className="font-semibold flex space-x-2 items-center text-lg text-white p-4 relative z-20"
    >
      <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
        <span className="text-blue-600 font-bold text-sm">SM</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-black"
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
      <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
        <span className="text-blue-600 font-bold text-sm">SM</span>
      </div>
    </Link>
  );
};

// Dashboard component with improved UI
const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userData = useAuth({userType:"owner"}).userData;
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
    <div className="flex flex-1 flex-col h-full">
      <div className="p-2 md:p-6 bg-white flex flex-col gap-6 flex-1 w-full h-full overflow-hidden">
        {/* Header with greeting and date */}
        <div className="flex justify-between items-center">
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
                className="h-10 w-10 flex-shrink-0 rounded-full border border-gray-200"
                alt="Avatar"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-1 ring-white"></span>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="flex flex-col p-4">
              <span className="text-blue-100">Total Products</span>
              <span className="text-3xl font-bold">{totalProducts}</span>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="flex flex-col p-4">
              <span className="text-purple-100">Total Units</span>
              <span className="text-3xl font-bold">{totalUnits}</span>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="flex flex-col p-4">
              <span className="text-emerald-100">Average Price</span>
              <span className="text-3xl font-bold">${averagePrice}</span>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add Product */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-2 mt-2">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 border-gray-200 rounded-lg w-full" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AddProduct onProductAdded={loadProducts}  />
        </div>

        {/* Products area with shadow and rounded corners */}
        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Your Products</h2>
            <p className="text-sm text-gray-500">Manage and monitor your product inventory</p>
          </div>
          <div className="p-4 overflow-auto h-full max-h-[calc(100%-70px)]">
            {/* Passing filtered products to RetailerDashboard component */}
            {filteredProducts.length > 0 ? (
              <RetailerDashboard products={filteredProducts} />
            ) : (
              <div className="text-center py-16">
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
    <div className="fixed inset-0 flex h-screen w-screen overflow-hidden">
      <SidebarDemo />
    </div>
  );
}

export default RetailersConsole;
// import { useEffect, useState } from "react";
// import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
// import {
//   IconArrowLeft,
//   IconDashboard,
//   IconSettings,
//   IconUser,
//   IconBell,
//   IconChartBar,
//   IconShoppingCart,
//   IconPackage,
//   IconTruckDelivery,
//   IconDiscount,
//   IconPlus,
//   IconSearch,
// } from "@tabler/icons-react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Input } from "../ui/input";
// import Addproduct from "../personal/Addproduct";
// import { Toaster } from "../ui/toaster";
// import RetailerDashboard from "../personal/RetailerDashboard";
// import { fetchProducts } from "@/api/products-api";
// import useAuth from "@/hooks/useAuth";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Badge } from "../ui/badge";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discount: number;
//   units: number;
//   ShopName: string;
//   Address: string;
//   description: string;
//   image: string;
//   owner: string;
// }

// interface SalesData {
//   month: string;
//   sales: number;
// }

// interface CategoryData {
//   category: string;
//   percentage: number;
// }

// function RetailersConsole() {
//   return (
//     <div className="fixed inset-0 flex h-screen w-screen overflow-hidden">
//       <SidebarDemo />
//     </div>
//   );
// }

// function SidebarDemo() {
//   const [open, setOpen] = useState(true);
//   const [activeLink, setActiveLink] = useState("Dashboard");
//   const [notificationCount, setNotificationCount] = useState(3);

//   const links = [
//     {
//       label: "Dashboard",
//       href: "/retailers/",
//       icon: (
//         <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Analytics",
//       href: "/retailers/analytics",
//       icon: (
//         <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Products",
//       href: "/retailers/products",
//       icon: (
//         <IconPackage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Orders",
//       href: "/retailers/orders",
//       icon: (
//         <IconTruckDelivery className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Promotions",
//       href: "/retailers/promotions",
//       icon: (
//         <IconDiscount className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Notifications",
//       href: "/retailers/notifications",
//       icon: (
//         <div className="relative">
//           <IconBell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//           {notificationCount > 0 && (
//             <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
//               {notificationCount}
//             </Badge>
//           )}
//         </div>
//       ),
//     },
//     {
//       label: "Profile",
//       href: "/retailers/profile",
//       icon: (
//         <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Settings",
//       href: "/retailers/setting",
//       icon: (
//         <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Logout",
//       href: "/",
//       icon: (
//         <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-neutral-900 flex-1 mx-auto border border-neutral-200 dark:border-neutral-800 overflow-hidden h-screen w-screen">
//       <Sidebar open={open} setOpen={setOpen} animate={true} className="border-r border-neutral-200 dark:border-neutral-800 shadow-sm">
//         <SidebarBody className="justify-between gap-10">
//           <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//             <Logo />
//             <div className="mt-8 flex flex-col gap-1">
//               {links.map((link, idx) => (
//                 <div 
//                   key={idx}
//                   onClick={() => setActiveLink(link.label)}
//                   className={`${activeLink === link.label ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500" : ""}`}
//                 >
//                   <SidebarLink link={link} />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="mt-auto pb-4">
//             <UserProfile />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <Dashboard />
//       <Toaster />
//     </div>
//   );
// }

// export const Logo = () => {
//   return (
//     <Link
//       to="/retailers/"
//       className="font-normal flex space-x-2 items-center text-lg text-black py-4 relative z-20 px-4"
//     >
//       <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 flex items-center justify-center">
//         <IconShoppingCart className="h-5 w-5 text-white" />
//       </div>
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-semibold text-blue-600 dark:text-blue-400 whitespace-pre"
//       >
//         SaveMore
//       </motion.span>
//     </Link>
//   );
// };

// export const LogoIcon = () => {
//   return (
//     <Link
//       to="retailers/"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 flex items-center justify-center">
//         <IconShoppingCart className="h-5 w-5 text-white" />
//       </div>
//     </Link>
//   );
// };

// const UserProfile = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const userData = useAuth({userType:"owner"}).userData;
//   const userName = userData?.name || "Shop Owner";
//   const shopName = userData?.shopName || "Your Shop";

//   return (
//     <div className="px-3 py-2">
//       <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-lg">
//             <Avatar className="h-8 w-8 border border-neutral-200 dark:border-neutral-700">
//               <AvatarImage src={userData?.profileImage || "https://assets.aceternity.com/manu.png"} />
//               <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div className="flex flex-col items-start">
//               <span className="text-sm font-medium">{userName}</span>
//               <span className="text-xs text-neutral-500">{shopName}</span>
//             </div>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-56">
//           <DropdownMenuItem>
//             <Link to="/retailers/profile" className="flex items-center w-full">
//               View Profile
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Link to="/retailers/setting" className="flex items-center w-full">
//               Settings
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Link to="/" className="flex items-center w-full">
//               Logout
//             </Link>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// // Dashboard component with enhanced UI
// const Dashboard = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const userData = useAuth({userType:"owner"}).userData;
//   const userId = userData?._id || "";
  
//   // Mock data for analytics
//   const salesData: SalesData[] = [
//     { month: "Jan", sales: 4500 },
//     { month: "Feb", sales: 5200 },
//     { month: "Mar", sales: 4800 },
//     { month: "Apr", sales: 6000 },
//     { month: "May", sales: 5700 },
//     { month: "Jun", sales: 6500 },
//   ];
  
//   const categoryData: CategoryData[] = [
//     { category: "Electronics", percentage: 35 },
//     { category: "Clothing", percentage: 28 },
//     { category: "Home", percentage: 20 },
//     { category: "Beauty", percentage: 17 },
//   ];

//   // Function to load products
//   const loadProducts = async () => {
//     try {
//       setIsLoading(true);
//       if(!userId) return;
//       const response = await fetchProducts();
//       const filteredProducts = response.filter((product: Product) => product.owner === userId);
//       setProducts(filteredProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch products on mount
//   useEffect(() => {
//     if (userId) {
//       loadProducts();
//     }
//   }, [userId]);

//   // Filter products based on search term
//   const filteredProducts = products.filter(product => 
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate summary metrics
//   const totalInventory = products.reduce((sum, product) => sum + product.units, 0);
//   const totalValue = products.reduce((sum, product) => sum + (product.price * product.units), 0);
//   const lowStockItems = products.filter(product => product.units < 10).length;

//   return (
//     <div className="flex flex-1 flex-col h-full overflow-hidden">
//       <div className="p-6 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Retailer Dashboard</h1>
//             <p className="text-neutral-500 dark:text-neutral-400">Manage your products and monitor performance</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Input 
//                 className="w-64 pl-9 border-neutral-300 dark:border-neutral-700 rounded-lg" 
//                 placeholder="Search products..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
//             </div>
//             <Addproduct onProductAdded={loadProducts} />
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Products</p>
//                   <h3 className="text-2xl font-bold mt-1">{products.length}</h3>
//                 </div>
//                 <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//                   <IconPackage className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Inventory</p>
//                   <h3 className="text-2xl font-bold mt-1">{totalInventory} units</h3>
//                 </div>
//                 <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
//                   <IconShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                 <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Inventory Value</p>
//                   <h3 className="text-2xl font-bold mt-1">${totalValue.toLocaleString()}</h3>
//                 </div>
//                 <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
//                   <IconChartBar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Low Stock Items</p>
//                   <h3 className="text-2xl font-bold mt-1">{lowStockItems}</h3>
//                 </div>
//                 <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
//                   <IconBell className="h-6 w-6 text-red-600 dark:text-red-400" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Analytics Overview */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Sales Trend */}
//           <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-medium">Monthly Sales Performance</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64 w-full">
//                 <div className="flex h-full items-end space-x-2">
//                   {salesData.map((item, index) => (
//                     <div key={index} className="flex flex-col items-center flex-1">
//                       <div 
//                         className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
//                         style={{ height: `${(item.sales / 7000) * 100}%` }}
//                       />
//                       <div className="pt-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">{item.month}</div>
//                       <div className="text-sm font-semibold">${item.sales}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Category Distribution */}
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-medium">Category Distribution</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {categoryData.map((item, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="font-medium">{item.category}</span>
//                       <span className="font-medium">{item.percentage}%</span>
//                     </div>
//                     <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
//                       <div 
//                         className="h-2 rounded-full"
//                         style={{ 
//                           width: `${item.percentage}%`,
//                           backgroundColor: index === 0 ? '#3b82f6' : 
//                                          index === 1 ? '#10b981' :
//                                          index === 2 ? '#8b5cf6' : '#ef4444'
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Products & Notifications */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Products List */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg font-medium">Recent Products</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 {isLoading ? (
//                   <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                   </div>
//                 ) : filteredProducts.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="border-b border-neutral-200 dark:border-neutral-700">
//                           <th className="text-left p-4 font-medium text-neutral-600 dark:text-neutral-300">Product</th>
//                           <th className="text-left p-4 font-medium text-neutral-600 dark:text-neutral-300">Price</th>
//                           <th className="text-left p-4 font-medium text-neutral-600 dark:text-neutral-300">Discount</th>
//                           <th className="text-left p-4 font-medium text-neutral-600 dark:text-neutral-300">Stock</th>
//                           <th className="text-right p-4 font-medium text-neutral-600 dark:text-neutral-300">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredProducts.slice(0, 5).map((product, index) => (
//                           <tr key={product._id} className={`border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors`}>
//                             <td className="p-4">
//                               <div className="flex items-center space-x-3">
//                                 <div className="h-10 w-10 rounded bg-neutral-200 dark:bg-neutral-700 flex-shrink-0 overflow-hidden">
//                                   {product.image ? (
//                                     <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
//                                   ) : (
//                                     <div className="flex items-center justify-center h-full text-neutral-500">
//                                       <IconPackage className="h-5 w-5" />
//                                     </div>
//                                   )}
//                                 </div>
//                                 <div>
//                                   <div className="font-medium">{product.name}</div>
//                                   <div className="text-sm text-neutral-500 truncate max-w-xs">{product.description}</div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="p-4">${product.price.toFixed(2)}</td>
//                             <td className="p-4">{product.discount}%</td>
//                             <td className="p-4">
//                               <Badge variant={product.units < 10 ? "destructive" : "default"} className="rounded-md px-2">
//                                 {product.units} units
//                               </Badge>
//                             </td>
//                             <td className="p-4 text-right">
//                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                                 <IconSettings className="h-4 w-4" />
//                               </Button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center p-8 text-center h-64">
//                     <IconPackage className="h-12 w-12 text-neutral-400 mb-2" />
//                     <h3 className="text-lg font-medium">No products found</h3>
//                     <p className="text-neutral-500 mt-1">Add your first product to get started</p>
//                     <Button className="mt-4">
//                       <IconPlus className="h-4 w-4 mr-2" /> Add Product
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Notifications */}
//           <div className="lg:col-span-1">
//             <Card className="shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader className="pb-2 flex flex-row items-center justify-between">
//                 <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
//                 <Badge className="rounded-full px-2 py-0 h-5 bg-red-500">3 New</Badge>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
//                   <div className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
//                     <div className="flex items-start gap-3">
//                       <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
//                         <IconShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium">New Order Received</p>
//                         <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
//                           Customer purchased 3 items for $245.00
//                         </p>
//                         <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">10 minutes ago</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
//                     <div className="flex items-start gap-3">
//                       <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
//                         <IconBell className="h-4 w-4 text-red-600 dark:text-red-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Low Stock Alert</p>
//                         <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
//                           "Wireless Headphones" is running low (only 3 units left)
//                         </p>
//                         <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">1 hour ago</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
//                     <div className="flex items-start gap-3">
//                       <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
//                         <IconUser className="h-4 w-4 text-green-600 dark:text-green-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium">New Customer Registered</p>
//                         <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
//                           A new customer has registered and added items to cart
//                         </p>
//                         <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">3 hours ago</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
//                     <div className="flex items-start gap-3">
//                       <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
//                         <IconChartBar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Weekly Report Ready</p>
//                         <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
//                           Your weekly sales and performance report is available
//                         </p>
//                         <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">Yesterday</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-4 text-center border-t border-neutral-200 dark:border-neutral-700">
//                   <Button variant="link" className="text-sm text-blue-600 dark:text-blue-400">
//                     View All Notifications
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
        
//         {/* Display products with RetailerDashboard component */}
//         <div className="mt-4">
//           <RetailerDashboard products={filteredProducts} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RetailersConsole;