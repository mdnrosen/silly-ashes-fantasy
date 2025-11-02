export interface Player {
  id?: string | number; // unique identifier for the player
  name: string;
  imageUrl: string;
  role: string;
  team: string;
  cost: number;
  points: number;
}

export interface FullPlayer extends Player {
  runs: number;
  centuries: number;
  runouts: number;
  catches: number;
  wickets: number;
  fivewickets: number;
  stumpings: number;
}

export interface Toast {
  type: string;
  color: string;
  icon: string
}

export interface Team {
    id: string | undefined,
    teamname: string,
    user: string | undefined,
    totalPoints?: number,
    budgetUsed: number,
    players?: {
        bowler1: string | Player | null,
        bowler2: string | Player | null,
        batter1: string | Player | null,
        batter2: string | Player | null,
        allrounder: string | Player | null,
        keeper: string | Player | null,
        wildcard: string | Player | null
    }
};