import { createContext, ReactNode } from "react";
import { Player } from "../types";
import playersData from "../assets/ashes23-firebasemock.json";

export const PlayersContext = createContext<Player[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const players = playersData as Player[];
  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};

