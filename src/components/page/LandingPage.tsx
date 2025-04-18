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
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
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
            className="absolute bg-green-100 rounded-full dark:bg-green-900/20 opacity-70 dark:opacity-40 animate-pulse"
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
          className="absolute inset-0 z-50 flex items-center justify-center bg-white dark:bg-black animate-fade-out"
          style={{
            animationDuration: '1.5s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-4 border-green-200 rounded-full dark:border-green-800 animate-ping"></div>
            <div className="absolute inset-0 border-4 border-green-500 rounded-full opacity-75 animate-pulse"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">SaveMore</div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Reducing waste, one meal at a time</div>
              <div className="w-16 h-1 mt-2 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
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
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">SaveMore</div>
          </div>
          <div className="items-center hidden space-x-6 md:flex">
            <button className="text-gray-700 transition-colors dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Home</button>
            <button onClick={scrollToFeatures} className="text-gray-700 transition-colors dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Features</button>
            <button className="text-gray-700 transition-colors dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Products</button>
            <button onClick={scrollToDelivery} className="text-gray-700 transition-colors dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Delivery</button>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6 py-2 text-white transition transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 hover:shadow-green-500/25">
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
          <p className="max-w-xl mx-auto mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Join our community of conscious consumers and food businesses to reduce waste, 
            save money, and help the planet - one meal at a time.
          </p>
          
          <div className="flex flex-col items-center justify-center mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-8 py-3 text-lg text-white transition transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 hover:shadow-green-500/25">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-4xl h-[90vh] overflow-y-auto rounded-2xl p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <Authentication />
                </div>
              </DialogContent>
            </Dialog>
            
            <Button onClick={scrollToFeatures} variant="outline" className="px-8 py-3 text-lg transition transform border-gray-300 rounded-full dark:border-gray-700 hover:scale-105">
              Learn More
            </Button>
          </div>
          
          {/* Floating discount badges */}
          <div className="relative h-20 mt-10">
            {['30% OFF', '50% OFF', '70% OFF', '25% OFF'].map((discount, i) => (
              <div 
                key={i}
                className="absolute inline-block px-3 py-1 text-white bg-red-500 rounded-full shadow-lg animate-float"
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
            <h2 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Today's Special Deals</h2>
            <div className="flex px-4 pb-6 space-x-4 overflow-x-auto scrollbar-hide">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="flex-none w-64 overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl group"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110"
                    />
                    <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-2 right-2">
                      SAVE {product.saving}
                    </div>
                    <div className="absolute px-2 py-1 text-xs font-bold text-white rounded-full bottom-2 left-2 bg-amber-500">
                      Expires: {product.expires}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-bold text-green-600 dark:text-green-400">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-2 mt-3 text-white transition-colors transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features Section */}
          <div ref={featuresRef} className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-3">
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
                className="p-6 transition-all duration-300 shadow-xl rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2"
                style={{
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${index * 0.2}s`
                }}
              >
                <div className="mb-3 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Stats Counter */}
          <div className="p-8 mt-24 shadow-xl bg-green-50 dark:bg-green-900/20 rounded-2xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Our Impact</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { value: "1.2M+", label: "Meals Saved" },
                { value: "$3.5M+", label: "Customer Savings" },
                { value: "2,400+", label: "CO² Tons Reduced" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-4xl font-bold text-green-600 dark:text-green-400">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mt-24">
            <h2 className="mb-12 text-2xl font-bold text-gray-800 dark:text-white">How SaveMore Works</h2>
            <div className="relative">
              <div className="absolute hidden w-1 h-full transform -translate-x-1/2 bg-green-200 left-1/2 dark:bg-green-900/30 md:block"></div>
              
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
                    <div className="mb-4 md:w-1/2 md:pr-8 md:mb-0"></div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
                        <div className="mb-3 text-3xl">{step.icon}</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Delivery Registration Section */}
          <div ref={deliveryRef} className="p-8 mt-24 shadow-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Register for Delivery Service</h2>
            <p className="max-w-xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
              Want to have discounted food delivered right to your door? Register for our premium delivery service and never miss a deal!
            </p>
            
            <form onSubmit={handleDeliverySubmit} className="max-w-md mx-auto">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-full focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="text-white transition-all bg-green-600 rounded-full hover:bg-green-700 hover:scale-105"
                >
                  {isSubmitted ? "Registered! ✓" : "Register Now"}
                </Button>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Get priority delivery slots and free delivery on your first 3 orders
              </p>
            </form>
            
            <div className="grid grid-cols-1 gap-4 mt-8 text-center sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: "🚚", text: "Fast Delivery" },
                { icon: "🔔", text: "Real-time Notifications" },
                { icon: "💰", text: "Exclusive Deals" },
                { icon: "💝", text: "Loyalty Rewards" }
              ].map((benefit, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <div className="mb-2 text-2xl">{benefit.icon}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{benefit.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-100 dark:bg-gray-900">
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">SaveMore</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reducing food waste through technology and community. Join us in making a difference with every purchase.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">How It Works</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">For Businesses</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Connect With Us</h3>
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
              <div className="flex mt-2 space-x-3">
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
        
        <div className="pt-6 mt-8 text-sm text-center text-gray-600 border-t border-gray-200 dark:border-gray-800 dark:text-gray-400">
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
      <h2 className="mb-4 text-sm font-medium tracking-wide uppercase text-neutral-700 dark:text-neutral-200 sm:text-base">
        Making a difference with every purchase
      </h2>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}