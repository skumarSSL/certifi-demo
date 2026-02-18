"use client";

import StoreProvider from "@/app/StoreProvider";

const HomeWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default HomeWrapper;
