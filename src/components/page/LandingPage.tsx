// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import Authentication from "../personal/Authentication";

// function LandingPage() {
//   const [showContent, setShowContent] = useState(false);

//   const words = [
//     { text: "Don't waste" },
//     { text: "food," },
//     { text: "Resell it" },
//     { text: "at" },
//     { text: "SaveMore", className: "text-blue-500 dark:text-blue-500" },
//   ];

//   // Delay the appearance of content
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 2000); // Show content after 2 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="relative max-h-screen w-full">
//       {/* Fullscreen Image */}
//       {!showContent && (
//         <div
//           className="absolute inset-0 bg-cover bg-center z-50"
//           style={{
//             backgroundImage: `url("/path-to-your-image.jpg")`,
//           }}
//         ></div>
//       )}

//       {/* Main Content */}
//       <div
//         className={`transition-opacity duration-1000 ${
//           showContent ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         <TypewriterEffectSmoothDemo words={words} />
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
//     <div className="flex flex-col items-center justify-center h-[30rem] md:mt-20">
//       <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
//         Waste less, save more
//       </p>
//       <TypewriterEffectSmooth words={words} />
//       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button variant="outline">Get Started</Button>
//           </DialogTrigger>
//           <DialogContent className="container w-full max-w-[65%] h-[70vh] md:h-[79vh] overflow-y-auto items-center md:p-10">
//             <Authentication />
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }
//export default LandingPage

// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import Authentication from "../personal/Authentication";
// import { motion } from "framer-motion";

// function LandingPage() {
//   const [showContent, setShowContent] = useState(false);

//   const words = [
//     { text: "Don't waste" },
//     { text: "food," },
//     { text: "Resell it" },
//     { text: "at" },
//     { text: "SaveMore", className: "text-blue-500 dark:text-blue-500 font-bold" },
//   ];

//   // Delay the appearance of content
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 2000); // Show content after 2 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
//       {/* Animated Background Elements */}
//       {showContent && (
//         <>
//           <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//             {[...Array(15)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute rounded-full bg-blue-200 dark:bg-blue-700 opacity-20"
//                 style={{
//                   width: Math.random() * 300 + 50,
//                   height: Math.random() * 300 + 50,
//                   top: `${Math.random() * 100}%`,
//                   left: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   y: [0, Math.random() * 100 - 50],
//                   x: [0, Math.random() * 100 - 50],
//                 }}
//                 transition={{
//                   duration: Math.random() * 10 + 10,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                 }}
//               />
//             ))}
//           </div>
          
//           {/* Floating Price Tags */}
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={`price-${i}`}
//               className="absolute rounded-lg bg-white dark:bg-gray-800 shadow-lg px-3 py-2 flex items-center justify-center z-10"
//               style={{
//                 top: `${20 + Math.random() * 60}%`,
//                 left: `${10 + Math.random() * 80}%`,
//               }}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ 
//                 opacity: [0, 0.9, 0.9, 0],
//                 scale: [0.5, 1.1, 1, 0.5],
//                 y: [0, -50, -100, -150],
//               }}
//               transition={{
//                 duration: 8,
//                 delay: i * 2,
//                 repeat: Infinity,
//                 repeatDelay: 5,
//               }}
//             >
//               <span className="text-gray-500 line-through mr-2">${(20 + Math.random() * 30).toFixed(2)}</span>
//               <span className="text-green-500 font-bold">${(10 + Math.random() * 20).toFixed(2)}</span>
//             </motion.div>
//           ))}
//         </>
//       )}

//       {/* Initial Loading Screen */}
//       {!showContent && (
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center z-50 flex items-center justify-center"
//           style={{
//             backgroundImage: `url("/landing.jpeg")`,
//           }}
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 0 }}
//           transition={{ duration: 1.5, delay: 0.5 }}
//         >
//           <motion.div 
//             className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.img 
//               src="/landing.jpeg" 
//               alt="SaveMore Logo" 
//               className="h-16 w-auto mx-auto mb-4"
//               initial={{ rotate: -10 }}
//               animate={{ rotate: 10 }}
//               transition={{ duration: 1, repeat: 1, repeatType: "reverse" }}
//             />
//             <p className="text-center text-gray-600 dark:text-gray-300">Loading the savings...</p>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-1000 z-20 relative ${
//           showContent ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         {/* <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <img src="/logo.svg" alt="SaveMore Logo" className="h-8 w-auto" />
//             <span className="text-blue-600 dark:text-blue-400 font-semibold text-xl">SaveMore</span>
//           </div>
//           <div className="flex space-x-4">
//             <Button variant="ghost" className="hidden md:inline-flex">How It Works</Button>
//             <Button variant="ghost" className="hidden md:inline-flex">For Retailers</Button>
//             <Button variant="ghost" className="hidden md:inline-flex">For Customers</Button>
//           </div>
//         </nav> */}

//         <main className="container mx-auto px-4 pt-4 md:pt-2">
//           <TypewriterEffectSmoothDemo words={words} />
          
//           <motion.div 
//             className="mt-1 max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 3, duration: 0.8 }}
//           >
//             <p className="text-lg md:text-xl">
//               Join our revolutionary marketplace where expiring food finds new homes. 
//               Retailers reduce waste, customers save money, and everyone helps the planet.
//             </p>
//           </motion.div>
          
//           <motion.div 
//             className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center mt-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 3.5, duration: 0.8 }}
//           >
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
//                   Get Started
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="container w-full max-w-[65%] h-[70vh] md:h-[79vh] overflow-y-auto items-center md:p-10">
//                 <Authentication />
//               </DialogContent>
//             </Dialog>
            
//             <Button variant="outline" className="px-8 py-6 rounded-full text-lg border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all transform hover:scale-105">
//               Learn More
//             </Button>
//           </motion.div>
//         </main>
        
//         {/* Features Section */}
//         <motion.section 
//           className="container mx-auto px-4 py-20"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 4, duration: 1 }}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
//               <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-16 h-16 flex items-center justify-center mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Dynamic Pricing</h3>
//               <p className="text-gray-600 dark:text-gray-300">Prices automatically adjust based on expiration dates, ensuring both savings and sales.</p>
//             </div>
            
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
//               <div className="rounded-full bg-green-100 dark:bg-green-900 w-16 h-16 flex items-center justify-center mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Reduce Food Waste</h3>
//               <p className="text-gray-600 dark:text-gray-300">Help save over 1.3 billion tons of food wasted globally each year while saving money.</p>
//             </div>
            
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
//               <div className="rounded-full bg-purple-100 dark:bg-purple-900 w-16 h-16 flex items-center justify-center mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Win-Win Marketplace</h3>
//               <p className="text-gray-600 dark:text-gray-300">A platform where retailers reduce losses and consumers discover incredible deals.</p>
//             </div>
//           </div>
//         </motion.section>
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
//     <div className="flex flex-col items-center justify-center py-12">
//       <p className="text-neutral-600 dark:text-neutral-200 text-sm md:text-base lg:text-lg mb-4 font-medium">
//         Waste less, save more
//       </p>
//       <TypewriterEffectSmooth words={words} />
//     </div>
//   );
// }

// export default LandingPage;

//final
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Authentication from "@/components/personal/Authentication";

export default function LandingPage() {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const words = [
    { text: "Don't waste" },
    { text: "food," },
    { text: "Resell it" },
    { text: "at" },
    { text: "SaveMore", className: "text-green-500 dark:text-blue-500 font-bold" },
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
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden ">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-70 dark:opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              animationDelay: `${Math.random() * 0.1}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * -20}px)`,
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
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-green-200 dark:border-blue-800 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-6 border-green-500 rounded-full opacity-75 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center text-green-600 dark:text-blue-400 text-2xl font-bold">SaveMore</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-1000 h-full w-full flex flex-wrap flex-col items-center justify-center p-5 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="max-w-4xl px-6 py-10 mx-auto text-center">
          <TypewriterEffectSmoothDemo words={words} /> 
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
            Join our community of conscious consumers and food businesses to reduce waste, 
            save money, and help the planet - one meal at a time.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full transform transition hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-4xl h-[90vh] overflow-y-auto rounded-2xl p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <Authentication />
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="px-8 py-2.5 border-gray-300 dark:border-gray-700 rounded-full transform transition hover:scale-105">
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Reduce Waste",
                description: "Help prevent perfectly good food from ending up in landfills"
              },
              {
                icon: "💰",
                title: "Save Money",
                description: "Get great deals on quality food nearing its best-by date"
              },
              {
                icon: "🌎",
                title: "Help the Planet",
                description: "Lower your carbon footprint through conscious consumption"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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

