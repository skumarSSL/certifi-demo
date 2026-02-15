"use client";

import backgroundGif from "@/assets/background-login.png";
import Carousel from "@/components/login/CarouselSection";

import LoginSection from "@/components/login/LoginSection";
import StoreProvider from "./StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <div className="min-h-screen md:min-h-dvh bg-gray-200 text-foreground p-8 space-y-6">
        <div className="grid grid-cols-5 items-center justify-center gap-4">
          <div className="col-span-3 relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden border-gray-200 ">
            {/* GIF Background */}
            <img
              src={backgroundGif.src}
              alt="Animated background"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-70"
            />

            {/* Carousel */}
            <div className="relative z-10 w-full max-w-4xl">
              <Carousel />
            </div>
          </div>

          <div className="col-span-2">
            <LoginSection />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}
