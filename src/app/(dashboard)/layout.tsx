"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/NavBar";
import Sidebar from "@/components/common/SideBar";

import StoreProvider from "../StoreProvider";
import { Edit, Edit2 } from "lucide-react";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";

const DashboardWrapper = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props?: any;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideBar, setIsSideBar] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const composeButton = document.querySelector(".compose");

    gsap.to(composeButton, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.out",
    });
  }, []);

  useEffect(() => {
    console.log("dark_mode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add(".dark");
    } else {
      document.documentElement.classList.remove(".dark");
    }
  }, [isDarkMode]);

  return (
    <StoreProvider>
      <div className="relative flex h-screen w-full bg-gray-50 text-gray-900 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isSideBar={isSideBar} setIsSideBar={setIsSideBar} />

        {/* Main layout */}
        <main className="flex flex-col flex-1 bg-gray-50 dark:bg-dark-bg">
          {/* Sticky Navbar */}
          <Navbar
            isDarkMode={isDarkMode}
            isSideBar={isSideBar}
            setIsSideBar={setIsSideBar}
            setIsDarkMode={setIsDarkMode}
          />

          {/* Scrollable content only */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>

        {/* Compose button fixed */}
        {/* {pathname !== "/compose/" && (
          <div
            className="compose fixed bottom-20 right-10 bg-primary px-5 py-3 rounded-md flex items-center gap-2 shadow-lg cursor-pointer z-10"
            onClick={() => router.push("/compose/")}
          >
            <Edit2 className="w-5 h-5 text-white" />
            <span className="compose-text text-white text-lg font-semibold whitespace-nowrap overflow-hidden">
              Compose
            </span>
          </div>
        )} */}
      </div>
     
    </StoreProvider>
  );
};

export default DashboardWrapper;
