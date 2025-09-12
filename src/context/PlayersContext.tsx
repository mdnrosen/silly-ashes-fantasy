import { createContext, ReactNode, useEffect, useState } from "react";
import { Player } from "../types";
import playersData from "../assets/ashes23-firebasemock.json";
// import { useLoading } from "../hooks/useLoading";

export const PlayersContext = createContext<Player[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  // const _loading = useLoading();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(playersData as Player[]);
  }, []);

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};
