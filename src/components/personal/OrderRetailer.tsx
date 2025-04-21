// 'use client'
// import { useState } from "react";
// export function PurchasedProductsView() {
//   // Sample data - in a real app, you would fetch this from an API
//   const orders = [
//     {
//       id: "ORD-1234",
//       customer: "John Doe",
//       date: "2025-03-28",
//       amount: "$129.99",
//       status: "Pending",
//       items: [
//         { name: "Wireless Headphones", quantity: 1, price: "$79.99" },
//         { name: "Phone Case", quantity: 1, price: "$19.99" },
//         { name: "USB-C Cable", quantity: 2, price: "$15.00" }
//       ],
//       address: "123 Main St, New York, NY 10001",
//       phone: "(555) 123-4567",
//       email: "john.doe@example.com"
//     },
//     {
//       id: "ORD-1235",
//       customer: "Jane Smith",
//       date: "2025-03-29",
//       amount: "$210.50",
//       status: "Pending",
//       items: [
//         { name: "Smart Watch", quantity: 1, price: "$189.99" },
//         { name: "Watch Band", quantity: 1, price: "$20.51" }
//       ],
//       address: "456 Oak Ave, Chicago, IL 60007",
//       phone: "(555) 987-6543",
//       email: "jane.smith@example.com"
//     },
//     {
//       id: "ORD-1236",
//       customer: "Mike Johnson",
//       date: "2025-03-30",
//       amount: "$85.49",
//       status: "Pending",
//       items: [
//         { name: "Bluetooth Speaker", quantity: 1, price: "$85.49" }
//       ],
//       address: "789 Pine Dr, Miami, FL 33101",
//       phone: "(555) 246-8135",
//       email: "mike.j@example.com"
//     }
//   ];

//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const toggleOrderDetails = (orderId:any) => {
//     if (expandedOrder === orderId) {
//       setExpandedOrder(null);
//     } else {
//       setExpandedOrder(orderId);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Purchased Products</h2>
//         <p className="text-gray-600">Manage and fulfill customer orders</p>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="grid grid-cols-6 bg-gray-100 p-4 font-medium text-gray-700">
//           <div>Order ID</div>
//           <div>Customer</div>
//           <div>Date</div>
//           <div>Amount</div>
//           <div>Status</div>
//           <div className="text-right">Actions</div>
//         </div>

//         {orders.map((order) => (
//           <div key={order.id} className="border-t border-gray-200">
//             <div className="grid grid-cols-6 p-4 items-center hover:bg-gray-50">
//               <div className="font-medium">{order.id}</div>
//               <div>{order.customer}</div>
//               <div>{order.date}</div>
//               <div>{order.amount}</div>
//               <div>
//                 <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
//                   {order.status}
//                 </span>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button 
//                   onClick={() => toggleOrderDetails(order.id)}
//                   className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
//                 >
//                   {expandedOrder === order.id ? "Hide Details" : "View Details"}
//                 </button>
//                 <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
//                   Process
//                 </button>
//               </div>
//             </div>

//             {expandedOrder === order.id && (
//               <div className="bg-gray-50 p-4 border-t border-gray-200">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-medium mb-2">Order Items</h4>
//                     <div className="bg-white p-3 rounded border border-gray-200">
//                       {order.items.map((item, idx) => (
//                         <div key={idx} className="flex justify-between py-1">
//                           <span>
//                             {item.quantity}x {item.name}
//                           </span>
//                           <span>{item.price}</span>
//                         </div>
//                       ))}
//                       <div className="border-t border-gray-200 mt-2 pt-2 font-medium flex justify-between">
//                         <span>Total</span>
//                         <span>{order.amount}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2">Shipping Information</h4>
//                     <div className="bg-white p-3 rounded border border-gray-200">
//                       <p className="mb-1"><span className="font-medium">Address:</span> {order.address}</p>
//                       <p className="mb-1"><span className="font-medium">Phone:</span> {order.phone}</p>
//                       <p><span className="font-medium">Email:</span> {order.email}</p>
//                     </div>
//                     <div className="mt-4 flex gap-2">
//                       <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                         Mark as Shipped
//                       </button>
//                       <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
//                         Print Label
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { 
  Loader2, 
  Package, 
  Truck, 
  Check, 
  Clock, 
  Info, 
  Mail, 
  MapPin, 
  User,
  X,
  ShoppingBag,
  Calendar,
  CreditCard,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  MoreHorizontal,
  Gift,
  Phone
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

// Define proper TypeScript interfaces
interface PurchasedProduct {
  productName: string;
  productPrice: number;
  productImage: string; // Base64 encoded image
  quantity: number;
  purchasedDate: string;
  paymentMethod: string;
  status: string;
  address: string;
  buyerName: string;
  buyerEmail: string;
  _id?: string; // Optional ID from database
}

interface StatusConfig {
  color: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}
type Agent = {
  _id: string;
  name: string;
  contact: string;
};
export function PurchasedProductsView() {
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<PurchasedProduct | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const { isLoggedIn,  token } = useAuth({ userType: "owner" });
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [deliveryAgentModal, setDeliveryAgentModal] = useState<boolean>(false);
  const [selectedOrderForDelivery, setSelectedOrderForDelivery] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string>(" ") ;
  const {userData} =useAuth({userType:'owner'});
  console.log("The data is purchased products is",userData);
  
  useEffect(() => {
    async function fetchPurchasedProducts() {
      if (!isLoggedIn || !token) {
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/owners/fetchPurchaseOwner", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPurchasedProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching purchased products:", err);
        setError("Failed to load purchased products");
        setLoading(false);
      }
    }

    if (isLoggedIn && token) {
      fetchPurchasedProducts();
    }
  }, [isLoggedIn, token]);

  // Define enhanced status configuration with proper TypeScript typing
  const statusConfig: Record<string, StatusConfig> = {
    "Pending": {
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      icon: <Clock className="w-4 h-4 mr-1" />
    },
    "Shipped": {
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: <Truck className="w-4 h-4 mr-1" />
    },
    "Delivered": {
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      icon: <Check className="w-4 h-4 mr-1" />
    },
    "Cancelled": {
      color: "text-rose-700",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      icon: <X className="w-4 h-4 mr-1" />
    }
  };
 
  // Function to render status badge with proper TypeScript typing
  const renderStatusBadge = (status: string) => {
    const config = statusConfig[status] || {
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      icon: <Package className="w-4 h-4 mr-1" />
    };

    return (
      <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-medium rounded-full flex items-center ${config.bgColor} ${config.color} border ${config.borderColor}`}>
        {config.icon}
        {status}
      </Badge>
    );
  };
   
   const fetchDeliveryAgents = async (orderId:any) => {
    if (!userData?._id || !token) return;
    
    try {
      setLoadingAgents(true);
      setDeliveryAgentModal(true);
      setSelectedOrderForDelivery(orderId);
      
      const response = await axios.post(
        'http://localhost:3000/fetchDeliveryAgents',
        { userData: userData?._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data && response.data.deliveryAgents) {
        setDeliveryAgents(response.data.deliveryAgents);
      }
    } catch (error) {
      console.log("Error fetching delivery agents:", error);
    } finally {
      setLoadingAgents(false);
    }
  };
  const assignDeliveryAgent = async () => {
    if (!selectedAgent || !selectedOrderForDelivery) return;
    console.log("The selected agent is",selectedAgent);
    console.log("The selectedOrderForDelivery is",selectedOrderForDelivery);
    
    
    try {
      // Assign the delivery agent to the order
console.log("The api is trying to be hit");

      await axios.post(
        `http://localhost:3000/assignDeliveryAgent`,
        { 
          orderId: selectedOrderForDelivery,
          deliveryAgentId: selectedAgent 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update order status to "Shipped"
      await handleUpdateStatus(selectedOrderForDelivery, "Shipped");
      
      // Close modal and reset states
      setDeliveryAgentModal(false);
      setSelectedAgent("");
      setSelectedOrderForDelivery(null);
      
    } catch (error) {
      console.error("Error assigning delivery agent:", error);
    }
  };
  const handleUpdateStatus = async (orderId: string | undefined, newStatus: string) => {
    if (!orderId || !token) return;
    
    try {
      // Replace with your actual API endpoint
      await axios.put(
        `http://localhost:3000/owners/updateOrderStatus/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update local state
      setPurchasedProducts(prev => 
        prev.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      // If updating the currently selected order
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      // Handle error appropriately
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredProducts = filterStatus 
    ? purchasedProducts.filter(product => product.status === filterStatus) 
    : purchasedProducts;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-gray-600 font-medium">Loading your orders...</p>
        <p className="text-gray-500 text-sm">Please wait while we fetch your latest order data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <X className="h-5 w-5 mr-2" />
          <p className="font-semibold">Error Loading Orders</p>
        </div>
        <p className="mt-2">{error}</p>
        <Button variant="outline" className="mt-4 border-red-300 text-red-700 hover:bg-red-100">
          Try Again
        </Button>
      </div>
    );
  }

  if (!purchasedProducts || purchasedProducts.length === 0) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Order Management</h2>
          <p className="text-gray-600 mt-2">Track and manage your product orders in one place</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-sm">
            <Package className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">No Orders Yet</h3>
          <p className="mt-3 text-gray-600 max-w-md mx-auto">Your order history will appear here once customers start purchasing your products.</p>
          <Button className="mt-6">
            <Gift className="h-4 w-4 mr-2" />
            Create Special Offer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Order Management</h2>
            <p className="text-gray-600 mt-2">Track and manage your product orders efficiently</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {filterStatus ? `Filter: ${filterStatus}` : "Filter Orders"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Order Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("Shipped")}>
                  <Truck className="h-4 w-4 mr-2 text-blue-500" />
                  Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("Delivered")}>
                  <Check className="h-4 w-4 mr-2 text-emerald-500" />
                  Delivered
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-amber-700 font-medium">Pending</p>
                <p className="text-2xl font-bold">{purchasedProducts.filter(p => p.status === "Pending").length}</p>
              </div>
              <Clock className="h-10 w-10 text-amber-500" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-blue-700 font-medium">Shipped</p>
                <p className="text-2xl font-bold">{purchasedProducts.filter(p => p.status === "Shipped").length}</p>
              </div>
              <Truck className="h-10 w-10 text-blue-500" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-emerald-700 font-medium">Delivered</p>
                <p className="text-2xl font-bold">{purchasedProducts.filter(p => p.status === "Delivered").length}</p>
              </div>
              <Check className="h-10 w-10 text-emerald-500" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-purple-700 font-medium">Total</p>
                <p className="text-2xl font-bold">{purchasedProducts.length}</p>
              </div>
              <ShoppingBag className="h-10 w-10 text-purple-500" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white relative">
            {/* Status Banner Ribbon */}
            <div className={`absolute top-4 right-4 z-10`}>
              {renderStatusBadge(product.status)}
            </div>
            
            {product.productImage && (
              <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                <img 
                  src={`data:image/jpeg;base64,${product.productImage}`} 
                  alt={product.productName}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            
            <CardHeader className="pt-5 pb-2">
              <CardTitle className="text-xl font-bold line-clamp-1">{product.productName}</CardTitle>
              <CardDescription className="flex items-center text-gray-500">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formatDate(product.purchasedDate)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-0">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="flex items-center text-gray-500">
                  <CreditCard className="h-3.5 w-3.5 mr-2" />
                  Payment
                </div>
                <div className="font-medium">{product.paymentMethod}</div>
                
                <div className="flex items-center text-gray-500">
                  <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                  Quantity
                </div>
                <div className="font-medium">{product.quantity}</div>
                
                <div className="flex items-center text-gray-500">
                  <User className="h-3.5 w-3.5 mr-2" />
                  Customer
                </div>
                <div className="font-medium line-clamp-1">{product.buyerName}</div>
                
                <div className="col-span-2 mt-2">
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="text-gray-500 text-xs">Total Amount</p>
                      <p className="text-lg font-bold">₹{(product.productPrice * product.quantity).toFixed(2)}</p>
                    </div>
                    <ShieldCheck className="h-8 w-8 text-primary/40" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 pb-5 flex gap-2">
            {product.status === "Pending" && (
  <Button 
    variant="default" 
    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 gap-1"
    onClick={() => fetchDeliveryAgents(product._id)}
  >
    <Truck className="h-4 w-4" />
    Ship Now
  </Button>
)}

{/* And also update the Ship This Order button in the details dialog */}
{/* {selectedOrder?.status === "Pending" && (
  <Button 
    onClick={() => {
      setDetailsOpen(false);
      fetchDeliveryAgents(selectedOrder._id);
    }}
    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
  >
    <Truck className="h-4 w-4 mr-2" />
    Ship This Order
  </Button>
)} */}
              {product.status === "Shipped" && (
                <Button 
                  variant="default" 
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 gap-1"
                  onClick={() => handleUpdateStatus(product._id, "Delivered")}
                >
                  <Check className="h-4 w-4" />
                  Mark Delivered
                </Button>
              )}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 gap-1"
                      onClick={() => {
                        setSelectedOrder(product);
                        setDetailsOpen(true);
                      }}
                    >
                      <Info className="h-4 w-4" />
                      <span className="hidden sm:inline">Details</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View complete order details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                  <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                  {product.status !== "Cancelled" && (
                    <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="pb-4 border-b border-gray-100">
              <DialogTitle className="flex items-center text-2xl">
                <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
                Order Details
              </DialogTitle>
              <DialogDescription className="text-gray-500 pt-1">
                Order placed on {formatDate(selectedOrder.purchasedDate)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-2">
              {/* Status Banner */}
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <h3 className="font-medium">Current Status</h3>
                <div className="flex items-center gap-2">
                  {renderStatusBadge(selectedOrder.status)}
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Product Information */}
              <div className="flex gap-5">
                {selectedOrder.productImage && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                    <img 
                      src={`data:image/jpeg;base64,${selectedOrder.productImage}`} 
                      alt={selectedOrder.productName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{selectedOrder.productName}</h4>
                  <div className="text-gray-600 mt-1">
                    ${selectedOrder.productPrice.toFixed(2)} × {selectedOrder.quantity}
                  </div>
                  <div className="mt-2 font-semibold text-lg text-primary">
                    ${(selectedOrder.productPrice * selectedOrder.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <Separator className="bg-gray-100" />
              
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-800">Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Customer Name
                    </div>
                    <div className="mt-1 text-gray-900">{selectedOrder.buyerName}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Email Address
                    </div>
                    <div className="mt-1 text-gray-900">{selectedOrder.buyerEmail}</div>
                  </div>
                </div>
                {selectedOrder.address && (
                  <div className="p-3 rounded-lg bg-gray-50 mt-4">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Shipping Address
                    </div>
                    <div className="mt-1 text-gray-900">{selectedOrder.address}</div>
                  </div>
                )}
              </div>
              
              <Separator className="bg-gray-100" />
              
              {/* Payment Information */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-800">Payment Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-gray-600">Payment Method:</div>
                    <div className="font-medium text-gray-900">{selectedOrder.paymentMethod}</div>
                    
                    <div className="text-gray-600">Subtotal:</div>
                    <div className="font-medium text-gray-900">₹{(selectedOrder.productPrice * selectedOrder.quantity).toFixed(2)}</div>
                    
                    <div className="text-gray-600">Shipping:</div>
                    <div className="font-medium text-gray-900">₹0.00</div>
                    
                    <div className="text-gray-600">Tax:</div>
                    <div className="font-medium text-gray-900">₹0.00</div>
                    
                    <div className="text-gray-800 font-semibold pt-2 border-t border-gray-200 mt-2">Total:</div>
                    <div className="font-bold text-lg text-primary pt-2 border-t border-gray-200 mt-2">₹{(selectedOrder.productPrice * selectedOrder.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center sm:justify-between pt-4 border-t border-gray-100">
              {selectedOrder.status === "Pending" && (
                <Button 
                  onClick={() => {
                    handleUpdateStatus(selectedOrder._id, "Shipped");
                    setDetailsOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Ship This Order
                </Button>
              )}
              {selectedOrder.status === "Shipped" && (
                <Button 
                  onClick={() => {
                    handleUpdateStatus(selectedOrder._id, "Delivered");
                    setDetailsOpen(false);
                  }}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
              )}
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close Details
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={deliveryAgentModal} onOpenChange={setDeliveryAgentModal}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="flex items-center">
        <Truck className="h-5 w-5 mr-2 text-primary" />
        Select Delivery Agent
      </DialogTitle>
      <DialogDescription>
        Choose an available delivery agent to handle this shipment
      </DialogDescription>
    </DialogHeader>

    {loadingAgents ? (
      <div className="py-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-500">Loading available delivery agents...</p>
      </div>
    ) : deliveryAgents.length === 0 ? (
      <div className="py-8 text-center">
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-lg mb-4">
          <div className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            <p className="font-medium">No available delivery agents</p>
          </div>
          <p className="mt-1 text-sm">All your delivery agents are currently occupied or inactive.</p>
        </div>
        <Button variant="outline" onClick={() => setDeliveryAgentModal(false)}>
          Close
        </Button>
      </div>
    ) : (
      <>
        <div className="py-4">
          <RadioGroup value={selectedAgent} onValueChange={setSelectedAgent}>
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {deliveryAgents.map((agent:Agent) => (
                <div
                  key={agent._id}
                  className={`flex items-center space-x-3 border rounded-lg p-3 transition-all cursor-pointer ${
                    selectedAgent === agent._id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedAgent(agent._id)}
                >
                  <RadioGroupItem value={agent._id} id={agent._id} />
                  <Label htmlFor={agent._id} className="flex-1 cursor-pointer">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 bg-primary/20 text-primary font-medium">
                        {agent.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <div className="ml-3">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {agent.contact}
                          </span>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="sm:justify-between border-t pt-4">
          <Button
            disabled={!selectedAgent}
            onClick={assignDeliveryAgent}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            <Truck className="h-4 w-4 mr-2" />
            Assign & Ship
          </Button>
          <Button variant="outline" onClick={() => setDeliveryAgentModal(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </>
    )}
  </DialogContent>
</Dialog>
    </div>
  );
}
