import { createContext, ReactNode, useEffect, useState } from 'react';

import { Team } from '../types';

import { getTeams } from '../firebase';

export const TeamContext = createContext<Team[]>([]);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
    const [ teams, setTeams ] = useState<Team[]>([]);

    const fetchTeams = async() => {
        try {
            const response = await getTeams();
            setTeams(response as Team[])
        } catch (error) {
            console.error("Unable to retrieve teams", error)
        }
    }

    useEffect(() => {
        fetchTeams()
    })
    return (
        <TeamContext.Provider value={teams}>
            {children}
        </TeamContext.Provider>
    );
};