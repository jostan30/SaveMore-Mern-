import { useState } from "react";
import { SignupForm } from "./SignupForm";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchChange = () => {
    setIsLogin(!isLogin); // Toggle isLogin state
  };

  return (
    <div className="flex flex-col h-full space-y-0">
        {/* Switch Section */}
        <div className="flex items-center justify-center sm:mt-2  space-x-2">
          <Switch id="login" onCheckedChange={handleSwitchChange} checked={!isLogin} />
          <Label className="font-bold text-lg " htmlFor="login">
            {isLogin ? "Login" : "Signup"}
          </Label>
          
        </div>
    <div
      className={`flex flex-col md:flex-row h-full w-[100%] transition-all duration-2000 ${
        isLogin ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Left Section: Image and Switch */}
      <div className="md:w-[30%] w-full h-[100%] pb-2 flex flex-col items-center justify-center">
        {/* Image Section */}
        <div
          className="w-full h-[50%]  bg-no-repeat bg-center"
          style={{
            backgroundImage: `${isLogin ? `url("/buyer1.svg")` : `url("/seller1.svg")`}`,
            backgroundSize: "contain", // Ensures the image fills the container
          }}
        ></div>
      </div>

      {/* Right Section: Form */}
      <div className=" md:w-[70%] md:h-full w-full h-[40vH] flex justify-center items-center p-4 sm:mt-0">
        <SignupForm isLogin={isLogin} />
      </div>
    </div>
    </div>
  );
}

export default Authentication;
