import { createContext, ReactNode, useEffect, useState } from "react";
import { FullPlayer } from "../types";
// import { getPlayers } from "../firebase";
import dummyData from "../assets/ashes23-firebasemock.json";

export const PlayersContext = createContext<FullPlayer[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<FullPlayer[]>([]);

  const fetchPlayers = async () => {
    try {
      setPlayers(dummyData);
      // const players = await getPlayers();
      // setPlayers(players as FullPlayer[]);
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
