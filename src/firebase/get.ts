import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { Player } from "../types";
import { sortByPoints } from "../lib/helpers";
import { Team } from "../types";
import { db } from "./config";

export const getPlayers = async (): Promise<Player[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "players"));
    const players: Player[] = [];
    querySnapshot.forEach((doc) => {
      players.push({ id: doc.id, ...(doc.data() as Player) });
    });
    return players;
  } catch (error) {
    console.error("Error getting players: ", error);
    return [];
  }
};

export const getPlayer = async (stub: string): Promise<Player | null> => {
  const playerRef = collection(db, "players");
  const q = query(playerRef, where("stub", "==", stub));
  const querySnapShot = await getDocs(q);
  if (!querySnapShot.empty) {
    const firstDoc = querySnapShot.docs[0];
    return firstDoc.data() as Player;
  }
  return null;
};

export const getTeams = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "teams"));
    const teams: Team[] = querySnapshot.docs.map((doc) => ({
      // @ts-expect-error
      id: doc.id,
      ...(doc.data() as Team),
    }));

    const final = sortByPoints(teams).map((s, i) => ({
      ...s,
      position: i + 1,
    }));
    return final;
  } catch (error) {
    console.error("Error getting teams: ", error);
    return [];
  }
};

export const getTeam = async (id: string) => {
  try {
    const docRef = doc(db, "teams", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        // @ts-expect-error
        id: docSnap.id,
        ...(docSnap.data() as Team),
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to find team with id: ${id}`);
  }
};

export const getTeamByUser = async (user: string) => {
  try {
    const docRef = collection(db, "teams");
    const q = query(docRef, where("user", "==", user));
    const querySnapShot = await getDocs(q);
    if (!querySnapShot.empty) {
      const firstDoc = querySnapShot.docs[0];
      return {
        // @ts-expect-error
        id: firstDoc.id,
        ...(firstDoc.data() as Team),
      };
    }
    console.log("user team -->>", user);
    return null;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to check for team belonging to user ${user}`);
  }
};

// {
//   "id": "3f2e1d0c-9b8a-47c6-8f7e-6d5c4b3a2f1e",
//   "teamname": "Build this man a statue",
//   "user": "drose-87",
//   "players": {
//     "bowler1": "k1l2m3n4-o5p6-7890-klmn-123456789012",
//     "bowler2": "n4o5p6q7-r8s9-0123-nopq-456789012345",
//     "batter1": "b8c9d0e1-f2g3-4567-bcde-890123456789",
//     "batter2": "w3x4y5z6-a7b8-9012-wxyz-345678901234",
//     "allrounder": "m3n4o5p6-q7r8-9012-mnop-345678901234",
//     "keeper": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
//     "wildcard": "h4i5j6k7-l8m9-0123-hijk-456789012345"
//   }
// }

// // This function poplulates the full team object by querying firebase
