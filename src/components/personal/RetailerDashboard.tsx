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

const RetailerDashboard = ({ products } : RetailerDashboardProps ) => {
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
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default RetailerDashboard;
