import { db } from "./config";
import { updateDoc, doc } from "firebase/firestore";

import { TeamRoles } from "../types";

export const saveTestSquad = async (
  teamId: string | undefined,
  test: string,
  squad: TeamRoles
) => {
  try {
    if (!teamId) {
      throw new Error("Invalid team ID");
    }

    const docRef = doc(db, "teams", teamId);
    await updateDoc(docRef, {
      [`squad.${test}`]: squad,
      [`isSquadSelected.${test}`]: true,
    });
  } catch (error) {
    console.error("Error saving test squad:", error);
    throw new Error("Failed to save test squad");
  }
};
