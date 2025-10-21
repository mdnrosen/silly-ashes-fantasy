import { useState, useEffect, useContext } from "react";

import { Player } from "../types";
import { saveTeam } from "../firebase";
import PlayerSelection from "../modules/PlayerSelection";
import SelectPlayer from "../components/SelectPlayer";

import { PlayersContext } from "../context/PlayersContext";

import Spinner from "../components/Spinner";

import { useLoading } from "../hooks/useLoading";

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
  const defaultPlayers = {
    batter1: null,
    batter2: null,
    bowler1: null,
    bowler2: null,
    allrounder: null,
    keeper: null,
    wildcard: null,
  };
  const playersList = useContext(PlayersContext);

  const [existingPlayers, setExistingPlayers] = useState({ ...defaultPlayers });
  const [myPlayers, setMyPlayers] = useState<MyPlayers | null>(null);

  useEffect(() => {
    setMyPlayers({ ...existingPlayers });
  }, [existingPlayers]);

  const getMyTeam = () => {
    // Check if user already has a team from team context
  };

  const [selected, setSelected] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const [selectionModalOpen, setSelectionModalOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("");
  const _loading = useLoading();

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

  const deselectPlayer = (role: string) => {
    setMyPlayers({ ...myPlayers, [role as keyof MyPlayers]: null });
  };

  const canSubmit = () => {
    // all players selected and a team name
    return (
      Object.values(myPlayers).every((player) => player !== null) &&
      teamName.trim() !== ""
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      _loading.start();
      console.log("Submitting team:", { myPlayers, teamName });
      const payload = {
        myPlayers,
        teamName,
        username: "exampleUser",
      };

      saveTeam(payload);
    } catch (error) {
      console.error(`Error submitting team ->`, error);
    } finally {
      _loading.stop();
    }
  };

  const batterRoles: (keyof MyPlayers)[] = ["batter1", "batter2"];
  const bowlerRoles: (keyof MyPlayers)[] = ["bowler1", "bowler2"];
  const keeperAllrounderRoles: (keyof MyPlayers)[] = ["allrounder", "keeper"];

  return (
    <>
      {_loading.active && <Spinner />}
      <div className="p-2 h-screen flex flex-col pb-16">
        <input
          type="text"
          value={teamName}
          className="outline-1 w-full mb-2 h-8 px-2 text-sm border border-mid-blue rounded"
          placeholder="Team name"
          onChange={(e) => setTeamName(e.target.value)}
        />

        {/* Subtle scroll hint */}
        <div className="text-center mb-1">
          <div className="text-xs text-gray-400">
            Complete your team then scroll down to save ↓
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-1">
          <div className="grid grid-cols-2 gap-1 flex-1">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-2 pt-3 flex flex-col justify-between">
              {teamName ? (
                <div className="text-xs font-semibold text-dark-blue text-center uppercase">
                  {teamName}
                </div>
              ) : (
                <div className="text-xs text-dark-blue text-center opacity-60">
                  Please name your team
                </div>
              )}
              <div className="flex justify-between items-end mt-2">
                <div className="text-left">
                  <div className="text-sm text-dark-blue font-bold leading-tight">
                    ${budgetRemaining}
                  </div>
                  <div className="text-xs text-dark-blue leading-tight">
                    BUDGET
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-dark-blue font-bold leading-tight">
                    0
                  </div>
                  <div className="text-xs text-dark-blue leading-tight">
                    SCORE
                  </div>
                </div>
              </div>
            </div>

            {/* Wildcard */}
            <SelectPlayer
              role={"wildcard"}
              myPlayers={myPlayers}
              openSelectionModal={openSelectionModal}
            />
          </div>

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
        </div>

        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="w-full bg-aus-green text-off-white py-2 mt-2 rounded font-semibold text-sm"
        >
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
          currentPlayer={myPlayers[selection as keyof MyPlayers]}
          savePlayer={(player, selection) => {
            setMyPlayers({ ...myPlayers, [selection]: player });
            closeSelectionModal();
          }}
          deselectPlayer={deselectPlayer}
          closeModal={closeSelectionModal}
        />
      )}
    </>
  );
};

export default Team;
