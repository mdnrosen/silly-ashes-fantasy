import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type ProfileSubNavProps = {
  bgColor: string;
};

const ProfileSubNav = ({ bgColor }: ProfileSubNavProps) => {
  return (
    <nav
      className={`w-full h-15 text-off-white flex justify-between items-center px-4 ${bgColor}`}
    >
      <span className="">
        <Link
          to="/players"
          className="text-off-white hover:text-gray-300 text-2xl"
        >
          <FaArrowLeft className="inline mr-1" />
        </Link>
      </span>
      <span>
        <h2 className="text-xl md:text-2xl">PLAYER PROFILE</h2>
      </span>
      <span></span>
    </nav>
  );
};

export default ProfileSubNav;
