'use client'; // Required for client-side hooks in the App Router
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON } from '../const/style';

export default function Start() {
    const { setRedTeam, setBlueTeam, setFirst } = useCounterStore(
        (state) => state,
    )

    const TEAMS = [
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
        const newNumber = Math.random() > .5 ? 'red' : 'blue';
        setFirst(newNumber);
    };

    const handleGameStart = () => {
        setRedTeam(redTeamName);
        setBlueTeam(blueTeamName);
        coinFlip();
        router.push('/game');
    }

    const [redTeamName, setRedTeamName] = useState('');
    const [blueTeamName, setBlueTeamName] = useState('');

    const handleRedChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setRedTeamName(event.target.value);
    }

    const handleBlueChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setBlueTeamName(event.target.value);
    }


    return (
        <form>
            <div>
                <label htmlFor="red">Red</label>
                <select id="red" value={redTeamName} onChange={handleRedChange}>
                    {TEAMS.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="blue">Blue</label>
                <select id="blue" value={blueTeamName} onChange={handleBlueChange}>
                    {TEAMS.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
            </div>
            <button type='button' className={DEFAULT_BUTTON} onClick={handleGameStart} disabled={redTeamName === '' || blueTeamName === ''}>
                start game
            </button>
        </form>
        
    )
}
