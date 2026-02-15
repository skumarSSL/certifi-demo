"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function HomePage() {
  const router = useRouter();
  const isLoggedIn = useSelector(
    (state: any) => state.login_store.is_logged_in,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/sent-mails");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return null; // no UI, just redirect
}
