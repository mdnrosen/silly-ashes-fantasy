import { useState, useEffect, useContext } from "react";

import { Player } from "../types";

import PlayerSelection from "../modules/PlayerSelection";
import SelectPlayer from "../components/SelectPlayer";

import { PlayersContext } from "../context/PlayersContext";

export type MyPlayers = {
  batter1: Player | null;
  batter2: Player | null;
  bowler1: Player | null;
  bowler2: Player | null;
  allrounder: Player | null;
  keeper: Player | null;
  wildcard: Player | null;
};

const Team = () => {
  const playersList = useContext(PlayersContext);

  const [myPlayers, setMyPlayers] = useState<MyPlayers>({
    batter1: null,
    batter2: null,
    bowler1: null,
    bowler2: null,
    allrounder: null,
    keeper: null,
    wildcard: null,
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const [selectionModalOpen, setSelectionModalOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("");

  // Calculate budget remaining based on selected players
  const totalSpent = Object.values(myPlayers)
    .filter((player) => player !== null)
    .reduce((sum, player) => sum + (player?.cost || 0), 0);

  const budgetRemaining = 100 - totalSpent;

  //   useEffect(() => {
  //   setMyPlayers({...myPlayers, batter1: {id: 12, name: 'Marnus Labuschagne', cost: 17, team: 'AUS', role: 'BATTER', imageUrl: 'https://static-files.cricket-australia.pulselive.com/headshots/440/348-camedia.png'}})
  // },[])

  useEffect(() => {
    setSelected(
      Object.values(myPlayers)
        .filter((p) => p !== null)
        .map((p) => p!.id!.toString())
    );
  }, [myPlayers]);

  const openSelectionModal = (selection: string) => {
    setSelection(selection);
    setSelectionModalOpen(true);
  };
  const closeSelectionModal = () => setSelectionModalOpen(false);

  const batterRoles: (keyof MyPlayers)[] = ["batter1", "batter2"];
  const bowlerRoles: (keyof MyPlayers)[] = ["bowler1", "bowler2"];
  const keeperAllrounderRoles: (keyof MyPlayers)[] = ["allrounder", "keeper"];

  return (
    <>
      <div className="p-2 h-screen flex flex-col pb-16">
        {/* Team Name Input */}
        <input
          type="text"
          className="outline-1 w-full mb-2 h-8 px-2 text-sm border border-mid-blue rounded"
          placeholder="Team name"
          onChange={(e) => setTeamName(e.target.value)}
        />

        {/* Budget and Score Info */}
        <div className="flex justify-between mb-2 text-xs text-dark-blue">
          <span>Budget Remaining: ${budgetRemaining}</span>
          <span>Team Score: 0</span>
        </div>

        {/* Player Selection Grid - Fill remaining space */}
        <div className="flex-1 flex flex-col space-y-1">
          {/* Batters */}
          <div className="grid grid-cols-2 gap-1 flex-1">
            {batterRoles.map((role, i) => (
              <SelectPlayer
                key={i}
                role={role}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
              />
            ))}
          </div>

          {/* Bowlers */}
          <div className="grid grid-cols-2 gap-1 flex-1">
            {bowlerRoles.map((role, i) => (
              <SelectPlayer
                key={i}
                role={role}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
              />
            ))}
          </div>

          {/* Keeper & Allrounder */}
          <div className="grid grid-cols-2 gap-1 flex-1">
            {keeperAllrounderRoles.map((role, i) => (
              <SelectPlayer
                key={i}
                role={role}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
              />
            ))}
          </div>

          {/* Wildcard */}
          <div className="grid grid-cols-1 flex-1">
            <SelectPlayer
              role={"wildcard"}
              myPlayers={myPlayers}
              openSelectionModal={openSelectionModal}
            />
          </div>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <button className="w-full bg-aus-green text-off-white py-2 mt-2 rounded font-semibold text-sm">
          Submit Team
        </button>
      </div>
      {selectionModalOpen && (
        <PlayerSelection
          isOpen={selectionModalOpen}
          role={selection.replace(/[0-9]/g, "").toUpperCase()}
          players={playersList}
          selected={selected}
          selection={selection}
          budget={budgetRemaining}
          savePlayer={(player, selection) => {
            setMyPlayers({ ...myPlayers, [selection]: player });
            closeSelectionModal();
          }}
          closeModal={closeSelectionModal}
        />
      )}
    </>
  );
};

export default Team;
