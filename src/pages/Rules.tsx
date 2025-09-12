const Rules = () => {
  return (
    <div className="animate-fade-in min-h-screen bg-off-white text-dark-blue px-4 py-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-blue p-6 rounded-lg mb-8 text-off-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            TEAM SELECTION
          </h2>
          <div className="flex justify-center">
            <div>
              <h3 className="text-xl font-bold mb-4 text-light-blue">
                TEAM COMPOSITION
              </h3>
              <ul className="space-y-2">
                <li>• 2 Batters</li>
                <li>• 2 Bowlers</li>
                <li>• 1 All-rounder</li>
                <li>• 1 Wicket-keeper</li>
                <li>• 1 Wildcard (any position)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-aus-green p-6 rounded-lg mb-8 border-2 border-dark-blue text-off-white">
          <h2 className="text-2xl font-bold mb-4 text-center">⚠️ IMPORTANT</h2>
          <p className="text-xl text-center font-semibold">FIVE TRANSFERS</p>
          <p className="text-center mt-2">
            At any point (except during a Test) you can use a transfer. But you
            only have 5 total over the whole tournament. Use them wisely
          </p>
        </div>

        {/* Scoring System */}
        <div className="bg-dark-blue p-6 rounded-lg text-off-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            SCORING SYSTEM
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Batting Points */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-light-blue">
                BATTING
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Each Run</span>
                  <span className="font-bold">+1 point</span>
                </li>
                <li className="flex justify-between">
                  <span>Century (100+ runs)</span>
                  <span className="font-bold">+50 points</span>
                </li>
              </ul>
            </div>

            {/* Bowling Points */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-light-blue">
                BOWLING
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Each Wicket</span>
                  <span className="font-bold">+20 points</span>
                </li>
                <li className="flex justify-between">
                  <span>5 Wicket Haul</span>
                  <span className="font-bold">+50 points</span>
                </li>
              </ul>
            </div>

            {/* Fielding Points */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-light-blue">
                FIELDING
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Each Catch</span>
                  <span className="font-bold">+5 points</span>
                </li>
                <li className="flex justify-between">
                  <span>Each Stumping</span>
                  <span className="font-bold">+20 points</span>
                </li>
                <li className="flex justify-between">
                  <span>Each Run Out</span>
                  <span className="font-bold">+20 points</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-light-blue p-3 rounded-lg mt-4 text-dark-blue">
            <p className="text-center text-sm">
              <strong>Note:</strong> All players earn points for every action
              they perform on the field. A batter can score bowling points if
              they take wickets, and a bowler can earn batting points for runs
              scored. However, you can only select players based on their
              designated positions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
