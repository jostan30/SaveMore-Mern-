"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Authentication from "../personal/Authentication";

function LandingPage() {
  const [showContent, setShowContent] = useState(false);

  const words = [
    { text: "Don't waste" },
    { text: "food," },
    { text: "Resell it" },
    { text: "at" },
    { text: "SaveMore", className: "text-blue-500 dark:text-blue-500" },
  ];

  // Delay the appearance of content
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // Show content after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative max-h-screen w-full">
      {/* Fullscreen Image */}
      {!showContent && (
        <div
          className="absolute inset-0 bg-cover bg-center z-50"
          style={{
            backgroundImage: `url("/path-to-your-image.jpg")`,
          }}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <TypewriterEffectSmoothDemo words={words} />
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
    <div className="flex flex-col items-center justify-center h-[30rem] md:mt-20">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        Waste less, save more
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Get Started</Button>
          </DialogTrigger>
          <DialogContent className="container w-full max-w-[65%] h-[70vh] md:h-[79vh] overflow-y-auto items-center md:p-10">
            <Authentication />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default LandingPage;
