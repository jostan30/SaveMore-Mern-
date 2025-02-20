import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./components/page/LandingPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(true);
    }, 1000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image Div */}
      <div
          className={`min-h-[40vh] md:min-h-screen flex-auto bg-contain bg-center bg-no-repeat w-full max-h-screen transition-all duration-2000 ${!showLandingPage ? "opacity-100" : "opacity-0 hidden"} `}
        style={{ backgroundImage: "url('/landing.jpeg')" }}
      ></div>

      {/* Landing Page with Fade-in Effect */}
      <div className={`flex-auto pt-0 transition-opacity duration-1000 ${showLandingPage ? "opacity-100" : "opacity-0"}`}>
        <LandingPage />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
