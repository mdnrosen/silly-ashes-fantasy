import { Player } from "../types";

export const calculatePlayerScore = (player: Player): Player => {
  let score = 0;
  score += player.runs;
  score += player.centuries * 25;
  score += player.wickets * 20;
  score += player.fivewickets * 50;
  score += player.catches * 10;
  score += player.runouts * 20;
  score += player.stumpings * 20;
  return { ...player, points: score };
};

export const sortByPoints = (players: Player[]): Player[] => {
  return players.sort((a, b) => (b.points || 0) - (a.points || 0));
};

export const getBgColor = (team: string): string => {
  return team === "AUS" ? "bg-aus-green" : "bg-dark-blue";
};

export const getBorderColor = (team: string): string => {
  return team === "AUS" ? "border-aus-green" : "border-dark-blue";
};
