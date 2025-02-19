"use client";
import React, { FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface LoginFormProps {
  isRetailer: boolean;
}

export function LoginForm({ isRetailer }: LoginFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const formData = {
      email: target.email.value,
      password: target.password.value,
    };

    const api = isRetailer ? "owners" : "users";
    const apiUrl = `http://localhost:3000/${api}/login`;

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
          title: "Login successful!",
          description: `${
            isRetailer ? "Redirecting to your console" : "Let's shop for a good cause"
          }`,
        });
        
        setTimeout(() => {
          isRetailer ? navigate("/retailers/") : navigate("/users/");  //redirecting to shop page
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          title: "Login Error",
          description: result.msg || "Invalid email or password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't connect to the server. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleTabSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const signupTabTrigger = document.querySelector('[value="signup"]') as HTMLElement;
    if (signupTabTrigger) {
      signupTabTrigger.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Welcome back!
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign in as a {isRetailer ? "retailer" : "buyer"} to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="h-11 pr-10"
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
        </div>

        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={handleTabSwitch}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}