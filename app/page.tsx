"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Voltlist from "../components/Voltlist";
import Last6DaysChart from "../components/Last6DaysChart";
import StepsChart from "../components/StepsChart";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2">
          <Last6DaysChart />
          <Voltlist />
          <StepsChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
