import { useState, useEffect } from 'react';

import { Player } from '../types';
import unpickedImage from '../assets/unpicked.jpg'; // Add this import


type MyPlayers = {
  batter1: Player | null;
  batter2: Player | null;
  bowler1: Player | null;
  bowler2: Player | null;
  allrounder: Player | null;
  wicketkeeper: Player | null;
  wildcard: Player | null;
};


const Team = () => {

  const [myPlayers, setMyPlayers] = useState<MyPlayers>({
    batter1: null,
    batter2: null,
    bowler1: null,
    bowler2: null,
    allrounder: null,
    wicketkeeper: null,
    wildcard: null
  });

    useEffect(() => {
    setMyPlayers({...myPlayers, batter1: {id: 12, name: 'Marnus Labuschagne', cost: 17, team: 'AUS', role: 'BATTER', imageUrl: 'https://static-files.cricket-australia.pulselive.com/headshots/440/348-camedia.png'}})
  },[])



  const {
    batter1,
    batter2,
  } = myPlayers;

  return (
    <div className="p-4">
      <h1>Team Page</h1>

      <div className="div">
        <h2>Batters</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="border p-2 h-60 flex flex-col items-center">
            <img src={batter1 ? batter1.imageUrl : unpickedImage} alt="Batter 1" />
            <div className="py-2">
              <div>
                {batter1 ? (
                  <div className="text-lg">{batter1.name}</div>
                ) : (
                  <div className="text-lg">BATTER 1</div>
                )}
              </div>
              {!batter1 ? (
                <div className="flex">
                  <small className="text-sm">Please select a batter</small>
                </div>
              ): (
                <div className="flex justify-between">
                  <p className="text-md">{batter1?.cost}</p>
                  <p className="text-md">{batter1?.team}</p>

                </div>
              )}
            </div>
          </button>
          <button className="border p-2 h-60 flex flex-col items-center bg-amber-300">
            <img src={myPlayers.batter2 ? myPlayers.batter2.imageUrl : unpickedImage} alt="Batter 2" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Team;
