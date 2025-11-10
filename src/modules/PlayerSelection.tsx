import { Player } from "../types";
import { getBorderColor, getTeamTextColor } from "../lib/helpers";
import { IoClose } from "react-icons/io5";

type Props = {
  players: Player[];
  selection: string;
  role: string;
  selected: string[];
  currentPlayer: Player | null;
  savePlayer: (player: Player, selection: string) => void;
  deselectPlayer: (role: string) => void;
  budget: number;
  closeModal: () => void;
};

const PlayerSelection = ({
  role, // from playerbox
  players, // drilled
  selection, // from playerbox
  selected, // drilled
  budget, // drilled
  currentPlayer, // from playerbox
  savePlayer, // drilled
  deselectPlayer, // from playerbox
  closeModal, // drilled
}: Props) => {
  const handleSavePlayer = (player: Player, selection: string) => {
    savePlayer(player, selection);
  };

  const handleDeselectPlayer = () => {
    deselectPlayer(selection);
    closeModal();
  };

  const isDisabled = (player: Player): boolean => {
    if (selected.includes(player.id!.toString())) return true;
    if (player?.cost > budget) return true;

    return false;
  };

  const isCurrentPlayer = (player: Player): boolean => {
    return currentPlayer?.id === player.id;
  };

  const filteredByRole = (role: string) => {
    let filtered;
    if (role === "WILDCARD") {
      filtered = players;
    } else {
      filtered = players.filter((p) => p.role === role);
    }

    // Sort so current player appears first
    return filtered.sort((a, b) => {
      const aIsCurrent = currentPlayer?.id === a.id;
      const bIsCurrent = currentPlayer?.id === b.id;

      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
      return 0;
    });
  };

  return (
    <div className="fixed inset-2 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg z-50 overflow-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold text-dark-blue uppercase">
          SELECT {role}
        </h2>
        <button
          className="ml-auto text-dark-blue hover:text-gray-600 p-1"
          onClick={() => closeModal()}
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* Deselect option - only show if there's a current player */}
      {currentPlayer && (
        <button
          onClick={handleDeselectPlayer}
          className="w-full mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
        >
          <span className="text-red-600 font-medium">
            Remove Current Selection
          </span>
        </button>
      )}

      <div className="w-full space-y-2">
        {filteredByRole(role).map((player) => {
          const surnameColor = getTeamTextColor(player.team);
          const borderColor = getBorderColor(player.team);
          const isCurrent = isCurrentPlayer(player);
          const disabled = isDisabled(player);

          // Get team-specific light background colors for current player
          const currentPlayerBg =
            player.team === "AUS" ? "bg-green-50" : "bg-blue-50";
          const currentPlayerRing =
            player.team === "AUS" ? "ring-green-200" : "ring-blue-200";

          return (
            <button
              disabled={disabled && !isCurrent}
              key={player.id}
              className={`rounded-lg w-full h-20 border-2 grid grid-cols-5 p-2 transition-all duration-200 hover:shadow-md ${
                disabled && !isCurrent
                  ? "bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed"
                  : isCurrent
                  ? `${currentPlayerBg} ${borderColor} border-4 ring-2 ${currentPlayerRing}`
                  : `bg-white ${borderColor} hover:shadow-lg`
              }`}
              onClick={() => {
                if (isCurrent) {
                  handleDeselectPlayer();
                } else {
                  handleSavePlayer(player, selection);
                }
              }}
            >
              <div className="col-span-1 mr-2">
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-center items-start">
                <p className="font-medium text-dark-blue">
                  {player.name.split(" ")[0]}
                </p>
                <p className={`font-bold ${surnameColor} uppercase`}>
                  {player.name.split(" ")[1]}
                </p>
              </div>
              <div className="col-span-1 flex flex-col justify-center items-center">
                <p className="font-bold text-dark-blue">${player.cost}</p>
                <p className="text-sm text-dark-blue">{player?.points} pts</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerSelection;
