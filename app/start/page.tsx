'use client'; // Required for client-side hooks in the App Router
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON, THEME, BAG_BORDER, BAG_BUTTON } from '../const/style';

import { TEAMS, GAMES } from '../const/data';

function Schedule({onEmitData}) {

    function getNextThursday(date = new Date()) {
        // Thursday is represented by 4
        const THURSDAY = 4;
        const currentDay = date.getDay();
        // Calculate the number of days until the next Thursday
        // If today is Thursday, it returns the Thursday in the current week. 
        // If you need the next Thursday (i.e. next week), you can adjust the logic slightly.
        const daysToAdd = (THURSDAY - currentDay + 7) % 7; 
        
        // Create a new Date object to avoid modifying the original date
        const nextThursday = new Date(date);
        // Set the date by adding the calculated days
        nextThursday.setDate(date.getDate() + daysToAdd);
        
        return nextThursday.toISOString().split("T")[0];
    }

    const ISOTOUS = (ISO:string) => {
        const MIN = ISO[2] + ISO[3];
        const HR = Number(ISO[0] + ISO[1])
        const AMPM = HR >= 12 ? 'PM' : 'AM';
        return `${HR % 12}:${MIN} ${AMPM}`
    }

    const upcoming = useMemo(() => {
        const D =  getNextThursday();
        return GAMES.find(game => game.date === D) || {date:"", times:[]}
    }, [])

    return (
        <div>
            {upcoming.times.map(games => (
                <div key={games.time} className=" border-2 p-2 mb-4">
                    <h1 className='text-3xl'>{ISOTOUS(games.time)}</h1>
                    {games.games.map(game => (
                        <div key={game.board} className='flex mt-2'>
                            <div className='flex-1'>
                                 <h2 className='text-2xl'>Board {game.board}</h2>
                                <p>{TEAMS.find(team => team.id === game.team1)?.name || ''} vs {TEAMS.find(team => team.id === game.team2)?.name || ''}</p>
                            </div>
                            <div className='flex-0'>
                                <button type='button' onClick={() => onEmitData([game.team1, game.team2])}>start</button>
                            </div>      
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default function Start() {
    const { setTeam1Name, setTeam2Name, setFirst, setTeam1Color, setTeam2Color } = useCounterStore(
        (state) => state,
    )

    const THEMES:THEME[] = [
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
        const TEAM1NAME = TEAMS.find(team => team.id === localTeam1ID)?.name || '';
        const TEAM2NAME = TEAMS.find(team => team.id === localTeam2ID)?.name || '';
        setTeam1Name(TEAM1NAME);
        setTeam2Name(TEAM2NAME);
        setTeam1Color(localTeam1Color);
        setTeam2Color(localTeam2Color);
        coinFlip();
        router.push('/game');
    }

    const handleChildData = (dataFromChild:number[]) => {
        const TEAM1 = TEAMS.find(team => team.id === dataFromChild[0]) || {id: dataFromChild[0], name:"", theme:'base'};
        const TEAM2 = TEAMS.find(team => team.id === dataFromChild[1]) || {id: dataFromChild[1], name:"", theme:'base'};
        setTeam1Name(TEAM1.name);
        setTeam2Name(TEAM2.name);
        setTeam1Color(TEAM1.theme || 'base');
        setTeam2Color(TEAM2.theme || 'base');
        coinFlip();
        router.push('/game');
    };

    const [localTeam1ID, setLocalTeam1ID] = useState(0);
    const [localTeam2ID, setLocalTeam2ID] = useState(0);
    const [localTeam1Color, setLocalTeam1Color] = useState<THEME>('red');
    const [localTeam2Color, setLocalTeam2Color] = useState<THEME>('blue');

    const handleTeam1NameChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam1ID(Number(event.target.value));
    }

    const handleTeam2NameChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam2ID(Number(event.target.value));
    }

    const handleTeam1ColorChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam1Color(event.target.value as THEME);
    }

    const handleTeam2ColorChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLocalTeam2Color(event.target.value as THEME);
    }

    return (
        <form className='max-w-3xl px-4 mx-auto h-dvh place-content-center'>
            <Schedule onEmitData={handleChildData}/>
            <h1 className='text-4xl my-4 text-center'>Set Teams</h1>
            <div className={`${BAG_BORDER['base']} ${BAG_BORDER[localTeam1Color]}`}>
                <h2 className="w-full text-2xl font-bold">
                    Team 1
                </h2>
                <div className="flex-1">                                
                    <label htmlFor='team1name' className="capitalize block">name</label>
                    <select className={`${BAG_BUTTON['base']} ${BAG_BUTTON[localTeam1Color]} text-left w-full`} id="team1name" value={localTeam1ID} onChange={handleTeam1NameChange}>
                        <option value={0}>--- SELECT ---</option>
                        {TEAMS.map((team) => (
                            <option value={team.id} key={team.id}>{team.name}</option>
                        ))}
                    </select>                               
                    <label htmlFor='team1color' className="capitalize block">color</label>
                    <select className={`${BAG_BUTTON['base']} ${BAG_BUTTON[localTeam1Color]} text-left w-full`} id="team1color" value={localTeam1Color} onChange={handleTeam1ColorChange}>
                        {THEMES.map((color) => (
                            <option value={color} key={color}>{color}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={`${BAG_BORDER['base']} ${BAG_BORDER[localTeam2Color]}`}>
                <h2 className="w-full text-2xl font-bold">
                    Team 2
                </h2>
                <div className="flex-1">                                
                    <label htmlFor='team2name' className="capitalize block">name</label>
                    <select className={`${BAG_BUTTON['base']} ${BAG_BUTTON[localTeam2Color]} text-left w-full`} id="team2name" value={localTeam2ID} onChange={handleTeam2NameChange}>
                        <option value={0}>--- SELECT ---</option>
                        {TEAMS.map((team) => (
                            <option value={team.id} key={team.id}>{team.name}</option>
                        ))}
                    </select>                               
                    <label htmlFor='team2color' className="capitalize block">color</label>
                    <select className={`${BAG_BUTTON['base']} ${BAG_BUTTON[localTeam2Color]} text-left w-full`} id="team2color" value={localTeam2Color} onChange={handleTeam2ColorChange}>
                        {THEMES.map((color) => (
                            <option value={color} key={color}>{color}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='text-center mt-4'>
                <button type='button' className={DEFAULT_BUTTON} onClick={handleGameStart} disabled={localTeam1ID === 0 || localTeam2ID === 0}>
                    start game
                </button>
            </div>
        </form>
    )
}
