import { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { PlayersContext } from '../context/PlayersContext';
import { getBgColor, getBorderColor } from '../lib/helpers';


const PlayerProfile = (): JSX.Element => {
    const { playerId } = useParams<{ playerId: string }>();
    const players = useContext(PlayersContext);
    console.log(players)
    const player = players.find((p) => p.id?.toString() === playerId);
    console.log(player);
    if (!player) {
        return <div>Player not found</div>;
    }

    return (
        <div className="p-2 flex flex-col w-xl mx-auto pt-10">
            <div className={`border-6 ${getBorderColor(player.team)} rounded-2xl bg-white`}>

            <div className=" flex justify-between h-150 p-4" style={{ backgroundImage: `url(${player.imageUrl})`, backgroundSize: 'cover', objectPosition: 'top' }}>
                
                <div className="flex flex-col">
                    <h1 className="text-2xl">{player.name.split(' ')[0]}</h1>
                    <strong><h1 className="text-2xl">{player.name.split(' ')[1].toUpperCase()}</h1></strong>
                    <small>{player.role}</small>
                </div>
                <div>
                    <h1 className="text-4xl">{player.points}pts</h1>

                </div>
            </div>
           <div className={`p-4 ${getBgColor(player.team)} text-off-white`}>
                <div className="flex mb-3">
                    <div className="flex flex-col justify-center w-1/3 text-center">
                        <h1 className="text-3xl">{player.runs}</h1>
                        <small>RUNS</small>
                    </div>
                    <div className="flex flex-col justify-center w-1/3 text-center">
                        <h1 className="text-3xl">{player.centuries}</h1>
                        <small>{player.centuries === 1 ? 'CENTURY' : 'CENTURIES'}</small>
                    </div>
                    <div className="flex flex-col justify-center w-1/3 text-center">
                        <h1 className="text-3xl">{player.catches}</h1>
                        <small>{player.catches === 1 ? 'CATCH' : 'CATCHES'}</small>
                    </div>
                </div>
                                <div className="flex">
                    <div className="flex flex-col justify-center w-1/3 text-center">
                        <h1 className="text-2xl">{player.wickets}</h1>
                        <small>{player.wickets === 1 ? 'WICKET' : 'WICKETS'}</small>
                    </div>
                    <div className="flex flex-col justify-center w-1/3 text-center">
                        <h1 className="text-2xl">{player.runouts}</h1>
                        <small>{player.runouts === 1 ? 'RUN OUT' : 'RUN OUTS'}</small>
                    </div>
                    <div className="flex flex-col justify-center w-1/3 text-center">
                        <h1 className="text-2xl">{player.fivewickets}</h1>
                        <small>{player.fivewickets === 1 ? 'FIVE-FOR' : 'FIVE-FORS'}</small>
                    </div>
                    {/* <div className="flex flex-col justify-center w-1/4 text-center">
                        <h1 className="text-2xl">{player.stumpings}</h1>
                        <small>STUMPINGS</small>
                    </div> */}
                </div>
                <div className="div">
                </div>
            </div>
            </div>
        </div>
    )
};

export default PlayerProfile;