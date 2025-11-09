import type { JSX } from "react";
import { Player } from "../types";
import { Link } from "react-router-dom";
import { firstName, getBorderColor, lastName } from "../lib/helpers";

const PlayerCard: React.FC<{ player: Player }> = ({
  player,
}): JSX.Element => {
  // Get team-specific light background colors like in PlayerSelection
  const backgroundStyle = player.team === "AUS" ? "bg-green-50" : "bg-blue-50";

  return (
    <Link to={`/player/${player.id}`} className="no-underline w-full block">
      <div
        className={`animate-fade-in w-full min-h-28 md:min-h-32 grid grid-cols-4 border-2 ${getBorderColor(
          player.team as string
        )} rounded-lg shadow-md mb-2 md:mb-3 ${backgroundStyle}`}
      >
        <div className="col-span-1 bg-white rounded-lg">
          <img
            src={player.imageUrl}
            alt={player.name}
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>
        <div
          className={`rounded-r-lg col-span-3 flex flex-col justify-between px-4 py-3 text-dark-blue`}
        >
          <h3 className="text-lg md:text-2xl text-dark-blue font-medium">
            {firstName(player.name)}{" "}
            <span className="font-bold">
              {lastName(player.name).toUpperCase()}
            </span>
          </h3>
          <small className="text-xs md:text-base font-extralight text-dark-blue opacity-60">
            {player.role}
          </small>
          <div className="flex justify-between items-center">
            <small className="text-base md:text-xl text-dark-blue opacity-70 font-semibold">
              ${player.cost}
            </small>
            <span className="text-lg md:text-2xl font-bold text-dark-blue">
              {player.points}pts
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
