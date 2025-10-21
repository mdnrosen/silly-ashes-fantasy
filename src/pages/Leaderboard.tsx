import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyTeams from "../assets/dummyTeams.json";
// import { getTeams } from "../firebase";
import { sortTeamsByPosition } from "../lib/helpers";
import LeaderboardCard from "../modules/LeaderboardCard";
const currentUser = "Harry Potter";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [userTeam, setUserTeam] = useState<any>(null);

  const fetchTeams = async () => {
    // const fetchedTeams = await getTeams();

    setUserTeam(dummyTeams.find((team: any) => team.username === currentUser));
    setTeams(sortTeamsByPosition(dummyTeams) as any);
  };
  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <>
      <div className="h-[calc(100vh-6.5rem)] bg-off-white p-2">
        {userTeam && (
          <div className="h30 p-2 border-dashed border-b-2 mb-2">
            <LeaderboardCard
              isHighlighted={true}
              team={teams.find((team: any) => team.username === currentUser)}
            />
          </div>
        )}
        <div className="p-2">
          {teams.map((team: any) => (
            <LeaderboardCard team={team} key={team.id} isHighlighted={false} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
