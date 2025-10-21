import { getPositionSuffix } from "../lib/helpers";

type Props = {
  team: any;
  isHighlighted: boolean;
};

const LeaderboardCard = ({ team, isHighlighted }: Props) => {
  if (!team) return null;

  return (
    <div
      className={`px-2 border-1 h-15 rounded-md grid grid-cols-5 p-1 mb-2 ${
        isHighlighted &&
        "h-20 border-2 bg-blue-50 text-dark-blue border-dark-blue"
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
        {team.points}pts
      </div>
    </div>
  );
};

export default LeaderboardCard;
