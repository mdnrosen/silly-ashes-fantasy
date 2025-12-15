import type { JSX } from "react";
import { Player } from "../types";
import { Link } from "react-router-dom";
import { calculatePlayerScore } from "../lib/helpers";

const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
  const backgroundStyle = player.team === "AUS" ? "bg-green-50" : "bg-blue-50";

  return (
    <Link
      to={`/player/${player.id}`}
      className={`animate-fade-in border-1 h-20 rounded-md grid grid-cols-5 mb-2 pr-2 ${backgroundStyle}`}
    >
      <img
        src={player.imageUrl}
        alt={player.name}
        className="col-span-1 h-full object-contain rounded-md"
      />
      <div className="col-span-3 flex flex-col align-start justify-center">
        <span className="text-sm font-bold">{player.name}</span>
        <span className="text-xs font-light italic">{player.role}</span>
      </div>
      <div className="col-span-1 flex justify-end items-center">
        {calculatePlayerScore(player)}{" "}
        <span className="font-extralight">pts</span>
      </div>
    </Link>
  );
};

export default PlayerCard;
