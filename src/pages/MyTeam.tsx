import { useState } from "react";

const alreadyHasTeam = false; // Placeholder for team check logic
const user = {
  id: "12345", // Placeholder for user ID
  username: "John Doe Cricket", // Placeholder for user name
};

const Team = () => {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit team creation logic
    console.log("Creating team:", { teamName, username: user.username });
  };

  if (!alreadyHasTeam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-dark-blue px-4">
        <div className="bg-off-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center text-dark-blue">
            Silly Ashes - Fantasy!
          </h1>
          <p className="text-blue mb-6 text-center">
            Hello{" "}
            <span className="font-semibold text-dark-blue">
              {user.username}
            </span>
            ! Let's set up your fantasy cricket team to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-blue mb-2"
              >
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 border border-mid-blue rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent bg-off-white text-dark-blue"
                placeholder="Enter your team name"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-aus-green text-off-white py-2 px-4 rounded-md hover:bg-dark-blue focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2 transition duration-200"
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-blue">
      <h1 className="text-3xl font-bold mb-6 text-off-white">Team Page</h1>
      <p className="text-lg text-light-blue">This is the team page content.</p>
    </div>
  );
};

export default Team;
