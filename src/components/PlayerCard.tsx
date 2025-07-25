import type { JSX } from "react";
import { Player } from "../types";


const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
    return (
        <div className="bg-grey shadow-md rounded-lg p-4 m-2 w-85 border-2 border-gray-700">
            <img
                src={player.imageUrl}
                alt={player.name}
                className="w-full h-48 object-cover rounded-t-lg"
                // top of head is cutt off in photos fix it
                style={{ objectPosition: "top" }}
            />
            <div className="p-4">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p className="text-gray-600">{player.team}</p>
                <p className="text-gray-500">Role: {player.role}</p>
              <strong><p className="text-gray-500">Points: {player.points}</p></strong>
            </div>
        </div>
    )
};

export default PlayerCard;
// PlayerCard.tsx


