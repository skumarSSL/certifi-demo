"use client";

import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import logo from "@/assets/hrlogo.png";
import lock from "@/assets/lock.png";
import user from "@/assets/user.png";
import qrCode from "@/assets/qr-code.svg";
import twitter from "@/assets/twitter.png";
import youtube from "@/assets/youtube.png";
import facebook from "@/assets/facebook.png";
import linkedin from "@/assets/linkedin.png";
import instagram from "@/assets/instagram.png";
import googleIcon from "@/assets/googleIcon.svg";
import googleStore from "@/assets/google-play.png";

import Input from "@/utils/Input";
import {
  LoginGetLoggedIn,
  LoginSetCredentials,
} from "@/store/login/login-action";

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
            color: "#2980b9",
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

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full ml-3">
      <div className="relative w-full max-w-md max-h-md h-[600px] md:h-[750px] p-8 bg-gray-100 rounded-xl shadow-lg flex flex-col justify-center">
        {/* Logo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-md shadow-xl">
          <img src={logo.src} alt="Logo" className="w-50 px-5 py-2" />
        </div>

        {/* Animated Text */}
        <p ref={textRef} className="text-center opacity-0 scale-0 mt-3">
          <span
            id="message"
            className="message text-sm font-semibold text-[#3498db]"
          >
            New Era Of Secured Communication
          </span>
          <br />
          <span className="text-[#fa8231] text-2xl font-semibold">Sign In</span>
        </p>

        {/* Inputs */}
        <div className="mt-9 space-y-4">
          <Input
            name="user_name"
            type="text"
            value={props.user_name}
            placeholder="Enter Email ID"
            icon={user.src}
            width={"w-90"}
            onChange={(e) =>
              props.Login_Set_Fields(e.target.name, e.target.value)
            }
          />

          <Input
            name="password"
            type="password"
            value={props.password}
            placeholder="Enter Password"
            width={"w-90"}
            icon={lock.src}
            onChange={(e) =>
              props.Login_Set_Fields(e.target.name, e.target.value)
            }
            onKeyPress={onKeyPress}
          />

          <div className="text-sm font-bold text-sky-600 cursor-pointer pl-5">
            Forgot Password?
          </div>

          {/* Login Button */}
          <div className="flex justify-end">
            <button
              disabled={isBtnDisabled || !props.user_name || !props.password}
              onClick={handleLogin}
              className={`w-32 py-2.5 rounded-lg bg-primary text-white font-medium text-xl ${isBtnDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:font-bold hover:bg-sky-600 transition ease-in-out"}`}
            >
              Login
            </button>
          </div>

          {/* Google Login */}
          <div className="flex items-center justify-center gap-2 mt-5 w-90 mx-auto py-2.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-50 cursor-pointer">
            <img src={googleIcon.src} className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-500">
              Login / Signup with Google
            </span>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 mt-4">
            <img src={qrCode.src} alt={qrCode.alt} className={`w-30 h-30`} />

            <div className="flex flex-wrap gap-3 mt-1">
              <a
                href="https://play.google.com/store/apps/details?id=com.certifi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-1 min-w-[110px] rounded-lg border border-[#E1E3E6] bg-white no-underline cursor-pointer transition-all duration-200 hover:bg-gray-100"
              >
                <img
                  src={googleStore.src}
                  alt="Google Play"
                  className="w-5 h-5"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[8px] text-[#616161]">Get it on</span>
                  <span className="text-xs font-semibold text-[#242424]">
                    Google play store
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="text-center text-gray-400 text-sm mt-3">
            ────── Follow Us ──────
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-3 mt-2">
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
