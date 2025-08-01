export interface Player {
    id?: string | number; // unique identifier for the player
  name: string;
  imageUrl: string;
  role: string;
  team: string;
  runs: number;
  centuries: number;
  runouts: number;
  catches: number;
  wickets: number;
  fivewickets: number;
  stumpings: number;
  points?: number;
  cost?: number; 
};


export interface Team {
    user_name: string;
    teamname: string;
    batters: Player[];
    bowlers: Player[];
    allrounders: Player[];
    keepers: Player[];
    total_points: number;
    total_cost: number;
};