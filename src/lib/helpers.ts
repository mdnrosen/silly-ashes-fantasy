import { FullPlayer } from "../types";

export const getImageURL = (path: string) => {
  return new URL(path, import.meta.url).href;
};

export const calculatePlayerScore = (player: FullPlayer): FullPlayer => {
  let score = 0;
  score += player.runs;
  score += player.centuries * 50;
  score += player.wickets * 20;
  score += player.fivewickets * 50;
  score += player.catches * 5;
  score += player.runouts * 20;
  score += player.stumpings * 20;
  return { ...player, points: score };
};

export const sortByPoints = (players: FullPlayer[]): FullPlayer[] => {
  return players.sort((a, b) => (b.points || 0) - (a.points || 0));
};

export const getBgColor = (team: string): string => {
  return team === "AUS" ? "bg-aus-green" : "bg-dark-blue";
};

export const getTextColor = (team: string): string => {
  return team === "AUS" ? "text-aus-green" : "text-dark-blue";
};

export const getBorderColor = (team: string): string => {
  return team === "AUS" ? "border-aus-green" : "border-dark-blue";
};

export const firstName = (name: string): string => name.split(" ")[0];

export const lastName = (name: string): string => name.split(" ")[1];

export const getTitle = (role: string) => {
  switch (role) {
    case "batter1":
      return "BATTER 1";
    case "batter2":
      return "BATTER 2";
    case "bowler1":
      return "BOWLER 1";
    case "bowler2":
      return "BOWLER 2";
    case "allrounder":
      return "ALLROUNDER";
    case "keeper":
      return "KEEPER";
    case "wildcard":
      return "WILD CARD";
    default:
      return "";
  }
};

export const getSelectMessage = (role: string) => {
  switch (role) {
    case "batter1":
    case "batter2":
      return "Select a batter";
    case "bowler1":
    case "bowler2":
      return "Select a bowler";
    case "allrounder":
      return "Select an allrounder";
    case "keeper":
      return "Select a keeper";
    case "wildcard":
      return "Select a wild card";
    default:
      return "";
  }
};
