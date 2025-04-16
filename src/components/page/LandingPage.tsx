// // "use client";
// // import { useEffect, useState } from "react";
// // import { Button } from "../ui/button";
// // import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import Authentication from "../personal/Authentication";

// // function LandingPage() {
// //   const [showContent, setShowContent] = useState(false);

// //   const words = [
// //     { text: "Don't waste" },
// //     { text: "food," },
// //     { text: "Resell it" },
// //     { text: "at" },
// //     { text: "SaveMore", className: "text-blue-500 dark:text-blue-500" },
// //   ];

// //   // Delay the appearance of content
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setShowContent(true);
// //     }, 2000); // Show content after 2 seconds
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="relative max-h-screen w-full">
// //       {/* Fullscreen Image */}
// //       {!showContent && (
// //         <div
// //           className="absolute inset-0 bg-cover bg-center z-50"
// //           style={{
// //             backgroundImage: `url("/path-to-your-image.jpg")`,
// //           }}
// //         ></div>
// //       )}

// //       {/* Main Content */}
// //       <div
// //         className={`transition-opacity duration-1000 ${
// //           showContent ? "opacity-100" : "opacity-0"
// //         }`}
// //       >
// //         <TypewriterEffectSmoothDemo words={words} />
// //       </div>
// //     </div>
// //   );
// // }

// // export function TypewriterEffectSmoothDemo({
// //   words,
// // }: {
// //   words: Array<{ text: string; className?: string }>;
// // }) {
// //   return (
// //     <div className="flex flex-col items-center justify-center h-[30rem] md:mt-20">
// //       <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
// //         Waste less, save more
// //       </p>
// //       <TypewriterEffectSmooth words={words} />
// //       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
// //         <Dialog>
// //           <DialogTrigger asChild>
// //             <Button variant="outline">Get Started</Button>
// //           </DialogTrigger>
// //           <DialogContent className="container w-full max-w-[65%] h-[70vh] md:h-[79vh] overflow-y-auto items-center md:p-10">
// //             <Authentication />
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </div>
// //   );
// // }
// //export default LandingPage

// // "use client";
// // import { useEffect, useState } from "react";
// // import { Button } from "../ui/button";
// // import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import Authentication from "../personal/Authentication";
// // import { motion } from "framer-motion";

// // function LandingPage() {
// //   const [showContent, setShowContent] = useState(false);

// //   const words = [
// //     { text: "Don't waste" },
// //     { text: "food," },
// //     { text: "Resell it" },
// //     { text: "at" },
// //     { text: "SaveMore", className: "text-blue-500 dark:text-blue-500 font-bold" },
// //   ];

// //   // Delay the appearance of content
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setShowContent(true);
// //     }, 2000); // Show content after 2 seconds
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
// //       {/* Animated Background Elements */}
// //       {showContent && (
// //         <>
// //           <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
// //             {[...Array(15)].map((_, i) => (
// //               <motion.div
// //                 key={i}
// //                 className="absolute rounded-full bg-blue-200 dark:bg-blue-700 opacity-20"
// //                 style={{
// //                   width: Math.random() * 300 + 50,
// //                   height: Math.random() * 300 + 50,
// //                   top: `${Math.random() * 100}%`,
// //                   left: `${Math.random() * 100}%`,
// //                 }}
// //                 animate={{
// //                   y: [0, Math.random() * 100 - 50],
// //                   x: [0, Math.random() * 100 - 50],
// //                 }}
// //                 transition={{
// //                   duration: Math.random() * 10 + 10,
// //                   repeat: Infinity,
// //                   repeatType: "reverse",
// //                 }}
// //               />
// //             ))}
// //           </div>
          
// //           {/* Floating Price Tags */}
// //           {[...Array(6)].map((_, i) => (
// //             <motion.div
// //               key={`price-${i}`}
// //               className="absolute rounded-lg bg-white dark:bg-gray-800 shadow-lg px-3 py-2 flex items-center justify-center z-10"
// //               style={{
// //                 top: `${20 + Math.random() * 60}%`,
// //                 left: `${10 + Math.random() * 80}%`,
// //               }}
// //               initial={{ opacity: 0, scale: 0.5 }}
// //               animate={{ 
// //                 opacity: [0, 0.9, 0.9, 0],
// //                 scale: [0.5, 1.1, 1, 0.5],
// //                 y: [0, -50, -100, -150],
// //               }}
// //               transition={{
// //                 duration: 8,
// //                 delay: i * 2,
// //                 repeat: Infinity,
// //                 repeatDelay: 5,
// //               }}
// //             >
// //               <span className="text-gray-500 line-through mr-2">${(20 + Math.random() * 30).toFixed(2)}</span>
// //               <span className="text-green-500 font-bold">${(10 + Math.random() * 20).toFixed(2)}</span>
// //             </motion.div>
// //           ))}
// //         </>
// //       )}

// //       {/* Initial Loading Screen */}
// //       {!showContent && (
// //         <motion.div
// //           className="absolute inset-0 bg-cover bg-center z-50 flex items-center justify-center"
// //           style={{
// //             backgroundImage: `url("/landing.jpeg")`,
// //           }}
// //           initial={{ opacity: 1 }}
// //           animate={{ opacity: 0 }}
// //           transition={{ duration: 1.5, delay: 0.5 }}
// //         >
// //           <motion.div 
// //             className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl"
// //             initial={{ scale: 0.8, opacity: 0 }}
// //             animate={{ scale: 1, opacity: 1 }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             <motion.img 
// //               src="/landing.jpeg" 
// //               alt="SaveMore Logo" 
// //               className="h-16 w-auto mx-auto mb-4"
// //               initial={{ rotate: -10 }}
// //               animate={{ rotate: 10 }}
// //               transition={{ duration: 1, repeat: 1, repeatType: "reverse" }}
// //             />
// //             <p className="text-center text-gray-600 dark:text-gray-300">Loading the savings...</p>
// //           </motion.div>
// //         </motion.div>
// //       )}

// //       {/* Main Content */}
// //       <div
// //         className={`transition-all duration-1000 z-20 relative ${
// //           showContent ? "opacity-100" : "opacity-0"
// //         }`}
// //       >
// //         {/* <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
// //           <div className="flex items-center space-x-2">
// //             <img src="/logo.svg" alt="SaveMore Logo" className="h-8 w-auto" />
// //             <span className="text-blue-600 dark:text-blue-400 font-semibold text-xl">SaveMore</span>
// //           </div>
// //           <div className="flex space-x-4">
// //             <Button variant="ghost" className="hidden md:inline-flex">How It Works</Button>
// //             <Button variant="ghost" className="hidden md:inline-flex">For Retailers</Button>
// //             <Button variant="ghost" className="hidden md:inline-flex">For Customers</Button>
// //           </div>
// //         </nav> */}

// //         <main className="container mx-auto px-4 pt-4 md:pt-2">
// //           <TypewriterEffectSmoothDemo words={words} />
          
// //           <motion.div 
// //             className="mt-1 max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 3, duration: 0.8 }}
// //           >
// //             <p className="text-lg md:text-xl">
// //               Join our revolutionary marketplace where expiring food finds new homes. 
// //               Retailers reduce waste, customers save money, and everyone helps the planet.
// //             </p>
// //           </motion.div>
          
// //           <motion.div 
// //             className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center mt-12"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 3.5, duration: 0.8 }}
// //           >
// //             <Dialog>
// //               <DialogTrigger asChild>
// //                 <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
// //                   Get Started
// //                 </Button>
// //               </DialogTrigger>
// //               <DialogContent className="container w-full max-w-[65%] h-[70vh] md:h-[79vh] overflow-y-auto items-center md:p-10">
// //                 <Authentication />
// //               </DialogContent>
// //             </Dialog>
            
// //             <Button variant="outline" className="px-8 py-6 rounded-full text-lg border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all transform hover:scale-105">
// //               Learn More
// //             </Button>
// //           </motion.div>
// //         </main>
        
// //         {/* Features Section */}
// //         <motion.section 
// //           className="container mx-auto px-4 py-20"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 4, duration: 1 }}
// //         >
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
// //               <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-16 h-16 flex items-center justify-center mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Dynamic Pricing</h3>
// //               <p className="text-gray-600 dark:text-gray-300">Prices automatically adjust based on expiration dates, ensuring both savings and sales.</p>
// //             </div>
            
// //             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
// //               <div className="rounded-full bg-green-100 dark:bg-green-900 w-16 h-16 flex items-center justify-center mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Reduce Food Waste</h3>
// //               <p className="text-gray-600 dark:text-gray-300">Help save over 1.3 billion tons of food wasted globally each year while saving money.</p>
// //             </div>
            
// //             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
// //               <div className="rounded-full bg-purple-100 dark:bg-purple-900 w-16 h-16 flex items-center justify-center mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Win-Win Marketplace</h3>
// //               <p className="text-gray-600 dark:text-gray-300">A platform where retailers reduce losses and consumers discover incredible deals.</p>
// //             </div>
// //           </div>
// //         </motion.section>
// //       </div>
// //     </div>
// //   );
// // }

// // export function TypewriterEffectSmoothDemo({
// //   words,
// // }: {
// //   words: Array<{ text: string; className?: string }>;
// // }) {
// //   return (
// //     <div className="flex flex-col items-center justify-center py-12">
// //       <p className="text-neutral-600 dark:text-neutral-200 text-sm md:text-base lg:text-lg mb-4 font-medium">
// //         Waste less, save more
// //       </p>
// //       <TypewriterEffectSmooth words={words} />
// //     </div>
// //   );
// // }

// // export default LandingPage;

// //final
// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import Authentication from "@/components/personal/Authentication";

// export default function LandingPage() {
//   const [showContent, setShowContent] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const words = [
//     { text: "Don't waste" },
//     { text: "food," },
//     { text: "Resell it" },
//     { text: "at" },
//     { text: "SaveMore", className: "text-green-500 dark:text-blue-500 font-bold" },
//   ];

//   // Delay the appearance of content
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 2500);
    
//     // Track mouse for parallax effect
//     const handleMouseMove = (e:any) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
    
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden ">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-70 dark:opacity-40 animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 300 + 50}px`,
//               height: `${Math.random() * 300 + 50}px`,
//               animationDelay: `${Math.random() * 0.1}s`,
//               animationDuration: `${Math.random() * 5 + 5}s`,
//               transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * -20}px)`,
//               transition: 'transform 1s ease-out'
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Splash screen */}
//       {!showContent && (
//         <div
//           className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black z-50 animate-fade-out"
//           style={{
//             animationDuration: '1.5s',
//             animationFillMode: 'forwards',
//           }}
//         >
//           <div className="relative w-24 h-24">
//             <div className="absolute inset-0 border-4 border-green-200 dark:border-blue-800 rounded-full animate-ping"></div>
//             <div className="absolute inset-0 border-6 border-green-500 rounded-full opacity-75 animate-pulse"></div>
//             <div className="absolute inset-0 flex items-center justify-center text-green-600 dark:text-blue-400 text-2xl font-bold">SaveMore</div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-1000 h-full w-full flex flex-wrap flex-col items-center justify-center p-5 ${
//           showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
//         }`}
//       >
//         <div className="max-w-4xl px-6 py-10 mx-auto text-center">
//           <TypewriterEffectSmoothDemo words={words} /> 
//           <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
//             Join our community of conscious consumers and food businesses to reduce waste, 
//             save money, and help the planet - one meal at a time.
//           </p>
          
//           <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full transform transition hover:scale-105 shadow-lg hover:shadow-blue-500/25">
//                   Get Started
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-4xl h-[90vh] overflow-y-auto rounded-2xl p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800">
//                 <div className="p-6">
//                   <Authentication />
//                 </div>
//               </DialogContent>
//             </Dialog>
            
//             <Button variant="outline" className="px-8 py-2.5 border-gray-300 dark:border-gray-700 rounded-full transform transition hover:scale-105">
//               Learn More
//             </Button>
//           </div>
          
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "🌱",
//                 title: "Reduce Waste",
//                 description: "Help prevent perfectly good food from ending up in landfills"
//               },
//               {
//                 icon: "💰",
//                 title: "Save Money",
//                 description: "Get great deals on quality food nearing its best-by date"
//               },
//               {
//                 icon: "🌎",
//                 title: "Help the Planet",
//                 description: "Lower your carbon footprint through conscious consumption"
//               }
//             ].map((feature, index) => (
//               <div 
//                 key={index}
//                 className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className="text-3xl mb-3">{feature.icon}</div>
//                 <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function TypewriterEffectSmoothDemo({
//   words,
// }: {
//   words: Array<{ text: string; className?: string }>;
// }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-10">
//       <h2 className="text-neutral-700 dark:text-neutral-200 text-sm sm:text-base font-medium mb-4 tracking-wide uppercase">
//         Making a difference with every purchase
//       </h2>
//       <TypewriterEffectSmooth words={words} />
//     </div>
//   );
// }



"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Authentication from "@/components/personal/Authentication";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Fix the ref typing to specify HTMLDivElement
  const featuresRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);

  const words = [
    { text: "Don't waste" },
    { text: "food," },
    { text: "Resell it" },
    { text: "at" },
    { text: "SaveMore", className: "text-green-500 dark:text-blue-500 font-bold" },
  ];

  // Products data for the carousel
  const products = [
    {
      id: 1,
      name: "Fresh Organic Bread",
      originalPrice: 4.99,
      discountPrice: 2.49,
      expires: "Today",
      image: "/api/placeholder/400/260",
      saving: "50%"
    },
    {
      id: 2,
      name: "Premium Chocolate Box",
      originalPrice: 12.99,
      discountPrice: 5.99,
      expires: "Tomorrow",
      image: "/api/placeholder/400/260",
      saving: "54%"
    },
    {
      id: 3,
      name: "Organic Mixed Berries",
      originalPrice: 6.99,
      discountPrice: 3.49,
      expires: "Today",
      image: "/api/placeholder/400/260",
      saving: "50%"
    },
    {
      id: 4,
      name: "Greek Yogurt Pack",
      originalPrice: 5.49,
      discountPrice: 2.99,
      expires: "In 2 days",
      image: "/api/placeholder/400/260",
      saving: "46%"
    },
    {
      id: 5,
      name: "Artisan Cheese Selection",
      originalPrice: 14.99,
      discountPrice: 7.49,
      expires: "Tomorrow",
      image: "/api/placeholder/400/260",
      saving: "50%"
    }
  ];

  // Delay the appearance of content
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    
    // Track mouse for parallax effect
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Track scroll for animations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToFeatures = () => {
    // Add null check before calling scrollIntoView
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDelivery = () => {
    // Add null check before calling scrollIntoView
    if (deliveryRef.current) {
      deliveryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add proper type for the event
  const handleDeliverySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Animated Food Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-70 dark:opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ['#8BC34A', '#4CAF50', '#FF9800', '#F44336', '#3F51B5'][Math.floor(Math.random() * 5)],
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -10}px, ${(mousePosition.y / window.innerHeight - 0.5) * -10}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
        ))}
      </div>

      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-100 dark:bg-green-900/20 opacity-70 dark:opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              animationDelay: `${Math.random() * 0.1}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -(20 + i * 5)}px, ${(mousePosition.y / window.innerHeight - 0.5) * -(20 + i * 5)}px)`,
              transition: 'transform 1s ease-out'
            }}
          ></div>
        ))}
      </div>

      {/* Splash screen */}
      {!showContent && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black z-50 animate-fade-out"
          style={{
            animationDuration: '1.5s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-4 border-green-200 dark:border-green-800 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-green-500 rounded-full opacity-75 animate-pulse"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-green-600 dark:text-green-400 text-2xl font-bold">SaveMore</div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Reducing waste, one meal at a time</div>
              <div className="mt-2 h-1 w-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                <div className="h-full bg-green-500 animate-progress-bar"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-green-600 dark:text-green-400 text-xl font-bold">SaveMore</div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</button>
            <button onClick={scrollToFeatures} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Features</button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Products</button>
            <button onClick={scrollToDelivery} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Delivery</button>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transform transition hover:scale-105 shadow-lg hover:shadow-green-500/25">
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-4xl h-[90vh] overflow-y-auto rounded-2xl p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <Authentication />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`transition-all duration-1000 min-h-screen w-full flex flex-wrap flex-col items-center justify-center p-5 pt-24 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="max-w-6xl px-6 py-16 mx-auto text-center">
          <TypewriterEffectSmoothDemo words={words} /> 
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed text-lg">
            Join our community of conscious consumers and food businesses to reduce waste, 
            save money, and help the planet - one meal at a time.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transform transition hover:scale-105 shadow-lg hover:shadow-green-500/25 text-lg">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-4xl h-[90vh] overflow-y-auto rounded-2xl p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <Authentication />
                </div>
              </DialogContent>
            </Dialog>
            
            <Button onClick={scrollToFeatures} variant="outline" className="px-8 py-3 border-gray-300 dark:border-gray-700 rounded-full transform transition hover:scale-105 text-lg">
              Learn More
            </Button>
          </div>
          
          {/* Floating discount badges */}
          <div className="relative h-20 mt-10">
            {['30% OFF', '50% OFF', '70% OFF', '25% OFF'].map((discount, i) => (
              <div 
                key={i}
                className="absolute inline-block px-3 py-1 bg-red-500 text-white rounded-full shadow-lg animate-float"
                style={{
                  left: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              >
                {discount}
              </div>
            ))}
          </div>
          
          {/* Product Showcase */}
          <div className="mt-10 mb-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Today's Special Deals</h2>
            <div className="flex overflow-x-auto pb-6 space-x-4 px-4 scrollbar-hide">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="flex-none w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SAVE {product.saving}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Expires: {product.expires}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{product.name}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-green-600 dark:text-green-400 font-bold">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <button className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features Section */}
          <div ref={featuresRef} className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Reduce Waste",
                description: "Help prevent perfectly good food from ending up in landfills and make a real environmental impact."
              },
              {
                icon: "💰",
                title: "Save Money",
                description: "Get great deals on quality food nearing its best-by date. Up to 70% off retail prices!"
              },
              {
                icon: "🌎",
                title: "Help the Planet",
                description: "Lower your carbon footprint through conscious consumption. Food waste contributes to climate change."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${index * 0.2}s`
                }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Stats Counter */}
          <div className="mt-24 bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: "1.2M+", label: "Meals Saved" },
                { value: "$3.5M+", label: "Customer Savings" },
                { value: "2,400+", label: "CO² Tons Reduced" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-12">How SaveMore Works</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200 dark:bg-green-900/30 hidden md:block"></div>
              
              {[
                {
                  title: "Stores List Expiring Products",
                  description: "Local stores and restaurants add their soon-to-expire but still perfectly good food at reduced prices.",
                  icon: "🏪"
                },
                {
                  title: "You Browse & Order",
                  description: "Browse deals near you, build your cart, and checkout securely through our app.",
                  icon: "📱"
                },
                {
                  title: "Pick Up or Get Delivered",
                  description: "Choose between convenient pickup or have your discounted food delivered right to your door.",
                  icon: "🚚"
                },
                {
                  title: "Enjoy & Save",
                  description: "Enjoy quality food at a fraction of the price while helping reduce food waste!",
                  icon: "😋"
                }
              ].map((step, index) => (
                <div key={index} className="relative mb-12">
                  <div className={`md:absolute md:w-6 md:h-6 md:rounded-full md:bg-green-500 md:left-1/2 md:transform md:-translate-x-1/2 md:top-5 hidden md:block z-10`}></div>
                  
                  <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0"></div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="text-3xl mb-3">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Delivery Registration Section */}
          <div ref={deliveryRef} className="mt-24 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Register for Delivery Service</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
              Want to have discounted food delivered right to your door? Register for our premium delivery service and never miss a deal!
            </p>
            
            <form onSubmit={handleDeliverySubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow py-3 px-4 rounded-full focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full transition-all hover:scale-105"
                >
                  {isSubmitted ? "Registered! ✓" : "Register Now"}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Get priority delivery slots and free delivery on your first 3 orders
              </p>
            </form>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: "🚚", text: "Fast Delivery" },
                { icon: "🔔", text: "Real-time Notifications" },
                { icon: "💰", text: "Exclusive Deals" },
                { icon: "💝", text: "Loyalty Rewards" }
              ].map((benefit, index) => (
                <div key={index} className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">{benefit.icon}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{benefit.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">SaveMore</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Reducing food waste through technology and community. Join us in making a difference with every purchase.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">How It Works</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">For Businesses</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social, i) => (
                <a key={i} href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  {social}
                </a>
              ))}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download our app:
              </p>
              <div className="flex space-x-3 mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} SaveMore. All rights reserved.
        </div>
      </footer>
      
      {/* Custom CSS animation keyframes - fixed the style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          @keyframes progress-bar {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-progress-bar {
            animation: progress-bar 2s linear;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />
    </div>
  );
}

export function TypewriterEffectSmoothDemo({
  words,
}: {
  words: Array<{ text: string; className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-neutral-700 dark:text-neutral-200 text-sm sm:text-base font-medium mb-4 tracking-wide uppercase">
        Making a difference with every purchase
      </h2>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}