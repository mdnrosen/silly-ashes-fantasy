import type { JSX } from "react";
import { Player } from "../types";
import { Link } from "react-router-dom";
import {
  firstName,
  getBgColor,
  getBorderColor,
  lastName,
} from "../lib/helpers";

const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
  return (
    <Link to={`/player/${player.id}`} className="no-underline w-full block">
      <div
        className={`animate-fade-in w-full min-h-32 md:min-h-36 grid grid-cols-4 border-2 ${getBorderColor(
          player.team
        )} rounded-lg shadow-md mb-4 md:mb-6 ${getBgColor(player.team)}`}
      >
        <div className="col-span-1 bg-white rounded-lg">
          <img
            src={player.imageUrl}
            alt={player.name}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div
          className={`rounded-r-lg col-span-3 flex flex-col justify-between px-4 py-3 text-off-white`}
        >
          <h3 className="text-lg md:text-2xl">
            {firstName(player.name)} {lastName(player.name).toUpperCase()}
          </h3>
          <small className="text-base md:text-xl text-gray-200">
            ${player.cost}
          </small>
          <div className="flex justify-between items-center">
            <small className="text-xs md:text-base font-extralight">
              {player.role}
            </small>
            <span className="text-lg md:text-2xl font-bold">
              {player.points}pts
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
