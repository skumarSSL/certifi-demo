import React, { useEffect, useRef, useState } from "react";
import { Mail, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

let exampleWords = ["abc@gmail.com", "John Doe"];

const Navbar = ({
  isDarkMode,
  isSideBar,
  setIsSideBar,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  isSideBar: boolean;
  setIsSideBar: any;
  setIsDarkMode: any;
}) => {
  const [search, setSearch] = useState("");
  const [is_search_focused, setIsSearchFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="grid items-center bg-white px-4 py-3 dark:bg-black dark:px-4 dark:py-3">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-8">
          {isSideBar ? null : (
            <button
              className="bg-gray-200 rounded-sm p-1 hover:bg-gray-100"
              onClick={() => setIsSideBar(!isSideBar)}
            >
              <Menu className="h-7 w-7 text-gray-600 hover:text-gray-800 transition ease-in-out dark:text-white cursor-pointer" />
            </button>
          )}
          <div className="relative flex h-min w-[250px]">
            <Search className="absolute top-1/2 left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white text-gray-400" />

            <input
              ref={inputRef}
              className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
              type="search"
              placeholder={""}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center">
          <div
            //   onClick={() => navigate("/profile")}
            className="w-10 h-10 relative inline-block justify-center align-middle bg-[#ecf0f1] shadow-[#dfe6e9] rounded-full cursor-pointer"
          >
            <img
              src={
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${isDarkMode ? "rounded p-2 dark:hover:bg-gray-700" : "rounded p-2 hover:bg-gray-100"}`}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button> */}
          {/* <Link
          href="/settings"
          className={`${isDarkMode ? "rounded p-2 dark:hover:bg-gray-700" : "h-min w-min rounded p-2 hover:bg-gray-100"}`}
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link> */}
          {/* <div className="mr-5 ml-2 hidden min-h-[2em] bg-gray-200 md:inline-block"></div> */}
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="text-2xl font-bold">All Sent Mails</div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#0078D4] via-[#1E90FF] to-[#4FC3F7] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
            <span className="flex items-center justify-center w-10 h-8 rounded-full bg-[#e67e22]">
              <Mail className="w-5 h-5 text-white" />
            </span>

            <span className="text-lg">Compose</span>
          </button>
        </div>
      </div>
      <div className="border-b text-gray-200 mt-3"></div>
    </div>
  );
};

export default Navbar;
