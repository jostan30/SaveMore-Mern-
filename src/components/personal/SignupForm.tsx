
// "use client";
// import React, { useState } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { cn } from "@/lib/utils";
// import { Switch } from "@/components/ui/switch";
// import { ToastAction } from "@/components/ui/toast"
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router";

// export function SignupForm({ isLogin }: { isLogin: boolean }) {
//   const { toast } = useToast()
//   const [isRetailer, setisRetailer] = useState(true);
//   const navigate = useNavigate();

//   const handleSwitchChange = () => {
//     setisRetailer(!isRetailer); // Toggle isLogin state
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent the default form submission
  
//     // Gather the form data
//     const formData = {
//       isRetailer,
//       email: e.currentTarget.email.value,
//       password: e.currentTarget.password.value,
//       ...(isLogin ? {} : { name: e.currentTarget.firstname?.value }),
//     };

//     const api = isRetailer? "owners" :"users";
//     const log_reg = isLogin? `login`:`register`;
//     // Define the API endpoint
//     const apiUrl = `http://localhost:3000/${api}/${log_reg}`;
  
//     try {
//       // Send a POST request to the API
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: 'include',
//       });
  
//       // Handle the response
//       const result = await response.json();
//       if (response.ok) {
//         if (result.sucess){
//           toast({
//             title: `${log_reg} sucessfull !!`,
//             description: `${isRetailer? "Redirecting to your console" :"Lets shop for good cause"}`
//           })
//           setTimeout(()=>{
//             isLogin ? (isRetailer? navigate("/retailers/"):navigate("/users/")) :toast({description:"Login to continue"})
//           },3000);
          
          
//         } else {
//           toast({
//             variant: "destructive",
//             title: `${isLogin ? "Login":"Signup"} Error`,
//             description: ` ${result.msg}`,
//             action: <ToastAction altText="Try again">Try again</ToastAction>,
//           })
//         }
        
//         // Redirect or show success message
//       }
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description: `${isLogin ? "Login":"Signup"} unsucessful`,
//         action: <ToastAction altText="Try again">Try again</ToastAction>,
//       })
//     }
//   };


//   return (
//     <div className="max-w-md h-full  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//       <h2 className="font-bold md:text-3xl text-2xl  text-neutral-800 dark:text-neutral-200 hidden md:inline">
//         {
//           isLogin ? "Login !" : "Register !"
//         }
//       </h2>

//       <form className="my-8" onSubmit={handleSubmit}>
//         <LabelInputContainer className="flex flex-row space-x-2 mb-4">
//           <Label className="font-bold  md:text-lg text-sm mt-1 my-2 md:my-1" htmlFor="retailer">
//             {isRetailer ? "Retailer" : "Buyer"}
//           </Label>
//           <Switch id="retailer" className=" space-y-2" onCheckedChange={handleSwitchChange} />
//         </LabelInputContainer>
//         {
//           isLogin ? null : (

//             <LabelInputContainer>
//               <Label htmlFor="firstname">Name</Label>
//               <Input id="firstname" placeholder="Tyler" type="text" />
//             </LabelInputContainer>
//           )
//         }

//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" placeholder="••••••••" type="password" />
//         </LabelInputContainer>

//         <button
//           className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Sign up &rarr;
//           <BottomGradient />
//         </button>

//         <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


//       </form>
//     </div>
//   );
// }

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };
"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router";
import { EyeIcon, EyeOffIcon, CheckCircle } from "lucide-react";

interface SignupFormProps {
  isRetailer: boolean;
}

export function SignupForm({ isRetailer }: SignupFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const formData = {
      isRetailer,
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    const api = isRetailer ? "owners" : "users";
    const apiUrl = `http://localhost:3000/${api}/register`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();
      
      if (response.ok && result.sucess) {
        toast({
          title: "Registration successful!",
          description: "Please login to continue",
        });
        
        // Switch to login tab
        const loginTabTrigger = document.querySelector('[value="login"]') as HTMLElement;
        if (loginTabTrigger) {
          loginTabTrigger.click();
        }
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
    }
  };

  const renderPasswordStrengthBar = () => {
    const strengthClasses = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
    ];
    
    return (
      <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            passwordStrength > 0 ? strengthClasses[passwordStrength - 1] : ""
          }`}
          style={{ width: `${passwordStrength * 25}%` }}
        ></div>
      </div>
    );
  };

  const handleTabSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const loginTabTrigger = document.querySelector('[value="login"]') as HTMLElement;
    if (loginTabTrigger) {
      loginTabTrigger.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create an account
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign up as a {isRetailer ? "retailer" : "buyer"} to join SaveMore
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              required
              className="h-11 pr-10"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {renderPasswordStrengthBar()}
          
          <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <CheckCircle className={`h-3 w-3 mr-1 ${password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
              <span>At least 8 characters</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`h-3 w-3 mr-1 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
              <span>At least one uppercase letter</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`h-3 w-3 mr-1 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
              <span>At least one number</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`h-3 w-3 mr-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
              <span>At least one special character</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <Label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
            I agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>

        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
          Sign Up
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="#"
            onClick={handleTabSwitch}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
