import { useState, useEffect, useMemo, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";

import { useToast, useAuth } from "../hooks";
import { Team, TeamRoles } from "../types";
import {
  getTestLabel,
  isTeamPicked,
  hydrateSquadWithPlayers,
  TestKey,
  calculateSquadScoreForTest,
  testHasStarted,
} from "../lib/helpers";

import { TeamContext } from "../context/TeamContext";
import { PlayersContext } from "../context/PlayersContext";

import Spinner from "../components/Spinner";
import SelectPlayer from "../components/SelectPlayer";
import PlayerSelection from "../modules/PlayerSelection";

import { saveTestSquad } from "../firebase/put";
import { getTeam } from "../firebase/get";
import ConfirmModal from "../modules/ConfirmModal";

const TeamSquad = () => {
  const _toast = useToast();
  const _auth = useAuth();
  const { teamId, test } = useParams();
  const navigate = useNavigate();
  const { teams, reloadTeams } = useContext(TeamContext) ?? {
    teams: null,
    reloadTeams: async () => {},
  };
  const players = useContext(PlayersContext);

  const emptySquad: TeamRoles = {
    batter1: null,
    batter2: null,
    bowler1: null,
    bowler2: null,
    allrounder: null,
    keeper: null,
    wildcard: null,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<Team | null>(null);
  const [selectedSquad, setSelectedSquad] = useState<TeamRoles>(emptySquad);
  const [selectionModalOpen, setSelectionModalOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setConfirmModalOpen(false);
      setLoading(true);
      if (isReadOnly) return;

      if (Object.values(selectedSquad).some((player) => player === null)) {
        _toast?.error(
          "Please select a player for all roles before submitting your team."
        );
        return;
      }

      await saveTestSquad(teamId, test as string, selectedSquad);
      //   deliberate timeout to allow context to refresh

      await reloadAfterSave();
      _toast?.success("Team saved successfully!");
      // to do we need to find a way to refresh the get teams context
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save team";
      _toast?.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reloadAfterSave = async () => {
    // Reload the global teams context in the background
    reloadTeams();

    // Fetch this specific team directly to ensure we have the latest data
    if (teamId) {
      const freshTeam = await getTeam(teamId);
      if (freshTeam) {
        setTeam(freshTeam);
        const pickedTeam = isTeamPicked(freshTeam, test as string);
        if (pickedTeam) {
          // @ts-ignore - squad comes from Firebase with IDs, need to hydrate
          const squadIds = freshTeam.squad[test];
          const hydratedSquad = hydrateSquadWithPlayers(squadIds, players);
          setSelectedSquad(hydratedSquad);
        }
      }
    }
  };

  const findTeam = async () => {
    setLoading(true);
    const foundTeam = teams?.find((team) => team.id === teamId) ?? null;
    if (!foundTeam) {
      setLoading(false);
      _toast?.error("Team not found");
      return;
    }
    const pickedTeam = isTeamPicked(foundTeam, test as string);
    if (pickedTeam) {
      // @ts-ignore - squad comes from Firebase with IDs, need to hydrate
      const squadIds = foundTeam.squad[test];
      const hydratedSquad = hydrateSquadWithPlayers(squadIds, players);
      setSelectedSquad(hydratedSquad);
    } else {
      setSelectedSquad(emptySquad);
    }
    setTeam(foundTeam);
    setLoading(false);
  };

  const isReadOnly = useMemo(() => {
    if (!_auth) return true;
    if (testHasStarted(test as string)) return true;
    // @ts-ignore
    if (isTeamPicked(team, test as string)) return true;
    return _auth.user?.nickname !== team?.user;
  }, [_auth, teams, team]);

  const openSelectionModal = (selection: keyof TeamRoles) => {
    setSelection(selection);
    setSelectionModalOpen(true);
  };
  const closeSelectionModal = () => setSelectionModalOpen(false);

  const deselectPlayer = (role: string) => {
    setSelectedSquad({ ...selectedSquad, [role as keyof TeamRoles]: null });
  };

  useEffect(() => {
    if (teams !== null && players.length > 0) {
      findTeam();
    }
  }, [teams, players]);

  // This checks for already selected players to disable them in the modal
  useEffect(() => {
    setSelected(
      Object.values(selectedSquad)
        .filter((p) => p?.id != null)
        .map((p) => p!.id!)
    );
  }, [selectedSquad]);

  const batterRoles: (keyof TeamRoles)[] = ["batter1", "batter2"];
  const bowlerRoles: (keyof TeamRoles)[] = ["bowler1", "bowler2"];
  const keeperAllrounderRoles: (keyof TeamRoles)[] = ["allrounder", "keeper"];

  return (
    <>
      {loading && <Spinner />}
      <div className="flex p-2 flex-col">
        <div className="p-2 flex flex-col justify-start align-middle">
          <h1 className="font-semibold text-md">{team?.teamname}</h1>
          <p className="text-sm font-extralight italic">{team?.user}</p>
        </div>

        <div className="flex-1">
          {/* Top Row: Test Info and Wildcard */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {/* Score Info Card */}
            <div className="col-span-1 p-2 rounded-lg bg-gray-50">
              <div className="flex flex-col">
                <div className="mb-2 flex">
                  <h2 className="text-sm text-center uppercase font-extralight italic border-b-2 mb-2">
                    {getTestLabel(test)}{" "}
                  </h2>
                </div>
                <div>
                  <h2 className="text-lg uppercase font-extralight italic">
                    POINTS
                  </h2>
                  <p className="font-semibold text-md">
                    {calculateSquadScoreForTest(selectedSquad, test as TestKey)}
                  </p>
                </div>
              </div>
            </div>
            {/* Wildcard */}
            <div className="col-span-1">
              <SelectPlayer
                role={"wildcard"}
                myPlayers={selectedSquad}
                openSelectionModal={openSelectionModal}
                isDisabled={isReadOnly}
                test={test as TestKey}
              />
            </div>
          </div>

          {/* Batters */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {batterRoles.map((role) => (
              <div className="col-span-1" key={role}>
                <SelectPlayer
                  role={role}
                  myPlayers={selectedSquad}
                  openSelectionModal={openSelectionModal}
                  isDisabled={isReadOnly}
                  test={test as TestKey}
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
                  myPlayers={selectedSquad}
                  openSelectionModal={openSelectionModal}
                  isDisabled={isReadOnly}
                  test={test as TestKey}
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
                  myPlayers={selectedSquad}
                  openSelectionModal={openSelectionModal}
                  isDisabled={isReadOnly}
                  test={test as TestKey}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {!isReadOnly && (
            <button
              onClick={() => setConfirmModalOpen(true)}
              className="w-full bg-aus-green text-off-white p-2 my-2 rounded font-semibold text-sm"
            >
              Submit Team
            </button>
          )}
          <div className="p-2">
            {" "}
            <button onClick={() => navigate(-1)}>
              <IoArrowBack size={24} />
            </button>
          </div>
        </div>
      </div>
      {selectionModalOpen && (
        <PlayerSelection
          role={selection.replace(/[0-9]/g, "").toUpperCase()}
          players={players}
          selected={selected}
          selection={selection}
          currentPlayer={selectedSquad[selection as keyof TeamRoles] ?? null}
          savePlayer={(player, selection) => {
            setSelectedSquad({ ...selectedSquad, [selection]: player });
            closeSelectionModal();
          }}
          deselectPlayer={deselectPlayer}
          closeModal={closeSelectionModal}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          title="Save team"
          message="Once you save your team, you cannot make any changes. Do you wish to continue?"
          successText="Save Team"
          cancelText="Cancel"
          successCallback={() => handleSubmit()}
          cancelCallback={() => setConfirmModalOpen(false)}
        />
      )}
    </>
  );
};
export default TeamSquad;
