import { JSX, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PlayersContext } from "../context/PlayersContext";
import { getBgColor, firstName, lastName, getTextColor } from "../lib/helpers";
import ProfileSubNav from "../components/ProfileSubNav";
import StatRow from "../components/StatRow";

const PlayerProfile = (): JSX.Element => {
  const { playerId } = useParams<{ playerId: string }>();
  const players = useContext(PlayersContext);
  const player = players.find((p) => p.id?.toString() === playerId);
  const first = firstName(player?.name || "");
  const last = lastName(player?.name || "");

  if (!player) {
    return (
      <div className="h-full flex flex-col justify-center align-middle my-auto">
        Player not found
        <Link to="/players">Go back</Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ProfileSubNav bgColor={getBgColor(player.team)} />
      <div
        className={`h-120 flex justify-between p-4 bg-white bg-contain bg-no-repeat bg-bottom ${getTextColor(
          player.team
        )}`}
        style={{ backgroundImage: `url(${player.imageUrl})` }}
      >
        <div className="text-left p-2">
          <h2 className="font-medium text-xl">{first}</h2>
          <h1 className="font-bold text-2xl">{last.toUpperCase()}</h1>
          <small className="font-extralight">
            {player.role} - {player.team}
          </small>
        </div>
        <div className="text-right p-2">
          <h2 className="font-bold text-4xl">{player.points}</h2>
          <small>POINTS</small>
        </div>
      </div>
      <div className={`${getBgColor(player.team)} h-120`}>
        <StatRow statName="RUNS" statValue={player.runs} />
        <StatRow statName="WICKETS" statValue={player.wickets} />
        <StatRow statName="CATCHES" statValue={player.catches} />
        <StatRow statName="5-FERS" statValue={player.fivewickets} />
        <StatRow statName="CENTURIES" statValue={player.centuries} />
        <StatRow statName="RUN OUTS" statValue={player.runouts} />
        {player.role === "KEEPER" && (
          <StatRow statName="STUMPINGS" statValue={player.stumpings} />
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;
