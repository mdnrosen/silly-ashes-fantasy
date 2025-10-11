import { createContext, ReactNode, useEffect, useState } from "react";
import { FullPlayer } from "../types";
import playersData from "../assets/ashes23-firebasemock.json";
// import { useLoading } from "../hooks/useLoading";
import { getPlayers } from "../firebase";
export const PlayersContext = createContext<FullPlayer[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<FullPlayer[]>([]);

  const fetchPlayers = async () => {
    const players = await getPlayers();
    // @ts-ignore
    setPlayers(players);
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
