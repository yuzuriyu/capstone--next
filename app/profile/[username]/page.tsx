import Sidebar from "@/components/Sidebar";
import PersonalInfo from "@/components/PersonalInfo";
import OtherProfile from "@/components/OtherProfile";

const Profile = () => {
  return (
    <div className="flex">
      <div className="w-[300px] hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <OtherProfile />
      </div>
    </div>
  );
};

export default Profile;
