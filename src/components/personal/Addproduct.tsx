import { useState, ChangeEvent, FormEvent } from "react";
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
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface FormDataState {
    image: File | null;
    name: string;
    price: string;
    units:string;
    discount: string;
    ShopName: string;
    Address: string;
    description: string;
    owner: string;
}

function AddProduct({onProductAdded} :{onProductAdded:()=>void}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<FormDataState>({
        image: null,
        name: "",
        price: "",
        units:"",
        discount: "",
        ShopName: "",
        Address: "",
        description: "",
        owner: ""
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            const value = formData[key as keyof FormDataState];
            if (value !== null) {
                formDataToSend.append(key, value as string | Blob);
            }
        });
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
    
        try {
            const response = await axios.post("http://localhost:3000/products/create", formDataToSend, {
                headers: {
                    Authorization:`Bearer ${token}`,
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
                })
            }
            else {
                
                setFormData({
                    image: null,
                    name: "",
                    price: "",
                    units:"",
                    discount: "",
                    ShopName: "",
                    Address: "",
                    description: "",
                    owner: ""
                });
                setPreviewImage(null);
                setIsDialogOpen(false);
                onProductAdded();
                setTimeout(() => {
                    toast({
                        title: "Product added successfully !!",
                        description: "Keep up the good work!"
                    });
                }, 100); // Delay toast to appear after dialog closes
            }

        } catch (error:any) {
            toast({
                title: "Error adding product",
                description: "Please try again"
            });
            console.log("Error adding product:", error.message);
        }
    };


    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>Add Item</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg sm:max-w-md w-full overflow-y-auto max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Fill in the details of your product.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col items-center">
                            <Label htmlFor="image" className="cursor-pointer">
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-md object-cover" />
                                ) : (
                                    <div className="w-24 h-24 flex flex-col items-center justify-center rounded-md border border-gray-300 bg-gray-100">
                                        <Upload size={24} />
                                        <span className="text-sm text-gray-600">Upload Image</span>
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

                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="discount">Discount</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="discount">Unit</Label>
                                <Input
                                    id="units"
                                    type="number"
                                    value={formData.units}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="ShopName">Shop Name</Label>
                            <Input
                                id="ShopName"
                                value={formData.ShopName}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="Address">Address</Label>
                            <Textarea
                                id="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit" className="w-full">
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


        </div>
    );
}

export default AddProduct;