"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import LoginScreen from "@/app/(auth)/login/login";

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSelector(
    (state: any) => state.login_store.is_logged_in,
  );

  useEffect(() => {
    if (isLoggedIn) {
      pathname === "/reverification"
        ? router.replace("/reverification")
        : pathname === "/compose"
          ? router.replace("/compose")
          : pathname === "/inbox"
            ? router.replace("/inbox")
            : router.replace("/sent-mails");
    } else {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return <LoginScreen />;
}
