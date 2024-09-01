import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/config/authOptions";
import Settings from "@/components/Settings";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Unable to load session. Please try again later.</p>;
  }

  return (
    <>
      <Header session={session} />
      <Settings session={session} />;
      <MobileNav session={session} />
    </>
  );
};

export default SettingsPage;
