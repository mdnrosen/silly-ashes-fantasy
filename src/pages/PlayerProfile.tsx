import { JSX, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PlayersContext } from "../context/PlayersContext.tsx";
import {
  getBgColor,
  firstName,
  lastName,
  sumStat,
  calculatePlayerScore,
} from "../lib/helpers";
import { IoArrowBack } from "react-icons/io5";

const PlayerProfile = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const players = useContext(PlayersContext);
  const player = players.find((p) => p.id === id);
  const first = firstName(player?.name || "");
  const last = lastName(player?.name || "");

  const handleBack = () => navigate(-1);
  if (!player) {
    return (
      <div className="h-full flex flex-col justify-center align-middle my-auto">
        Player not found
        <Link to="/players">Go back</Link>
      </div>
    );
  }

  return (
    <div className="bg-off-white p-2 pb-16">
      {/* Header with back button */}
      <div className="p-2 mb-2">
        <button onClick={handleBack}>
          <IoArrowBack size={24} />
        </button>
      </div>

      {/* Player Card - Image, Name, Role, Points */}
      <div
        className={`rounded-lg overflow-hidden mb-4 p-4 flex gap-4 ${getBgColor(
          player.team
        )}`}
      >
        <div className="w-1/4">
          <img
            src={player.imageUrl}
            alt={`${first} ${last} headshot`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-medium">
              {first} <span className="font-bold uppercase">{last}</span>
            </h1>
            <p className="text-sm font-light italic mt-1">{player.role}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-light uppercase">Total Points</p>
            <p className="text-3xl font-bold">{calculatePlayerScore(player)}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-1">
        {/* Primary Stats */}
        <div className={`rounded-lg p-4 ${getBgColor(player.team)}`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs font-light uppercase mb-1">Runs</p>
              <p className="text-xl font-semibold">{sumStat(player, "runs")}</p>
            </div>
            <div>
              <p className="text-xs font-light uppercase mb-1">Wickets</p>
              <p className="text-xl font-semibold">
                {sumStat(player, "wickets")}
              </p>
            </div>
            <div>
              <p className="text-xs font-light uppercase mb-1">Catches</p>
              <p className="text-xl font-semibold">
                {sumStat(player, "catches")}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className={`rounded-lg p-4 ${getBgColor(player.team)}`}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs font-light uppercase mb-1">Hundreds</p>
              <p className="text-xl font-semibold">
                {sumStat(player, "centuries")}
              </p>
            </div>
            <div>
              <p className="text-xs font-light uppercase mb-1">Five-fors</p>
              <p className="text-xl font-semibold">
                {sumStat(player, "fivewickets")}
              </p>
            </div>
          </div>
        </div>

        {/* Tertiary Stats */}
        <div className={`rounded-lg p-4 ${getBgColor(player.team)}`}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs font-light uppercase mb-1">Runouts</p>
              <p className="text-xl font-semibold">
                {sumStat(player, "runouts")}
              </p>
            </div>
            <div>
              <p className="text-xs font-light uppercase mb-1">Stumpings</p>
              <p className="text-xl font-semibold">
                {sumStat(player, "stumpings")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
