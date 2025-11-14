import { createContext, ReactNode, useEffect, useState } from "react";

import { Team } from "../types";
import { getTeams } from "../firebase";

interface TeamContextType {
  teams: Team[] | null;
  reloadTeams: () => Promise<void>;
}

export const TeamContext = createContext<TeamContextType | null>(null);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[] | null>(null);

  const fetchTeams = async () => {
    try {
      const response = await getTeams();
      setTeams(response as Team[]);
    } catch (error) {
      console.error("Unable to retrieve teams", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider value={{ teams, reloadTeams: fetchTeams }}>
      {children}
    </TeamContext.Provider>
  );
};
