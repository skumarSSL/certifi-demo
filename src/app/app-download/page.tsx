"use client";

import { useEffect } from "react";

export default function DownloadPage() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.certifi";
    } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
      window.location.href =
        "https://apps.apple.com/in/app/certifi-communications/id6737164586";
    } else {
      window.location.href = "https://client-demo.certifi.biz";
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Redirecting to app store...</p>
    </div>
  );
}
