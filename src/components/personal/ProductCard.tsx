// import React from "react";
// import ProductDetailsButton from "./ProductDetailsButton";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discount: number;
//   ShopName: string;
//   Address: string;
//   description: string;
//   image: string; // Base64 string
//   units: number; // New field
// }

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product}) => {
//   const discountedPrice = product.price - (product.price * product.discount) / 100;

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-4 w-full sm:w-44 md:w-52 lg:w-60 text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300 space-y-4 h-[400px] flex flex-col">
//       {/* Product Image */}
//       {product.image && (
//         <div className="flex w-full h-32 overflow-hidden rounded-lg">
//           <img
//             src={`data:image/png;base64,${product.image}`}
//             alt={product.name}
//             className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       )}

//       {/* Product Info */}
//       <h3 className="text-lg font-semibold mt-3 text-gray-900">{product.name}</h3>
//       <p className="text-gray-500 text-sm">{product.ShopName}</p>

//       {/* Pricing */}
//       <div className="flex justify-center items-center gap-2 mt-2">
//         <span className="text-red-500 font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
//         <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
//         <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-md font-medium">
//           {product.discount}% OFF
//         </span>
//       </div>

//       {/* Address */}
//       <p className="text-gray-600 text-sm mt-1">{product.Address}</p>

//       {/* Product Units */}
//       <p className="text-gray-700 text-sm mt-1">
//         <span className="font-medium">Available Units:</span> {product.units}
//       </p>

//       {/* Show More Button */}
//       <ProductDetailsButton product={product} />
//     </div>
//   );
// };

// export default ProductCard;
// import React from "react";
// import ProductDetailsButton from "./ProductDetailsButton";
// //import { Badge } from "./ui/badge"; // Assuming you have a Badge component from your UI library

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discount: number;
//   ShopName: string;
//   Address: string;
//   description: string;
//   image: string; // Base64 string
//   units: number;
//   expiryDate: string; // ISO date string
//   daysRemaining: number;
// }

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const discountedPrice = product.price - (product.price * product.discount) / 100;
  
//   // Function to determine the color based on days remaining
//   const getDaysRemainingColor = (days: number) => {
//     if (days <= 3) return "bg-red-100 text-red-700"; // Urgent - red
//     if (days <= 7) return "bg-amber-100 text-amber-700"; // Warning - amber
//     return "bg-green-100 text-green-700"; // Good - green
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-4 w-full sm:w-44 md:w-52 lg:w-60 text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300 space-y-3 h-[450px] flex flex-col relative">
//       {/* Days Remaining Badge */}
//       <div className="absolute -top-2 -right-2">
//         <div className={`${getDaysRemainingColor(product.daysRemaining)} px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
//           {product.daysRemaining <= 0 
//             ? "Expired" 
//             : product.daysRemaining === 1 
//               ? "1 day left" 
//               : `${product.daysRemaining} days left`}
//         </div>
//       </div>

//       {/* Product Image */}
//       {product.image && (
//         <div className="flex w-full h-32 overflow-hidden rounded-lg">
//           <img
//             src={`data:image/png;base64,${product.image}`}
//             alt={product.name}
//             className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       )}

//       {/* Product Info */}
//       <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
//       <p className="text-gray-500 text-sm">{product.ShopName}</p>

//       {/* Pricing */}
//       <div className="flex justify-center items-center gap-2">
//         <span className="text-red-500 font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
//         <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
//         <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-md font-medium">
//           {product.discount}% OFF
//         </span>
//       </div>

//       {/* Address */}
//       <p className="text-gray-600 text-xs line-clamp-1">{product.Address}</p>

//       {/* Product Units */}
//       <div className="flex justify-between items-center px-2 text-sm">
//         <span className="text-gray-700">
//           <span className="font-medium">Units:</span> {product.units}
//         </span>
        
//         {/* Expiry Progress Bar */}
//         {product.daysRemaining > 0 && (
//           <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//             <div 
//               className={`h-full ${
//                 product.daysRemaining <= 3 ? "bg-red-500" : 
//                 product.daysRemaining <= 7 ? "bg-amber-500" : "bg-green-500"
//               }`}
//               style={{ width: `${Math.min(product.daysRemaining * 5, 100)}%` }}
//             ></div>
//           </div>
//         )}
//       </div>

//       {/* Show More Button */}
//       <div className="mt-auto pt-2">
//         <ProductDetailsButton product={product} />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import ProductDetailsButton from "./ProductDetailsButton";
import { MessageCircle, Heart } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  image: string; // Base64 string
  units: number;
  expiryDate: string; // ISO date string
  daysRemaining: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const userAuth = useAuth({ userType: 'user' });
  const ownerAuth = useAuth({ userType: 'owner' });
  const navigate = useNavigate();
  // Function to determine the color based on days remaining
  const getDaysRemainingColor = (days: number) => {
    if (days <= 3) return "bg-red-100 text-red-700"; // Urgent - red
    if (days <= 7) return "bg-amber-100 text-amber-700"; // Warning - amber
    return "bg-green-100 text-green-700"; // Good - green
  };

  // Function to handle chat with seller
  const handleChatWithSeller = () => {
    // Check if user or owner is logged in
    if (userAuth.isLoggedIn) {
      // User is logged in, navigate to buyer chat
      navigate(`/chat/buyer/${product._id}`);
      console.log("Navigated to buyerPage");
      
    } else if (ownerAuth.isLoggedIn) {
      // Owner is logged in, navigate to seller chat
      navigate('/chat/seller');
    } else {
      // Nobody is logged in, redirect to login
      toast({
        title: "Login Required",
        description: "Please log in to chat with sellers",
        variant: "destructive"
      });
      navigate('/login');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full sm:w-44 md:w-52 lg:w-60 border border-gray-200 hover:shadow-2xl transition-all duration-300 h-[480px] flex flex-col relative group">
      {/* Favorite Button */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md opacity-90 hover:opacity-100 transition-opacity"
      >
        <Heart 
          size={18} 
          className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} transition-colors`} 
        />
      </button>
      
      {/* Days Remaining Badge */}
      <div className="absolute top-2 left-2 z-10">
        <div className={`${getDaysRemainingColor(product.daysRemaining)} px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
          {product.daysRemaining <= 0 
            ? "Expired" 
            : product.daysRemaining === 1 
              ? "1 day left" 
              : `${product.daysRemaining} days left`}
        </div>
      </div>

      {/* Product Image with gradient overlay */}
      <div className="relative w-full h-40 overflow-hidden bg-gray-100">
        {product.image && (
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <p className="text-gray-500 text-sm font-medium">{product.ShopName}</p>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
          <span className="bg-green-100 text-green-600 px-2 py-0.5 text-xs rounded-md font-medium">
            {product.discount}% OFF
          </span>
        </div>

        {/* Address */}
        <p className="text-gray-600 text-xs line-clamp-1">{product.Address}</p>

        {/* Product Units & Expiry Progress */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700">
            <span className="font-medium">Units:</span> {product.units}
          </span>
          
          {/* Expiry Progress Bar */}
          {product.daysRemaining > 0 && (
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  product.daysRemaining <= 3 ? "bg-red-500" : 
                  product.daysRemaining <= 7 ? "bg-amber-500" : "bg-green-500"
                }`}
                style={{ width: `${Math.min(product.daysRemaining * 5, 100)}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* "Don't waste food" message */}
        <p className="text-xs italic text-green-600 font-medium">
          Save food, save earth! Grab this before it expires.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-3 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleChatWithSeller}
            className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium"
          >
            <MessageCircle size={16} />
            <span>Chat</span>
          </button>
          <ProductDetailsButton product={product}  />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;