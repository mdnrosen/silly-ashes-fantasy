import { Team, Player, TeamRoles, TeamRolesIds } from "../types";

export type TestKey =
  | "firstTest"
  | "secondTest"
  | "thirdTest"
  | "fourthTest"
  | "fifthTest";

export const getImageURL = (path: string) => {
  return new URL(path, import.meta.url).href;
};

export const calculateScoreForTest = (
  player: Player,
  test: TestKey
): number => {
  const runs = player.runs[test] || 0;
  const wickets = player.wickets[test] || 0;
  const catches = player.catches[test] || 0;
  const stumpings = player.stumpings[test] || 0;
  const runouts = player.runouts[test] || 0;
  const centuries = player.centuries[test] || 0;
  const fivewickets = player.fivewickets[test] || 0;

  return (
    runs +
    centuries * 50 +
    wickets * 20 +
    catches * 5 +
    runouts * 10 +
    stumpings * 10 +
    fivewickets * 50
  );
};

const tests: TestKey[] = [
  "firstTest",
  "secondTest",
  "thirdTest",
  "fourthTest",
  "fifthTest",
];

export const calculatePlayerScore = (player: Player): number => {
  let score = 0;
  for (const test of tests) {
    score += calculateScoreForTest(player, test);
  }
  return score;
};

export const calculateSquadScoreForTest = (
  squad: TeamRoles,
  test: TestKey
): number => {
  let total = 0;
  Object.values(squad).forEach((player) => {
    if (player) {
      total += calculateScoreForTest(player, test);
    }
  });
  return total;
};

export const calculateTeamTotalPoints = (
  team: Team,
  players: Player[]
): number => {
  let total = 0;
  tests.forEach((test) => {
    const squadIds = team.squad[test] as unknown as TeamRolesIds;
    if (squadIds) {
      const hydratedSquad = hydrateSquadWithPlayers(squadIds, players);
      total += calculateSquadScoreForTest(hydratedSquad, test);
    }
  });
  return total;
};

export const sumStat = (player: Player, stat: string): number => {
  let total = 0;
  for (const test of tests) {
    // @ts-ignore: Indexing by stat is safe for Player's StatByTest fields
    total += player[stat][test] || 0;
  }
  return total;
};

export const sortByPoints = <T extends Player | Team>(record: T[]): T[] => {
  return record.sort((a, b) => {
    const aPoints =
      "runs" in a ? calculatePlayerScore(a as Player) : a.points || 0;
    const bPoints =
      "runs" in b ? calculatePlayerScore(b as Player) : b.points || 0;
    return bPoints - aPoints;
  });
};

export const sortByTestPoints = <T extends Player | Team>(
  record: T[],
  test: TestKey
): T[] => {
  if (!test) {
    return sortByPoints(record);
  }

  return record.sort((a, b) => {
    const aPoints =
      "runs" in a
        ? calculateScoreForTest(a as Player, test)
        : calculateSquadScoreForTest(
            hydrateSquadWithPlayers(
              (a as Team).squad[test] as unknown as TeamRolesIds,
              []
            ),
            test
          );
    const bPoints =
      "runs" in b
        ? calculateScoreForTest(b as Player, test)
        : calculateSquadScoreForTest(
            hydrateSquadWithPlayers(
              (b as Team).squad[test] as unknown as TeamRolesIds,
              []
            ),
            test
          );
    return bPoints - aPoints;
  });
};

export const getBgColor = (team: string): string => {
  return team === "AUS" ? "bg-green-50" : "bg-blue-50";
};

export const getTextColor = (team: string): string => {
  return team === "AUS" ? "text-aus-green" : "text-dark-blue";
};

export const getBorderColor = (team: string): string => {
  return team === "AUS" ? "border-aus-green" : "border-dark-blue";
};

export const getTeamTextColor = (team?: string): string => {
  if (!team) return "text-dark-blue";

  switch (team) {
    case "ENG":
      return "text-dark-blue";
    case "AUS":
      return "text-aus-green";
    default:
      return "text-dark-blue";
  }
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

// AI built this function to ensure 1st, 2nd, 32nd, 101st etc formatting
export const getPositionSuffix = (position: number | undefined): string => {
  if (!position) return "";
  const lastDigit = position % 10;
  const lastTwoDigits = position % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${position}th`;
  }

  switch (lastDigit) {
    case 1:
      return `${position}st`;
    case 2:
      return `${position}nd`;
    case 3:
      return `${position}rd`;
    default:
      return `${position}th`;
  }
};

export const toSnakeCase = (name: string) => {
  return name.split(" ").join("_").toLowerCase();
};

export const formatFilterLabel = (filter: string): string => {
  if (filter === "overall") return "Overall";

  switch (filter) {
    case "firstTest":
      return "First Test";
    case "secondTest":
      return "Second Test";
    case "thirdTest":
      return "Third Test";
    case "fourthTest":
      return "Fourth Test";
    case "fifthTest":
      return "Fifth Test";
    default:
      return "Overall";
  }
};

export const testTimes = (test: string) => {
  switch (test) {
    case "firstTest":
      return {
        start: new Date("2025-11-21T02:30:00Z"),
        end: new Date("2025-11-25T10:30:00Z"),
      };
    case "secondTest":
      return {
        start: new Date("2025-12-04T04:00:00Z"),
        end: new Date("2025-12-08T12:30:00Z"),
      };
    case "thirdTest":
      return {
        start: new Date("2025-12-17T00:00:00Z"),
        end: new Date("2025-12-21T08:00:00Z"),
      };
    case "fourthTest":
      return {
        start: new Date("2025-12-25T23:30:00Z"),
        end: new Date("2025-12-30T07:00:00Z"),
      };
    case "fifthTest":
      return {
        start: new Date("2026-01-04T23:30:00Z"),
        end: new Date("2026-01-08T07:00:00Z"),
      };
    default:
      return "";
  }
};

export const getTestLabel = (test: string | undefined): string => {
  if (!test) return "";
  switch (test) {
    case "firstTest":
      return "First Test - Perth";
    case "secondTest":
      return "Second Test - Brisbane";
    case "thirdTest":
      return "Third Test - Adelaide";
    case "fourthTest":
      return "Fourth Test - Melbourne";
    case "fifthTest":
      return "Fifth Test - Sydney";
    default:
      return "";
  }
};

export const isTeamPicked = (team: Team, test: string) => {
  if (!team) return false;
  return (
    team.isSquadSelected?.[test as keyof typeof team.isSquadSelected] === true
  );
};

// Helper function to convert TeamRolesIds (with just IDs) to TeamRoles (with Player objects)
export const hydrateSquadWithPlayers = (
  squadIds: TeamRolesIds,
  players: Player[]
): TeamRoles => {
  const findPlayer = (id: string | null) => {
    if (!id) return null;
    return players.find((p) => p.id === id) ?? null;
  };

  return {
    bowler1: findPlayer(squadIds.bowler1),
    bowler2: findPlayer(squadIds.bowler2),
    batter1: findPlayer(squadIds.batter1),
    batter2: findPlayer(squadIds.batter2),
    allrounder: findPlayer(squadIds.allrounder),
    keeper: findPlayer(squadIds.keeper),
    wildcard: findPlayer(squadIds.wildcard),
  };
};

export const testHasStarted = (test: string): boolean => {
  const testTime = testTimes(test);
  if (testTime === undefined || testTime === "") return false;
  return new Date() >= new Date(testTime.start);
};
