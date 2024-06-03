"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const HeaderWrapper = () => {
  const pathname = usePathname();

  // Define paths where you don't want to render the header
  const noHeaderPaths = ["/login", "/register"];

  return !noHeaderPaths.includes(pathname) ? <Header /> : null;
};

export default HeaderWrapper;
