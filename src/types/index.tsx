export interface StatByTest {
  firstTest: number;
  secondTest: number;
  thirdTest: number;
  fourthTest: number;
  fifthTest: number;
}

export interface Player {
  id?: string; // optional as it will be populated from DB
  name: string;
  imageUrl: string;
  role: string;
  team: string;
  cost: number;
  points: number;
  stub: string;
  runs: StatByTest;
  wickets: StatByTest;
  catches: StatByTest;
  stumpings: StatByTest;
  runouts: StatByTest;
  centuries: StatByTest;
  fivewickets: StatByTest;
}

export interface Toast {
  type: string;
  color: string;
  icon: string;
}

export type TeamRoles = {
  bowler1: null | Player;
  bowler2: null | Player;
  batter1: null | Player;
  batter2: null | Player;
  allrounder: null | Player;
  keeper: null | Player;
  wildcard: null | Player;
};

export interface Team {
  id: string;
  teamname: string;
  user: string | undefined;
  points: number;
  budgetUsed: number;
  position?: number;
  isSquadSelected?: {
    firstTest: boolean;
    secondTest: boolean;
    thirdTest: boolean;
    fourthTest: boolean;
    fifthTest: boolean;
  };
  squad: {
    firstTest: TeamRoles;
    secondTest: TeamRoles;
    thirdTest: TeamRoles;
    fourthTest: TeamRoles;
    fifthTest: TeamRoles;
  };
}
