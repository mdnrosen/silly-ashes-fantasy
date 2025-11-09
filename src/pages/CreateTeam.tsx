import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Spinner from '../components/Spinner'
import { createNewTeam } from '../firebase/post';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
const CreateTeam = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [teamname, setTeamname ] = useState<string>('');
    const _auth = useAuth();
    const _toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const team = await createNewTeam(teamname, _auth.user?.username || '');
            _toast?.success("Team created successfully");
            navigate(`/team/${team?.id}`)
        } catch (error) {
            _toast?.error("Failed to create team");
        } finally {
            setLoading(false);  
        }
    }
    return (
        <>
            {loading && <Spinner />}
            <div className="p-2 flex flex-col">
                <div className="p-4 bg-off-white">
                    <h1 className=" text-2xl uppercase">Create your team</h1>
                </div>
                <p className="text-sm font-light">Before you can continue you'll need a team yourself. Check out <Link to="/rules">the rules</Link> for how to play. Just enter the name of your team below: </p>
                <form onSubmit={(e) => handleSubmit(e)}className="my-2 flex flex-col">
                    <input className="rounded-md border-1 border-dark-blue p-2 h-10 mb-2"type="text" name="teamname" onChange={(e) => setTeamname(e.target.value)} maxLength={30} />
                    <button className="p-2 bg-aus-green text-white rounded disabled:opacity-50" disabled={teamname.length === 0}>Create Team</button>
                </form>
            </div>
        </>
    )
};

export default CreateTeam;