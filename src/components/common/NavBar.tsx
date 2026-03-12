import React, { useEffect, useRef, useState } from "react";
import { Mail, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import malePng from "@public/assets/male.png";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import user from "@public/assets/user.svg";
import hrlogo from "@public/assets/hrlogo.png";
import {
  LoginSetGlobalSidebar,
  LoginSetSidebar,
} from "@/store/login/login-action";
import { connect } from "react-redux";
import {
  ProfileGetData,
  ProfileGetProfilePic,
} from "@/store/profile/profile-action";

let exampleWords = ["abc@gmail.com", "John Doe"];

const Navbar = (props: any) => {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [is_search_focused, setIsSearchFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const pageHeaderRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pageHeaderRef.current) return;

    if (props.is_sidebar) {
      gsap.to(pageHeaderRef.current, {
        paddingLeft: 220,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(pageHeaderRef.current, {
        paddingLeft: 64, // w-16
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [props.is_sidebar]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (!is_search_focused) {
      let charIndex = 0;

      const tl = gsap.timeline({ repeat: -1 });

      exampleWords.forEach((word) => {
        const maxChars = word.length;

        tl.to(
          {},
          {
            duration: 0.5 * maxChars,
            onUpdate: () => {
              input.placeholder = word.slice(0, charIndex);
              charIndex = Math.min(charIndex + 1, maxChars);
            },
            onComplete: () => {
              charIndex = 0;
            },
          },
        ).to(
          {},
          {
            duration: 2,
            onComplete: () => {
              input.placeholder = "";
            },
          },
        );
      });

      return () => {
        tl.kill();
      };
    } else {
      if (inputRef.current && inputRef.current?.placeholder) {
        inputRef.current.placeholder = "";
      }
    }
  }, [is_search_focused]);

  useEffect(() => {
    setLoader(true);
    props.Profile_Get_Profile_Pic();
    props
      .Profile_Get_Data()
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
        router.push("/");
      });
  }, []);

  const setSidebar = (value: boolean) => {
    props.Login_Set_Sidebar(value);
    props.Login_Set_Global_Sidebar(value);
  };

  return (
    <div className="grid items-center bg-white px-4 py-3 dark:px-4 dark:py-3">
      <div className="flex items-center justify-between shadow w-full rounded-xl">
        <div className="flex items-center gap-8">
          <div className={`flex space-x-3 items-center`}>
            <button
              id="navBar"
              className={`active flex items-center p-2 rounded-md transition-all  hover:bg-gray-100   ${props.is_sidebar ? "justify-start gap-5" : "justify-center"}`}
              onClick={() => {
                setSidebar(!props.is_sidebar);
              }}
            >
              <Menu className="h-7 w-7 text-gray-700 hover:text-gray-600 hover:scale-3d transition ease-in-out dark:text-white cursor-pointer" />
            </button>
            <div className="flex justify-center items-center">
              <img src={hrlogo.src} alt="logo" width={150} height={60} />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex items-center justify-center w-10 h-10 bg-[#ecf0f1] shadow-[#dfe6e9] rounded-full cursor-pointer">
            <img
              src={props.profile_pic ? props.profile_pic : user.src}
              className="w-8 h-8 object-cover rounded-full"
              alt="User avatar"
            />
          </div>
          <div className="flex items-center gap-1 px-3 text-[14px] font-stretch-90% font-medium">
            {props.profile_data?.first_name && (
              <>
                <span className="text-gray-700">Hello,</span>

                <span className="font-semibold text-[#0E6DBD] tracking-wide animate-fade-in">
                  {props.profile_data?.first_name}
                </span>
              </>
            )}
            {/* <span className="text-xl animate-wave">👋</span> */}
          </div>
        </div>
      </div>
      <div
        ref={pageHeaderRef}
        className={`flex items-center justify-between mt-5 ${props.is_sidebar ? "pl-64" : "pl-16"}`}
      >
        <div className="text-2xl font-bold">
          {" "}
          {pathname === "/sent-mails/"
            ? "All Sent Mails"
            : pathname === "/compose/"
              ? "Compose"
              : pathname === "/reverification/"
                ? "Reverification"
                : pathname === "/inbox/"
                  ? "Recieved Certified Email"
                  : ""}
        </div>
        {/* <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#0078D4] via-[#1E90FF] to-[#4FC3F7] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => router.push("/compose")}
          >
            <span className="flex items-center justify-center w-10 h-8 rounded-full bg-[#e67e22]">
              <Mail className="w-5 h-5 text-white" />
            </span>

            <span className="text-lg">Compose</span>
          </button>
        </div> */}
      </div>
      <div className="border-b text-gray-200 mt-3"></div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
  profile_pic: state.profile_store.profile_pic,
  is_logged_in: state.login_store.is_logged_in,
  profile_data: state.profile_store.profile_data,
});
const mapDispatchToProps = (dispatch: any) => ({
  Login_Set_Sidebar: (value: boolean) => dispatch(LoginSetSidebar(value)),
  Login_Set_Global_Sidebar: (value: boolean) =>
    dispatch(LoginSetGlobalSidebar(value)),
  Profile_Get_Data: () => dispatch(ProfileGetData()),
  Profile_Get_Profile_Pic: () => dispatch(ProfileGetProfilePic()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
