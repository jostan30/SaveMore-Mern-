// import { useState } from "react";
// import { SignupForm } from "./SignupForm";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// function Authentication() {
//   const [isLogin, setIsLogin] = useState(true);

//   const handleSwitchChange = () => {
//     setIsLogin(!isLogin); // Toggle isLogin state
//   };

//   return (
//     <div className="flex flex-col h-full space-y-0">
//         {/* Switch Section */}
//         <div className="flex items-center justify-center sm:mt-2  space-x-2">
//           <Switch id="login" onCheckedChange={handleSwitchChange} checked={!isLogin} />
//           <Label className="font-bold text-lg " htmlFor="login">
//             {isLogin ? "Login" : "Register"}
//           </Label>
          
//         </div>
//     <div
//       className={`flex flex-col md:flex-row h-full w-[100%] transition-all duration-2000 ${
//         isLogin ? "md:flex-row" : "md:flex-row-reverse"
//       }`}
//     >
//       {/* Left Section: Image and Switch */}
//       <div className="md:w-[30%] w-full h-[100%] pb-2 flex flex-col items-center justify-center">
//         {/* Image Section */}
//         <div
//           className="w-full h-[50%]  bg-no-repeat bg-center"
//           style={{
//             backgroundImage: `${isLogin ? `url("/buyer1.svg")` : `url("/seller1.svg")`}`,
//             backgroundSize: "contain", // Ensures the image fills the container
//           }}
//         ></div>
//       </div>

//       {/* Right Section: Form */}
//       <div className=" md:w-[70%] md:h-full w-full h-[40vH] flex justify-center items-center p-4 sm:mt-0">
//         <SignupForm isLogin={isLogin} />
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Authentication;
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import ProtectedRoute from "./ProtectedRoute";

function Authentication() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [userType, setUserType] = useState<"buyer" | "retailer">("buyer");
  
  return (
    <ProtectedRoute userType={
      userType == "retailer" ? "owner": "user"
    }>
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full">
      {/* Main Container */}
      <div className="flex flex-col items-center space-y-6 w-full">
        {/* Logo and Welcome Text */}
        <div className="text-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Welcome to SaveMore
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join our community to reduce food waste and save money
          </p>
        </div>

        {/* Main Tabs: Login/Register */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left side: Illustration */}
            <div className="w-full md:w-2/5 flex-shrink-0 hidden md:block">
              <div
                className="w-full aspect-square bg-no-repeat bg-center bg-contain"
                style={{
                  backgroundImage: activeTab === "login"
                    ? userType === "buyer" ? "url('/buyer1.svg')" : "url('/seller1.svg')"
                    : userType === "buyer" ? "url('/buyer1.svg')" : "url('/seller1.svg')",
                  opacity: 0.9,
                }}
              ></div>
            </div>

            {/* Right side: Form Card */}
            <Card className="w-full md:w-3/5 shadow-lg border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <TabsList className="w-full grid grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg border-b dark:border-gray-700">
                  <TabsTrigger
                    value="login"
                    className=" rounded-none rounded-tl-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className=" rounded-none rounded-tr-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* User Type Selector */}
                <div className="flex justify-center py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setUserType("buyer")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        userType === "buyer"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      I'm a Buyer
                    </button>
                    <button
                      onClick={() => setUserType("retailer")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        userType === "retailer"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      I'm a Retailer
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <TabsContent value="login" className="p-6">
                  <LoginForm isRetailer={userType === "retailer"} />
                </TabsContent>
                <TabsContent value="signup" className="p-6">
                  <SignupForm isRetailer={userType === "retailer"} />
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
    </ProtectedRoute>
  );
}

export default Authentication;
