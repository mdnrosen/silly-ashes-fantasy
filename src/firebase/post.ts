import { db } from "./config";
import { addDoc, collection } from "firebase/firestore";
import { Player, Team } from "../types";
import data from "../assets/ashes23.json";
import { v4 as uuidv4 } from "uuid";

import teams from "../assets/teamFromDBMock.json";

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

export const saveTeam = async (team: any) => {
  try {
    const docRef = await addDoc(collection(db, "teams"), team);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving team: ", error);
  }
};

export const createNewTeam = async (teamname: string, user: string) => {
  try {
    const emptyRoles = {
      bowler1: null,
      bowler2: null,
      batter1: null,
      batter2: null,
      allrounder: null,
      keeper: null,
      wildcard: null,
    };
    const emptySquad = {
      firstTest: { ...emptyRoles },
      secondTest: { ...emptyRoles },
      thirdTest: { ...emptyRoles },
      fourthTest: { ...emptyRoles },
      fifthTest: { ...emptyRoles },
    };
    const team = {
      teamname,
      user,
      points: 0,
      budgetUsed: 0,
      position: 0,
      squad: emptySquad,
    };
    const response = await addDoc(collection(db, "teams"), team);
    return response;
  } catch (error) {
    console.error("Error creating new team:", error);
  }
};
