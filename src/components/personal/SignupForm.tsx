
"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
// import { useNavigate } from "react-router";
import { EyeIcon, EyeOffIcon, CheckCircle } from "lucide-react";

interface SignupFormProps {
  isRetailer: boolean;
}

export function SignupForm({ isRetailer }: SignupFormProps) {
  const { toast } = useToast();
  // const navigate = useNavigate();
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
      console.log("The result of signUp is",result);
      
      if (response.ok && result.success) {
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
      <div className="w-full h-1 mt-2 bg-gray-200 rounded-full">
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
              className="pr-10 h-11"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
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
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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

        <Button type="submit" className="w-full bg-blue-600 h-11 hover:bg-blue-700">
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
