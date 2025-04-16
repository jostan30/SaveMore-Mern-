// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { toast } from "@/hooks/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";
// import { Toaster } from "../ui/toaster";
// import { useNavigate } from "react-router";
// import { useFetchCartProducts } from "@/api/cartProducts-api";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Textarea } from "../ui/textarea";
// import { Card, CardContent } from "../ui/card";
// import axios from "axios";
// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discount: number;
//   ShopName: string;
//   Address: string;
//   description: string;
//   units: number;
//   image: string;
//   quantity: number;
// }

// interface CheckoutInfo {
//   name: string;
//   email: string;
//   address: string;
//   paymentMethod: string;
// }

// function Cart() {
//   const { fetchCartProducts, isAuthLoading, isLoggedIn, token } = useFetchCartProducts();
//   const [CartProduct, setCartProduct] = useState<Product[]>([]);
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
//   const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
//     name: "",
//     email: "",
//     address: "",
//     paymentMethod: "credit-card",
//   });
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isCheckoutAll, setIsCheckoutAll] = useState(false);
//   const navigate=useNavigate();
//   // Calculate totals
//   const calculateSubtotal = (products: Product[]) => {
//     return products.reduce((total, product) => {
//       return total + product.price * product.quantity;
//     }, 0);
//   };
  
//   const calculateTax = (subtotal: number) => {
//     return subtotal * 0.08; // Assuming 8% tax rate
//   };
  
//   const calculateTotal = (subtotal: number, tax: number) => {
//     return subtotal + tax;
//   };

//   const handleBuyNow = (productId?: string) => {
//     if (productId) {
//       // Single product checkout
//       const product = CartProduct.find(p => p._id === productId);
//       if (product) {
//         setSelectedProduct(product);
//         setIsCheckoutAll(false);
//       }
//     } else {
//       // Checkout all items
//       setSelectedProduct(null);
//       setIsCheckoutAll(true);
//     }
//     setIsCheckoutOpen(true);
//   };

//   const handleCheckoutClose = () => {
//     setIsCheckoutOpen(false);
//     setSelectedProduct(null);
//     setIsCheckoutAll(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setCheckoutInfo(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCheckout = async () => {
//     // Validate input fields
//     console.log("Handle checout is hit");
    
//     if (!checkoutInfo.name || !checkoutInfo.email || !checkoutInfo.address) {
//       toast({
//         variant: "destructive",
//         title: "Missing Information",
//         description: "Please fill in all required fields",
//       });
//       return;
//     }

//     if (!token) {
//       toast({
//         variant: "destructive",
//         title: "Authentication Error",
//         description: "You need to be logged in to remove items",
//         action: <ToastAction altText="Login">Login</ToastAction>,
//       });
//       return;
//     }
//     setIsProcessing(true);
    
//     // Simulating API call for checkout process
//     try {
//       //data that has to be passed here
//       const data=selectedProduct?{
//         selectedProduct,checkoutInfo
//       }:{CartProduct,checkoutInfo};

//         console.log("checout api is being hit");
        
//           const response = await axios.post(
//             `http://localhost:3000/checkout`,   // URL
//             data,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }             
            
          
//           );
//           console.log("The checout response is",response);
//           if (response.status===201) {
//             toast({
//               title: "Order Placed Successfully!",
//               description: "Thank you for your purchase",
//             });
//             setIsCheckoutOpen(false);
//             setSelectedProduct(null);
//             setIsCheckoutAll(false);
//             //refresh after a successful chekcout
//             loadCartProducts();
//           } else {
//             toast({
//               variant: "destructive",
//               title: "Checkout Failed",
//               description: `Could not process the order.Please try agin`,
//               action: <ToastAction altText="Try again">Try again</ToastAction>,
//             });
//           }

//         } catch (error) {
//           console.error("Checkout error",error);
          
//       toast({
//         variant: "destructive",
//         title: "Checkout Failed",
//         description: "Unable to process your order. Please try again.",
//         action: <ToastAction altText="Try again">Try again</ToastAction>,
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleRemove = async (productId: string) => {
//     try {
//       if (!token) {
//         toast({
//           variant: "destructive",
//           title: "Authentication Error",
//           description: "You need to be logged in to remove items",
//           action: <ToastAction altText="Login">Login</ToastAction>,
//         });
//         return;
//       }
//       const response = await fetch(`http://localhost:3000/delete/${productId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });
//       console.log(response);
//       if (response.ok) {
//         toast({
//           title: "Item Removed Successfully",
//           description: `Keep Shopping`,
//         });
//         loadCartProducts();
//       } else {
//         toast({
//           variant: "destructive",
//           title: "Uh oh! Something went wrong.",
//           description: `Failed to remove Item`,
//           action: <ToastAction altText="Try again">Try again</ToastAction>,
//         });
//       }
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Function to load cart products
//   const loadCartProducts = async () => {
//     if (isAuthLoading) {
//       console.log("Auth is still loading, will fetch cart later");
//       return;
//     }
//     console.log("The user loggedIn status is", isLoggedIn);
    
//     if (!isLoggedIn) {
//       console.log("User is not logged in");
//       return;
//     }
    
//     try {
//       const response = await fetchCartProducts();
//       console.log("Cart products loaded in cart.tsx:", response);
//       setCartProduct(response);
//     } catch (error) {
//       console.log("Error fetching cart products:", error);
//     }
//   };

//   // Use useEffect to load cart products when component mounts
//   useEffect(() => {
//     if (!isAuthLoading) {
//       loadCartProducts();
//     }
//   }, [isAuthLoading, isLoggedIn]);

//   // Products to display in checkout modal
//   const checkoutProducts = isCheckoutAll ? CartProduct : (selectedProduct ? [selectedProduct] : []);
//   const subtotal = calculateSubtotal(checkoutProducts);
//   const tax = calculateTax(subtotal);
//   const total = calculateTotal(subtotal, tax);

//   return (
//     <div className="flex flex-col h-screen bg-[#f1f3f6] justify-center items-center">
//       <div className="flex flex-col h-full md:p-10 justify-between md:w-[70%]">
//         {/* Auth Status Information */}
//         {isAuthLoading ? (
//           <div className="p-4 text-yellow-800 bg-yellow-100 rounded">
//             Loading authentication data...
//           </div>
//         ) : !isLoggedIn ? (
//           <div className="p-4 text-red-800 bg-red-100 rounded">
//             Please log in to view your cart.
//           </div>
//         ) : null}
        
//         {/* Address */}
//         <div className="flex justify-between pb-3 mb-3 border-b">
//           <h2 className="text-xl font-semibold">Your Cart</h2>
//           <Button onClick={()=>{navigate('/users/buyProducts')}}>
//             Purchased Products
//           </Button>
//         </div>
        
//         {/* Cart Products */}
//         <div className="flex-1 justify-center p-4 bg-[#fff] mt-2 overflow-y-auto">
//           {Array.isArray(CartProduct) && CartProduct.length > 0 ? (
//             <>
//               {CartProduct.map((product: Product, index: number) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-4 border-b border-gray-300"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={`data:image/png;base64,${product.image}`}
//                       alt={product.name}
//                       className="object-cover w-20 h-20 border border-gray-200 rounded-lg shadow-md md:w-40 md:h-40"
//                     />
//                     <div>
//                       <h3 className="text-lg font-semibold">{product.name}</h3>
//                       <p>{product.description}</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <p className="text-sm text-gray-600">Price: ${product.price}</p>
//                     <p className="text-sm text-gray-600">Units Added: {product.quantity}</p>
//                     <div className="flex mt-2 space-x-2">
//                       <Button onClick={() => handleBuyNow(product._id)}>
//                         Buy Now
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         onClick={() => handleRemove(product._id)} //buy te specific product id
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               {/* Checkout All Button */}
//               {CartProduct.length > 1 && (
//                 <div className="flex justify-end mt-4">
//                   <Button 
//                     className="bg-green-600 hover:bg-green-700"
//                     onClick={() => handleBuyNow()}  //without any product id meaning all
//                   >
//                     Checkout All Items
//                   </Button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="text-xl text-center">Your cart is empty!</p>
//           )}
//         </div>
//       </div>
      
//       {/* Checkout Modal Dialog */}
//       <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
//         <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Checkout</DialogTitle>
//             <DialogDescription>
//               {isCheckoutAll 
//                 ? "Complete your purchase for all items in your cart" 
//                 : "Complete your purchase for the selected item"}
//             </DialogDescription>
//           </DialogHeader>
          
//           {/* Products Summary */}
//           <div className="my-4 space-y-4">
//             <h3 className="text-lg font-medium">Order Summary</h3>
            
//             {checkoutProducts.map((product, index) => (
//               <Card key={index} className="bg-gray-50">
//                 <CardContent className="p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={`data:image/png;base64,${product.image}`}
//                         alt={product.name}
//                         className="object-cover w-16 h-16 rounded"
//                       />
//                       <div>
//                         <p className="font-medium">{product.name}</p>
//                         <p className="text-sm text-gray-500">
//                           Quantity: {product.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium">${product.price.toFixed(2)}</p>
//                       <p className="text-sm text-gray-500">
//                         Subtotal: ${(product.price * product.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
            
//             {/* Order Totals */}
//             <div className="pt-4 border-t">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span>Tax (8%)</span>
//                 <span>${tax.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mt-2 font-bold">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Checkout Form */}
//           <div className="grid gap-4 py-4">
//             <div className="grid items-center grid-cols-4 gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="John Doe"
//                 className="col-span-3"
//                 value={checkoutInfo.name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="grid items-center grid-cols-4 gap-4">
//               <Label htmlFor="email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="example@email.com"
//                 className="col-span-3"
//                 value={checkoutInfo.email}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="grid items-center grid-cols-4 gap-4">
//               <Label htmlFor="address" className="text-right">
//                 Address
//               </Label>
//               <Textarea
//                 id="address"
//                 name="address"
//                 placeholder="Enter your delivery address"
//                 className="col-span-3"
//                 value={checkoutInfo.address}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="grid items-center grid-cols-4 gap-4">
//               <Label htmlFor="paymentMethod" className="text-right">
//                 Payment
//               </Label>
//               <select
//                 id="paymentMethod"
//                 name="paymentMethod"
//                 className="flex w-full h-10 col-span-3 px-3 py-2 text-sm border rounded-md border-input bg-background"
//                 value={checkoutInfo.paymentMethod}
//                 onChange={handleInputChange}
//               >
//                 <option value="credit-card">Credit Card</option>
//                 <option value="paypal">PayPal</option>
//                 <option value="bank-transfer">Bank Transfer</option>
//                 <option value="cash-on-delivery">Cash on Delivery</option>
//               </select>
//             </div>
//           </div>
          
//           <DialogFooter>
//             <Button variant="outline" onClick={handleCheckoutClose}>
//               Cancel
//             </Button>
//             <Button 
//               disabled={isProcessing}
//               onClick={handleCheckout}
//             >
//               {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
      
//       <Toaster />
//     </div>
//   );
// }

// export default Cart;

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "../ui/toaster";

import { useNavigate } from "react-router";

import { useFetchCartProducts } from "@/api/cartProducts-api";
import Footer from "../personal/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ShoppingCart, Package, CreditCard, Trash2, Tags, Loader2, ShoppingBag } from "lucide-react";
import axios from "axios";


interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  ShopName: string;
  Address: string;
  description: string;
  units: number;
  image: string;
  quantity: number;
  expiryDate: string; // ISO date string
  daysRemaining: number;
}

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  paymentMethod: string;
}

function Cart() {
  const { fetchCartProducts, isAuthLoading, isLoggedIn, token } = useFetchCartProducts();
  const [CartProduct, setCartProduct] = useState<Product[]>([]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutAll, setIsCheckoutAll] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const calculateSubtotal = (products: Product[]) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };
  
  const calculateTax = (subtotal: number) => {
    return subtotal * 0.08; // Assuming 8% tax rate
  };
  
  const calculateTotal = (subtotal: number, tax: number) => {
    return subtotal + tax;
  };

  const handleBuyNow = (productId?: string) => {
    if (productId) {
      // Single product checkout
      const product = CartProduct.find(p => p._id === productId);
      if (product) {
        setSelectedProduct(product);
        setIsCheckoutAll(false);
      }
    } else {
      // Checkout all items
      setSelectedProduct(null);
      setIsCheckoutAll(true);
    }
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
    setIsCheckoutAll(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCheckoutInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    // Validate input fields
    console.log("Handle checout is hit");
    
    if (!checkoutInfo.name || !checkoutInfo.email || !checkoutInfo.address) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (!token) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You need to be logged in to remove items",
        action: <ToastAction altText="Login">Login</ToastAction>,
      });
      return;
    }
    setIsProcessing(true);
    
    // Simulating API call for checkout process
    try {
      //data that has to be passed here
      const data=selectedProduct?{
        selectedProduct,checkoutInfo
      }:{CartProduct,checkoutInfo};

        console.log("checout api is being hit");
        
          const response = await axios.post(
            `http://localhost:3000/checkout`,   // URL
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }             
            
          
          );
          console.log("The checout response is",response);
          if (response.status===201) {
            toast({
              title: "Order Placed Successfully!",
              description: "Thank you for your purchase",
            });
            setIsCheckoutOpen(false);
            setSelectedProduct(null);
            setIsCheckoutAll(false);
            //refresh after a successful chekcout
            loadCartProducts();
          } else {
            toast({
              variant: "destructive",
              title: "Checkout Failed",
              description: `Could not process the order.Please try agin`,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }

        } catch (error) {
          console.error("Checkout error",error);
          
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description: "Unable to process your order. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      if (!token) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "You need to be logged in to remove items",
          action: <ToastAction altText="Login">Login</ToastAction>,
        });
        return;
      }
      const response = await fetch(`http://localhost:3000/delete/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      console.log(response);

      if (response.ok) {
        toast({
          title: "Item Removed Successfully",
          description: `Keep Shopping`,
        });
        loadCartProducts();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `Failed to remove Item`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function to load cart products
  const loadCartProducts = async () => {
    if (isAuthLoading) {
      console.log("Auth is still loading, will fetch cart later");
      return;
    }
    console.log("The user loggedIn status is", isLoggedIn);
    
    if (!isLoggedIn) {
      console.log("User is not logged in");
      return;
    }
    
    try {
      const response = await fetchCartProducts();

      console.log("Cart products loaded in cart.tsx:", response);
      setCartProduct(response);

    } catch (error) {
      console.log("Error fetching cart products:", error);
    }
  };

  // Use useEffect to load cart products when component mounts
  useEffect(() => {
    if (!isAuthLoading) {
      loadCartProducts();
    }
  }, [isAuthLoading, isLoggedIn]);

  // Products to display in checkout modal
  const checkoutProducts = isCheckoutAll ? CartProduct : (selectedProduct ? [selectedProduct] : []);
  const subtotal = calculateSubtotal(checkoutProducts);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl px-4 mx-auto">
        {/* Page Header */}
        <div className="p-6 mb-6 bg-white shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h1>
            </div>
            <Button 
              onClick={() => navigate('/users/buyProducts')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Package className="w-4 h-4 mr-2" />
              Purchased Products
            </Button>
          </div>
        </div>

        {/* Auth Status Information */}
        {isAuthLoading ? (
          <div className="flex items-center justify-center p-8 mb-6 bg-white shadow-md rounded-xl">
            <Loader2 className="w-6 h-6 mr-2 text-indigo-600 animate-spin" />
            <p className="text-lg text-gray-600">Loading your cart information...</p>
          </div>
        ) : !isLoggedIn ? (
          <div className="p-8 mb-6 text-center bg-white shadow-md rounded-xl">
            <div className="flex flex-col items-center justify-center gap-4">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-800">Please log in to view your cart</h2>
              <p className="mb-4 text-gray-500">Your shopping cart is waiting for you</p>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate('/login')}
              >
                Login to Continue
              </Button>
            </div>
          </div>
        ) : null}
        
        {/* Main Content */}
        {isLoggedIn && !isAuthLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Cart Items List */}
            <div className="md:col-span-2">
              <Card className="overflow-hidden border-0 shadow-md rounded-xl">
                <CardContent className="p-0">
                  {Array.isArray(CartProduct) && CartProduct.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {CartProduct.map((product: Product, index: number) => (
                        <div key={index} className="flex flex-col p-6 transition-colors md:flex-row md:items-center hover:bg-gray-50">
                          <div className="flex items-start flex-1 space-x-4">
                            <div className="p-2 border border-gray-100 rounded-lg bg-gray-50">
                              <img
                                src={`data:image/png;base64,${product.image}`}
                                alt={product.name}
                                className="object-contain w-24 h-24 rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-1 text-lg font-semibold text-gray-900">{product.name}</h3>
                              <p className="mb-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                              <div className="flex flex-wrap text-sm gap-x-4 gap-y-2">
                                <span className="inline-flex items-center text-indigo-600">
                                  <Tags className="w-4 h-4 mr-1" />
                                  {product.ShopName}
                                </span>
                                <span className="text-gray-600">
                                  Quantity: {product.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 mt-4 md:mt-0 md:items-end">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)}</p>
                              {product.discount > 0 && (
                                <p className="text-sm text-green-600">Save {product.discount}%</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleBuyNow(product._id)}
                                className="bg-indigo-600 hover:bg-indigo-700"
                              >
                                Buy Now
                              </Button>
                              <Button
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleRemove(product._id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                      <div className="p-4 mb-4 rounded-full bg-gray-50">
                        <ShoppingCart className="w-12 h-12 text-gray-300" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium text-gray-800">Your cart is empty</h3>
                      <p className="mb-6 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                      <Button 
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => navigate('/')}
                      >
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </CardContent>
                {CartProduct.length > 1 && (
                  <CardFooter className="flex justify-end p-4 bg-gray-50">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleBuyNow()}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Checkout All Items
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
            
            {/* Order Summary */}
            {/* Order Summary */}
{CartProduct.length > 0 && (
  <div className="md:col-span-1">
    <Card className="sticky border-0 shadow-md top-6 rounded-xl">
      <CardContent className="p-6">
        <h3 className="pb-3 mb-4 text-lg font-bold text-gray-800 border-b">Order Summary</h3>
        <div className="mb-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Items ({CartProduct.length})</span>
            <span className="font-medium">{calculateSubtotal(CartProduct).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-medium">{calculateTax(calculateSubtotal(CartProduct)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-lg font-bold text-indigo-600">
              Rs {calculateTotal(
                calculateSubtotal(CartProduct),
                calculateTax(calculateSubtotal(CartProduct))
              ).toFixed(2)}
            </span>
          </div>
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => handleBuyNow()}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)}

{/* Checkout Dialog */}
<Dialog open={isCheckoutOpen} onOpenChange={handleCheckoutClose}>
  <DialogContent className="sm:max-w-md md:max-w-lg">
    <DialogHeader>
      <DialogTitle>Complete Your Purchase</DialogTitle>
      <DialogDescription>
        {isCheckoutAll ? 'Checkout all items in your cart' : 'Complete your purchase for the selected item'}
      </DialogDescription>
    </DialogHeader>
    
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={checkoutInfo.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email address"
          value={checkoutInfo.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="address">Shipping Address</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="Your complete shipping address"
          value={checkoutInfo.address}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background"
          value={checkoutInfo.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      
      {/* Order Summary */}
      <div className="p-4 mt-4 rounded-lg bg-gray-50">
        <h4 className="mb-3 font-medium text-gray-800">Order Summary</h4>
        <div className="space-y-2 text-sm">
          {checkoutProducts.map((product) => (
            <div key={product._id} className="flex justify-between">
              <span>{product.name} (x{product.quantity})</span>
              <span>{(product.price * product.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-2 mt-2 border-t"></div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span>Total</span>
            <span className="text-indigo-600">Rs {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
    
    <DialogFooter>
      <Button variant="outline" onClick={handleCheckoutClose} disabled={isProcessing}>
        Cancel
      </Button>
      <Button 
        onClick={handleCheckout} 
        className="bg-indigo-600 hover:bg-indigo-700"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Complete Order
          </>
        )}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Toaster */}
<Toaster />

</div>
        )

      }
      </div>
      <Footer />
      </div>
   
      )
      }
export default Cart;