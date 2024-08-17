import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/config/authOptions";
import Inbox from "@/components/Inbox";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

const InboxPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <Inbox session={session} />;
      <MobileNav />
    </>
  );
};

export default InboxPage;
