import Sidebar from "@/components/Sidebar";
import Inbox from "@/components/Inbox";
const Guide = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Inbox />
      </div>
    </div>
  );
};

export default Guide;
