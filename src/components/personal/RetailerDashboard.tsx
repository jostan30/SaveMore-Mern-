import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  units:number;
  image: string; // Base64 string
}

interface RetailerDashboardProps {
  products: Product[]; // Expecting products to be passed as a prop
}

const RetailerDashboard = ({ products }: RetailerDashboardProps ) => {
  return (
    <div className="h-full flex flex-col">
      

      {/* Scrollable container */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-8">
        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No products available
          </p>
        ) : (
          <div className="p-4 rounded-lg h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product: Product) => (
                <ProductCard key={product._id} product={product}   />
              ))}
            </div>
          </div>
        )}
      </div>
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
//     { name: "All", icon: <ShoppingBag className="h-5 w-5" /> },
//     { name: "Discounted", icon: <Leaf className="h-5 w-5" /> },
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
//     <div className="h-full flex flex-col">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden rounded-xl mb-6">
//         <div className="bg-gradient-to-r from-green-600 to-emerald-400 h-48 rounded-xl flex items-center">
//           <div className="container mx-auto px-6">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="text-white md:w-1/2">
//                 <h2 className="text-3xl font-bold mb-2">Reduce Food Waste, Save More</h2>
//                 <p className="mb-4">Shop consciously and help save the planet one purchase at a time.</p>
//               </div>
//               <div className="hidden md:block w-1/3">
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
//       <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
//         <div className="relative w-full md:w-1/2">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
//       <div className="flex-1 min-h-0 overflow-y-auto pb-8">
//         {filteredProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64 text-center">
//             <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
//             <p className="text-xl text-gray-600 mb-2">No products available</p>
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
//             className="p-4 rounded-lg h-full"
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
//       <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-6">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="mb-4 md:mb-0">
//             <h3 className="text-lg font-bold text-green-600 mb-1">Your Impact Matters</h3>
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