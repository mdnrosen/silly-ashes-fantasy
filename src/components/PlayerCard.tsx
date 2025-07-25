import type { JSX } from "react";
import { Player } from "../types";
// expect player as props
const PlayerCard: React.FC<{ player: Player }> = ({ player }): JSX.Element => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <img
                src={player.imageUrl}
                alt={player.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p className="text-gray-600">{player.team}</p>
                <p className="text-gray-500">Role: {player.role}</p>
                <p className="text-gray-500">Runs: {player.runs}</p>
                <p className="text-gray-500">Centuries: {player.centuries}</p>
            </div>
        </div>
    )
};

export default PlayerCard;