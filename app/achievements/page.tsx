import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import authOptions from "@/lib/config/authOptions";
import Achievement from "@/components/Achievement";

async function fetchBadges() {
  try {
    const res = await fetch(`http://localhost:3000/api/badges`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch badges");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const AchievementPage = async () => {
  const session = await getServerSession(authOptions);
  const badges = await fetchBadges();

  if (!badges) {
    return <p>no badges</p>;
  }
  console.log(badges);
  return (
    <>
      <Header session={session} />
      <Achievement badges={badges} />
    </>
  );
};

export default AchievementPage;
