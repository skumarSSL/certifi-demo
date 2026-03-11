"use client";

import StoreProvider from "@/app/StoreProvider";
import backgroundGif from "@public/assets/background.png";
import Carousel from "@/components/login/CarouselSection";

import LoginSection from "@/components/login/LoginSection";
import { LoginGetSessionExpiry } from "@/store/login/login-action";
import { useRouter } from "next/navigation";

import { connect, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

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
      <div className={` min-h-dvh bg-gray-200 text-foreground p-8 space-y-6`}>
        <div className="grid grid-cols-9 items-center gap-4">
          <div
            className={`col-span-6 relative  md:h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden border-gray-200 `}
          >
            {/* GIF Background */}
            <img
              src={backgroundGif.src}
              alt="Animated background"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />

            {/* Carousel */}
            <div className="relative z-10 w-full max-w-5xl">
              <Carousel />
            </div>
          </div>

          <div className="col-span-3">
            <LoginSection />
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className:
            "bg-gray-900 text-white rounded-lg px-4 py-3 shadow-lg border border-gray-700",
          success: {
            className: "bg-green-600 text-white",
          },
          error: {
            className: "bg-red-600 text-white font-light text-[15px]",
          },
        }}
      />
    </StoreProvider>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  Login_Get_Session_Expiry: () => dispatch(LoginGetSessionExpiry()),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
