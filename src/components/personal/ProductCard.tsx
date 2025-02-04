import React from "react";
import ProductDetailsButton from "./ProductDetailsButton";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  image: string; // Base64 string
  units: number; // New field
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product}) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full sm:w-44 md:w-52 lg:w-60 text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300 space-y-4 h-[400px] flex flex-col">
      {/* Product Image */}
      {product.image && (
        <div className="flex w-full h-32 overflow-hidden rounded-lg">
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Product Info */}
      <h3 className="text-lg font-semibold mt-3 text-gray-900">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.ShopName}</p>

      {/* Pricing */}
      <div className="flex justify-center items-center gap-2 mt-2">
        <span className="text-red-500 font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
        <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
        <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-md font-medium">
          {product.discount}% OFF
        </span>
      </div>

      {/* Address */}
      <p className="text-gray-600 text-sm mt-1">{product.Address}</p>

      {/* Product Units */}
      <p className="text-gray-700 text-sm mt-1">
        <span className="font-medium">Available Units:</span> {product.units}
      </p>

      {/* Show More Button */}
      <ProductDetailsButton product={product} />
    </div>
  );
};

export default ProductCard;
