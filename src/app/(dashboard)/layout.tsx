"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/sent-mails/NavBar";
import Sidebar from "@/components/sent-mails/SideBar";
import { connect } from "react-redux";

const DashboardWrapper = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props?: any;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideBar, setIsSideBar] = useState(true);

  useEffect(() => {
    console.log("dark_mode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add(".dark");
    } else {
      document.documentElement.classList.remove(".dark");
    }
  }, [isDarkMode]);

  console.log("is_sidebar", isSideBar);
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* sidebar */}
      <Sidebar 
        isSideBar={isSideBar}
        setIsSideBar={setIsSideBar} 
      />
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 ${isSideBar ? "md:pl-64" : ""}`}
      >
        {/* Navbar */}
        <Navbar
          isDarkMode={isDarkMode}
          isSideBar={isSideBar}
          setIsSideBar={setIsSideBar}
          setIsDarkMode={setIsDarkMode}
        />
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
  is_dark_mode: state.login_store.is_dark_mode,
});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
