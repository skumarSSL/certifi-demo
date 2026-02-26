"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, LucideIcon, LogOut, CheckCircle, MailCheck } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { connect } from "react-redux";

import mailSvg from "@public/assets/mail.svg";
import reverifySvg from "@public/assets/reverify.svg";
import {
  LoginSetGlobalSidebar,
  LoginSetSidebar,
} from "@/store/login/login-action";

const Sidebar = (props: any) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!sidebarRef.current) return;

    const spanTag = document.querySelectorAll(".label-text");

    if (props.show_sidebar || props.is_sidebar) {
      gsap.to(sidebarRef.current, {
        width: 220,
        duration: 0.4,
        ease: "power3.inOut",
      });

      gsap.to(spanTag, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        pointerEvents: "auto",
      });
    } else {
      gsap.to(sidebarRef.current, {
        width: 64,
        duration: 0.3,
        ease: "power3.inOut",
      });

      gsap.to(spanTag, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        pointerEvents: "none",
      });
    }
  }, [props.is_sidebar]);

  const setSidebar = (value: boolean) => {
    props.Login_Set_Sidebar(value);
  };

  const logout = () => {
    localStorage.removeItem("session_token");
    router.push("/");
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
          svgIcon={reverifySvg.src}
          label="Recieved Emails"
          href="/inbox/"
          isSideBar={props.is_sidebar}
        />
        <SideBarLink
          icon={MailCheck}
          svgIcon={mailSvg.src}
          label="Sent Mails"
          href="/sent-mails/"
          isSideBar={props.is_sidebar}
        />
        <SideBarLink
          icon={CheckCircle}
          svgIcon={reverifySvg.src}
          label="Reverification"
          href="/reverification/"
          isSideBar={props.is_sidebar}
        />

        <div
          className="mt-auto border-t border-gray-200 py-3 mb-15"
          onClick={logout}
        >
          <SideBarLink
            icon={LogOut}
            label="Logout"
            href="/"
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
        <Icon className="label-icon h-7 w-7 text-gray-600 shrink-0" />

        {/* <img
          src={svgIcon}
          className={`label-img h-8 w-8 text-gray-600 hidden"}`}
        /> */}
        <span className="label-text text-[16px] whitespace-nowrap will-change-[opacity,transform]">
          {isSideBar && label}
        </span>
      </div>
    </Link>
  );
};
