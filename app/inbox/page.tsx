import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Inbox from "@/components/Inbox";
import Header from "@/components/Header";

const InboxPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <Inbox session={session} />;
    </>
  );
};

export default InboxPage;
