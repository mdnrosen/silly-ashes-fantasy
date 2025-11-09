import { useState, useEffect, useContext } from "react";
import { Player, Team } from "../types";
import PlayerSelection from "../modules/PlayerSelection";
import SelectPlayer from "../components/SelectPlayer";
import Spinner from "../components/Spinner";
import { PlayersContext } from "../context/PlayersContext";
import { useParams } from 'react-router-dom';
import { getTeam, getTeamByUser } from "../firebase/get";

const currentUser = 'drose-87';

// Types
export interface MyPlayers {
  batter1: Player | null;
  batter2: Player | null;
  bowler1: Player | null;
  bowler2: Player | null;
  allrounder: Player | null;
  keeper: Player | null;
  wildcard: Player | null;
}

const TeamPage = () => {
  const playersList = useContext(PlayersContext);
  const [readOnly, setReadOnly] = useState<boolean>(true);
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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectionModalOpen, setSelectionModalOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("");
  const [team, setTeam] = useState<Team | null>(null);
  const { teamId } = useParams();

  // Budget calculations
  const totalSpent = Object.values(myPlayers)
    .filter((player) => player !== null)
    .reduce((sum, player) => sum + (player?.cost || 0), 0);
  const budgetRemaining = 100 - totalSpent;

  // Fetch team by id
  const fetchTeam = async (id: string) => {
    const team = await getTeam(id);
    if (!team) return;
    setTeam(team);
    setMyPlayers(team?.players);
    setLoading(false);
    setReadOnly(team.user !== currentUser);
  };

  // Reset form for new team
  const resetForm = () => {
    setTeam(null);
    setTeamName("");
    setMyPlayers({
      batter1: null,
      batter2: null,
      bowler1: null,
      bowler2: null,
      allrounder: null,
      keeper: null,
      wildcard: null,
    });
    setReadOnly(false);
    setLoading(false);
  };

  const getUserTeam = async () => {
    const userTeam = await getTeamByUser(currentUser);
    console.log(userTeam)
    if (!userTeam) {
      resetForm();
    } else {
      setTeam(userTeam);
      setMyPlayers(userTeam?.players);
      setLoading(false);
      setReadOnly(false);
    }

  }


  // Update selected stubs
  useEffect(() => {
    setSelected(
      Object.values(myPlayers)
        .filter((p) => p !== null)
        .map((p) => p!.stub!.toString())
    );
  }, [myPlayers]);

  // Initial load
  useEffect(() => {
    if (teamId) {
      fetchTeam(teamId);
    } else if (currentUser) {
      getUserTeam();
    } else {
      resetForm()
    }
  }, []);

  // Modal handlers
  const openSelectionModal = (selection: keyof MyPlayers) => {
    setSelection(selection);
    setSelectionModalOpen(true);
  };
  const closeSelectionModal = () => setSelectionModalOpen(false);

  // Deselect player
  const deselectPlayer = (role: string) => {
    setMyPlayers({ ...myPlayers, [role as keyof MyPlayers]: null });
  };

  // Role arrays
  const batterRoles: (keyof MyPlayers)[] = ["batter1", "batter2"];
  const bowlerRoles: (keyof MyPlayers)[] = ["bowler1", "bowler2"];
  const keeperAllrounderRoles: (keyof MyPlayers)[] = ["allrounder", "keeper"];

  return (
    <>
      {loading && <Spinner />}
      <div className="p-2 flex flex-col">
        {/* Team Info or Team Name Input */}
        {team ? (
          <div className="p-2 flex flex-col justify-start align-middle">
            <h1 className="font-semibold text-md">{team.teamname}</h1>
            <p className="text-sm font-extralight italic">{team.user}</p>
          </div>
        ) : (
          <input
            type="text"
            max={25}
            name="teamName"
            value={teamName}
            className="outline-1 w-full mb-2 p-2 text-sm border border-mid-blue rounded"
            placeholder="Team name"
            onChange={(e) => setTeamName(e.target.value)}
          />
        )}

        <div className="flex-1">
          {/* Top Row: Budget/Score Info and Wildcard */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {/* Budget and Score Info Card */}
            <div className="col-span-1 p-2 rounded-lg bg-gray-50">
              {team ? (
                <div className="flex flex-col">
                  <div className="mb-2">
                    <h2 className="text-lg uppercase font-extralight italic">COST</h2>
                    <p className="font-semibold text-md">${100 - team.budgetUsed}</p>
                  </div>
                  <div>
                    <h2 className="text-lg uppercase font-extralight italic">POINTS</h2>
                    <p className="font-semibold text-md">{team.points}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="mb-2">
                    <h2 className="text-lg uppercase font-extralight italic">COST</h2>
                    <p className="font-semibold text-md">${totalSpent}</p>
                  </div>
                </div>
              )}
            </div>
            {/* Wildcard */}
            <div className="col-span-1">
              <SelectPlayer
                role={"wildcard"}
                myPlayers={myPlayers}
                openSelectionModal={openSelectionModal}
                isDisabled={readOnly}
              />
            </div>
          </div>

          {/* Batters */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {batterRoles.map((role) => (
              <div className="col-span-1" key={role}>
                <SelectPlayer
                  role={role}
                  myPlayers={myPlayers}
                  openSelectionModal={openSelectionModal}
                  isDisabled={readOnly}
                />
              </div>
            ))}
          </div>

          {/* Bowlers */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {bowlerRoles.map((role) => (
              <div className="col-span-1" key={role}>
                <SelectPlayer
                  role={role}
                  myPlayers={myPlayers}
                  openSelectionModal={openSelectionModal}
                  isDisabled={readOnly}
                />
              </div>
            ))}
          </div>

          {/* Keeper & Allrounder */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {keeperAllrounderRoles.map((role) => (
              <div className="col-span-1" key={role}>
                <SelectPlayer
                  role={role}
                  myPlayers={myPlayers}
                  openSelectionModal={openSelectionModal}
                  isDisabled={readOnly}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {!readOnly && (
            <button className="w-full bg-aus-green text-off-white p-2 my-2 rounded font-semibold text-sm">
              Submit Team
            </button>
          )}
        </div>
      </div>
      {/* Player Selection Modal */}
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
