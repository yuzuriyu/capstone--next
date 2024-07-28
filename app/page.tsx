import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyProfile from "@/components/MyProfile";
import Header from "@/components/Header";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Header session={session} />
      <MyProfile session={session} />
    </>
  );
}
