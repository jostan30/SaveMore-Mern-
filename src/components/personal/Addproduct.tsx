
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
                <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Expired
                </Badge>
            );
        } else if (daysRemaining <= 7) {
            return (
                <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Expiring Soon: {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                </Badge>
            );
        } else if (daysRemaining <= 30) {
            return (
                <Badge variant="destructive" className="flex items-center gap-1 bg-yellow-500">
                    <Clock className="w-4 h-4" />
                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="flex items-center gap-1 text-green-800 bg-green-100">
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
                    <Button className="flex gap-2 bg-green-600 hover:bg-green-700" onClick={() => setIsDialogOpen(true)}>
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
                                        <img src={previewImage} alt="Preview" className="object-cover w-32 h-32 border-2 border-blue-400 rounded-lg" />
                                        <div className="absolute bottom-0 right-0 p-1 text-xs text-white bg-blue-500 rounded-tr-lg rounded-bl-lg">
                                            Change
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-32 h-32 transition-colors border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100">
                                        <Upload size={28} className="text-gray-500" />
                                        <span className="mt-2 text-sm text-gray-600">Upload Product Image</span>
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

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                                <h3 className="flex items-center gap-2 mb-3 text-sm font-medium">
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
                                        <div className="p-4 mt-3 bg-white border rounded-md">
                                            <div className="flex items-center justify-between">
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