import { useMemo, useContext } from "react";
import LeaderboardCard from "../modules/LeaderboardCard";
import { Team } from "../types";
import { useAuth } from "../hooks/useAuth";
import CreateTeam from "./CreateTeam";
import { TeamContext } from "../context/TeamContext";

const Leaderboard = () => {
  const _auth = useAuth();
  const { teams } = useContext(TeamContext) ?? { teams: null };

  const userTeam = useMemo(() => {
    if (teams === null) return;
    return teams.find((team) => team.user === _auth.user?.nickname) ?? null;
  }, [teams, _auth.user?.nickname]);

  return (
    <>
      <div className="h-[calc(100vh-6.5rem)] bg-off-white p-2">
        <div className="p-4 bg-off-white">
          <h1 className=" text-2xl uppercase">LEADERBOARD</h1>
        </div>
        {userTeam ? (
          <div className="h30 p-2 border-dashed border-b-2 mb-2">
            <small className="text-sm font-extralight italic">
              This is your team!
            </small>
            <LeaderboardCard isHighlighted={true} team={userTeam} />
          </div>
        ) : (
          <CreateTeam />
        )}
        <div className="p-2">
          {teams?.map((team: Team) => (
            <LeaderboardCard team={team} key={team.id} isHighlighted={false} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
