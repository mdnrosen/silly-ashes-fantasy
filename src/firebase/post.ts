import { db } from "./utils";
import { addDoc, collection } from "firebase/firestore";
import { Player } from "../types";
import data from "../assets/ashes23.json";
import { v4 as uuidv4 } from "uuid";

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

// seedDB();

export const addToDB = async (player: Player): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, "players"), player);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const saveTeam = async (team: any) => {
  try {
    team.id = uuidv4();
    const docRef = await addDoc(collection(db, "teams"), team);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving team: ", error);
  }
};
