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
//           <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
//             Loading authentication data...
//           </div>
//         ) : !isLoggedIn ? (
//           <div className="p-4 bg-red-100 text-red-800 rounded">
//             Please log in to view your cart.
//           </div>
//         ) : null}
        
//         {/* Address */}
//         <div className="flex justify-between border-b pb-3 mb-3">
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
//                   className="flex justify-between items-center p-4 border-b border-gray-300"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={`data:image/png;base64,${product.image}`}
//                       alt={product.name}
//                       className="md:w-40 md:h-40 h-20 w-20 object-cover rounded-lg shadow-md border border-gray-200"
//                     />
//                     <div>
//                       <h3 className="text-lg font-semibold">{product.name}</h3>
//                       <p>{product.description}</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <p className="text-sm text-gray-600">Price: ${product.price}</p>
//                     <p className="text-sm text-gray-600">Units Added: {product.quantity}</p>
//                     <div className="flex space-x-2 mt-2">
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
//                 <div className="mt-4 flex justify-end">
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
//             <p className="text-center text-xl">Your cart is empty!</p>
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
//           <div className="space-y-4 my-4">
//             <h3 className="font-medium text-lg">Order Summary</h3>
            
//             {checkoutProducts.map((product, index) => (
//               <Card key={index} className="bg-gray-50">
//                 <CardContent className="p-4">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={`data:image/png;base64,${product.image}`}
//                         alt={product.name}
//                         className="w-16 h-16 object-cover rounded"
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
//             <div className="border-t pt-4">
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
//             <div className="grid grid-cols-4 items-center gap-4">
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
//             <div className="grid grid-cols-4 items-center gap-4">
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
//             <div className="grid grid-cols-4 items-center gap-4">
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
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="paymentMethod" className="text-right">
//                 Payment
//               </Label>
//               <select
//                 id="paymentMethod"
//                 name="paymentMethod"
//                 className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h1>
            </div>
            <Button 
              onClick={() => navigate('/users/buyProducts')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Package className="h-4 w-4 mr-2" />
              Purchased Products
            </Button>
          </div>
        </div>

        {/* Auth Status Information */}
        {isAuthLoading ? (
          <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-md mb-6">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-600 mr-2" />
            <p className="text-lg text-gray-600">Loading your cart information...</p>
          </div>
        ) : !isLoggedIn ? (
          <div className="bg-white rounded-xl shadow-md mb-6 p-8 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-800">Please log in to view your cart</h2>
              <p className="text-gray-500 mb-4">Your shopping cart is waiting for you</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="md:col-span-2">
              <Card className="shadow-md border-0 rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  {Array.isArray(CartProduct) && CartProduct.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {CartProduct.map((product: Product, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                              <img
                                src={`data:image/png;base64,${product.image}`}
                                alt={product.name}
                                className="w-24 h-24 object-contain rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                <span className="inline-flex items-center text-indigo-600">
                                  <Tags className="h-4 w-4 mr-1" />
                                  {product.ShopName}
                                </span>
                                <span className="text-gray-600">
                                  Quantity: {product.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-3">
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
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleRemove(product._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <div className="bg-gray-50 p-4 rounded-full mb-4">
                        <ShoppingCart className="h-12 w-12 text-gray-300" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty</h3>
                      <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
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
                  <CardFooter className="bg-gray-50 p-4 flex justify-end">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleBuyNow()}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
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
    <Card className="sticky top-6 shadow-md border-0 rounded-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b">Order Summary</h3>
        <div className="space-y-3 mb-4">
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
        <div className="border-t pt-3">
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
            <CreditCard className="h-4 w-4 mr-2" />
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
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          value={checkoutInfo.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      
      {/* Order Summary */}
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          {checkoutProducts.map((product) => (
            <div key={product._id} className="flex justify-between">
              <span>{product.name} (x{product.quantity})</span>
              <span>{(product.price * product.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2"></div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-base">
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
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