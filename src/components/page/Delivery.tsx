"use client";
import React, { FormEvent, useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
interface Owner {
  _id: string;
  email: string;
}

interface DeliveryAgent {
  _id: string;
  name: string;
  contact: string;
  address: string;
  owner: string;
}
const  DeliveryAgentForm =() =>{
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agents, setAgents] = useState<DeliveryAgent[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {toast}=useToast();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    owner: "",
  });
  
  useEffect(() => {
    const fetchOwners = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch("http://localhost:3000/owners/getOwners");
        const data = await response.json();
        console.log("Response data:", data);
        
        if (response.ok) {
          // Make sure data is an array before setting owners
          if (Array.isArray(data)) {
            setOwners(data);
          } else {
            console.error("Expected an array of owners but got:", data);
            setError("Invalid data format received from server");
            setOwners([]);
          }
        } else {
          console.error("Failed to fetch owners:", data);
          setError(data.message || "Failed to fetch owners");
          setOwners([]);
        }
      } catch (error) {
        console.error("Error fetching owners:", error);
        setError("Connection error. Please try again later.");
        setOwners([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOwners();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = `http://localhost:3000/deliveryRegister`;
    
    try {
      console.log("Sending request with data:", formData);
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      console.log("The result in delivery api is", result);
      
      if (response.ok && result.success) {
        toast({
          title: "Agent added successfully!",
          description: "The delivery agent has been registered",
        });
        
        // Clear form data
        setFormData({ name: "", contact: "", address: "", owner: "" });
        
        // Add the new agent to the list
        if (result.agent) {
          setAgents(prev => [...prev, result.agent]);
        }
        console.log("The agents are",agents);
        
      } else {
        toast({
          variant: "destructive",
          title: "Registration Error",
          description: result.msg || "An error occurred during registration",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
     
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't connect to the server. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-white bg-gradient-to-r from-blue-500 to-purple-500">
            <CardTitle className="text-xl font-bold">Add Delivery Agent</CardTitle>
            <CardDescription className="text-gray-100">
              Enter the details to register a new delivery agent
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center font-medium">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter agent's full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact" className="flex items-center font-medium">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="Enter agent's phone number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full"
                    type="tel"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center font-medium">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter agent's full address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full min-h-24"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner" className="flex items-center font-medium">
                    <User className="w-4 h-4 mr-2" />
                    Select Your Distributor
                  </Label>
                  <select 
                    id="owner" 
                    name="owner" 
                    value={formData.owner} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border rounded-md"
                    disabled={isLoading || owners.length === 0}
                  >
                    <option value="">
                      {isLoading ? "Loading distributors..." : 
                       owners.length === 0 ? "No distributors available" : 
                       "Select a distributor"}
                    </option>
                    {Array.isArray(owners) && owners.map((owner) => (
                      <option key={owner._id} value={owner._id}>
                        {owner.email}
                      </option>
                    ))}
                  </select>
                  {owners.length === 0 && !isLoading && !error && (
                    <p className="mt-1 text-sm text-amber-600">
                      No distributors found. Please add distributors first.
                    </p>
                  )}
                </div>
              </div>
           
              <CardFooter className="px-0 pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={isSubmitting || isLoading || owners.length === 0}
                >
                  {isSubmitting ? "Adding Agent..." : "Add Delivery Agent"}
                </Button>
               

              </CardFooter>
            </form>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}


export default DeliveryAgentForm;