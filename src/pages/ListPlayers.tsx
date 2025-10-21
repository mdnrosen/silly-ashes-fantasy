import { useContext, useEffect } from "react";
import { PlayersContext } from "../context/PlayersContext.tsx";
import { sortByPoints } from "../lib/helpers";
import PlayerCard from "../components/PlayerCard";
import { useLoading } from "../hooks/useLoading.ts";
import Spinner from "../components/Spinner.tsx";

const ListPlayers = () => {
  const players = useContext(PlayersContext);
  const sortedPlayers = sortByPoints(players);
  const _loading = useLoading();

  useEffect(() => {
    console.log("PLAYERS", players);
    if (players.length === 0) {
      _loading.start();
    } else {
      _loading.stop();
    }
  }, [players, _loading.active]);

  return (
    <>
      {_loading.active && <Spinner />}
      <div className="flex flex-wrap justify-center items-center p-2 mb-4">
        {!!sortedPlayers.length &&
          sortedPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
      </div>
    </>
  );
};

export default ListPlayers;
