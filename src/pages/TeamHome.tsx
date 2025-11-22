import { useContext, useMemo } from "react";
import TestSummary from "../modules/TestSummary";
import Spinner from "../components/Spinner";
import { getPositionSuffix, calculateTeamTotalPoints } from "../lib/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { TeamContext } from "../context/TeamContext";
import { PlayersContext } from "../context/PlayersContext";
import { IoArrowBack } from "react-icons/io5";
const TeamHome = () => {
  const { teams } = useContext(TeamContext) ?? { teams: null };
  const players = useContext(PlayersContext);
  const { teamId } = useParams();
  const navigate = useNavigate();
  const team = useMemo(() => {
    if (teams === null) return null;
    return teams.find((team) => team.id === teamId) ?? null;
  }, [teams, teamId]);

  const tests = [
    { label: "First Test", venue: "Perth", key: "firstTest", status: "Open" },
    {
      label: "Second Test",
      venue: "Brisbane",
      key: "secondTest",
      status: "Unavailable",
    },
    {
      label: "Third Test",
      venue: "Adelaide",
      key: "thirdTest",
      status: "Unavailable",
    },
    {
      label: "Fourth Test",
      venue: "Melbourne",
      key: "fourthTest",
      status: "Unavailable",
    },
    {
      label: "Fifth Test",
      venue: "Sydney",
      key: "fifthTest",
      status: "Unavailable",
    },
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
              {calculateTeamTotalPoints(team, players)}{" "}
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
              status={test.status}
            />
          ))}
        </div>
      )}
      <div className="p-2">
        {" "}
        <button onClick={() => navigate(-1)}>
          <IoArrowBack size={24} />
        </button>
      </div>
    </>
  );
};

export default TeamHome;
