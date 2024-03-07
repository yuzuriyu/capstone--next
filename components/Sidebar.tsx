"use client";
import { PageContext } from "@/context/PageContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Sidebar = () => {
  const page = useContext(PageContext);
  return (
    <div className="bg-gradient-to-b from-red-300 via-orange-300 h-full hidden md:block">
      <div className="w-10/12 m-auto py-4">
        <div className="flex items-center mb-4">
          <Image
            src="/icons/next--white.svg"
            alt=""
            className="mr-4"
            width={100}
            height={50}
          />
        </div>
        <Link
          href={"/"}
          className={`flex items-center py-4 rounded-lg px-4 mb-2   ${
            page?.activePage === "overview" ? "bg-black " : ""
          }`}
          onClick={() => page?.handleActivePage("overview")}
        >
          <Image
            src="/icons/bxs-dashboard.svg"
            alt=""
            className="mr-4"
            width={28}
            height={28}
          />
          <p className="text-white">Overview</p>
        </Link>
        <Link
          href={"/about"}
          className={`flex items-center py-4 rounded-lg px-4 ${
            page?.activePage === "about" ? "bg-black " : ""
          }`}
          onClick={() => page?.handleActivePage("about")}
        >
          <Image
            src="/icons/bx-group.svg"
            alt=""
            className="mr-4"
            width={28}
            height={28}
          />
          <p className="text-white">About Us</p>
        </Link>
        <Link
          href={"/contact"}
          className={`flex items-center py-4 rounded-lg px-4 ${
            page?.activePage === "contact" ? "bg-black " : ""
          }`}
          onClick={() => page?.handleActivePage("contact")}
        >
          <Image
            src="/icons/bx-phone-call.svg"
            alt=""
            className="mr-4"
            width={28}
            height={28}
          />
          <p className="text-white">Contact</p>
        </Link>
        <Link
          href={"/details"}
          className={`flex items-center py-4 rounded-lg px-4 ${
            page?.activePage === "details" ? "bg-black " : ""
          }`}
          onClick={() => page?.handleActivePage("details")}
        >
          <Image
            src="/icons/bx-detail.svg"
            alt=""
            className="mr-4"
            width={28}
            height={28}
          />
          <p className="text-white">Details</p>
        </Link>

        <Link
          href={"/guide"}
          className={`flex items-center py-4 rounded-lg px-4 ${
            page?.activePage === "guide" ? "bg-black " : ""
          }`}
          onClick={() => page?.handleActivePage("guide")}
        >
          <Image
            src="/icons/bx-help-circle.svg"
            alt=""
            className="mr-4"
            width={28}
            height={28}
          />
          <p className="text-white">Guide</p>
        </Link>
        <Link
          href={"/gallery"}
          className={`flex items-center py-4 rounded-lg px-4 ${
            page?.activePage === "gallery" ? "bg-black " : ""
          }`}
          onClick={() => page?.handleActivePage("gallery")}
        >
          <Image
            src="/icons/bx-collection.svg"
            alt=""
            className="mr-4"
            width={28}
            height={28}
          />
          <p className="text-white">Gallery</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
