'use client'; // Required for client-side hooks in the App Router
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON, TEAM_SELECT } from '../const/style';

export default function Start() {
    const { team1color, team2color, setTeam1Name, setTeam2Name, setFirst } = useCounterStore(
        (state) => state,
    )

    const TEAMS = [
        "--- SELECT ---",
        "B Team",
        "Bombs Away",
        "Bumble&Fumble",
        "Business Casual",
        "Came Out Slingin",
        "Exciting Whites",
        "Floppy Bags",
        "Noga",
        "ROOT of all Problems*",
        "Shitz and Giggles (DRI-FIT)",
        "Shuck It",
        "Team 390",
        "Team Mahoney (RE-USE)",
        "The Riff Raff",
        "Tooth Girls 1 Bag",
        "UniCORNs*"
    ]
    
    const router = useRouter();

    const coinFlip = () => {
        const newNumber = Math.random() > .5 ? 'team1' : 'team2';
        setFirst(newNumber);
    };

    const handleGameStart = () => {
        setTeam1Name(team1Name);
        setTeam2Name(team2Name);
        coinFlip();
        router.push('/game');
    }

    const [team1Name, setTeam1NameName] = useState('--- SELECT ---');
    const [team2Name, setTeam2NameName] = useState('--- SELECT ---');

    const handleTeam1Change = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setTeam1NameName(event.target.value);
    }

    const handleTeam2Change = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setTeam2NameName(event.target.value);
    }


    return (
        <form className='max-w-3xl px-4 mx-auto h-dvh place-content-center'>
            <h1 className='text-4xl my-4 text-center'>Set Teams</h1>
            <div className='mt-2'>
                <label htmlFor="team1">Team 1</label>
                <select className={`${TEAM_SELECT['base']}${TEAM_SELECT[team1color]}`} id="team1" value={team1Name} onChange={handleTeam1Change}>
                    {TEAMS.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
            </div>
            <div className='mt-2'>
                <label htmlFor="team2">Team 2</label>
                <select className={`${TEAM_SELECT['base']}${TEAM_SELECT[team2color]}`} id="team2" value={team2Name} onChange={handleTeam2Change}>
                    {TEAMS.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
            </div>
            <div className='text-center mt-4'>
                <button type='button' className={DEFAULT_BUTTON} onClick={handleGameStart} disabled={team1Name === '--- SELECT ---' || team2Name === '--- SELECT ---'}>
                    start game
                </button>
            </div>
        </form>
    )
}
