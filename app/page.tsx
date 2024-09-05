import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import MyProfile from "@/components/MyProfile";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import VoltageContextProvider from "@/context/VoltageContext";

async function fetchUserVoltage(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/voltage/${email}`
      // { next: { revalidate: 0 } }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface ProfileProps {
  params: {
    email: string;
  };
}

export default async function ProfilePage({ params }: ProfileProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const email = session.user?.email;

  if (!email) {
    return <div>Email not found in session</div>;
  }

  const readings = await fetchUserVoltage(email);

  if (!readings) {
    return <div>Voltage not found</div>;
  }

  return (
    <>
      <VoltageContextProvider initialReadings={readings}>
        <Header session={session} />
        <MyProfile session={session} />
        <MobileNav session={session} />
      </VoltageContextProvider>
    </>
  );
}
