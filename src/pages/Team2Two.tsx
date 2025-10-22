import PlayerBox from "../modules/PlayerBox";
import InfoBox from "../modules/InfoBox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dummyTeamInfo from "../assets/dummyTeamInfo.json";
import dummyTeams from "../assets/dummyTeams.json";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
//

const exampleTeam = {
  myPlayers: {
    bowler2: {
      runs: 20,
      stumpings: 0,
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/4255.png?v=23.77",
      team: "AUS",
      fivewickets: 1,
      wickets: 16,
      id: "e5f6g7h8-i9j0-1234-efgh-567890123456",
      catches: 2,
      centuries: 0,
      role: "BOWLER",
      runouts: 0,
      name: "Josh Hazlewood",
      points: 400,
      cost: 16,
    },
    bowler1: {
      name: "Gus Atkinson",
      fivewickets: 0,
      id: 25171989123,
      team: "ENG",
      runs: 110,
      role: "BOWLER",
      wickets: 14,
      cost: 8,
      centuries: 0,
      catches: 4,
      stumpings: 0,
      runouts: 0,
      points: 410,
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/69416.png?v=23.77",
    },
    wildcard: {
      runs: 766,
      role: "BATTER",
      name: "Jacob Bethell",
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/85736.png?v=23.77",
      points: 941,
      cost: 11,
      fivewickets: 0,
      id: "h4i5j6k7-l8m9-0123-hijk-456789012345",
      catches: 5,
      centuries: 3,
      wickets: 0,
      stumpings: 0,
      runouts: 0,
      team: "ENG",
    },
    keeper: {
      points: 408,
      name: "Jamie Smith",
      runouts: 0,
      wickets: 0,
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      catches: 14,
      role: "KEEPER",
      cost: 9,
      runs: 298,
      stumpings: 2,
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/69554.png?v=23.77",
      team: "ENG",
      centuries: 0,
      fivewickets: 0,
    },
    allrounder: {
      runouts: 0,
      id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      stumpings: 0,
      fivewickets: 0,
      runs: 250,
      role: "ALLROUNDER",
      centuries: 1,
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/63277.png?v=23.77",
      team: "AUS",
      points: 370,
      cost: 10,
      name: "Beau Webster",
      catches: 2,
      wickets: 3,
    },
    batter1: {
      id: "x4y5z6a7-b8c9-0123-xyza-456789012345",
      wickets: 0,
      catches: 3,
      stumpings: 0,
      points: 378,
      name: "Harry Brook",
      cost: 20,
      runouts: 0,
      team: "ENG",
      runs: 363,
      role: "BATTER",
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/66374.png?v=23.77",
      fivewickets: 0,
      centuries: 0,
    },
    batter2: {
      wickets: 0,
      catches: 2,
      cost: 12,
      runouts: 0,
      id: "u1v2w3x4-y5z6-7890-uvwx-123456789012",
      name: "Marnus Labuschagne",
      runs: 496,
      role: "BATTER",
      imageUrl:
        "https://www.wisden.com/static-assets/images/players/65083.png?v=23.77",
      team: "AUS",
      centuries: 1,
      points: 556,
      stumpings: 0,
      fivewickets: 0,
    },
  },
  username: "awesome_user_123",
  id: "8e34eb91-1e8a-43c6-a9b1-b8bf7dd9b275",
  teamName: "Geoffreys Blockers",
  totalPoints: 3363,
  budgetUsed: 95,
};

type Props = {};

const exampleUser = {
  id: "user-123",
  username: "yorker_slayer_42",
  teamId: "team-456",
};

const TeamTwo = ({}: Props) => {
  const [team, setTeam] = useState<any>(exampleTeam);
  const [readOnly, setReadyOnly] = useState<boolean>(true);

  const navigate = useNavigate();

  const { teamId } = useParams<{ teamId: string }>();

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

  const teamIsNew: boolean = false;

  return (
    <div className="h-[calc(100vh-6.5rem)] overflow-auto bg-off-white grid grid-rows-14">
      {teamIsNew ? (
        <div className="w-full p-1 flex align-middle">
          <input type="text" placeholder="Enter team name..." className="p-2" />
        </div>
      ) : (
        <div className="w-full p-2 flex flex-col justify-center align-start">
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
  );
};

export default TeamTwo;
