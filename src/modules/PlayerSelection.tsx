import { Player } from "../types";
import { getBgColor } from "../lib/helpers";

type Props = {
    isOpen: boolean;
    players: Player[]
    selection: string;
    role: string;
    selected: string[];
    savePlayer: (player: Player, selection: string) => void;
    budget: number;
    closeModal: () => void;
}

const PlayerSelection = ({ role, players, selection, selected, budget, savePlayer, closeModal }: Props) => {

    const handleSavePlayer = (player: Player, selection: string) => {
        savePlayer(player, selection);
    };

    const isDisabled = (player: Player): boolean => {
        if (selected.includes(player.id!.toString())) return true;
        if (player?.cost > budget) return true;

        return false;
    };

    const filteredByRole = (role: string) => {
        console.log(role)
        console.log(players)
        if (role === 'WILDCARD') return players

        return players.filter(p => p.role === role)
    }

    return (
        <div className="rounded-lg absolute top-0 m-4 left-0 right-0 bg-white border-4 p-4 shadow-lg h-9/10 z-50 animat-fade-in overflow-auto">
            <div className="flex justify-between">
                <h2 className="text-lg font-bold uppercase">SELECT {role}</h2>
                <button className="ml-auto" onClick={() => closeModal()}>X</button>
            </div>
            <div className={`w-full p-2 $`}>
                {filteredByRole(role).map(player => (
                    <button 
                        disabled={isDisabled(player)}
                        key={player.id} 
                        className={`rounded-md w-full h-20 border-2 grid grid-cols-5 mb-2 ${getBgColor(player.team)} ${isDisabled(player) ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={() => handleSavePlayer(player, selection)}
                        >
                        <div className="col-span-1 mr-2 bg-white rounded-md">
                            <img
                                    src={player.imageUrl}
                                    alt={player.name}
                                    className="w-full h-full object-cover rounded-l-md"
                                />                        
                        </div>
                        <div className="col-span-3 flex flex-col justify-center items-start text-off-white">
                           <p className="font-sm uppercase">{player.name.split(" ")[0]}</p>
                           <p className="font-bold uppercase">{player.name.split(" ")[1]}</p>
                        </div>
                        {/* center vertically */}
                        <div className="col-span-1 flex flex-col justify-center items-center text-off-white">
                            <p className="font-bold">${player.cost}</p>
                            <p className="text-sm">{player.points} pts</p>
                        </div>
            
                    </button>
                ))}
            </div>
             
        </div>
    )
};

export default PlayerSelection;