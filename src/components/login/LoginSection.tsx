"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";

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
import {
  LoginGetLoggedIn,
  LoginSetCredentials,
} from "@/store/features/login/login-action";

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
    color: "#000000",
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

const LoginSection = (props: any) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          gsap.to("#message", {
            color: "#e67e22",
            duration: 0.8,
            repeat: -1,
            yoyo: true,
          });
        },
      },
    );
  }, []);

  const handleLogin = () => {
    setIsBtnDisabled(true);
    props
      .Login_Get_Logged_In()
      .then(() => {
        setIsBtnDisabled(false);
        router.push("/compose");
      })
      .catch(() => setIsBtnDisabled(false));
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-md h-[600px] md:h-[660px] p-8 bg-gray-100 rounded-xl shadow-lg flex flex-col justify-center">
        {/* Logo */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <img src={logo.src} alt="Logo" className="w-40" />
        </div>

        {/* Animated Text */}
        <p ref={textRef} className="text-center mt-16 opacity-0 scale-0">
          <span className="text-[#0976B1] text-xl font-semibold">Sign In</span>
          <br />
          <span id="message" className="text-sm font-semibold text-[#f1c40f]">
            for new era of secured communication
          </span>
        </p>

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <Input
            name="user_name"
            type="text"
            value={props.user_name}
            placeholder="Enter Email ID"
            icon={user.src}
            onChange={(e) =>
              props.Login_Set_Fields(e.target.name, e.target.value)
            }
          />

          <Input
            name="password"
            type="password"
            value={props.password}
            placeholder="Enter Password"
            icon={lock.src}
            onChange={(e) =>
              props.Login_Set_Fields(e.target.name, e.target.value)
            }
            onKeyDown={handleLogin}
          />

          <div className="text-sm font-bold text-sky-600 cursor-pointer pl-10">
            Forgot Password?
          </div>

          {/* Login Button */}
          <div className="flex justify-end">
            <button
              disabled={isBtnDisabled || !props.user_name || !props.password}
              onClick={handleLogin}
              className={`w-32 py-2.5 rounded-lg bg-primary text-white ${isBtnDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:font-bold hover:bg-sky-600 transition ease-in-out"}`}
            >
              Login
            </button>
          </div>

          {/* Google Login */}
          <div className="flex items-center justify-center gap-2 mt-6 w-60 mx-auto py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <img src={googleIcon.src} className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-500">
              Login / Signup with Google
            </span>
          </div>

          {/* Divider */}
          <div className="text-center text-gray-400 text-sm mt-4">
            ─── Follow Us ───
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-3 mt-4">
            {socialMediaLinks.map((media) => (
              <div
                key={media.alt}
                style={{ backgroundColor: media.color }}
                onClick={() => window.open(media.href, "_blank")}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition"
              >
                <img
                  src={media.src}
                  alt={media.alt}
                  className={`${media.alt.includes("Youtube") ? "w-8 h-8" : "w-4 h-4"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-xs absolute bottom-3 text-center px-6">
          By signing in to CERTIFI, you agree to our{" "}
          <span className="underline cursor-pointer">Terms & Conditions</span>{" "}
          and <span className="underline cursor-pointer">Privacy policy</span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user_name: state.login_store.user_name,
  password: state.login_store.password,
});

const mapDispatchToProps = (dispatch: any) => ({
  Login_Set_Fields: (name: string, value: string) =>
    dispatch(LoginSetCredentials(name, value)),
  Login_Get_Logged_In: () => dispatch(LoginGetLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection);
