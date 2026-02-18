"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, LucideIcon, LogOut, CheckCircle } from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { connect } from "react-redux";

import mailSvg from "@/assets/mail.svg";
import reverifySvg from "@/assets/reverify.svg";
import {
  LoginSetGlobalSidebar,
  LoginSetSidebar,
} from "@/store/login/login-action";

const Sidebar = (props: any) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarRef.current) return;

    const spanTag = document.querySelectorAll(".label-text");
    const IconTag = document.querySelectorAll(".label-icon");
    const IconImg = document.querySelectorAll(".label-img");

    if (props.show_sidebar || props.is_sidebar) {
      gsap.to(sidebarRef.current, {
        width: 220,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(spanTag, {
        display: "block",
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(IconTag, {
        display: "block",
        duration: 0.2,
        ease: "power3.inOut",
      });
      gsap.to(IconImg, {
        display: "none",
        duration: 0.2,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(sidebarRef.current, {
        width: 64, // w-16
        duration: 0.2,
        ease: "power3.inOut",
      });
      gsap.to(spanTag, {
        display: "none",
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(IconImg, {
        display: "block",
        duration: 0.2,
        ease: "power3.inOut",
      });
      gsap.to(IconTag, {
        display: "block",
        duration: 0.2,
        ease: "power3.inOut",
      });
    }
  }, [props.is_sidebar]);

  const setSidebar = (value: boolean) => {
    props.Login_Set_Sidebar(value);
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 z-40 h-full bg-white dark:bg-black shadow-xl flex flex-col overflow-hidden ${!props.is_sidebar && "bg-gray-400"} mt-15`}
      onMouseEnter={() => !props.show_sidebar && setSidebar(true)}
      onMouseLeave={() => !props.show_sidebar && setSidebar(false)}
    >
      {/* Links */}
      <nav className="flex flex-col h-full justify-start mx-2 gap-3 pt-6 mt-15">
        <SideBarLink
          icon={Mail}
          svgIcon={mailSvg.src}
          label="Sent Mails"
          href="/sent-mails"
          isSideBar={props.is_sidebar}
        />
        <SideBarLink
          icon={CheckCircle}
          svgIcon={reverifySvg.src}
          label="Reverification"
          href="/reverification"
          isSideBar={props.is_sidebar}
        />

        <div className="mt-auto border-t border-gray-200 py-3 mb-15">
          <SideBarLink
            icon={LogOut}
            label="Logout"
            href="/login"
            isSideBar={props.is_sidebar}
          />
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
  show_sidebar: state.login_store.show_sidebar,
});
const mapDispatchToProps = (dispatch: any) => ({
  Login_Set_Sidebar: (value: boolean) => dispatch(LoginSetSidebar(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

interface SidebarProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isSideBar: boolean;
  svgIcon?: string;
}

const SideBarLink = ({
  href,
  icon: Icon,
  label,
  isSideBar,
  svgIcon,
}: SidebarProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  console.log("svgIcon", svgIcon);

  return (
    <Link href={href}>
      <div
        className={`flex items-center p-2 rounded-md transition-all  
        ${label === "Logout" ? "bg-gray-100 hover:bg-gray-200" : "bg-sky-100 hover:bg-sky-200"}  dark:hover:bg-gray-700
        ${isActive ? "bg-sky-200 dark:bg-gray-600" : ""}
        ${isSideBar ? "justify-start gap-5" : "justify-center"}`}
      >
        <Icon className={`label-icon h-7 w-7 text-gray-600 hidden"}`} />

        {/* <img
          src={svgIcon}
          className={`label-img h-8 w-8 text-gray-600 hidden"}`}
        /> */}

        <span className="label-text text-[16px] whitespace-nowrap">
          {isSideBar && label}
        </span>
      </div>
    </Link>
  );
};
