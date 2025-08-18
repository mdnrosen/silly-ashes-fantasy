import { useContext } from "react";
import { PlayersContext } from "../context/PlayersContext.tsx";
import { sortByPoints } from "../lib/helpers";
import PlayerCard from "../components/PlayerCard";

const ListPlayers = () => {
  const players = useContext(PlayersContext);
  const sortedPlayers = sortByPoints(players);

  return (
    <div className="flex flex-wrap justify-center items-center p-4 mb-10">
      {!!sortedPlayers.length &&
        sortedPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
    </div>
  );
};

export default ListPlayers;
