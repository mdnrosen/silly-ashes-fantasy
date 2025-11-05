import { useState, useEffect, useContext } from "react";

import { Player, Team } from "../types";

import PlayerSelection from "../modules/PlayerSelection";
import SelectPlayer from "../components/SelectPlayer";

import { PlayersContext } from "../context/PlayersContext";
import { useParams } from 'react-router-dom';
import { getTeam } from "../firebase/get";
const currentUser = 'drose-87'

type MyPlayers = {
  batter1: Player | null;
  batter2: Player | null;
  bowler1: Player | null;
  bowler2: Player | null;
  allrounder: Player | null;
  keeper: Player | null;
  wildcard: Player | null;
};

const TeamPage = () => {
  const playersList = useContext(PlayersContext);
  const [readOnly, setReadOnly ] = useState<boolean>(true);
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
  const [team, setTeam] = useState<Team | null>(null);

  const { teamId } = useParams()
  // Calculate budget remaining based on selected players
  const totalSpent = Object.values(myPlayers)
    .filter((player) => player !== null)
    .reduce((sum, player) => sum + (player?.cost || 0), 0);

  const budgetRemaining = 100 - totalSpent;


  const fetchTeam = async (id: string) => {
   const team =  await getTeam(id);
   if (!team) return;
   console.log(team)
   setMyPlayers(team?.players)
   setTeamName(team.teamname)

  }

  useEffect(() => {
    setSelected(
      Object.values(myPlayers)
        .filter((p) => p !== null)
        .map((p) => p!.stub!.toString())
    );
  }, [myPlayers]);

  useEffect(() => {
    console.log(teamId)
    if (teamId) {
       fetchTeam(teamId);
    }

    // calcuate if read only
    // 3. If team in params team exists - team.user does not match user- it's read only
    
    // 1. If team in params team exists - if team.user matches user from auth hook, then it is editable
    // 2. If team is params is undefined - it's a new team - handle form
  },[])

  const openSelectionModal = (selection: keyof MyPlayers) => {
    setSelection(selection);
    setSelectionModalOpen(true);
  };
  const closeSelectionModal = () => setSelectionModalOpen(false);

  const deselectPlayer = (role: string) => {
    setMyPlayers({ ...myPlayers, [role as keyof MyPlayers]: null });
  };

  const batterRoles: (keyof MyPlayers)[] = ["batter1", "batter2"];
  const bowlerRoles: (keyof MyPlayers)[] = ["bowler1", "bowler2"];
  const keeperAllrounderRoles: (keyof MyPlayers)[] = ["allrounder", "keeper"];

  return (
    <>
      <div className="p-2 flex flex-col">
        <input
          type="text"
          value={teamName}
          className="outline-1 w-full mb-2 p-2 text-sm border border-mid-blue rounded"
          placeholder="Team name"
          onChange={(e) => setTeamName(e.target.value)}
        />

        <div className="flex-1">
          {/* Top Row: Budget/Score Info and Wildcard */}
          <div className="grid grid-cols-2">
            {/* Budget and Score Info Card */}
            <div className="m-1 col-span-1 bg-white border-2 rounded-lg">
              {teamName ? (
                <>
                  <div className="text-xs font-semibold text-dark-blue text-center mb-2 uppercase">
                    {teamName}
                  </div>
                  <div className="text-center space-y-1 h-full">
                    <div className="text-xs text-dark-blue">
                      Budget:{" "}
                      <span className="font-bold">${budgetRemaining}</span>
                    </div>
                    <div className="text-xs text-dark-blue">
                      Score: <span className="font-bold">0</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-xs text-dark-blue text-center opacity-60">
                  Enter team name above
                </div>
              )}
            </div>

            {/* Wildcard */}
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={"wildcard"}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-9"></div>
          </div>

          {/* Batters */}
          <div className="grid grid-cols-2">
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={batterRoles[0]}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={batterRoles[1]}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Bowlers */}
          <div className="grid grid-cols-2">
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={bowlerRoles[0]}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={bowlerRoles[1]}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Keeper & Allrounder */}
          <div className="grid grid-cols-2">
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={keeperAllrounderRoles[0]}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-1 m-1">
              <SelectPlayer
                role={keeperAllrounderRoles[1]}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
            <div className="col-span-1"></div>
          </div>
          <button className="w-full bg-aus-green text-off-white p-2 my-2 rounded font-semibold text-sm">
          Submit Team
        </button>
        </div>

        {/* Submit Button - Normal flow at bottom */}
 
      </div>
      {selectionModalOpen && (
        <PlayerSelection
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

export default TeamPage;
