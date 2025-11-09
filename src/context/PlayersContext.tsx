import { createContext, ReactNode, useEffect, useState } from "react";
import { Player } from "../types";
import { getPlayers } from "../firebase";

export const PlayersContext = createContext<Player[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const players = await getPlayers();
      setPlayers(players as Player[]);
    } catch (error) {
      console.error("Unable to retrieve players", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};
