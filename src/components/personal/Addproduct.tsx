// import { useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Upload } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";

// interface FormDataState {
//     image: File | null;
//     name: string;
//     price: string;
//     units:string;
//     discount: string;
//     ShopName: string;
//     Address: string;
//     description: string;
//     owner: string;
//     expiryImage?: File | null;
//     expiryDate?: string;
// }

// function AddProduct({ onProductAdded}: { onProductAdded: () => void } ) {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [formData, setFormData] = useState<FormDataState>({
//         image: null,
//         name: "",
//         price: "",
//         units:"",
//         discount: "",
//         ShopName: "",
//         Address: "",
//         description: "",
//         owner: "",
//         expiryImage:null,
//         expiryDate:""
//     });

//     const [previewImage, setPreviewImage] = useState<string | null>(null);

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [id]: value
//         }));
//     };

//     const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0] || null;
//         if (file) {
//             setFormData((prev) => ({
//                 ...prev,
//                 image: file
//             }));
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };
//    const handleExtractExpiry=async()=>{
//       if(!formData.expiryImage){
//         toast({
//             title:"Please upload expiry iamge",
//             variant:"destructive"
//         });
//         return;
//       }
//       toast({title:"Extracting text from image..."});
//       try{
//      const base64String=await new Promise<string>((res,rej)=>{
//         const reader=new FileReader();
//         reader.readAsDataURL(formData.expiryImage as File);
//         reader.onload=()=>{
//             const result=reader.result as string;
//             const base64=result.split(',')[1]
//             res(base64);
//         };
//         reader.onerror=rej;
//      })
//      console.log("Base64 size (chars):", base64String.length);

// // console.log("OCr test is",text);
// const geminiResponse=await fetch("http://localhost:3000/products/extract-expiry",{
//     method:"POST",
//     headers:{
//         "Content-Type":"application/json"
//     },
//     body:JSON.stringify({expiryImage:base64String})
// });

// const result=await geminiResponse.json();
// console.log("The response coming back from gemini is",result);


//         if(result.success && result.extractedExpiryDate){
//             setFormData((prev)=>({
//                 ...prev,
//                 expiryDate:result.extractedExpiryDate
//             })
//         );
//         console.log("Th expiry date in form data is",formData.expiryDate);
        
//         toast({ title: "Expiry Date Extracted Successfully!" });
//         }else{
//             toast({ title: "Could not extract expiry date", variant: "destructive" });
//         }
//       }catch(error:any){
//         console.error("The error is",error);
//         toast({
//         title:"Error extracting expiry date",
//         variant:"destructive"
//       })
//    }
// }

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         const formDataToSend = new FormData();

//         Object.keys(formData).forEach((key) => {
//             const value = formData[key as keyof FormDataState];
//             if (value !== null) {
//                 formDataToSend.append(key, value as string | Blob);
//             }
//         });
//         const token = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("token="))
//           ?.split("=")[1];
    
//         try {
//             const response = await axios.post("http://localhost:3000/products/create", formDataToSend, {
//                 headers: {
//                     Authorization:`Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 },

//             });
//             const result = response.data;
//             if (result.success === false) {
//                 setIsDialogOpen(false);
//                 toast({
//                     variant: "destructive",
//                     title: `${result.message}`,
//                     action: <ToastAction altText="Try again">Try again</ToastAction>,
//                 })
                
//             }
//             else {
                
//                 setFormData({
//                     image: null,
//                     name: "",
//                     price: "",
//                     units:"",
//                     discount: "",
//                     ShopName: "",
//                     Address: "",
//                     description: "",
//                     owner: ""
//                 });
//                 setPreviewImage(null);
//                 setIsDialogOpen(false);
//                 onProductAdded();
//                 setTimeout(() => {
//                     toast({
//                         title: "Product added successfully !!",
//                         description: "Keep up the good work!"
//                     });
//                 }, 100); // Delay toast to appear after dialog closes
//             }

//         } catch (error:any) {
//             toast({
//                 title: "Error adding product",
//                 description: "Please try again"
//             });
//             console.log("Error adding product:", error.message);
//         }
//     };


//     return (
//         <div>
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogTrigger asChild>
//                     <Button onClick={() => setIsDialogOpen(true)}>Add Item</Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-lg sm:max-w-md w-full overflow-y-auto max-h-[80vh]">
//                     <DialogHeader>
//                         <DialogTitle>Add Product</DialogTitle>
//                         <DialogDescription>
//                             Fill in the details of your product.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="flex flex-col items-center">
//                             <Label htmlFor="image" className="cursor-pointer">
//                                 {previewImage ? (
//                                     <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-md object-cover" />
//                                 ) : (
//                                     <div className="w-24 h-24 flex flex-col items-center justify-center rounded-md border border-gray-300 bg-gray-100">
//                                         <Upload size={24} />
//                                         <span className="text-sm text-gray-600">Upload Image</span>
//                                     </div>
//                                 )}
//                             </Label>
//                             <Input
//                                 id="image"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="name">Product Name</Label>
//                             <Input
//                                 id="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full"
//                             />
//                         </div>
//                         <div className="flex flex-col gap-2">
//     <Label htmlFor="expiryImage">Upload Expiry Image</Label>
//     <Input
//         id="expiryImage"
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFormData((prev) => ({
//             ...prev,
//             expiryImage: e.target.files?.[0] || null
//         }))}
//     />
//     <Button
//         type="button"
//         onClick={handleExtractExpiry}
//         className="w-full"
//     >
//         Extract Expiry Date
//     </Button>
//     <Input
//     id="expiryDate"
//     value={formData.expiryDate || ""}
//     readOnly
//     disabled
//     className="w-full cursor-not-allowed bg-gray-100 text-black"
// />
// </div>
    
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <Label htmlFor="price">Price</Label>
//                                 <Input
//                                     id="price"
//                                     type="number"
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="discount">Discount</Label>
//                                 <Input
//                                     id="discount"
//                                     type="number"
//                                     value={formData.discount}
//                                     onChange={handleChange}
//                                     className="w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="discount">Unit</Label>
//                                 <Input
//                                     id="units"
//                                     type="number"
//                                     value={formData.units}
//                                     onChange={handleChange}
//                                     className="w-full"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <Label htmlFor="ShopName">Shop Name</Label>
//                             <Input
//                                 id="ShopName"
//                                 value={formData.ShopName}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full"
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="Address">Address</Label>
//                             <Textarea
//                                 id="Address"
//                                 value={formData.Address}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full"
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="description">Description</Label>
//                             <Textarea
//                                 id="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full"
//                             />
//                         </div>

//                         <DialogFooter>
//                             <Button type="submit" className="w-full">
//                                 Add
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>


//         </div>
//     );
// }

// export default AddProduct;
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Calendar, ShoppingBag, AlertCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FormDataState {
    image: File | null;
    name: string;
    price: string;
    units: string;
    discount: string;
    ShopName: string;
    Address: string;
    description: string;
    owner: string;
    expiryImage?: File | null;
    expiryDate?: string;
}

function AddProduct({ onProductAdded }: { onProductAdded: () => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<FormDataState>({
        image: null,
        name: "",
        price: "",
        units: "",
        discount: "",
        ShopName: "",
        Address: "",
        description: "",
        owner: "",
        expiryImage: null,
        expiryDate: ""
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

    useEffect(() => {
        if (formData.expiryDate) {
            calculateDaysRemaining();
        }
    }, [formData.expiryDate]);

    const calculateDaysRemaining = () => {
        if (!formData.expiryDate) return;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const expiryDate = new Date(formData.expiryDate);
        expiryDate.setHours(0, 0, 0, 0);
        
        const differenceInTime = expiryDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        
        setDaysRemaining(differenceInDays);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleExpiryImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFormData((prev) => ({
                ...prev,
                expiryImage: file,
                expiryDate: "" // Reset expiry date when new image is uploaded
            }));
            setDaysRemaining(null);
        }
    };

    const handleExtractExpiry = async () => {
        if (!formData.expiryImage) {
            toast({
                title: "Please upload expiry image",
                variant: "destructive"
            });
            return;
        }
        
        setIsExtracting(true);
        toast({ title: "Extracting text from image..." });
        
        try {
            const base64String = await new Promise<string>((res, rej) => {
                const reader = new FileReader();
                reader.readAsDataURL(formData.expiryImage as File);
                reader.onload = () => {
                    const result = reader.result as string;
                    const base64 = result.split(',')[1];
                    res(base64);
                };
                reader.onerror = rej;
            });

            const geminiResponse = await fetch("http://localhost:3000/products/extract-expiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ expiryImage: base64String })
            });

            const result = await geminiResponse.json();

            if (result.success && result.extractedExpiryDate) {
                setFormData((prev) => ({
                    ...prev,
                    expiryDate: result.extractedExpiryDate
                }));
                
                toast({ title: "Expiry Date Extracted Successfully!" });
            } else {
                toast({ 
                    title: "Could not extract expiry date", 
                    variant: "destructive" 
                });
            }
        } catch (error: any) {
            console.error("The error is", error);
            toast({
                title: "Error extracting expiry date",
                variant: "destructive"
            });
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "expiryImage") return;
            const value = formData[key as keyof FormDataState];
            if (value !== null) {
                formDataToSend.append(key, value as string | Blob);
            }
        });
        
        // Add days remaining if available
        if (daysRemaining !== null) {
            formDataToSend.append('daysRemaining', daysRemaining.toString());
        }
        
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        try {
            const response = await axios.post("http://localhost:3000/products/create", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            
            const result = response.data;
            if (result.success === false) {
                setIsDialogOpen(false);
                toast({
                    variant: "destructive",
                    title: `${result.message}`,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            } else {
                setFormData({
                    image: null,
                    name: "",
                    price: "",
                    units: "",
                    discount: "",
                    ShopName: "",
                    Address: "",
                    description: "",
                    owner: "",
                    expiryImage: null,
                    expiryDate: ""
                });
                setPreviewImage(null);
                setDaysRemaining(null);
                setIsDialogOpen(false);
                onProductAdded();
                setTimeout(() => {
                    toast({
                        title: "Product added successfully!",
                        description: "Keep up the good work!"
                    });
                }, 100); // Delay toast to appear after dialog closes
            }
        } catch (error: any) {
            toast({
                title: "Error adding product",
                description: "Please try again"
            });
            console.log("Error adding product:", error.message);
        }
    };

    // Function to render the expiry status badge
    const renderExpiryStatus = () => {
        if (daysRemaining === null) return null;
        
        if (daysRemaining <= 0) {
            return (
                <Badge variant="destructive" className="flex gap-1 items-center">
                    <AlertCircle className="w-4 h-4" />
                    Expired
                </Badge>
            );
        } else if (daysRemaining <= 7) {
            return (
                <Badge variant="destructive" className="flex gap-1 items-center">
                    <AlertCircle className="w-4 h-4" />
                    Expiring Soon: {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                </Badge>
            );
        } else if (daysRemaining <= 30) {
            return (
                <Badge variant="destructive" className="bg-yellow-500 flex gap-1 items-center">
                    <Clock className="w-4 h-4" />
                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="bg-green-100 text-green-800 flex gap-1 items-center">
                    <Clock className="w-4 h-4" />
                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                </Badge>
            );
        }
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 flex gap-2" onClick={() => setIsDialogOpen(true)}>
                        <ShoppingBag size={16} />
                        Add New Product
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full overflow-y-auto max-h-[85vh]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Add New Product</DialogTitle>
                        <DialogDescription>
                            Complete the product details to add it to your inventory.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator className="my-4" />
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center">
                            <Label htmlFor="image" className="cursor-pointer">
                                {previewImage ? (
                                    <div className="relative">
                                        <img src={previewImage} alt="Preview" className="w-32 h-32 rounded-lg object-cover border-2 border-blue-400" />
                                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-bl-lg rounded-tr-lg text-xs">
                                            Change
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <Upload size={28} className="text-gray-500" />
                                        <span className="text-sm text-gray-600 mt-2">Upload Product Image</span>
                                    </div>
                                )}
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter product name"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="ShopName" className="text-sm font-medium">Shop Name</Label>
                                <Input
                                    id="ShopName"
                                    value={formData.ShopName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter shop name"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="price" className="text-sm font-medium">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="0.00"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="discount" className="text-sm font-medium">Discount (%)</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="units" className="text-sm font-medium">Units Available</Label>
                                <Input
                                    id="units"
                                    type="number"
                                    value={formData.units}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="Address" className="text-sm font-medium">Address</Label>
                            <Textarea
                                id="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                required
                                placeholder="Enter store address"
                                className="mt-1 resize-none"
                                rows={2}
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter product description"
                                className="mt-1 resize-none"
                                rows={3}
                            />
                        </div>

                        <Card className="bg-gray-50">
                            <CardContent className="pt-6">
                                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    Product Expiry Information
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="expiryImage" className="text-sm font-medium">Upload Expiry Image</Label>
                                        <Input
                                            id="expiryImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleExpiryImageChange}
                                            className="mt-1"
                                        />
                                    </div>
                                    
                                    <Button
                                        type="button"
                                        onClick={handleExtractExpiry}
                                        disabled={!formData.expiryImage || isExtracting}
                                        className="w-full"
                                    >
                                        {isExtracting ? "Extracting..." : "Extract Expiry Date"}
                                    </Button>
                                    
                                    {formData.expiryDate && (
                                        <div className="bg-white p-4 rounded-md border mt-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-gray-500">Expiry Date</p>
                                                    <p className="font-medium">{new Date(formData.expiryDate).toLocaleDateString()}</p>
                                                </div>
                                                {renderExpiryStatus()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <DialogFooter className="flex gap-3 pt-2">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsDialogOpen(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                Add Product
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddProduct;