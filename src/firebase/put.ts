import { db } from "./config";
import { updateDoc, doc } from "firebase/firestore";

import { TeamRoles, TeamRolesIds } from "../types";

// Helper function to convert TeamRoles (with Player objects) to TeamRolesIds (with just IDs)
const convertSquadToIds = (squad: TeamRoles): TeamRolesIds => {
  return {
    bowler1: squad.bowler1?.id ?? null,
    bowler2: squad.bowler2?.id ?? null,
    batter1: squad.batter1?.id ?? null,
    batter2: squad.batter2?.id ?? null,
    allrounder: squad.allrounder?.id ?? null,
    keeper: squad.keeper?.id ?? null,
    wildcard: squad.wildcard?.id ?? null,
  };
};

export const saveTestSquad = async (
  teamId: string | undefined,
  test: string,
  squad: TeamRoles
) => {
  try {
    if (!teamId) {
      throw new Error("Invalid team ID");
    }

    // Convert Player objects to just IDs before saving
    const squadIds = convertSquadToIds(squad);

    const docRef = doc(db, "teams", teamId);
    await updateDoc(docRef, {
      [`squad.${test}`]: squadIds,
      [`isSquadSelected.${test}`]: true,
    });
  } catch (error) {
    console.error("Error saving test squad:", error);
    throw new Error("Failed to save test squad");
  }
};
