import { collection, getDocs } from "firebase/firestore";
import { Player, FullPlayer } from "../types";
import { calculatePlayerScore } from "../lib/helpers";

import { db } from "./utils";

export const getPlayers = async (): Promise<Player[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "players"));
    const players: Player[] = [];
    querySnapshot.forEach((doc) => {
      players.push(doc.data() as Player);
    });
    const allPlayers = players.map((player) =>
      calculatePlayerScore(player as FullPlayer)
    );
    console.log(allPlayers);
    return allPlayers;
  } catch (error) {
    console.error("Error getting players: ", error);
    return [];
  }
};

export const getTeams = async (): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "teams"));
    const teams: any[] = [];
    querySnapshot.forEach((doc) => {
      teams.push(doc.data());
    });
    console.log(teams);
    return teams;
  } catch (error) {
    console.error("Error getting teams: ", error);
    return [];
  }
};
