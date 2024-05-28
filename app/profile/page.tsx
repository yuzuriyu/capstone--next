import Sidebar from "@/components/Sidebar";
import PersonalInfo from "@/components/PersonalInfo";

const Profile = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <PersonalInfo />
      </div>
    </div>
  );
};

export default Profile;
