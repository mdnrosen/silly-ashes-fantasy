import { MyPlayers } from "../pages/Team";
import {
  getTitle,
  getSelectMessage,
  getBorderColor,
  getTeamTextColor,
} from "../lib/helpers";
import unpickedImage from "../assets/unpicked.jpg";

type Props = {
  myPlayers: MyPlayers;
  openSelectionModal: (role: keyof MyPlayers) => void;
  role: keyof MyPlayers;
};

const SelectPlayer = ({ myPlayers, role, openSelectionModal }: Props) => {
  const player = myPlayers[role];
  const surnameColor = getTeamTextColor(player?.team);

  // Determine border styling based on whether player is selected
  const borderStyle = player
    ? `${getBorderColor(player.team)} border-4`
    : "border-gray-400 border-2 border-dashed";

  // Get team-specific background color when player is selected
  const backgroundStyle = player
    ? player.team === "AUS" 
      ? "bg-green-50" 
      : "bg-blue-50"
    : "bg-white";

  return (
    <button
      className={`
        ${backgroundStyle}
        ${borderStyle}
        rounded-lg
        p-2
        flex
        flex-col
        justify-between
        items-center
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-lg
        min-h-0
        flex-1
        w-full
      `}
      onClick={() => openSelectionModal(role)}
    >
      <div className="text-xs font-semibold text-dark-blue text-center mb-1">
        {getTitle(role)}
      </div>

      {player ? (
        <>
          {/* Large centered image */}
          <div className="flex-1 flex items-center justify-center mb-2">
            <img
              src={player.imageUrl}
              alt={player.name}
              className="w-18 h-18 sm:w-22 sm:h-22 object-cover rounded"
            />
          </div>

          {/* Bottom section with name and cost/points */}
          <div className="w-full flex justify-between items-end">
            {/* Bottom left - Name */}
            <div className="text-left">
              <div className="text-xs text-dark-blue font-medium leading-tight">
                {player.name.split(" ")[0]}
              </div>
              <div
                className={`text-xs font-bold ${surnameColor} leading-tight uppercase`}
              >
                {player.name.split(" ").slice(1).join(" ")}
              </div>
            </div>

            {/* Bottom right - Cost and Points */}
            <div className="text-right">
              <div className="text-sm text-dark-blue font-bold leading-tight">
                ${player.cost}
              </div>
              <div className="text-sm text-dark-blue font-medium leading-tight">0 pts</div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Large centered placeholder image */}
          <div className="flex-1 flex items-center justify-center mb-2">
            <img
              src={unpickedImage}
              alt="No player selected"
              className="w-18 h-18 sm:w-22 sm:h-22 object-cover rounded opacity-50"
            />
          </div>
          <div className="text-xs text-dark-blue text-center">
            {getSelectMessage(role)}
          </div>
        </>
      )}
    </button>
  );
};

export default SelectPlayer;
