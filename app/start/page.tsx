'use client'; // Required for client-side hooks in the App Router
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON, TEAM_SELECT, THEME } from '../const/style';

export default function Start() {
    const { setTeam1Name, setTeam2Name, setFirst, setTeam1Color, setTeam2Color } = useCounterStore(
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

    const THEMES = [
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose'
    ];
    
    const router = useRouter();

    const coinFlip = () => {
        const newNumber = Math.random() > .5 ? 'team1' : 'team2';
        setFirst(newNumber);
    };

    const handleGameStart = () => {
        setTeam1Name(localTeam1Name);
        setTeam2Name(localTeam2Name);
        setTeam1Color(localTeam1Color);
        setTeam2Color(localTeam2Color);
        coinFlip();
        router.push('/game');
    }

    const [localTeam1Name, setLocalTeam1Name] = useState('--- SELECT ---');
    const [localTeam2Name, setLocalTeam2Name] = useState('--- SELECT ---');
    const [localTeam1Color, setLocalTeam1Color] = useState<THEME>('red');
    const [localTeam2Color, setLocalTeam2Color] = useState<THEME>('blue');

    const handleTeam1NameChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam1Name(event.target.value);
    }

    const handleTeam2NameChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam2Name(event.target.value);
    }

    const handleTeam1ColorChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam1Color(event.target.value as THEME);
    }

    const handleTeam2ColorChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam2Color(event.target.value as THEME);
    }

    return (
        <form className='max-w-3xl px-4 mx-auto h-dvh place-content-center'>
            <h1 className='text-4xl my-4 text-center'>Set Teams</h1>
            <div className='mt-2'>
                <label htmlFor="team1name">Team 1 Name</label>
                <select className={`${TEAM_SELECT['base']}${TEAM_SELECT[localTeam1Color]}`} id="team1name" value={localTeam1Name} onChange={handleTeam1NameChange}>
                    {TEAMS.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
                <label htmlFor="team1color">Team 1 Color</label>
                <select className={`${TEAM_SELECT['base']}${TEAM_SELECT[localTeam1Color]}`} id="team1color" value={localTeam1Color} onChange={handleTeam1ColorChange}>
                    {THEMES.map((color) => (
                        <option value={color} key={color}>{color}</option>
                    ))}
                </select>
            </div>
            <div className='mt-2'>
                <label htmlFor="team2name">Team 2 Name</label>
                <select className={`${TEAM_SELECT['base']}${TEAM_SELECT[localTeam2Color]}`} id="team2name" value={localTeam2Name} onChange={handleTeam2NameChange}>
                    {TEAMS.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
                <label htmlFor="team1color">Team 2 Color</label>
                <select className={`${TEAM_SELECT['base']}${TEAM_SELECT[localTeam2Color]}`} id="team1color" value={localTeam2Color} onChange={handleTeam2ColorChange}>
                    {THEMES.map((color) => (
                        <option value={color} key={color}>{color}</option>
                    ))}
                </select>                
            </div>
            <div className='text-center mt-4'>
                <button type='button' className={DEFAULT_BUTTON} onClick={handleGameStart} disabled={localTeam1Name === '--- SELECT ---' || localTeam2Name === '--- SELECT ---'}>
                    start game
                </button>
            </div>
        </form>
    )
}
