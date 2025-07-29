import type { JSX } from "react";
import { Player } from "../types";
import { Link } from "react-router-dom";
import { firstName, getBgColor, getBorderColor, lastName } from "../lib/helpers";

const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
  return (
    <Link to={`/player/${player.id}`} className="no-underline w-full">

      <div className={`w-full h-30 grid grid-cols-4 border-2 ${getBorderColor(player.team)} rounded-lg shadow-md mb-2`}>
    <div className="col-span-1 bg-white rounded-lg">
      <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover rounded-l-lg" />
    </div>
    <div className={`rounded-x-lg col-span-3 flex flex-col justify-between align-middle px-4 py-2 text-off-white ${getBgColor(player.team)}`}>
      <h3 className="text-xl">{firstName(player.name)} {lastName(player.name).toUpperCase()}</h3>
      <small className="text-lg text-gray-200">${player.cost}</small>
      <div className="flex justify-between align-middle">
        <small className="text-sm font-extralight">{player.role}</small>
        <span className="text-xl font-bold">{player.points}pts</span>
      </div>
    </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
// PlayerCard.tsx
