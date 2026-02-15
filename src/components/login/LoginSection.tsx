import { useEffect, useRef } from "react";
import gsap from "gsap";

import logo from "@/assets/hrlogo.png";
import lock from "@/assets/lock.png";
import user from "@/assets/user.png";
import twitter from "@/assets/twitter.png";
import youtube from "@/assets/youtube.png";
import facebook from "@/assets/facebook.png";
import linkedin from "@/assets/linkedin.png";
import instagram from "@/assets/instagram.png";
import googleIcon from "@/assets/googleIcon.svg";

import Input from "@/utils/Input";

const socialMediaLinks = [
  {
    href: "https://www.facebook.com/certificcs",
    src: facebook.src,
    alt: "Facebook Logo",
    color: "#0165E0",
  },
  {
    href: "https://www.twitter.com/certificcs",
    src: twitter.src,
    alt: "Twitter Logo",
  },
  {
    href: "https://www.instagram.com/certifi.ccs",
    src: instagram.src,
    alt: "Instagram Logo",
    color: "#FC036E",
  },
  {
    href: "https://www.linkedin.com/company/certificcs",
    src: linkedin.src,
    alt: "LinkedIn Logo",
    color: "#0567C2",
  },
  {
    href: "https://www.youtube.com/@certificcs",
    src: youtube.src,
    alt: "Youtube Logo",
    color: "#FF0034",
  },
];

const LoginSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      opacity: 1,
      scale: 1,
      duration: 3,
      ease: "power3.inOut",
      yoyo: true,
      onComplete: () => {
        gsap.to(textRef.current, {
          color: "#e67e22",
          duration: 0.6,
          repeat: -1,
          yoyo: true,
        });
      },
    });
  }, []);

  return (
    <div className=" flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-md h-150 md:h-165 p-8 bg-gray-100 rounded-lg shadow-md flex flex-col justify-center transition-all duration-300 hover:scale-[1.01]">
        {/* Center content */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <img src={logo.src} alt="Logo" className=" w-48 h-13" />
        </div>

        <p
          ref={textRef}
          className="text-xs font-semibold text-[#f1c40f] text-center opacity-0 scale-0 mt-3"
        >
          <span className="text-[#0976B1] text-xl font-semibold">Sign In </span>
          <br />
          for new era of secured communication
        </p>

        <div className="space-y-4 mt-5">
          <div className="w-full max-w-sm mx-auto space-y-4">
            <Input type="text" placeholder="Enter Email ID" icon={user.src} />
            <Input
              type="password"
              placeholder="Enter Password"
              icon={lock.src}
            />

            <div className="text-sm font-bold text-left cursor-pointer text-sky-600 pl-10 hover:text-sky-700">
              Forgot Password?
            </div>

            {/* Login Button */}
            <div className="flex justify-end">
              <div className="w-32 py-2.5 rounded-lg bg-primary text-primary-foreground opacity-40 cursor-pointer text-center">
                Login
              </div>
            </div>

            {/* Google Login */}
            <div className="flex items-center justify-center gap-2 mt-7 w-60 mx-auto py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <img src={googleIcon.src} className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-500 hover:text-sky-600">
                Login / Signup with Google
              </span>
            </div>

            <div className="text-gray-200 text-center">
              ----------------
              <span className="text-gray-400 font-bold text-sm">
                &nbsp;Follow Us&nbsp;
              </span>
              ----------------
            </div>

            {/* ✅ Social icons should be here */}
            <div className="flex justify-center gap-3.5 mt-4">
              {socialMediaLinks.map((media) => (
                <div
                  key={media.alt}
                  className={`w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer ${media.color ? `bg-[${media.color}]` : "bg-black "} hover:scale-110 transition`}
                >
                  <img
                    src={media.src}
                    alt={media.alt}
                    onClick={() => window.open(media.href, "_blank")}
                    className={
                      media.alt === "Youtube Logo" ? "w-10 h-10" : "w-4 h-4"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer stays bottom */}
        <p className="text-gray-400 text-xs font-medium absolute bottom-3 text-center px-6 mx-auto">
          By signing in to CERTIFI, you agree to our{" "}
          <span className="underline cursor-pointer">Terms & Conditions</span>{" "}
          and <span className="underline cursor-pointer">Privacy policy</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSection;
