import PlayerBox from "../modules/PlayerBox";
import InfoBox from "../modules/InfoBox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dummyTeamInfo from "../assets/dummyTeamInfo.json";
import dummyTeams from "../assets/dummyTeams.json";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import exampleTeam from "../assets/exampleTeam.json";
import PlayerSelection from "../modules/PlayerSelection";

type Props = {};

const exampleUser = {
  id: "user-123",
  username: "yorker_slayer_42",
  teamId: "team-456",
};

const TeamTwo = ({}: Props) => {
  const navigate = useNavigate();
  const _auth = useAuth();
  console.log(_auth);

  const [team, setTeam] = useState<any>({
    myPlayers: {
      bowler2: null,
      bowler1: null,
      wildcard: null,
      keeper: null,
      allrounder: null,
      batter1: null,
      batter2: null,
    },
    username: _auth.user?.username,
    teamname: "",
  });

  const teamIsNew = !useParams<{ teamId: string }>().teamId;
  const [budgetRemaining, setBudgetRemaining] = useState<number>(100);

  const { teamId } = useParams<{ teamId: string }>();
  const [readOnly, setReadyOnly] = useState<boolean>(!!teamId);

  useEffect(() => {
    //
  }, []);
  const renderPlayerBox = (
    defaultRole: "Batter" | "Bowler" | "Allrounder" | "Keeper" | "Wildcard",
    isDisabled?: boolean,
    player: any | null = null
  ) => {
    return (
      <PlayerBox
        isDisabled={isDisabled || readOnly}
        player={player}
        defaultRole={defaultRole}
      />
    );
  };

  const fetchTeam = async () => {
    // this logic will be replaced by the API call
    const teamData = dummyTeams.find((t) => t.id === teamId);

    setTeam(teamData);
    if (teamData?.username === exampleUser.username) {
      setReadyOnly(false);
    }
  };

  useEffect(() => {
    // 1. if no teamId in params - it means this is a new team for current user to create
    if (!teamId) {
      console.log("No team - creating new team");
      return; // new team creation flow
    }

    fetchTeam();
    // 2. if teamId exists - fetch that team data

    // 3. if team.username matches currentUser.username - then its editable
    // 4. if team.username does not match currentUser.username - then its read-only
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-6.5rem)] overflow-auto bg-off-white grid grid-rows-14">
        {teamIsNew ? (
          <div className="w-full p-1 flex align-middle">
            <input
              type="text"
              placeholder="Enter team name..."
              className="p-2 w-full"
            />
          </div>
        ) : (
          <div className="w-full py-2 px-4 flex flex-col justify-center align-start">
            <span className="text-lg font-bold">{team.teamName}</span>
            <small className="text-xs font-light">{team.username}</small>
          </div>
        )}
        {/* Row 1 -  */}
        <div className="p-1 row-span-3 flex justify-around">
          <InfoBox team={team} />
          {renderPlayerBox("Wildcard", true, team.myPlayers.wildcard)}
        </div>
        <div className="p-1 row-span-3 flex justify-around">
          {renderPlayerBox("Batter", true, team.myPlayers.batter1)}
          {renderPlayerBox("Batter", true, team.myPlayers.batter2)}
        </div>
        <div className="p-1 row-span-3 flex justify-around">
          {renderPlayerBox("Bowler", true, team.myPlayers.bowler1)}
          {renderPlayerBox("Bowler", true, team.myPlayers.bowler2)}
        </div>
        <div className="p-1 row-span-3 flex justify-around">
          {renderPlayerBox("Allrounder", true, team.myPlayers.allrounder)}
          {renderPlayerBox("Keeper", true, team.myPlayers.keeper)}
        </div>
        {/* Row 2 of Boxes */}
        <div className="p-1 flex justify-center align-middle">
          {!readOnly ? (
            <button className="w-full md:w-4/5 border-1 border-aus-green rounded-md p-2 text-aus-green font-semibold">
              SAVE TEAM
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="align-start w-full md:w-4/5 bg-gray-50 rounded-md p-2 text-aus-green font-semibold"
            >
              <IoArrowBack size={24} />
            </button>
          )}
        </div>
      </div>
      {/* <PlayerSelection isOpen={true} players={[]} /> */}
    </>
  );
};

export default TeamTwo;
