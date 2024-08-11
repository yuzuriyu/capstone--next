import React from "react";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

const ContactPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header session={session} />
      <Contact session={session} />
    </>
  );
};

export default ContactPage;
