import dummyTeams from "../assets/dummyTeams.json";
const currentUser = "Harry23";

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-off-white text-dark-blue px-4 py-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Current User's Position */}
        {(() => {
          const userTeam = dummyTeams.find(
            (team) => team.username === currentUser
          );
          const userPosition =
            dummyTeams.findIndex((team) => team.username === currentUser) + 1;

          if (userTeam) {
            return (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-aus-green mb-2">
                  YOUR TEAM
                </h2>
                <div className="bg-aus-green text-off-white p-6 rounded-lg shadow-md flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Ranking */}
                    <div className="flex-shrink-0">
                      <span className="text-xl md:text-2xl font-bold text-off-white">
                        #{userPosition}
                      </span>
                    </div>

                    {/* Team Info */}
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1 text-off-white">
                        {userTeam.teamname}
                      </h2>
                      <p className="text-off-white opacity-75 text-sm md:text-base">
                        {userTeam.username}
                      </p>
                    </div>
                  </div>

                  {/* Total Score */}
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-off-white">
                      {userTeam.totalScore}
                    </div>
                    <div className="text-sm text-off-white opacity-75">
                      points
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* Dashed border separator */}
        <div className="border-t-2 border-dashed border-mid-blue mb-6"></div>

        <div className="space-y-4">
          {dummyTeams.map((team, index) => (
            <div
              key={`${team.username}-${team.teamname}`}
              className="bg-dark-blue text-off-white p-6 rounded-lg shadow-md flex items-center justify-between"
            >
              <div className="flex items-center space-x-6">
                {/* Ranking */}
                <div className="flex-shrink-0">
                  <span className="text-xl md:text-2xl font-bold text-off-white">
                    #{index + 1}
                  </span>
                </div>

                {/* Team Info */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1 text-off-white">
                    {team.teamname}
                  </h2>
                  <p className="text-off-white opacity-75 text-sm md:text-base">
                    {team.username}
                  </p>
                </div>
              </div>

              {/* Total Score */}
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-off-white">
                  {team.totalScore}
                </div>
                <div className="text-sm text-off-white opacity-75">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
