import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/config/authOptions";
import Settings from "@/components/Settings";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <Settings session={session} />;
      <MobileNav />
    </>
  );
};

export default SettingsPage;
