import { useContext, useMemo } from "react";
import TestSummary from "../modules/TestSummary";
import Spinner from "../components/Spinner";
import { getPositionSuffix } from "../lib/helpers";
import { useParams } from "react-router-dom";
import { TeamContext } from "../context/TeamContext";
const TeamHome = () => {
  const teams = useContext(TeamContext);
  const { teamId } = useParams();

  const team = useMemo(() => {
    if (teams === null) return null;
    return teams.find((team) => team.id === teamId) ?? null;
  }, [teams]);

  const tests = [
    { label: "First Test", venue: "Perth", key: "firstTest" },
    { label: "Second Test", venue: "Brisbane", key: "secondTest" },
    { label: "Third Test", venue: "Adelaide", key: "thirdTest" },
    { label: "Fourth Test", venue: "Melbourne", key: "fourthTest" },
    { label: "Fifth Test", venue: "Sydney", key: "fifthTest" },
  ];
  return (
    <>
      {!team && <Spinner />}
      {team && (
        <div className="p-2 flex flex-col">
          <div className="p-2 flex flex-col justify-start align-middle">
            <h1 className="font-semibold text-md">{team.teamname}</h1>
            <p className="text-sm font-extralight italic">{team.user}</p>
          </div>
          <div className="p-2 flex justify-between">
            <p>
              {team?.points || 0}{" "}
              <span className="font-extralight">points</span>
            </p>
            <p>
              {getPositionSuffix(team.position)}{" "}
              <span className="font-extralight">overall</span>
            </p>
          </div>

          {tests.map((test) => (
            <TestSummary
              key={test.key}
              test={test.key}
              label={test.label}
              venue={test.venue}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TeamHome;
