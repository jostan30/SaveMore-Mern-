
import { useState, useEffect } from "react";
import { useFetchPurchasedProducts } from "../../api/purchasedProducts-api";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Package, ExternalLink, Calendar, CreditCard,  Mail, Store } from "lucide-react";

interface PurchasedProduct {
  productName: string;
  productPrice: number;
  productImage: string;
  ownerShopName: string;
  ownerEmail: string;
  quantity: number;
  purchasedDate: string;
  paymentMethod: string;
  status: string;
}

function PurchasedProducts() {
  const { fetchPurchasedProducts, isAuthLoading, isLoggedIn } = useFetchPurchasedProducts();
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<PurchasedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn) {
      loadPurchasedProducts();
    }
  }, [isAuthLoading, isLoggedIn]);

  const loadPurchasedProducts = async () => {
    try {
      const response = await fetchPurchasedProducts();
      setPurchasedProducts(response);
    } catch (error) {
      console.error("Error fetching purchased products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  // Format date 
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl">
        <Card className="overflow-hidden border-0 shadow-lg rounded-xl">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Your Purchases</h2>
              </div>
              <Button 
                onClick={() => navigate('/users/cart')}
                className="text-indigo-600 bg-white hover:bg-gray-100"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-32 rounded-lg" />
                ))}
              </div>
            ) : purchasedProducts.length === 0 ? (
              <div className="py-16 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-xl font-medium text-gray-400">No purchases found</p>
                <p className="mt-2 mb-4 text-gray-400">Items you purchase will appear here</p>
                <Button 
                  onClick={() => navigate('/')} 
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {purchasedProducts.map((product, index) => (
                  <Card key={index} className="overflow-hidden transition-shadow duration-300 border border-gray-200 hover:shadow-md">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex items-center justify-center p-4 bg-gray-50 sm:w-36">
                        <img
                          src={`data:image/png;base64,${product.productImage}`}
                          alt={product.productName}
                          className="object-contain w-full rounded-md h-28"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{product.productName}</h3>
                            <p className="text-sm text-gray-500">from {product.ownerShopName}</p>
                          </div>
                          <div className="mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 mt-3 gap-x-4 gap-y-1">
                          <p className="flex items-center text-sm text-gray-700">
                            <CreditCard className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="font-medium text-gray-900">₹{product.productPrice}</span>
                          </p>
                          <p className="flex items-center text-sm text-gray-700">
                            <Package className="w-4 h-4 mr-1 text-gray-400" />
                            Qty: {product.quantity}
                          </p>
                          <p className="flex items-center text-sm text-gray-700">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {formatDate(product.purchasedDate)}
                          </p>
                        </div>
                      </CardContent>
                      <div className="flex items-center justify-end p-4">
                        <Button 
                          onClick={() => setSelectedProduct(product)}
                          variant="outline" 
                          className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Modal for Product Details */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-xl">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedProduct?.productName}
              </DialogTitle>
              <p className="mt-1 text-indigo-100">
                Order details and product information
              </p>
            </DialogHeader>
          </div>
          
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <div className="flex items-center justify-center p-4 rounded-lg bg-gray-50">
              <img
                src={`data:image/png;base64,${selectedProduct?.productImage}`}
                alt={selectedProduct?.productName}
                className="object-contain w-full h-64 rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Product Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium text-gray-900">₹{selectedProduct?.productPrice}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-medium text-gray-900">{selectedProduct?.quantity}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedProduct ? getStatusColor(selectedProduct.status) : ''}`}>
                      {selectedProduct?.status}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Total</span>
                    <span className="font-semibold text-gray-900">
                      ₹{selectedProduct ? (selectedProduct.productPrice * selectedProduct.quantity).toFixed(2) : ''}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Seller Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct?.ownerShopName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct?.ownerEmail}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct?.paymentMethod}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct ? formatDate(selectedProduct.purchasedDate) : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end p-4 bg-gray-50">
            <Button 
              onClick={() => setSelectedProduct(null)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Close Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PurchasedProducts;