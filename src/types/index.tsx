export interface Player {
    id?: string; // unique identifier for the player
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
  price?: number; // to be used later when we figure out fantasy teams
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