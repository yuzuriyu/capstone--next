import React from "react";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

const ContactPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Unable to load session. Please try again later.</p>;
  }

  return (
    <>
      <Header session={session} />
      <Contact session={session} />
      <MobileNav session={session} />
    </>
  );
};

export default ContactPage;
