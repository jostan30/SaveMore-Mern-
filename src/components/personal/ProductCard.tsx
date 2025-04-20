
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
  

  const discountedPrice = product.discount != null ?  product.discount :  product.price - (product.price * product.discount) / 100;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const userAuth = useAuth();
  const ownerAuth = useAuth();
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
        className="absolute z-10 p-2 transition-opacity bg-white rounded-full shadow-md top-2 right-2 opacity-90 hover:opacity-100"
      >
        <Heart 
          size={18} 
          className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} transition-colors`} 
        />
      </button>
      
      {/* Days Remaining Badge */}
      <div className="absolute z-10 top-2 left-2">
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
            className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-100"></div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <p className="text-sm font-medium text-gray-500">{product.ShopName}</p>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-500">₹{discountedPrice.toFixed(2)}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
          <span className="bg-green-100 text-green-600 px-2 py-0.5 text-xs rounded-md font-medium">
            {product.discount}% OFF
          </span>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-600 line-clamp-1">{product.Address}</p>

        {/* Product Units & Expiry Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">
            <span className="font-medium">Units:</span> {product.units}
          </span>
          
          {/* Expiry Progress Bar */}
          {product.daysRemaining > 0 && (
            <div className="w-20 h-2 overflow-hidden bg-gray-200 rounded-full">
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
        <p className="text-xs italic font-medium text-green-600">
          Save food, save earth! Grab this before it expires.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-3 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleChatWithSeller}
            className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
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