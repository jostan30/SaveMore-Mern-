// 'use client'
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "../ui/drawer";
// import { Button } from "../ui/button";
// import { useEffect, useState } from "react";
// import { Minus, Plus } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { Toaster } from "../ui/toaster";

// interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     discount: number;
//     ShopName: string;
//     Address: string;
//     description: string;
//     units: number;
//     image: string; // Base64 string or image URL
// }

// const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend

// const ProductDetailsButton = ({ product }: { product: Product }) => {
//     const discountedPrice = product.price - product.discount;
//     const [units, setunits] = useState(1);
//     const [isOwner, setOwner] = useState(false);
//     const location = useLocation();
//     const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];



//     useEffect(() => {
//         const pathSegments = location.pathname.split("/").filter(Boolean);
//         const lastSegment = pathSegments[pathSegments.length - 1];
//         setOwner(lastSegment === 'retailers');
//     }, [location.pathname]);

//     const AddToCart = async () => {
//         try {
//             console.log("The tken of user in add to cart component is",token)
//             if (!token) {
//                 console.log("You must be logged in to add items to the cart!");
//                 return;
//             }
//             const data = {
//                 product_id: product._id,
//                 quantity:units,
//                 name:product.name
//             }
//             console.log("The data in add to cart is",product._id);
            
//             const response = await axios.post(
//                 `${API_BASE_URL}/addtocart`,   // URL
//                 data,                         // The request body (should be the second argument)
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,   // Authorization header with the token
//                         "Content-Type": "application/json", // Optional, ensures proper request format
//                     },
//                 }
//             );
//             console.log("The response recieved in details button is",response);
            
//             if (response.status === 200) {
//                 toast({
//                     title: `Product added sucessfully !!`,
//                     description: `Keep shopping`
//                   })
//             } else {
//                 toast({
//                     title: `Failed to add product to cart.`,
//                     description: `Try again`
//                   })
//             }
//         } catch (error) {
//             console.error("Error adding product to cart:", error);
//             console.log("Something went wrong. Please try again.");
//         }
//     };


//     return (
//         <Drawer>
//             <DrawerTrigger asChild>
//                 <Button >
//                     Show More
//                 </Button>
//             </DrawerTrigger>
//             <DrawerContent className="fixed  flex items-center p-4 bg-transparent bg-opacity-0">
//                 <div className=" md:w-[70%] w-full max-w-screen h-full max-h-screen bg-white rounded-xl shadow-xl p-6 overflow-auto">
//                     <DrawerHeader>
//                         <DrawerTitle className="text-2xl font-bold text-gray-900 text-center">
//                             {product.name}
//                         </DrawerTitle>
//                         <DrawerDescription className="text-gray-600 text-center">
//                             {product.description}
//                         </DrawerDescription>
//                     </DrawerHeader>

//                     <div className="flex flex-col md:flex-row items-center gap-6 p-4">
//                         {/* Product Image */}
//                         <img
//                             src={`data:image/png;base64,${product.image}`}
//                             alt={product.name}
//                             className="md:w-60 md:h-60 h-40 w-40 object-cover rounded-lg shadow-md border border-gray-200"
//                         />

//                         {/* Product Details */}
//                         <div className="w-full space-y-3">
//                             <p className="text-xl font-semibold text-gray-800">
//                                 Price: <span className="line-through text-red-500">${product.price}</span>{" "}
//                                 <span className="text-green-600">${discountedPrice}</span>
//                             </p>
//                             <div className="flex  space-x-4">
//                                 <p className="text-gray-700">
//                                     <span className="font-semibold">Discount:</span> ${product.discount}
//                                 </p>
//                                 <p className="text-gray-700">
//                                     <span className="font-semibold">Quantity:</span> {product.units}
//                                 </p>
//                             </div>

//                             {/* Shop Details */}
//                             <div className="mt-4 bg-gray-100 p-3 rounded-lg shadow-inner">
//                                 <p className="font-semibold text-gray-900">Shop: {product.ShopName}</p>
//                                 <p className="text-gray-700">{product.Address}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <DrawerFooter className="flex justify-center gap-4 mt-6">
//                         {
//                             isOwner ? (//Owner can see this
//                                 <>
//                                     <Button>Update</Button>
//                                     <Button variant="destructive"> Delete</Button>
//                                 </>
//                             ) : (          //User can see this
//                                 <>
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <Button
//                                             variant="outline"
//                                             size="icon"
//                                             className="h-8 w-8 shrink-0 rounded-full"
//                                             onClick={() => setunits(units - 1)}
//                                             disabled={units <= 1}
//                                         >
//                                             <Minus />
//                                             <span className="sr-only">Decrease</span>
//                                         </Button>
//                                         <div className="flex-1 text-center">
//                                             <div className="md:text-7xl text-6xl font-bold tracking-tighter">
//                                                 {units}
//                                             </div>
//                                             <div className="text-[0.70rem] uppercase text-muted-foreground">
//                                                 Quantity
//                                             </div>
//                                         </div>
//                                         <Button
//                                             variant="outline"
//                                             size="icon"
//                                             className="h-8 w-8 shrink-0 rounded-full"
//                                             onClick={() => setunits(units + 1)}
//                                             disabled={units >= product.units}
//                                         >
//                                             <Plus />
//                                             <span className="sr-only">Increase</span>
//                                         </Button>
//                                     </div>
//                                     <Button onClick={() => AddToCart()}>Add to Cart</Button>
//                                 </>
//                             )
//                         }
//                         <DrawerClose>
//                             <Button variant="secondary" className="px-4 py-2 mt-2">
//                                 Close
//                             </Button>
//                         </DrawerClose>
//                     </DrawerFooter>
//                     <Toaster/>
//                 </div>
//             </DrawerContent>
//         </Drawer>
//     );
// };

// export default ProductDetailsButton;
'use client'
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Calendar, Clock, Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

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
    expiryDate: string; // ISO date string
    daysRemaining: number;
}

const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend

const ProductDetailsButton = ({ product }: { product: Product }) => {
    const discountedPrice = product.price - product.discount;
    const [units, setunits] = useState(1);
    const [isOwner, setOwner] = useState(false);
    const location = useLocation();
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

    // Format the expiry date nicely
    const formatExpiryDate = (dateString:any) => {
        if (!dateString) return "Not specified";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Get an appropriate color for the expiry warning
    const getExpiryStatusColor = (days:any) => {
        if (days <= 0) return "text-red-600";
        if (days <= 3) return "text-red-500";
        if (days <= 7) return "text-amber-500";
        return "text-green-600";
    };

    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        setOwner(lastSegment === 'retailers');
    }, [location.pathname]);

    const AddToCart = async () => {
        try {
            if (!token) {
                console.log("You must be logged in to add items to the cart!");
                return;
            }
            const data = {
                product_id: product._id,
                quantity: units,
                name: product.name
            }
            console.log("The data in product cart isss",data);
            
            const response = await axios.post(
                `${API_BASE_URL}/addtocart`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            
            if (response.status === 200) {
                toast({
                    title: `Product added successfully!`,
                    description: `Keep shopping`
                });
            } else {
                toast({
                    title: `Failed to add product to cart.`,
                    description: `Try again`
                });
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive"
            });
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>
                    Show More
                </Button>
            </DrawerTrigger>
            <DrawerContent className="fixed flex items-center p-4 bg-transparent bg-opacity-0">
                <div className="md:w-[70%] w-full max-w-screen h-full max-h-screen bg-white rounded-xl shadow-xl p-6 overflow-auto">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold text-gray-900 text-center">
                            {product.name}
                        </DrawerTitle>
                        <DrawerDescription className="text-gray-600 text-center">
                            {product.description}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex flex-col md:flex-row items-center gap-6 p-4">
                        {/* Product Image */}
                        <div className="relative">
                            <img
                                src={`data:image/png;base64,${product.image}`}
                                alt={product.name}
                                className="md:w-60 md:h-60 h-40 w-40 object-cover rounded-lg shadow-md border border-gray-200"
                            />
                            {/* Expiry Badge on Image */}
                            {product.daysRemaining <= 7 && (
                                <div className={`absolute top-2 right-2 ${getExpiryStatusColor(product.daysRemaining)} bg-white bg-opacity-90 px-2 py-1 rounded-lg text-xs font-bold shadow`}>
                                    {product.daysRemaining <= 0 
                                        ? "EXPIRED" 
                                        : product.daysRemaining === 1 
                                            ? "1 DAY LEFT" 
                                            : `${product.daysRemaining} DAYS LEFT`}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="w-full space-y-3">
                            <p className="text-xl font-semibold text-gray-800">
                                Price: <span className="line-through text-red-500">${product.price}</span>{" "}
                                <span className="text-green-600">${discountedPrice}</span>
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <p className="text-gray-700">
                                    <span className="font-semibold">Discount:</span> ${product.discount}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Quantity:</span> {product.units}
                                </p>
                            </div>

                            {/* Expiry Date Information */}
                            <div className="mt-4 border-l-4 border-blue-500 pl-3 bg-blue-50 p-3 rounded-r-lg">
                                <div className="flex items-center gap-2 text-blue-800">
                                    <Calendar size={18} />
                                    <span className="font-semibold">Expiry Date:</span> 
                                    <span className="font-medium">{formatExpiryDate(product.expiryDate)}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-2">
                                    <Clock size={18} className={getExpiryStatusColor(product.daysRemaining)} />
                                    <span className={`${getExpiryStatusColor(product.daysRemaining)} font-medium`}>
                                        {product.daysRemaining <= 0 
                                            ? "Product has expired!" 
                                            : product.daysRemaining === 1 
                                                ? "Expires tomorrow!" 
                                                : `${product.daysRemaining} days remaining`}
                                    </span>
                                </div>
                            </div>

                            {/* Shop Details */}
                            <div className="mt-4 bg-gray-100 p-3 rounded-lg shadow-inner">
                                <p className="font-semibold text-gray-900">Shop: {product.ShopName}</p>
                                <p className="text-gray-700">{product.Address}</p>
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="flex justify-center gap-4 mt-6">
                        {
                            isOwner ? (//Owner can see this
                                <>
                                    <Button>Update</Button>
                                    <Button variant="destructive">Delete</Button>
                                </>
                            ) : (          //User can see this
                                <>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 shrink-0 rounded-full"
                                            onClick={() => setunits(units - 1)}
                                            disabled={units <= 1}
                                        >
                                            <Minus />
                                            <span className="sr-only">Decrease</span>
                                        </Button>
                                        <div className="flex-1 text-center">
                                            <div className="md:text-7xl text-6xl font-bold tracking-tighter">
                                                {units}
                                            </div>
                                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                                                Quantity
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 shrink-0 rounded-full"
                                            onClick={() => setunits(units + 1)}
                                            disabled={units >= product.units}
                                        >
                                            <Plus />
                                            <span className="sr-only">Increase</span>
                                        </Button>
                                    </div>
                                    <Button 
                                        onClick={() => AddToCart()}
                                        disabled={product.daysRemaining <= 0}
                                    >
                                        {product.daysRemaining <= 0 ? "Expired" : "Add to Cart"}
                                    </Button>
                                </>
                            )
                        }
                        <DrawerClose>
                            <Button variant="secondary" className="px-4 py-2 mt-2">
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                    <Toaster/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ProductDetailsButton;