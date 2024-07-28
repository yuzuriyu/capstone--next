import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Settings from "@/components/Settings";
import Header from "@/components/Header";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <Settings session={session} />;
    </>
  );
};

export default SettingsPage;
