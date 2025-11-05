export interface Player {
  id?: string;
  name: string;
  imageUrl: string;
  role: string;
  team: string;
  cost: number;
  points?: number;
  stub: string;
  runs: number;
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
  id: string;
  teamname: string,
  user: string | undefined;
  points: number;
  budgetUsed: number;
  position?: number;
  players: {
    bowler1: null | Player;
    bowler2: null | Player;
    batter1: null | Player;
    batter2: null | Player;
    allrounder: null | Player;
    keeper: null | Player;
    wildcard: null | Player;
  }
}