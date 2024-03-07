import React from "react";
import Sidebar from "@/components/Sidebar";
import Subheader from "@/components/Subheader";
import DayChart from "@/components/DayChart";
import Device from "@/components/Device";

const Home = async () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Subheader />
        <DayChart />
        <div className="flex w-11/12 m-auto flex-col md:flex-row md:w-10/12">
          <Device />
        </div>
      </div>
    </div>
  );
};

export default Home;
