import type { JSX } from "react";
import { Player } from "../types";


const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
    return (

        <div className="bg-blue shadow-md rounded-lg m-2 w-85 border-4 border-dark-blue hover:opacity-80 hover:cursor-pointer transition-all duration-300">
            <img
                src={player.imageUrl}
                alt={player.name}
                className="w-full h-48 object-cover rounded-t-lg bg-white"
                // top of head is cutt off in photos fix it
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
    )
};

export default PlayerCard;
// PlayerCard.tsx


