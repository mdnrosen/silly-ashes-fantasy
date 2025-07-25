import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { Player } from "../types";
import data from "../assets/ashes23.json";
import { calculatePlayerScore } from "../lib/helpers";

// help us out here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const seedDB = async (): Promise<void> => {
  try {
    for (const player of data) {
      await addToDB(player);
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
};

export const addToDB = async (player: Player): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, "players"), player);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPlayers = async (): Promise<Player[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "players"));
    const players: Player[] = [];
    querySnapshot.forEach((doc) => {
      players.push(doc.data() as Player);
    });
    // calculate scores for players
    return players.map((player) => calculatePlayerScore(player));
  } catch (error) {
    console.error("Error getting players: ", error);
    return [];
  }
};
