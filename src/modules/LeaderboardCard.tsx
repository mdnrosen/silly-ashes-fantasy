import { getPositionSuffix } from "../lib/helpers";
import { Link } from "react-router-dom";

type Props = {
  team: any;
  isHighlighted: boolean;
};

const LeaderboardCard = ({ team, isHighlighted }: Props) => {
  if (!team) return null;

  return (
    <Link
      to={`/team/${team.id}`}
      className={`px-2 border-1 h-15 rounded-md grid grid-cols-5 p-1 mb-2 ${
        isHighlighted &&
        "h-20 border-2 bg-blue-100 text-dark-blue border-dark-blue"
      }`}
    >
      <span className="col-span-1 flex justify-start items-center font-bold text-sm">
        {getPositionSuffix(team.position)}
      </span>
      <div className="col-span-3 flex flex-col align-start justify-center">
        <span className="text-sm font-bold">{team.teamName}</span>
        <span className="text-xs font-light italic">{team.username}</span>
      </div>
      <div className="col-span-1 flex justify-end items-center">
        {team.points} <span className="font-extralight">pts</span>
      </div>
    </Link>
  );
};

export default LeaderboardCard;
