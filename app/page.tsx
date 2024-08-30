import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/config/authOptions";
import MyProfile from "@/components/MyProfile";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import VoltageContextProvider from "@/context/VoltageContext";
import { VoltageModel } from "@/models/Voltage";

// async function findOrCreateVoltageData(email: string) {
//   try {
//     // Check if a document with the given email exists
//     let userVoltageData = await VoltageModel.findOne({ email });

//     // If not found, create a new document with the specified structure
//     if (!userVoltageData) {
//       userVoltageData = new VoltageModel({
//         email,
//         voltages: [],
//       });
//       await userVoltageData.save();
//     }

//     return userVoltageData;
//   } catch (error) {
//     console.error("Error finding or creating voltage data:", error);
//     return null;
//   }
// }

async function fetchUserVoltage(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/voltage/${email}`,
      { cache: "no-store" }
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

  const email = session.user?.email; // Extract email from session

  if (!email) {
    return <div>Email not found in session</div>;
  }

  const readings = await fetchUserVoltage(email);

  if (!readings) {
    return <div>Voltage not found</div>;
  }

  return (
    <>
      <VoltageContextProvider readings={readings}>
        <Header session={session} />
        <MyProfile session={session} />
        <MobileNav session={session} />
      </VoltageContextProvider>
    </>
  );
}
