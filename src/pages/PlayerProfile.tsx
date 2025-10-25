import { JSX, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PlayersContext } from "../context/PlayersContext.tsx";
import {
  getBgColor,
  firstName,
  lastName,
  getTextColor,
  getBorderColor,
} from "../lib/helpers";
import { IoArrowBack } from "react-icons/io5";
import ProfileSubNav from "../components/ProfileSubNav";
import StatBox from "../components/StatBox";

const PlayerProfile = (): JSX.Element => {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const players = useContext(PlayersContext);
  const player = players.find((p) => p.id?.toString() === playerId);
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
    <div className="h-[calc(100vh-6.5rem)] w-full grid grid-rows-18">
      {/* First row for name and points total */}
      <div
        className={`p-2 row-span-2 flex justify-between ${getBgColor(
          player.team
        )}`}
      >
        <div className="flex flex-col">
          <span className="text-lg">{first}</span>
          <span className="font-bold uppercase text-lg">{last}</span>
        </div>
        <div className="flex flex-col text-right justify-center">
          <span className="font-extralight uppercase">{player.role}</span>
          <span className="text-sm">${player.cost}</span>
        </div>
      </div>
      <div className="row-span-9 overflow-hidden">
        <img
          src={player.imageUrl}
          alt={`${first} ${last} headshot`}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`row-span-2 flex justify-around align-middle ${getBgColor(
          player.team
        )}`}
      >
        <StatBox statName="Points" statValue={player.points} emphasis={true} />
        <StatBox statName="Runs" statValue={player.runs} emphasis={false} />
        <StatBox
          statName="Wickets"
          statValue={player.wickets}
          emphasis={false}
        />
      </div>
      <div
        className={`row-span-2 flex justify-around align-middle ${getBgColor(
          player.team
        )}`}
      >
        <StatBox
          statName="Catches"
          statValue={player.catches}
          emphasis={false}
        />
        <StatBox
          statName="Runouts"
          statValue={player.runouts}
          emphasis={false}
        />
        <StatBox
          statName="Stumpings"
          statValue={player.stumpings}
          emphasis={false}
        />
      </div>
      <div
        className={`row-span-2 flex justify-around align-middle ${getBgColor(
          player.team
        )}`}
      >
        <StatBox
          statName="Hundreds"
          statValue={player.centuries}
          emphasis={false}
        />
        <StatBox
          statName="Five-fors"
          statValue={player.fivewickets}
          emphasis={false}
        />
      </div>
      <div
        className={`row-span-2 flex px-2 justify-between align-middle ${getBgColor(
          player.team
        )}`}
      >
        <button onClick={handleBack}>
          <IoArrowBack size={24} />
        </button>
        <small className="my-auto">82% Selected</small>
      </div>
    </div>
  );
};

export default PlayerProfile;
