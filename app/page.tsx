import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Voltlist from "../components/Voltlist";
import Last6DaysChart from "../components/Last6DaysChart";
import StepsChart from "../components/StepsChart";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2">
          <Last6DaysChart />
          <Voltlist />
          <StepsChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
