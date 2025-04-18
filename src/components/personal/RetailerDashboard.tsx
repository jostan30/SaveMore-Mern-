
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  units: number;
  image: string; // Base64 string
  expiryDate: string; // ISO date string
  daysRemaining: number;
}

interface RetailerDashboardProps {
  products: Product[]; // Expecting products to be passed as a prop
}

const RetailerDashboard = ({ products }: RetailerDashboardProps) => {
  return (
    <div className="flex flex-col h-full">
      {
      
          <div className="flex-1 min-h-0 pb-8 overflow-y-auto">
            {products.length !== 0 ? (
              <div className="h-full p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-lg text-center text-gray-600">
                No products available
              </p>

            )}
          </div>

       
      }

    </div>
  );
};


export default RetailerDashboard;
// import { useState, useEffect } from "react";
// import ProductCard from "./ProductCard";
// import { motion } from "framer-motion";
// import { ShoppingBag, Leaf, Search } from "lucide-react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discount: number;
//   ShopName: string;
//   Address: string;
//   description: string;
//   units: number;
//   image: string; // Base64 string
// }

// interface Category {
//   name: string;
//   icon: JSX.Element;
// }

// interface RetailerDashboardProps {
//   products: Product[]; // Expecting products to be passed as a prop
// }

// const RetailerDashboard = ({ products }: RetailerDashboardProps) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
//   // Update filtered products when search term, category or products change
//   useEffect(() => {
//     const filtered = products.filter(product => {
//       const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                            product.ShopName.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === "All" || 
//                              (selectedCategory === "Discounted" && product.discount > 0);
//       return matchesSearch && matchesCategory;
//     });
    
//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, products]);

//   const categories: Category[] = [
//     { name: "All", icon: <ShoppingBag className="w-5 h-5" /> },
//     { name: "Discounted", icon: <Leaf className="w-5 h-5" /> },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   };
  
//   return (
//     <div className="flex flex-col h-full">
//       {/* Hero Section */}
//       <div className="relative mb-6 overflow-hidden rounded-xl">
//         <div className="flex items-center h-48 bg-gradient-to-r from-green-600 to-emerald-400 rounded-xl">
//           <div className="container px-6 mx-auto">
//             <div className="flex flex-col items-center justify-between md:flex-row">
//               <div className="text-white md:w-1/2">
//                 <h2 className="mb-2 text-3xl font-bold">Reduce Food Waste, Save More</h2>
//                 <p className="mb-4">Shop consciously and help save the planet one purchase at a time.</p>
//               </div>
//               <div className="hidden w-1/3 md:block">
//                 <img 
//                   src="/api/placeholder/400/200" 
//                   alt="Food waste reduction" 
//                   className="rounded-lg shadow-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="flex flex-col items-center justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
//         <div className="relative w-full md:w-1/2">
//           <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//           <Input
//             className="pl-10 border-2 rounded-full"
//             placeholder="Search products or shops..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <div className="flex space-x-2">
//           {categories.map((category) => (
//             <Button
//               key={category.name}
//               variant={selectedCategory === category.name ? "default" : "outline"}
//               className={`rounded-full ${
//                 selectedCategory === category.name 
//                   ? "bg-green-600 hover:bg-green-700" 
//                   : "hover:border-green-600 hover:text-green-600"
//               }`}
//               onClick={() => setSelectedCategory(category.name)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Product Count */}
//       <div className="mb-4">
//         <h3 className="text-lg font-medium">
//           {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
//         </h3>
//       </div>

//       {/* Scrollable container */}
//       <div className="flex-1 min-h-0 pb-8 overflow-y-auto">
//         {filteredProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64 text-center">
//             <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
//             <p className="mb-2 text-xl text-gray-600">No products available</p>
//             <p className="text-gray-500">
//               {searchTerm 
//                 ? "Try adjusting your search or filter criteria" 
//                 : "Check back later for new arrivals"}
//             </p>
//           </div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="h-full p-4 rounded-lg"
//           >
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {filteredProducts.map((product: Product) => (
//                 <motion.div key={product._id} variants={itemVariants}>
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
      
//       {/* Sustainability Impact Banner */}
//       <div className="p-4 mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
//         <div className="flex flex-col items-center justify-between md:flex-row">
//           <div className="mb-4 md:mb-0">
//             <h3 className="mb-1 text-lg font-bold text-green-600">Your Impact Matters</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Together we've saved {Math.floor(products.length * 2.5)} kg of food from going to waste this month!
//             </p>
//           </div>
//           <Button className="bg-green-600 hover:bg-green-700">
//             Learn More About Our Mission
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RetailerDashboard;