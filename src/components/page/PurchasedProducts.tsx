// import { useState, useEffect } from "react";
// import { useFetchPurchasedProducts } from "../../api/purchasedProducts-api";
// import { useNavigate } from "react-router";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Skeleton } from "@/components/ui/skeleton";

// interface PurchasedProduct {
//   productName: string;
//   productPrice: number;
//   productImage: string;
//   ownerShopName: string;
//   ownerEmail: string;
//   quantity: number;
//   purchasedDate: string;
//   paymentMethod: string;
//   status: string;
// }

// function PurchasedProducts() {
//   const { fetchPurchasedProducts, isAuthLoading, isLoggedIn } = useFetchPurchasedProducts();
//   const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<PurchasedProduct | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthLoading && isLoggedIn) {
//       loadPurchasedProducts();
//     }
//   }, [isAuthLoading, isLoggedIn]);

//   const loadPurchasedProducts = async () => {
//     try {
//       const response = await fetchPurchasedProducts();
//       setPurchasedProducts(response);
//     } catch (error) {
//       console.error("Error fetching purchased products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-between border-b pb-3 mb-3">
//           <h2 className="text-xl font-semibold">Purchased Products</h2>
//           <Button onClick={() => navigate('/users/cart')}>Go to Cart</Button>
//         </div>

//         {loading ? (
//           <div className="space-y-4">
//             {[...Array(3)].map((_, index) => (
//               <Skeleton key={index} className="h-24 w-full rounded-lg" />
//             ))}
//           </div>
//         ) : purchasedProducts.length === 0 ? (
//           <p className="text-gray-500 text-center">No purchases found.</p>
//         ) : (
//           <div className="space-y-4">
//             {purchasedProducts.map((product, index) => (
//               <Card key={index} className="flex items-center gap-4 p-4">
//                 <img
//                   src={`data:image/png;base64,${product.productImage}`}
//                   alt={product.productName}
//                   className="w-20 h-20 object-cover rounded-md"
//                 />
//                 <CardContent className="flex-1">
//                   <CardHeader className="p-0">
//                     <CardTitle className="text-lg">{product.productName}</CardTitle>
//                   </CardHeader>
//                   <p className="text-gray-700">Price: ₹{product.productPrice}</p>
//                   <p className="text-gray-500">Quantity: {product.quantity}</p>
//                   <p className="text-sm text-blue-600">Status: {product.status}</p>
//                 </CardContent>
//                 <Button onClick={() => setSelectedProduct(product)}>More Info</Button>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal for Product Details */}
//       <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
//       <DialogContent className="max-w-2xl h-auto">
//   <DialogHeader>
//     <DialogTitle>{selectedProduct?.productName}</DialogTitle>
//   </DialogHeader>
//   <img
//     src={`data:image/png;base64,${selectedProduct?.productImage}`}
//     alt={selectedProduct?.productName}
//     className="w-full h-60 object-contain rounded-lg"
//   />
  
//   <DialogDescription className="space-y-2">
//     <p><strong>Price:</strong> ₹{selectedProduct?.productPrice}</p>
//     <p><strong>Quantity:</strong> {selectedProduct?.quantity}</p>
//     <p><strong>Status:</strong> {selectedProduct?.status}</p>
//     <p><strong>Shop Name:</strong> {selectedProduct?.ownerShopName}</p>
//     <p><strong>Seller Email:</strong> {selectedProduct?.ownerEmail}</p>
//     <p><strong>Payment Method:</strong> {selectedProduct?.paymentMethod}</p>
//     <p><strong>Purchased On:</strong> {new Date(selectedProduct?.purchasedDate || "").toLocaleDateString()}</p>
//   </DialogDescription>
// </DialogContent>

//       </Dialog>
//     </div>
//   );
// }

// export default PurchasedProducts;
import { useState, useEffect } from "react";
import { useFetchPurchasedProducts } from "../../api/purchasedProducts-api";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Package, ExternalLink, Calendar, CreditCard, User, Mail, Store } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Your Purchases</h2>
              </div>
              <Button 
                onClick={() => navigate('/users/cart')}
                className="bg-white hover:bg-gray-100 text-indigo-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : purchasedProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl font-medium text-gray-400">No purchases found</p>
                <p className="text-gray-400 mt-2 mb-4">Items you purchase will appear here</p>
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
                  <Card key={index} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row">
                      <div className="bg-gray-50 p-4 sm:w-36 flex items-center justify-center">
                        <img
                          src={`data:image/png;base64,${product.productImage}`}
                          alt={product.productName}
                          className="w-full h-28 object-contain rounded-md"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{product.productName}</h3>
                            <p className="text-sm text-gray-500">from {product.ownerShopName}</p>
                          </div>
                          <div className="mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                          <p className="text-gray-700 text-sm flex items-center">
                            <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                            <span className="font-medium text-gray-900">₹{product.productPrice}</span>
                          </p>
                          <p className="text-gray-700 text-sm flex items-center">
                            <Package className="h-4 w-4 mr-1 text-gray-400" />
                            Qty: {product.quantity}
                          </p>
                          <p className="text-gray-700 text-sm flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {formatDate(product.purchasedDate)}
                          </p>
                        </div>
                      </CardContent>
                      <div className="p-4 flex items-center justify-end">
                        <Button 
                          onClick={() => setSelectedProduct(product)}
                          variant="outline" 
                          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
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
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedProduct?.productName}
              </DialogTitle>
              <p className="text-indigo-100 mt-1">
                Order details and product information
              </p>
            </DialogHeader>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
              <img
                src={`data:image/png;base64,${selectedProduct?.productImage}`}
                alt={selectedProduct?.productName}
                className="w-full h-64 object-contain rounded-lg"
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
                    <Store className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct?.ownerShopName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct?.ownerEmail}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct?.paymentMethod}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedProduct ? formatDate(selectedProduct.purchasedDate) : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 flex justify-end">
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