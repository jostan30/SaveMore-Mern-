
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
