import { useState, useEffect } from 'react';
import { Player } from '../types';
import PlayerCard from '../components/PlayerCard';

import { getPlayers } from '../firebase';


const PlayerSummary = () => {
    const [ players, setPlayers ] = useState<Player[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const players = await getPlayers();
            setPlayers(players);
        };
        fetchPlayers();
    }, []);
    return (
        <div>
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