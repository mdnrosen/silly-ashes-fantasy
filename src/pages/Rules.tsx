import { SlPeople } from "react-icons/sl";
import { MdOutlineSportsCricket } from "react-icons/md";
import { IoMdSwap } from "react-icons/io";

const Rules = () => {
  return (
    <div className="animate-fade-in min-h-screen text-dark-blue">
      <div className="p-4 bg-off-white">
        <h1 className=" text-2xl uppercase">The Rules</h1>
      </div>
      <div className="p-4 bg-green-50">
        <span className="flex">
          <IoMdSwap className="mr-2 mt-1" />
          <h2 className="text-xl uppercase mb-2 font-light ">Team Selection</h2>
        </span>
        <p className="text-md mb-2">
          You will need to pick your team for <strong>EACH</strong> test.
        </p>
        <p className="text-xs font-light">
          Once you're team is picked, it is locked in for that Test Match. No
          swapsies because you chose to pick before the toss.
        </p>
      </div>
      <div className="p-4 bg-blue-50">
        <span className="flex align-center">
          <SlPeople className="mr-2 mt-1" />
          <h2 className="text-xl uppercase mb-2 font-light ">
            TEAM COMPOSITION
          </h2>
        </span>
        <p className="text-md mb-2">Your team will consist of the following:</p>
        <ul className="text-sm px-3">
          <li>2 Batters</li>
          <li>2 Bowlers</li>
          <li>1 All-rounders</li>
          <li>1 Wicketkeeper</li>
          <li>1 Wildcard (can be any of the above positions)</li>
        </ul>
      </div>
      <div className="p-4 bg-green-50">
        <span className="flex">
          <MdOutlineSportsCricket className="mr-2 mt-1" />
          <h2 className="text-xl uppercase mb-2 font-light ">SCORING SYSTEM</h2>
        </span>
        <p className="text-sm mb-2">Your team will earn points as follows:</p>
        <div className="p-2 mb-2">
          <p className="font-extralight text-md">BATTING</p>
          <span className="flex justify-between w-full text-sm">
            <p>Each run</p>
            <p className="font-semibold">+1 point</p>
          </span>
          <span className="flex justify-between w-full text-sm">
            <p>Century</p>
            <p className="font-semibold">+50 points</p>
          </span>
        </div>

        <div className="p-2 mb-2">
          <p className="font-extralight text-md">BOWLING</p>
          <span className="flex justify-between w-full text-sm">
            <p>Each wicket</p>
            <p className="font-semibold">+20 points</p>
          </span>
          <span className="flex justify-between w-full text-sm">
            <p>Five wicket haul</p>
            <p className="font-semibold">+50 points</p>
          </span>
        </div>
        <div className="p-2 mb-2">
          <p className="font-extralight text-md">FIELDING</p>
          <span className="flex justify-between w-full text-sm">
            <p>Each catch</p>
            <p className="font-semibold">+5 points</p>
          </span>
          <span className="flex justify-between w-full text-sm">
            <p>Each run out</p>
            <p className="font-semibold">+10 points</p>
          </span>
          <span className="flex justify-between w-full text-sm">
            <p>Each stumping</p>
            <p className="font-semibold">+10 points</p>
          </span>
        </div>
        <p className="text-xs font-light">
          All players earn points for every action they perform on the field.
          Batters can score bowling points if they bowl and bowlers will get
          points for any runs added. However you can only select players based
          on their designated role.
        </p>
      </div>
    </div>
  );
};

export default Rules;
