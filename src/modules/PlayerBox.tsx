import { ReactElement } from "react";
import {
  firstName,
  getBgColor,
  getBorderColor,
  getTeamTextColor,
  lastName,
} from "../lib/helpers";

type Props = {
  isDisabled?: boolean;
  player: any | null;
  defaultRole?: "Batter" | "Bowler" | "Allrounder" | "Keeper" | "Wildcard";
};

const PlayerBox = ({ isDisabled, player, defaultRole }: Props) => {
  const playerStyles = () => `
    border-2
    h-full 
    rounded-sm 
    w-2/5
    grid 
    grid-rows-8 
    ${getBorderColor(player.team)}
    ${getBgColor(player.team)}
    ${getTeamTextColor(player.team)}
  `;

  const renderPlaceholder = (): ReactElement => {
    return (
      <button
        className="border-dashed border-1 h-full aspect-square grid grid-rows-5 rounded-sm"
        disabled={isDisabled}
      >
        <div
          className="row-span-4 relative bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/unpicked.jpg')" }}
        ></div>
        <div className="flex flex-col align-middle justify-center text-xs row-span-1 border-t-1 uppercase">
          <small>Select {defaultRole}</small>
        </div>
      </button>
    );
  };
  return (
    <>
      {/* If we don't have a player then render the placeholder */}
      {!player && renderPlaceholder()}

      {/* If we have a player then render the show player card */}
      {player && (
        <button className={playerStyles()}>
          <div className="row-span-1 flex justify-between px-1">
            <div className="text-xs flex flex-col text-left">
              <span className="text-xs uppercase italic font-thin">
                {defaultRole}
              </span>
              <span className="text-xs">{player.points} pts</span>
            </div>
            <span className="text-xs">{player.cost}¢</span>
          </div>
          <div
            className="row-span-5 relative bg-contain bg-center bg-no-repeat rounded-full overflow-hidden"
            style={{ backgroundImage: `url('${player?.imageUrl}')` }}
          ></div>
          <div className="row-span-2 flex flex-col items-end pr-1 justify-center">
            <span className="text-xs">{firstName(player.name)}</span>
            <span className="text-xs uppercase font-bold">
              {lastName(player.name)}
            </span>
          </div>
        </button>
      )}
    </>
  );
};

export default PlayerBox;
