import { useMemo, useContext } from "react";
import LeaderboardCard from "../modules/LeaderboardCard";
import { Team } from "../types";
import { useAuth } from "../hooks/useAuth";
import CreateTeam from "./CreateTeam";
import { TeamContext } from "../context/TeamContext";
import { PlayersContext } from "../context/PlayersContext";
import { calculateTeamTotalPoints } from "../lib/helpers";

const Leaderboard = () => {
  const _auth = useAuth();
  const { teams } = useContext(TeamContext) ?? { teams: null };
  const players = useContext(PlayersContext);

  const sortedTeams = useMemo(() => {
    if (teams === null || players.length === 0) return null;
    return [...teams]
      .map((team) => ({
        ...team,
        calculatedPoints: calculateTeamTotalPoints(team, players),
      }))
      .sort((a, b) => b.calculatedPoints - a.calculatedPoints)
      .map((team, index) => ({
        ...team,
        position: index + 1,
      }));
  }, [teams, players]);

  const userTeam = useMemo(() => {
    if (sortedTeams === null) return;
    return (
      sortedTeams.find((team) => team.user === _auth.user?.nickname) ?? null
    );
  }, [sortedTeams, _auth.user?.nickname]);

  return (
    <>
      <div className="bg-off-white p-2 pb-16">
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
          {sortedTeams?.map((team: Team & { calculatedPoints: number }) => (
            <LeaderboardCard team={team} key={team.id} isHighlighted={false} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
