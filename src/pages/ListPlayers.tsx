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
  return (
    <>
      {_loading.active && <Spinner />}
      <div className="bg-off-white p-2 pb-16">
        <div className="p-2 flex">
          <h1 className="text-2xl uppercase">PLAYERS</h1>
        </div>
        <div className="flex flex-col justify-center items-center p-2">
          {!!sortedPlayers.length &&
            sortedPlayers.map((player) => (
              <PlayerCard key={player.id} player={player as Player} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ListPlayers;
