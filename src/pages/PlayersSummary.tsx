import { useState, useEffect } from 'react';
import { Player } from '../types';
import PlayerCard from '../components/PlayerCard';
import playersMock from '../assets/ashes23-firebasemock.json'
import { sortByPoints } from '../lib/helpers';
// import { getPlayers } from '../firebase';


const PlayerSummary = () => {
    const [ players, setPlayers ] = useState<Player[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            // const players = await getPlayers();
            // console.log(players)
            setPlayers(sortByPoints(playersMock));
        };
        fetchPlayers();
    }, []);
    return (
        <div className="flex flex-wrap justify-center items-center p-4">
            {!!players.length && (
                players.map((player) => (
                    <PlayerCard 
                        key={player.id} 
                        player={player} 
                    />
                ))
            )}
        </div>
    )
};

export default PlayerSummary