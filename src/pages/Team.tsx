import { useState, useEffect, useContext } from 'react';

import { Player } from '../types';

import PlayerSelection from '../modules/PlayerSelection';
import SelectPlayer from '../components/SelectPlayer'

import { PlayersContext } from '../context/PlayersContext';

export type MyPlayers = {
  batter1: Player | null;
  batter2: Player | null;
  bowler1: Player | null;
  bowler2: Player | null;
  allrounder: Player | null;
  keeper: Player | null;
  wildcard: Player | null;
};

const Team = () => {
  const playersList = useContext(PlayersContext)

  const [myPlayers, setMyPlayers] = useState<MyPlayers>({
    batter1: null,
    batter2: null,
    bowler1: null,
    bowler2: null,
    allrounder: null,
    keeper: null,
    wildcard: null
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [selectionModalOpen, setSelectionModalOpen] = useState<boolean>(false);
  const [budget, setBudget] = useState<number>(100);
  const [selection, setSelection] = useState<string>('');
  //   useEffect(() => {
  //   setMyPlayers({...myPlayers, batter1: {id: 12, name: 'Marnus Labuschagne', cost: 17, team: 'AUS', role: 'BATTER', imageUrl: 'https://static-files.cricket-australia.pulselive.com/headshots/440/348-camedia.png'}})
  // },[])


  useEffect(() => {
    setSelected(Object.values(myPlayers).filter(p => p !== null).map(p => p!.id!.toString()));
  }, [myPlayers]);

  const openSelectionModal = (selection: string) => {
    setSelection(selection);
    setSelectionModalOpen(true);
  };
  const closeSelectionModal = () => setSelectionModalOpen(false);



const batterRoles: (keyof MyPlayers)[] = ['batter1', 'batter2'];
const bowlerRoles: (keyof MyPlayers)[] = ['bowler1', 'bowler2'];
const keeperAllrounderRoles: (keyof MyPlayers)[] = ['allrounder', 'keeper'];


  return (
    <>
    <div className="p-4">
      <input type="text" className="outline-1 w-full my-4 h-10 px-2" placeholder="Team name" onChange={(e) => setTeamName(e.target.value)} />
        <div className="grid grid-cols-2 gap-4 my-2">
          {batterRoles.map((role) => (
            <SelectPlayer 
              role={role}
              myPlayers={myPlayers}
              openSelectionModal={openSelectionModal}
            />
          ))}
        </div>
          <hr />
          <div className="grid grid-cols-2 gap-4 my-2">
          {bowlerRoles.map((role) => (
          <SelectPlayer 
              role={role}
              myPlayers={myPlayers}
              openSelectionModal={openSelectionModal}
            />
          ))}
        </div>

          <hr />
          <div className="grid grid-cols-2 gap-4 my-2">
          {keeperAllrounderRoles.map((role) => (
          <SelectPlayer 
              role={role}
              myPlayers={myPlayers}
              openSelectionModal={openSelectionModal}
            />
          ))}
        </div>
          
          <div>
            <SelectPlayer 
              role={'wildcard'}
              myPlayers={myPlayers}
              openSelectionModal={openSelectionModal}
            />
          </div>

    </div>
    {selectionModalOpen && (
      <PlayerSelection
        isOpen={selectionModalOpen}
        role={selection.replace(/[0-9]/g, '').toUpperCase()}
        players={playersList}
        selected={selected}
        selection={selection}
        budget={budget}
        savePlayer={(player, selection) => {
          setMyPlayers({ ...myPlayers, [selection]: player });
          closeSelectionModal();
        }}
        closeModal={closeSelectionModal}
      />
    )}
    </>
  );
};

export default Team;
