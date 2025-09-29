import { createContext, ReactNode, useEffect, useState } from "react";
import { FullPlayer } from "../types";
import playersData from "../assets/ashes23-firebasemock.json";
// import { useLoading } from "../hooks/useLoading";

export const PlayersContext = createContext<FullPlayer[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<FullPlayer[]>([]);

  useEffect(() => {
    setPlayers(playersData as FullPlayer[]);
  }, []);

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};
