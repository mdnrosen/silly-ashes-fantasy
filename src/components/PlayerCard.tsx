import type { JSX } from "react";
import { Player } from "../types";
import { Link } from "react-router-dom";
import { getBgColor, getBorderColor } from "../lib/helpers";

const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
  return (
    <Link to={`/player/${player.id}`} className="no-underline w-full">
      <div
        className={` ${getBgColor(
          player.team
        )} shadow-md rounded-lg m-2border-6 ${getBorderColor(
          player.team
        )} hover:opacity-80 hover:cursor-pointer transition-all duration-300`}
      >
        <img
          src={player.imageUrl}
          alt={player.name}
          className="w-full object-cover rounded-t-lg bg-white"
          style={{ objectPosition: "top" }}
        />
        <div className="p-2 rounded-b-lg text-off-white">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold text-off-white">{player.name}</h2>
            <p className="text-off-white">{player.team}</p>
          </div>
          <p className="text-off-white">{player.points} pts</p>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
// PlayerCard.tsx
