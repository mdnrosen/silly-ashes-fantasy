import { useContext, useEffect } from "react";
import { PlayersContext } from "../context/PlayersContext.tsx";
import { sortByPoints } from "../lib/helpers";
import PlayerCard from "../components/PlayerCard";
import { useLoading } from "../hooks/useLoading.ts";
import Spinner from "../components/Spinner.tsx";
import { Player } from "../types/index.tsx";

const ListPlayers = () => {
  const players = useContext(PlayersContext);
  const sortedPlayers = sortByPoints(players);
  const _loading = useLoading();

  useEffect(() => {
    if (players.length === 0) {
      _loading.start();
    } else {
      _loading.stop();
    }
  }, [players, _loading.active]);
  console.log(players)
  return (
    <>
      {_loading.active && <Spinner />}

      <div className="flex flex-wrap justify-center items-center p-2 mb-4">
        {!!sortedPlayers.length &&
          sortedPlayers.map((player) => (
            <PlayerCard key={player.id} player={player as Player} />
          ))}
      </div>
    </>
  );
};

export default ListPlayers;
