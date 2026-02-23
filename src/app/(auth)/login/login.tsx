"use client";

import StoreProvider from "@/app/StoreProvider";
import backgroundGif from "@/assets/background-login.png";
import Carousel from "@/components/login/CarouselSection";

import LoginSection from "@/components/login/LoginSection";
import { LoginGetSessionExpiry } from "@/store/login/login-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";

function LoginScreen(props: any) {
  const router = useRouter();
  const isLoggedIn = useSelector(
    (state: any) => state.login_store.is_logged_in,
  );

  // useEffect(() => {
  //   let session_token = localStorage.getItem("session_token");
  //   if (session_token) {
  //     props
  //       .Login_Get_Session_Expiry()
  //       .then(() => {
  //         router.push("/compose");
  //       })
  //       .catch(() => {});
  //   }
  // }, []);

  return (
    <StoreProvider>
      <div className="min-h-screen md:min-h-dvh bg-gray-200 text-foreground p-8 space-y-6">
        <div className="grid grid-cols-5 items-center justify-center gap-4">
          <div className="col-span-3 relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden border-gray-200 ">
            {/* GIF Background */}
            <img
              src={backgroundGif.src}
              alt="Animated background"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-70"
            />

            {/* Carousel */}
            <div className="relative z-10 w-full max-w-4xl">
              <Carousel />
            </div>
          </div>

          <div className="col-span-2">
            <LoginSection />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  Login_Get_Session_Expiry: () => dispatch(LoginGetSessionExpiry()),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
