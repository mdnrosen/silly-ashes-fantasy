export interface Player {
  id?: string | number; // unique identifier for the player
  name: string;
  imageUrl: string;
  role: string;
  team: string;
  cost?: number
}

export interface FullPlayer extends Player {
  runs: number;
  centuries: number;
  runouts: number;
  catches: number;
  wickets: number;
  fivewickets: number;
  stumpings: number;
  points?: number;
}

export interface Team {
  user_name: string;
  teamname: string;
  total_points: number;
}

export interface FullTeam extends Team {
  batters: Player[];
  bowlers: Player[];
  allrounders: Player[];
  keepers: Player[];
  total_cost: number;
}


export interface Toast {
  type: string;
  color: string;
  icon: string
}
