// "use client";
// import  { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MapPin, Phone, Package, User,  Truck, CheckCircle,  AlertCircle, Info, Calendar, DollarSign } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Progress } from "@/components/ui/progress";

// interface Order {
//   _id: string;
//   buyer: {
//     _id: string;
//     fullName?: string;
//   };
//   buyerName: string;
//   buyerEmail: string;
//   owner: {
//     _id: string;
//     email?: string;
//   };
//   product: {
//     _id: string;
//     name: string;
//     price: number;
//     image?: string;
//   };
//   deliveryAgent?: string;
//   quantity: number;
//   address: string;
//   paymentMethod: string;
//   status: "Pending" | "Cancelled" | "Shipped" | "Delivered";
//   purchaseDate: string;
// }

// export default function DeliveryDashboard() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("pending");
//   const { toast } = useToast();
//   const [deliveryAgentId, setDeliveryAgentId] = useState<string | null>(null);

//   // Simulating a logged-in delivery agent ID - in a real app you would get this from auth context
//   useEffect(() => {
//     // This would come from your authentication system
//     setDeliveryAgentId("delivery-agent-123");
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         // In a real app, you would fetch orders assigned to this delivery agent
//         const response = await fetch(`http://localhost:3000/orders/agent/${deliveryAgentId}`);
//         const data = await response.json();
//          console.log("The data is being sent");
        
//         if (response.ok) {
//           setOrders(data);
//         } else {
//           console.error("Failed to fetch orders:", data);
//           setError(data.message || "Failed to fetch orders");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Connection error. Please try again later.");
//       } finally {
//         setIsLoading(false);

//         // For demo purposes, show success toast when orders load
//         if (!error) {
//           toast({
//             title: "Dashboard Updated",
//             description: "Your delivery orders have been refreshed",
//           });
//         }
//       }
//     };

//     if (deliveryAgentId) {
//       fetchOrders();
//     }
//   }, [deliveryAgentId, toast]);

//   // For demo purposes, creating mock data
//   useEffect(() => {
//     // This is temporary sample data
//     const mockOrders: Order[] = [
//       {
//         _id: "order1",
//         buyer: { _id: "buyer1" },
//         buyerName: "Sarah Johnson",
//         buyerEmail: "sarah.j@example.com",
//         owner: { _id: "owner1", email: "store@example.com" },
//         product: {
//           _id: "prod1",
//           name: "Premium Organic Tea Set",
//           price: 34.99,
//           image: "/products/tea-set.jpg"
//         },
//         quantity: 1,
//         address: "123 Maple Street, Apt 4B, Brooklyn, NY 11201",
//         paymentMethod: "credit-card",
//         status: "Pending",
//         purchaseDate: new Date().toISOString()
//       },
//       {
//         _id: "order2",
//         buyer: { _id: "buyer2" },
//         buyerName: "Michael Chen",
//         buyerEmail: "mchen@example.com",
//         owner: { _id: "owner1", email: "store@example.com" },
//         product: {
//           _id: "prod2",
//           name: "Wireless Noise-Cancelling Headphones",
//           price: 159.99,
//           image: "/products/headphones.jpg"
//         },
//         quantity: 1,
//         address: "456 Oak Avenue, Suite 789, San Francisco, CA 94102",
//         paymentMethod: "paypal",
//         status: "Shipped",
//         purchaseDate: new Date(Date.now() - 86400000).toISOString() // 1 day ago
//       },
//       {
//         _id: "order3",
//         buyer: { _id: "buyer3" },
//         buyerName: "Emily Rodriguez",
//         buyerEmail: "emily.r@example.com",
//         owner: { _id: "owner2", email: "tech-store@example.com" },
//         product: {
//           _id: "prod3",
//           name: "Smart Home Security Camera",
//           price: 89.99,
//           image: "/products/camera.jpg"
//         },
//         quantity: 2,
//         address: "789 Pine Blvd, Chicago, IL 60601",
//         paymentMethod: "cash-on-delivery",
//         status: "Pending",
//         purchaseDate: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
//       },
//       {
//         _id: "order4",
//         buyer: { _id: "buyer4" },
//         buyerName: "James Wilson",
//         buyerEmail: "jwilson@example.com",
//         owner: { _id: "owner1", email: "store@example.com" },
//         product: {
//           _id: "prod4",
//           name: "Professional Chef Knife Set",
//           price: 129.99,
//           image: "/products/knife-set.jpg"
//         },
//         quantity: 1,
//         address: "321 Elm Street, Austin, TX 78701",
//         paymentMethod: "credit-card",
//         status: "Delivered",
//         purchaseDate: new Date(Date.now() - 172800000).toISOString() // 2 days ago
//       },
//       {
//         _id: "order5",
//         buyer: { _id: "buyer5" },
//         buyerName: "Aisha Patel",
//         buyerEmail: "apatel@example.com",
//         owner: { _id: "owner3", email: "fashion-outlet@example.com" },
//         product: {
//           _id: "prod5",
//           name: "Leather Crossbody Bag",
//           price: 79.99,
//           image: "/products/bag.jpg"
//         },
//         quantity: 1,
//         address: "555 Market Street, Seattle, WA 98101",
//         paymentMethod: "bank-transfer",
//         status: "Shipped",
//         purchaseDate: new Date(Date.now() - 129600000).toISOString() // 1.5 days ago
//       }
//     ];

//     setOrders(mockOrders);
//     setIsLoading(false);
//   }, []);

//   const filteredOrders = orders.filter(order => {
//     if (activeTab === "pending") return order.status === "Pending";
//     if (activeTab === "shipped") return order.status === "Shipped";
//     if (activeTab === "delivered") return order.status === "Delivered";
//     return true; // "all" tab
//   });

//   const updateOrderStatus = async (orderId: string, newStatus: "Pending" | "Shipped" | "Delivered") => {
//     // In a real app, this would make an API call to update the order
//     try {
//       // Mock API call
//       // const response = await fetch(`http://localhost:3000/orders/update/${orderId}`, {
//       //   method: "PATCH",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ status: newStatus }),
//       // });
//       // const data = await response.json();

//       // For demo, just update the state directly
//       const updatedOrders = orders.map(order => 
//         order._id === orderId ? { ...order, status: newStatus } : order
//       );
//       setOrders(updatedOrders);

//       toast({
//         title: "Order Updated",
//         description: `Order #${orderId.slice(-5)} is now ${newStatus}`,
//       });
//     } catch (error) {
//       console.error("Error updating order:", error);
//       toast({
//         variant: "destructive",
//         title: "Update Failed",
//         description: "Could not update the order status. Please try again.",
//       });
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "Pending":
//         return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
//       case "Shipped":
//         return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Shipped</Badge>;
//       case "Delivered":
//         return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
//       case "Cancelled":
//         return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   const getPaymentMethodIcon = (method: string) => {
//     switch (method) {
//       case "credit-card":
//         return <DollarSign className="h-4 w-4 text-gray-500" />;
//       case "paypal":
//         return <DollarSign className="h-4 w-4 text-blue-500" />;
//       case "bank-transfer":
//         return <DollarSign className="h-4 w-4 text-green-500" />;
//       case "cash-on-delivery":
//         return <DollarSign className="h-4 w-4 text-amber-500" />;
//       default:
//         return <DollarSign className="h-4 w-4" />;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="container mx-auto py-6">
//       {/* Dashboard Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
//           <p className="text-gray-600 mt-1">Manage and track your assigned deliveries</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex items-center">
//           <Avatar className="h-10 w-10">
//             <AvatarImage src="/avatar.png" alt="Avatar" />
//             <AvatarFallback className="bg-blue-500 text-white">DA</AvatarFallback>
//           </Avatar>
//           <div className="ml-3">
//             <p className="font-medium text-gray-900">John Delivery</p>
//             <p className="text-sm text-gray-600">Online - Active</p>
//           </div>
//         </div>
//       </div>

//       {/* Order Summary Cards */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//           <CardContent className="pt-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-blue-600">Total Orders</p>
//                 <p className="text-3xl font-bold text-blue-900">{orders.length}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <ShoppingBag className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
//           <CardContent className="pt-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-amber-600">Pending</p>
//                 <p className="text-3xl font-bold text-amber-900">
//                   {orders.filter(o => o.status === "Pending").length}
//                 </p>
//               </div>
//               <div className="bg-amber-100 p-3 rounded-full">
//                 <Clock className="h-6 w-6 text-amber-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
//           <CardContent className="pt-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-indigo-600">Shipped</p>
//                 <p className="text-3xl font-bold text-indigo-900">
//                   {orders.filter(o => o.status === "Shipped").length}
//                 </p>
//               </div>
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <Truck className="h-6 w-6 text-indigo-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
//           <CardContent className="pt-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-green-600">Delivered</p>
//                 <p className="text-3xl font-bold text-green-900">
//                   {orders.filter(o => o.status === "Delivered").length}
//                 </p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div> */}

//       {/* Order Progress */}
//       <Card className="mb-6">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-lg">Delivery Performance</CardTitle>
//           <CardDescription>Your current completion rate and statistics</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium text-gray-700">Completed Orders</span>
//                 <span className="text-sm font-medium text-gray-700">
//                   {orders.filter(o => o.status === "Delivered").length} / {orders.length}
//                 </span>
//               </div>
//               <Progress 
//                 value={(orders.filter(o => o.status === "Delivered").length / orders.length) * 100} 
//                 className="h-2 bg-gray-200" 
//               />
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
//               <div className="flex flex-col">
//                 <span className="text-sm text-gray-500">On-time Rate</span>
//                 <span className="text-lg font-semibold">98%</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm text-gray-500">Avg Delivery Time</span>
//                 <span className="text-lg font-semibold">1.2 days</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm text-gray-500">Customer Rating</span>
//                 <span className="text-lg font-semibold">4.9/5.0</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm text-gray-500">This Week</span>
//                 <span className="text-lg font-semibold">+12 Orders</span>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Orders Table with Tabs */}
//       <Card className="overflow-hidden">
//         <CardHeader className="bg-gray-50 border-b border-gray-100">
//           <CardTitle>Your Delivery Orders</CardTitle>
//         </CardHeader>
        
//         <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
//           <div className="px-6 pt-2 border-b">
//             <TabsList className="grid grid-cols-4 gap-4">
//               <TabsTrigger value="all" className="data-[state=active]:bg-gray-100">
//                 All Orders
//               </TabsTrigger>
//               <TabsTrigger value="pending" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900">
//                 Pending
//               </TabsTrigger>
//               <TabsTrigger value="shipped" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
//                 Shipped
//               </TabsTrigger>
//               <TabsTrigger value="delivered" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-900">
//                 Delivered
//               </TabsTrigger>
//             </TabsList>
//           </div>

//           {isLoading ? (
//             <div className="p-8 text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading your orders...</p>
//             </div>
//           ) : error ? (
//             <div className="p-8 text-center">
//               <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
//               <p className="mt-4 text-gray-600">{error}</p>
//               <Button variant="outline" className="mt-4">
//                 Retry
//               </Button>
//             </div>
//           ) : filteredOrders.length === 0 ? (
//             <div className="p-8 text-center">
//               <Package className="h-12 w-12 text-gray-400 mx-auto" />
//               <p className="mt-4 text-gray-600">No orders found in this category</p>
//             </div>
//           ) : (
//             <TabsContent value={activeTab} className="m-0">
//               <div className="divide-y divide-gray-100">
//                 {filteredOrders.map((order) => (
//                   <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
//                     <div className="flex flex-col md:flex-row justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-start">
//                           <div className="flex-shrink-0 hidden sm:block">
//                             <div className="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center">
//                               <Package className="h-8 w-8 text-gray-500" />
//                             </div>
//                           </div>
//                           <div className="sm:ml-4">
//                             <div className="flex items-center">
//                               <h3 className="text-lg font-semibold text-gray-900">
//                                 Order #{order._id.slice(-5)}
//                               </h3>
//                               <div className="ml-2">{getStatusBadge(order.status)}</div>
//                             </div>
//                             <p className="text-gray-600 mt-1">{order.product.name} × {order.quantity}</p>
//                             <p className="text-gray-600 mt-1">
//                               <span className="font-medium">${(order.product.price * order.quantity).toFixed(2)}</span>
//                               <span className="mx-2">•</span>
//                               <span className="inline-flex items-center">
//                                 {getPaymentMethodIcon(order.paymentMethod)}
//                                 <span className="ml-1 capitalize">{order.paymentMethod.replace(/-/g, ' ')}</span>
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
//                         <div className="flex items-center text-sm text-gray-500 mb-2">
//                           <Calendar className="h-4 w-4 mr-1" />
//                           {formatDate(order.purchaseDate)}
//                         </div>
                        
//                         <div className="flex space-x-2 mt-2">
//                           {order.status === "Pending" && (
//                             <Button 
//                               variant="outline" 
//                               size="sm" 
//                               className="border-blue-200 text-blue-700 hover:bg-blue-50"
//                               onClick={() => updateOrderStatus(order._id, "Shipped")}
//                             >
//                               <Truck className="h-4 w-4 mr-1" />
//                               Mark Shipped
//                             </Button>
//                           )}
                          
//                           {order.status === "Shipped" && (
//                             <Button 
//                               variant="outline" 
//                               size="sm" 
//                               className="border-green-200 text-green-700 hover:bg-green-50"
//                               onClick={() => updateOrderStatus(order._id, "Delivered")}
//                             >
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               Mark Delivered
//                             </Button>
//                           )}
                          
//                           <Button variant="ghost" size="sm" className="text-gray-500">
//                             <Info className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4 border-t border-gray-100 pt-4">
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <User className="h-4 w-4 mr-2 text-gray-400" />
//                             <span className="font-medium mr-2">Customer:</span>
//                             {order.buyerName} ({order.buyerEmail})
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600 mt-2">
//                             <Phone className="h-4 w-4 mr-2 text-gray-400" />
//                             <span className="font-medium mr-2">Contact:</span>
//                             +1 555-123-4567
//                           </div>
//                         </div>
//                         <div>
//                           <div className="flex items-start text-sm text-gray-600">
//                             <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
//                             <div>
//                               <span className="font-medium block">Delivery Address:</span>
//                               <span>{order.address}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </TabsContent>
//           )}
//         </Tabs>
//       </Card>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Package, User, Truck, CheckCircle, AlertCircle, Info, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface Order {
  _id: string;
  buyer: {
    _id: string;
    fullName?: string;
  };
  buyerName: string;
  buyerEmail: string;
  owner: {
    _id: string;
    email?: string;
  };
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  deliveryAgent?: string;
  quantity: number;
  address: string;
  paymentMethod: string;
  status: "Pending" | "Cancelled" | "Shipped" | "Delivered";
  purchaseDate: string;
}

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("pending");
  const { toast } = useToast();

  // Load mock data directly without any backend connection
  useEffect(() => {
    // This simulates loading data
    setTimeout(() => {
      // Mock orders data
      const mockOrders: Order[] = [
        {
          _id: "order1",
          buyer: { _id: "buyer1" },
          buyerName: "Sarah Johnson",
          buyerEmail: "sarah.j@example.com",
          owner: { _id: "owner1", email: "store@example.com" },
          product: {
            _id: "prod1",
            name: "Premium Organic Tea Set",
            price: 34.99,
            image: "/products/tea-set.jpg"
          },
          quantity: 1,
          address: "123 Maple Street, Apt 4B, Brooklyn, NY 11201",
          paymentMethod: "credit-card",
          status: "Pending",
          purchaseDate: new Date().toISOString()
        },
        {
          _id: "order2",
          buyer: { _id: "buyer2" },
          buyerName: "Michael Chen",
          buyerEmail: "mchen@example.com",
          owner: { _id: "owner1", email: "store@example.com" },
          product: {
            _id: "prod2",
            name: "Wireless Noise-Cancelling Headphones",
            price: 159.99,
            image: "/products/headphones.jpg"
          },
          quantity: 1,
          address: "456 Oak Avenue, Suite 789, San Francisco, CA 94102",
          paymentMethod: "paypal",
          status: "Shipped",
          purchaseDate: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          _id: "order3",
          buyer: { _id: "buyer3" },
          buyerName: "Emily Rodriguez",
          buyerEmail: "emily.r@example.com",
          owner: { _id: "owner2", email: "tech-store@example.com" },
          product: {
            _id: "prod3",
            name: "Smart Home Security Camera",
            price: 89.99,
            image: "/products/camera.jpg"
          },
          quantity: 2,
          address: "789 Pine Blvd, Chicago, IL 60601",
          paymentMethod: "cash-on-delivery",
          status: "Pending",
          purchaseDate: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
        },
        {
          _id: "order4",
          buyer: { _id: "buyer4" },
          buyerName: "James Wilson",
          buyerEmail: "jwilson@example.com",
          owner: { _id: "owner1", email: "store@example.com" },
          product: {
            _id: "prod4",
            name: "Professional Chef Knife Set",
            price: 129.99,
            image: "/products/knife-set.jpg"
          },
          quantity: 1,
          address: "321 Elm Street, Austin, TX 78701",
          paymentMethod: "credit-card",
          status: "Delivered",
          purchaseDate: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        },
        {
          _id: "order5",
          buyer: { _id: "buyer5" },
          buyerName: "Aisha Patel",
          buyerEmail: "apatel@example.com",
          owner: { _id: "owner3", email: "fashion-outlet@example.com" },
          product: {
            _id: "prod5",
            name: "Leather Crossbody Bag",
            price: 79.99,
            image: "/products/bag.jpg"
          },
          quantity: 1,
          address: "555 Market Street, Seattle, WA 98101",
          paymentMethod: "bank-transfer",
          status: "Shipped",
          purchaseDate: new Date(Date.now() - 129600000).toISOString() // 1.5 days ago
        }
      ];

      setOrders(mockOrders);
      setIsLoading(false);
      
      // Show success toast when orders load
      toast({
        title: "Dashboard Updated",
        description: "Your delivery orders have been loaded",
      });
    }, 1000); // Simulate network delay
  }, [toast]);

  const filteredOrders = orders.filter(order => {
    if (activeTab === "pending") return order.status === "Pending";
    if (activeTab === "shipped") return order.status === "Shipped";
    if (activeTab === "delivered") return order.status === "Delivered";
    return true; // "all" tab
  });

  const updateOrderStatus = async (orderId: string, newStatus: "Pending" | "Shipped" | "Delivered") => {
    try {
      // Update the state directly without API call
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      toast({
        title: "Order Updated",
        description: `Order #${orderId.slice(-5)} is now ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update the order status. Please try again.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case "Shipped":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Shipped</Badge>;
      case "Delivered":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case "Cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit-card":
        return <DollarSign className="h-4 w-4 text-gray-500" />;
      case "paypal":
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case "bank-transfer":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "cash-on-delivery":
        return <DollarSign className="h-4 w-4 text-amber-500" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track your assigned deliveries</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.png" alt="Avatar" />
            <AvatarFallback className="bg-blue-500 text-white">DA</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium text-gray-900">John Delivery</p>
            <p className="text-sm text-gray-600">Online - Active</p>
          </div>
        </div>
      </div>

      {/* Order Progress */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Delivery Performance</CardTitle>
          <CardDescription>Your current completion rate and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Completed Orders</span>
                <span className="text-sm font-medium text-gray-700">
                  {orders.filter(o => o.status === "Delivered").length} / {orders.length}
                </span>
              </div>
              <Progress 
                value={(orders.filter(o => o.status === "Delivered").length / orders.length) * 100} 
                className="h-2 bg-gray-200" 
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">On-time Rate</span>
                <span className="text-lg font-semibold">98%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Avg Delivery Time</span>
                <span className="text-lg font-semibold">1.2 days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Customer Rating</span>
                <span className="text-lg font-semibold">4.9/5.0</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">This Week</span>
                <span className="text-lg font-semibold">+12 Orders</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table with Tabs */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle>Your Delivery Orders</CardTitle>
        </CardHeader>
        
        <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
          <div className="px-6 pt-2 border-b">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-100">
                All Orders
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900">
                Pending
              </TabsTrigger>
              <TabsTrigger value="shipped" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
                Shipped
              </TabsTrigger>
              <TabsTrigger value="delivered" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-900">
                Delivered
              </TabsTrigger>
            </TabsList>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="mt-4 text-gray-600">{error}</p>
              <Button variant="outline" className="mt-4">
                Retry
              </Button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="mt-4 text-gray-600">No orders found in this category</p>
            </div>
          ) : (
            <TabsContent value={activeTab} className="m-0">
              <div className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 hidden sm:block">
                            <div className="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center">
                              <Package className="h-8 w-8 text-gray-500" />
                            </div>
                          </div>
                          <div className="sm:ml-4">
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Order #{order._id.slice(-5)}
                              </h3>
                              <div className="ml-2">{getStatusBadge(order.status)}</div>
                            </div>
                            <p className="text-gray-600 mt-1">{order.product.name} × {order.quantity}</p>
                            <p className="text-gray-600 mt-1">
                              <span className="font-medium">${(order.product.price * order.quantity).toFixed(2)}</span>
                              <span className="mx-2">•</span>
                              <span className="inline-flex items-center">
                                {getPaymentMethodIcon(order.paymentMethod)}
                                <span className="ml-1 capitalize">{order.paymentMethod.replace(/-/g, ' ')}</span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.purchaseDate)}
                        </div>
                        
                        <div className="flex space-x-2 mt-2">
                          {order.status === "Pending" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                              onClick={() => updateOrderStatus(order._id, "Shipped")}
                            >
                              <Truck className="h-4 w-4 mr-1" />
                              Mark Shipped
                            </Button>
                          )}
                          
                          {order.status === "Shipped" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-green-200 text-green-700 hover:bg-green-50"
                              onClick={() => updateOrderStatus(order._id, "Delivered")}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Delivered
                            </Button>
                          )}
                          
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="font-medium mr-2">Customer:</span>
                            {order.buyerName} ({order.buyerEmail})
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-2">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="font-medium mr-2">Contact:</span>
                            +1 555-123-4567
                          </div>
                        </div>
                        <div>
                          <div className="flex items-start text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                            <div>
                              <span className="font-medium block">Delivery Address:</span>
                              <span>{order.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </Card>
    </div>
  );
}