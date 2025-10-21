const fs = require("fs");

// Read the current dummyTeams.json
const teamsPath = "./src/assets/dummyTeams.json";
const playersPath = "./src/assets/ashes23-firebasemock.json";

const teams = JSON.parse(fs.readFileSync(teamsPath, "utf8"));
const players = JSON.parse(fs.readFileSync(playersPath, "utf8"));

// Helper to generate UUID
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Helper to get random player by role
function getRandomPlayerByRole(role, exclude = []) {
  const available = players.filter(
    (p) => p.role === role && !exclude.includes(p.id)
  );
  return available[Math.floor(Math.random() * available.length)];
}

// Team names and usernames
const newTeams = [
  { username: "cricket_genius_87", teamName: "Ashes Avengers" },
  { username: "spin_doctor_23", teamName: "Boundary Bandits" },
  { username: "wicket_wizard", teamName: "The Silly Mid-Offs" },
  { username: "cover_drive_king", teamName: "Baggy Green Giants" },
  { username: "reverse_sweep_lord", teamName: "Lords of The Long Room" },
];

// Generate 5 new teams
const generatedTeams = newTeams.map((teamInfo, index) => {
  const usedPlayers = [];

  // Select random players for each role
  const keeper = getRandomPlayerByRole("KEEPER", usedPlayers);
  usedPlayers.push(keeper.id);

  const batter1 = getRandomPlayerByRole("BATTER", usedPlayers);
  usedPlayers.push(batter1.id);

  const batter2 = getRandomPlayerByRole("BATTER", usedPlayers);
  usedPlayers.push(batter2.id);

  const allrounder = getRandomPlayerByRole("ALLROUNDER", usedPlayers);
  usedPlayers.push(allrounder.id);

  const bowler1 = getRandomPlayerByRole("BOWLER", usedPlayers);
  usedPlayers.push(bowler1.id);

  const bowler2 = getRandomPlayerByRole("BOWLER", usedPlayers);
  usedPlayers.push(bowler2.id);

  // Wildcard can be any role
  const wildcardRoles = ["KEEPER", "BATTER", "ALLROUNDER", "BOWLER"];
  const wildcardRole =
    wildcardRoles[Math.floor(Math.random() * wildcardRoles.length)];
  const wildcard = getRandomPlayerByRole(wildcardRole, usedPlayers);

  // Calculate totals
  const budgetUsed =
    keeper.cost +
    batter1.cost +
    batter2.cost +
    allrounder.cost +
    bowler1.cost +
    bowler2.cost +
    wildcard.cost;
  const points =
    keeper.points +
    batter1.points +
    batter2.points +
    allrounder.points +
    bowler1.points +
    bowler2.points +
    wildcard.points;

  return {
    username: teamInfo.username,
    teamName: teamInfo.teamName,
    myPlayers: {
      keeper,
      batter1,
      batter2,
      allrounder,
      bowler1,
      bowler2,
      wildcard,
    },
    id: generateUUID(),
    points,
    budgetUsed,
    position: teams.length + index + 1,
  };
});

// Add new teams to existing array
const updatedTeams = [...teams, ...generatedTeams];

// Sort by points (descending) and update positions
updatedTeams.sort((a, b) => b.points - a.points);
updatedTeams.forEach((team, index) => {
  team.position = index + 1;
});

// Write back to file
fs.writeFileSync(teamsPath, JSON.stringify(updatedTeams, null, 2));

console.log("✅ Generated 5 new teams and sorted leaderboard by points");
console.log("\nNew teams:");
generatedTeams.forEach((team, i) => {
  console.log(
    `  ${i + 1}. ${team.teamName} by @${team.username} - ${
      team.points
    } pts (Budget: $${team.budgetUsed})`
  );
});
console.log(`\nTotal teams: ${updatedTeams.length}`);
