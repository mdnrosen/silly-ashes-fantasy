import { useMemo, useContext, useState } from "react";
import { FaFilter } from "react-icons/fa";

import LeaderboardCard from "../modules/LeaderboardCard";
import LeaderboardFilter from "../modules/LeaderboardFilter";
import { Team } from "../types";
import { useAuth } from "../hooks/useAuth";
import CreateTeam from "./CreateTeam";
import { TeamContext } from "../context/TeamContext";
import { PlayersContext } from "../context/PlayersContext";
import {
  calculateTeamTotalPoints,
  calculateSquadScoreForTest,
  hydrateSquadWithPlayers,
  TestKey,
  formatFilterLabel,
} from "../lib/helpers";
import { TeamRolesIds } from "../types";

const Leaderboard = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>("overall");
  const _auth = useAuth();
  const { teams } = useContext(TeamContext) ?? { teams: null };
  const players = useContext(PlayersContext);

  const sortedTeams = useMemo(() => {
    if (teams === null || players.length === 0) return null;

    if (currentFilter === "overall") {
      // Sort by overall points
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
    } else {
      // Sort by specific test points
      const testKey = currentFilter as TestKey;
      return [...teams]
        .map((team) => {
          const squadIds = team.squad[testKey] as unknown as TeamRolesIds;
          const hydratedSquad = hydrateSquadWithPlayers(squadIds, players);
          const testPoints = calculateSquadScoreForTest(hydratedSquad, testKey);
          return {
            ...team,
            calculatedPoints: testPoints,
          };
        })
        .sort((a, b) => b.calculatedPoints - a.calculatedPoints)
        .map((team, index) => ({
          ...team,
          position: index + 1,
        }));
    }
  }, [teams, players, currentFilter]);

  const updateFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  const userTeam = useMemo(() => {
    if (sortedTeams === null) return;
    return (
      sortedTeams.find((team) => team.user === _auth.user?.nickname) ?? null
    );
  }, [sortedTeams, _auth.user?.nickname]);

  return (
    <>
      <div className="bg-off-white p-2 pb-16">
        <div className="p-2 bg-off-white flex justify-between">
          <h1 className=" text-2xl uppercase">LEADERBOARD</h1>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-blue text-white p-2 rounded-lg flex items-center"
          >
            <small className="text-xs mr-2">
              {formatFilterLabel(currentFilter)}
            </small>
            <FaFilter />
          </button>
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
      {filterOpen && (
        <LeaderboardFilter
          currentFilter={currentFilter}
          setFilterOpen={setFilterOpen}
          updateFilter={updateFilter}
        />
      )}
    </>
  );
};

export default Leaderboard;
