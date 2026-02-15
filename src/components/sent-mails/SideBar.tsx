"use client";

import React, { useEffect, useRef } from "react";
import {
  Mail,
  X,
  LucideIcon,
  DollarSign,
  IndianRupee,
  BusIcon,
  Briefcase,
  Bitcoin,
  BanIcon,
  BanknoteIcon,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/hrlogo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

const Sidebar = ({
  isSideBar,
  setIsSideBar,
}: {
  isSideBar: boolean;
  setIsSideBar: (val: boolean) => void;
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarRef.current) return;

    if (isSideBar) {
      gsap.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        display: "flex",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: -300,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(sidebarRef.current, { display: "none" });
        },
      });
    }
  }, [isSideBar]);

  return (
    <div
      ref={sidebarRef}
      className="fixed left-0 top-0 z-40 h-full w-64 bg-white dark:bg-black shadow-xl flex flex-col"
      style={{ transform: "translateX(-300px)", display: "none" }}
    >
      {/* Top */}
      <div className="relative flex min-h-[56px] items-center justify-between px-6 pt-3 cursor-pointer">
        <div className="flex items-center justify-center py-4">
          <Image src={logo} alt="logo" width={150} height={60} />
        </div>
        <button onClick={() => setIsSideBar(false)}>
          <X className="absolute top-4 right-2 h-6 w-6 cursor-pointer hover:text-gray-400" />
        </button>
      </div>

      {/* Logo */}

      {/* Links */}
      <nav className="flex flex-col mt-5 justify-start mx-2 gap-3">
        <SideBarLink icon={Mail} label="Sent Mails" href="/sent-mails" />
        <SideBarLink icon={BanknoteIcon} label="Payment" href="/payment" />
      </nav>
    </div>
  );
};

interface SidebarProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SideBarLink = ({ href, icon: Icon, label }: SidebarProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-5 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md
        ${isActive ? "bg-blue-100 dark:bg-gray-600 text-gray-900" : ""}`}
      >
        <Icon className="h-7 w-7 text-gray-600" />
        <span className="text-[16px] ">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
