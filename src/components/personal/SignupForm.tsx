
"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export function SignupForm({ isLogin }: { isLogin: boolean }) {
  const { toast } = useToast()
  const [isRetailer, setisRetailer] = useState(true);
  const navigate = useNavigate();

  const handleSwitchChange = () => {
    setisRetailer(!isRetailer); // Toggle isLogin state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Gather the form data
    const formData = {
      isRetailer,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      ...(isLogin ? {} : { name: e.currentTarget.firstname?.value }),
    };

    const api = isRetailer? "owners" :"users";
    const log_reg = isLogin? `login`:`register`;
    // Define the API endpoint
    const apiUrl = `http://localhost:3000/${api}/${log_reg}`;
  
    try {
      // Send a POST request to the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      // Handle the response
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        if (result.sucess){
          toast({
            title: `${log_reg} sucessfull !!`,
            description: `${isRetailer? "Redirecting to your console" :"Lets shop for good cause"}`
          })
          setTimeout(()=>{
            isLogin ? (isRetailer? navigate("/retailers/"):navigate("/users/")) :toast({description:"Login to continue"})
          },3000);
          
          
        } else {
          toast({
            variant: "destructive",
            title: `${isLogin ? "Login":"Signup"} Error`,
            description: ` ${result.msg}`,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
        
        // Redirect or show success message
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${isLogin ? "Login":"Signup"} unsucessful`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };


  return (
    <div className="max-w-md h-full  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold md:text-3xl text-2xl  text-neutral-800 dark:text-neutral-200 hidden md:inline">
        {
          isLogin ? "Login !" : "Signup !"
        }
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="flex flex-row space-x-2 mb-4">
          <Label className="font-bold  md:text-lg text-sm mt-1 my-2 md:my-1" htmlFor="retailer">
            {isRetailer ? "Retailer" : "Buyer"}
          </Label>
          <Switch id="retailer" className=" space-y-2" onCheckedChange={handleSwitchChange} />
        </LabelInputContainer>
        {
          isLogin ? null : (

            <LabelInputContainer>
              <Label htmlFor="firstname">Name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
          )
        }

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
