import { useState, useEffect } from 'react'
import TestSummary from '../modules/TestSummary';
import { Team } from '../types';
import Spinner from '../components/Spinner'
import { getPositionSuffix } from '../lib/helpers';
import { getTeam } from '../firebase/get';
import { useParams } from 'react-router-dom';
const TeamHome = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ team, setTeam ] = useState<Team | null>(null)
    const { teamId } = useParams()


    const fetchTeamById = async() => {
        const team = await getTeam(teamId || '');
        //@ts-ignore
        setTeam(team);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchTeamById();
    },[])

    const tests = [
        { label: 'First Test', venue: 'Perth', key: "firstTest"},
        { label: 'Second Test', venue: 'Brisbane', key: "secondTest"},
        { label: 'Third Test', venue: 'Adelaide', key: "thirdTest"},
        { label: 'Fourth Test', venue: 'Melbourne', key: "fourthTest"},
        { label: 'Fifth Test', venue: 'Sydney', key: "fifthTest"},
    ]
    return (
        <>  
            {loading && <Spinner />}
            {team && <div className="p-2 flex flex-col">
                <div className="p-2 flex flex-col justify-start align-middle">
                    <h1 className="font-semibold text-md">{team.teamname}</h1>
                    <p className="text-sm font-extralight italic">{team.user}</p>
                </div>
                <div className="p-2 flex justify-between">
                    <p>{team?.points || 0} <span className="font-extralight">points</span></p>
                    <p>{getPositionSuffix(team.position)} <span className="font-extralight">overall</span></p>
                </div>
                


                {tests.map(test => (
                    <TestSummary key={test.key} label={test.label} venue={test.venue} />
                ))}
            </div>}
        </>
    )
};



export default TeamHome;