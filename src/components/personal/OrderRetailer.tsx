
'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
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
  Gift
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

export function PurchasedProductsView() {
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<PurchasedProduct | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const { isLoggedIn,  token } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

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
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="font-medium text-gray-600">Loading your orders...</p>
        <p className="text-sm text-gray-500">Please wait while we fetch your latest order data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg shadow-sm bg-red-50">
        <div className="flex items-center">
          <X className="w-5 h-5 mr-2" />
          <p className="font-semibold">Error Loading Orders</p>
        </div>
        <p className="mt-2">{error}</p>
        <Button variant="outline" className="mt-4 text-red-700 border-red-300 hover:bg-red-100">
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
          <p className="mt-2 text-gray-600">Track and manage your product orders in one place</p>
        </div>
        <div className="p-12 text-center border border-gray-200 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          <div className="flex items-center justify-center w-20 h-20 p-4 mx-auto bg-white rounded-full shadow-sm">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">No Orders Yet</h3>
          <p className="max-w-md mx-auto mt-3 text-gray-600">Your order history will appear here once customers start purchasing your products.</p>
          <Button className="mt-6">
            <Gift className="w-4 h-4 mr-2" />
            Create Special Offer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">Order Management</h2>
            <p className="mt-2 text-gray-600">Track and manage your product orders efficiently</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {filterStatus ? `Filter: ${filterStatus}` : "Filter Orders"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Order Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>
                  <Clock className="w-4 h-4 mr-2 text-amber-500" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("Shipped")}>
                  <Truck className="w-4 h-4 mr-2 text-blue-500" />
                  Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("Delivered")}>
                  <Check className="w-4 h-4 mr-2 text-emerald-500" />
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
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-amber-700">Pending</p>
                <p className="text-2xl font-bold">{purchasedProducts.filter(p => p.status === "Pending").length}</p>
              </div>
              <Clock className="w-10 h-10 text-amber-500" />
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-blue-700">Shipped</p>
                <p className="text-2xl font-bold">{purchasedProducts.filter(p => p.status === "Shipped").length}</p>
              </div>
              <Truck className="w-10 h-10 text-blue-500" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-emerald-700">Delivered</p>
                <p className="text-2xl font-bold">{purchasedProducts.filter(p => p.status === "Delivered").length}</p>
              </div>
              <Check className="w-10 h-10 text-emerald-500" />
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-purple-700">Total</p>
                <p className="text-2xl font-bold">{purchasedProducts.length}</p>
              </div>
              <ShoppingBag className="w-10 h-10 text-purple-500" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <Card key={index} className="relative overflow-hidden transition-all duration-300 bg-white border-0 shadow-md hover:shadow-lg">
            {/* Status Banner Ribbon */}
            <div className={`absolute top-4 right-4 z-10`}>
              {renderStatusBadge(product.status)}
            </div>
            
            {product.productImage && (
              <div className="relative w-full h-48 overflow-hidden bg-gray-100">
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
              <div className="grid grid-cols-2 text-sm gap-y-3">
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
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-lg font-bold">${(product.productPrice * product.quantity).toFixed(2)}</p>
                    </div>
                    <ShieldCheck className="w-8 h-8 text-primary/40" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-2 pt-4 pb-5">
              {product.status === "Pending" && (
                <Button 
                  variant="default" 
                  className="flex-1 gap-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  onClick={() => handleUpdateStatus(product._id, "Shipped")}
                >
                  <Truck className="w-4 h-4" />
                  Ship Now
                </Button>
              )}
              {product.status === "Shipped" && (
                <Button 
                  variant="default" 
                  className="flex-1 gap-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
                  onClick={() => handleUpdateStatus(product._id, "Delivered")}
                >
                  <Check className="w-4 h-4" />
                  Mark Delivered
                </Button>
              )}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="gap-1 text-gray-700 border-gray-300 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedOrder(product);
                        setDetailsOpen(true);
                      }}
                    >
                      <Info className="w-4 h-4" />
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
                    <MoreHorizontal className="w-4 h-4" />
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
                <ShoppingBag className="w-6 h-6 mr-2 text-primary" />
                Order Details
              </DialogTitle>
              <DialogDescription className="pt-1 text-gray-500">
                Order placed on {formatDate(selectedOrder.purchasedDate)}
              </DialogDescription>
            </DialogHeader>

            <div className="py-2 space-y-6">
              {/* Status Banner */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <h3 className="font-medium">Current Status</h3>
                <div className="flex items-center gap-2">
                  {renderStatusBadge(selectedOrder.status)}
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Product Information */}
              <div className="flex gap-5">
                {selectedOrder.productImage && (
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-100 rounded-lg shadow-sm">
                    <img 
                      src={`data:image/jpeg;base64,${selectedOrder.productImage}`} 
                      alt={selectedOrder.productName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{selectedOrder.productName}</h4>
                  <div className="mt-1 text-gray-600">
                    ${selectedOrder.productPrice.toFixed(2)} × {selectedOrder.quantity}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-primary">
                    ${(selectedOrder.productPrice * selectedOrder.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <Separator className="bg-gray-100" />
              
              {/* Customer Information */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Customer Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <User className="w-4 h-4 mr-2 text-primary" />
                      Customer Name
                    </div>
                    <div className="mt-1 text-gray-900">{selectedOrder.buyerName}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      Email Address
                    </div>
                    <div className="mt-1 text-gray-900">{selectedOrder.buyerEmail}</div>
                  </div>
                </div>
                {selectedOrder.address && (
                  <div className="p-3 mt-4 rounded-lg bg-gray-50">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      Shipping Address
                    </div>
                    <div className="mt-1 text-gray-900">{selectedOrder.address}</div>
                  </div>
                )}
              </div>
              
              <Separator className="bg-gray-100" />
              
              {/* Payment Information */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Payment Summary</h3>
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="grid grid-cols-2 text-sm gap-y-3">
                    <div className="text-gray-600">Payment Method:</div>
                    <div className="font-medium text-gray-900">{selectedOrder.paymentMethod}</div>
                    
                    <div className="text-gray-600">Subtotal:</div>
                    <div className="font-medium text-gray-900">${(selectedOrder.productPrice * selectedOrder.quantity).toFixed(2)}</div>
                    
                    <div className="text-gray-600">Shipping:</div>
                    <div className="font-medium text-gray-900">$0.00</div>
                    
                    <div className="text-gray-600">Tax:</div>
                    <div className="font-medium text-gray-900">$0.00</div>
                    
                    <div className="pt-2 mt-2 font-semibold text-gray-800 border-t border-gray-200">Total:</div>
                    <div className="pt-2 mt-2 text-lg font-bold border-t border-gray-200 text-primary">${(selectedOrder.productPrice * selectedOrder.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between pt-4 border-t border-gray-100 sm:justify-between">
              {selectedOrder.status === "Pending" && (
                <Button 
                  onClick={() => {
                    handleUpdateStatus(selectedOrder._id, "Shipped");
                    setDetailsOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                >
                  <Truck className="w-4 h-4 mr-2" />
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
                  <Check className="w-4 h-4 mr-2" />
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
    </div>
  );
}
