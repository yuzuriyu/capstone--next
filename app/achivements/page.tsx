import Sidebar from "@/components/Sidebar";
import Achivement from "@/components/Achivement";

const Achivements = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Achivement />
      </div>
    </div>
  );
};

export default Achivements;
