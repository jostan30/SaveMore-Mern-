import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "../ui/toaster";

import { useNavigate } from "react-router";

import { useFetchCartProducts } from "@/api/cartProducts-api";
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

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
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


  const checkoutProducts = isCheckoutAll ? CartProduct : (selectedProduct ? [selectedProduct] : []);
  const subtotal = calculateSubtotal(checkoutProducts);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);


  const handleBuyNow = (productId?: string) => {
    try {
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
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "error at Buy Now",
      });
    }
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  const handleCheckout = async () => {
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
        description: "You need to be logged in to complete checkout",
        action: <ToastAction altText="Login">Login</ToastAction>,
      });
      return;
    }

    setIsProcessing(true);

    try {
      const data = { checkoutInfo };

      const orderResponse = await axios.post(
        `http://localhost:3000/checkout`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order Response data: " ,orderResponse.data.order);
      console.log("Order Id data: " ,orderResponse.data.order._id);
      setIsCheckoutOpen(false);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({
          variant: "destructive",
          title: "Payment Error",
          description: "Failed to load payment gateway. Please check your internet connection and try again.",
        });
        return;
      }

      // Get Razorpay key from the server
      const keyResponse = await axios.get(`http://localhost:3000/payments/key`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const orders = orderResponse.data.order || [];
      const razorpayKey = keyResponse.data.key;
      const razorpay_order_id = orderResponse.data.razorpayOrderId;
      // Initialize Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: total * 100, // Amount in smallest currency unit (paise)
        currency: "INR",
        name: "Grocery Store", // Your business name
        description: 'Purchase of grocery items',
        order_id: razorpay_order_id,
        handler: async (response: RazorpayResponse) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          console.log(response);
          try {
            // Verify payment with the server
            await axios.post(`http://localhost:3000/payments/verify`, {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderId: orderResponse.data.order._id,
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            // Success handling
            toast({
              title: "Payment Successful",
              description: "Your order has been placed successfully!",
            });

            // Clear cart and redirect
            setCartProduct([]);
            navigate('/users/buyProducts');
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast({
              variant: "destructive",
              title: "Verification Failed",
              description: "Your payment was received but verification failed. Please contact support.",
            });
          }
        },
        prefill: {
          name: checkoutInfo.name, // Fixed: now using checkoutInfo.name
          email: checkoutInfo.email,
          contact: "", // You might want to add a phone field to your form
        },
        theme: {
          color: '#3B82F6' // Blue color to match your UI
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Checkout Cancelled",
              description: "You've cancelled the payment process. Your cart items are still available.",
            });
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Checkout error", error);
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
                        onClick={() => navigate('/users')}
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
    </div>

  )
}
export default Cart;