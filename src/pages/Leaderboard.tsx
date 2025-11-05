import { useEffect, useState } from "react";
import { getTeams } from "../firebase";
import LeaderboardCard from "../modules/LeaderboardCard";
import { Team } from '../types'
import Spinner from "../components/Spinner";
const currentUser = "drose-87";

const Leaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [userTeam, setUserTeam] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTeams = async () => {
    const data = await getTeams();
    setTeams(data as Team[]);
    setUserTeam(data && (data as Team[]).find((team: Team) => team.user === currentUser)!);
    setLoading(false);
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
    {loading && <Spinner />}
      <div className="h-[calc(100vh-6.5rem)] bg-off-white p-2">
        {userTeam && (
          <div className="h30 p-2 border-dashed border-b-2 mb-2">
            <small className="text-sm font-extralight italic">This is your team!</small>
            <LeaderboardCard
              isHighlighted={true}
              team={userTeam}
            />
          </div>
        )}
        <div className="p-2">
          {teams.map((team: Team) => (
            <LeaderboardCard team={team} key={team.id} isHighlighted={false} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
