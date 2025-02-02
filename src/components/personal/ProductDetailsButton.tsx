'use client'
import { useLocation } from "react-router-dom";

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
import { Minus, Plus } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    price: number;
    discount: number;
    ShopName: string;
    Address: string;
    description: string;
    units: number;
    image: string; // Base64 string or image URL
}

const ProductDetailsButton = ({ product}: { product: Product}) => {
    const discountedPrice = product.price - product.discount;
    const [units, setunits] = useState(0);
    const [isOwner,setOwner] =useState(false);
    const location = useLocation();

    useEffect(()=>{
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        if(lastSegment === 'retailers') {
            setOwner(true);
        }
        else{
            setOwner(false);
        }
    })
   


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button >
                    Show More
                </Button>
            </DrawerTrigger>
            <DrawerContent className="fixed  flex items-center p-4 bg-transparent bg-opacity-0">
                <div className=" md:w-[70%] w-full max-w-screen h-full max-h-screen bg-white rounded-xl shadow-xl p-6 overflow-auto">
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
                        <img
                            src={`data:image/png;base64,${product.image}`}
                            alt={product.name}
                            className="md:w-60 md:h-60 h-40 w-40 object-cover rounded-lg shadow-md border border-gray-200"
                        />

                        {/* Product Details */}
                        <div className="w-full space-y-3">
                            <p className="text-xl font-semibold text-gray-800">
                                Price: <span className="line-through text-red-500">${product.price}</span>{" "}
                                <span className="text-green-600">${discountedPrice}</span>
                            </p>
                            <div className="flex  space-x-4">
                                <p className="text-gray-700">
                                    <span className="font-semibold">Discount:</span> ${product.discount}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Quantity:</span> {product.units}
                                </p>
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
                                    <Button variant="destructive"> Delete</Button>
                                </>
                            ) : (          //User can see this
                                <>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 shrink-0 rounded-full"
                                            onClick={() => setunits(units - 1)}
                                            disabled={units <= 0}
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
                                    <Button>Add to Cart</Button>
                                </>
                            )
                        }
                        <DrawerClose>
                            <Button variant="secondary" className="px-4 py-2 mt-2">
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ProductDetailsButton;
