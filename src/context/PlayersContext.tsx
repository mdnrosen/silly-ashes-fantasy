import { createContext, ReactNode, useEffect, useState } from "react";
import { FullPlayer } from "../types";
import playersData from "../assets/ashes23-firebasemock.json";
import { getPlayers } from "../firebase";
import { useLoading } from '../hooks/useLoading';

export const PlayersContext = createContext<FullPlayer[]>([]);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<FullPlayer[]>([]);
  const _loading = useLoading();

  const fetchPlayers = async () => {
    try {
      _loading.start();
      setTimeout(() => {
        console.log('Loading...')
      },3000)
      const players = await getPlayers();
      setPlayers(players as FullPlayer[]);
    } catch (error) {
      console.error('Unable to retrieve players', error)
    } finally {
      _loading.stop();
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
