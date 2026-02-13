'use client'; // Required for client-side hooks in the App Router
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON, THEME, BAG_BORDER, BAG_BUTTON } from '../const/style';

import { RAW, TEAMS } from '../const/data';

type TEAM = {
     id:number;
    name:string;
    theme:THEME
}

type GAME = {
    id: string;
    day: string;
    time: string;
    board: string;
    visitor_id: string;
    home_id: string;
    home_score: null|number;
    visitor_score: null|number;
}

type F = {
    date:string;
    times: {
        time:string;
        games:{
            board:number;
            team1:number;
            team2:number;
        }[]
    }[]
}[]

function Schedule({onEmitData, KEYEDTEAMS, KEYEDCOLORS}:{onEmitData:(teams: number[]) => void, KEYEDTEAMS:{[k:string]:string}, KEYEDCOLORS:{[k:string]:THEME}}) {

    const [games, setGames] = useState<F>([])

    useEffect(() => {
        const fetchGames = async () => {

        try {
            // This URL points to your backend API endpoint, not the database directly
            const response = await fetch('/pwa/cornholder/api/games.php'); 
            if (!response.ok) {
                const F = formatGames(RAW as GAME[]);
                setGames(F);
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                const F = formatGames(data as GAME[]);
                setGames(F);
            }
        } catch (error) {
            console.error(error);
            const F = formatGames(RAW as GAME[]);
            setGames(F);
        } finally {
            // setIsLoading(false);
        }

        };

        fetchGames();
    }, []); // Empty dependency array means this runs once on mount

    
    function formatGames(games:GAME[]):F {
          const dateMap = new Map();
        
        games.forEach(game => {
            const date = game.day;
            const time = game.time.replace(/:/g, '').slice(0, 4);
            
            if (!dateMap.has(date)) {
            dateMap.set(date, new Map());
            }
            
            const timeMap = dateMap.get(date);
            if (!timeMap.has(time)) {
            timeMap.set(time, []);
            }
            
            timeMap.get(time).push({
            board: parseInt(game.board),
            team1: parseInt(game.visitor_id),
            team2: parseInt(game.home_id)
            });
        });
        
        // Convert Maps to arrays
        return Array.from(dateMap, ([date, timeMap]) => ({
            date,
            times: Array.from(timeMap, ([time, games]) => ({
            time,
            games
            }))
        }));      
    }

    function getNextThursday(date = new Date()) {
        const THURSDAY = 4;
        const currentDay = date.getDay();
        const daysToAdd = (THURSDAY - currentDay + 7) % 7; 
        const nextThursday = new Date(date);
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
        return games.find(game => game.date === D) || {date:"", times:[]}
    }, [games])

    const playingTeams = useMemo<number[]>(() => {
        const PLAYING = [];
        for (const TIME of upcoming.times) {
            for (const GAME of TIME.games) {
                PLAYING.push(GAME.team1);
                PLAYING.push(GAME.team2);
            }
        }
        return PLAYING
    }, [upcoming])

    const double = useMemo<number[]>(() => {
        const duplicates = playingTeams.filter((item, index, array) => {
            // Return true if the first index of the item is not the current index
            return array.indexOf(item) !== index;
        });
        return [...new Set(duplicates)]
    }, [playingTeams])

    const bye = useMemo<number[]>(() => {
        const n = 17; // The desired upper limit
        const expectedValues = Array.from({ length: n }, (_, index) => index + 1);
        const actualEntries = new Set(playingTeams); // The Set to check against
        return expectedValues.filter(item => !actualEntries.has(item));
    }, [playingTeams])

    const USDate = useMemo(() => {
        if  (!upcoming?.date) {
            return null
        }
        const date = new Date(`${upcoming.date}T12:00:00.000Z`);

        // US English format (MM/DD/YYYY)
        const enUSFormatter = new Intl.DateTimeFormat('en-US');
        return enUSFormatter.format(date); // Output: "5/24/2025"
    }, [upcoming])

    return (
        <div>
            <h1>{USDate}</h1>
            <pre></pre>
            {double.length > 0 && 
                <dl>
                    <dt className='font-bold capitalize'>double headers</dt>
                    {double.map(team => (
                        <dd key={team}>{KEYEDTEAMS[team]}</dd>
                    ))}
                </dl>
            }
            {bye.length > 0 && 
                <dl>
                    <dt className='font-bold capitalize'>byes</dt>
                    {bye.map(team => (
                        <dd key={team}>{KEYEDTEAMS[team]}</dd>
                    ))}
                </dl>
            }
            {upcoming.times.map(games => (
                <div key={games.time} className=" border-2 p-2 mb-4">
                    <h2 className='text-3xl'>{ISOTOUS(games.time)}</h2>
                    {games.games.map(game => (
                        <div key={game.board} className='flex mt-2 gap-2'>
                            <div className='flex-1'>
                                <h3 className='text-2xl'>Board {game.board}</h3>
                                <p className='flex gap-2 md:items-center items-start flex-col md:flex-row' >
                                    <span className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[game.team1]]}`}>{KEYEDTEAMS[game.team1] || ''}</span>
                                    <span className='hidden md:inline'>vs</span>
                                    <span className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[game.team2]]}`}>{KEYEDTEAMS[game.team2] || ''}</span>
                                </p>
                            </div>
                            <div className='flex-0 self-center'>
                                <button type='button' className={DEFAULT_BUTTON} onClick={() => onEmitData([game.team1, game.team2])}>start</button>
                            </div>      
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default function Start() {
    const [teams, setTeams] = useState<TEAM[]>([])


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // This URL points to your backend API endpoint, not the database directly
        const response = await fetch('/pwa/cornholder/api/teams.php'); 
        if (!response.ok) {
            setTeams(TEAMS)
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            setTeams(data);
        }
      } catch (error) {
        console.error(error);
        setTeams(TEAMS)
      } finally {
        // setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

    const KEYEDTEAMS = useMemo(() => {
        if (!teams.length) {
            return {}
        }
        return Object.fromEntries(teams.map(team => [team.id, team.name]))
    }, [teams])

    const KEYEDCOLORS = useMemo(() => {
        if (!teams.length) {
            return {}
        }
        return Object.fromEntries(teams.map(team => [team.id, team.theme]))
    }, [teams])


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
        'rose',
        'slate',
        'gray',
        'zinc',
        'neutral',
        'stone'
    ];
    
    const router = useRouter();

    const coinFlip = () => {
        const newNumber = Math.random() > .5 ? 'team1' : 'team2';
        setFirst(newNumber);
    };

    const handleGameStart = () => {
        const TEAM1NAME = KEYEDTEAMS[localTeam1ID] || '';
        const TEAM2NAME = KEYEDTEAMS[localTeam2ID] || '';
        setTeam1Name(TEAM1NAME);
        setTeam2Name(TEAM2NAME);
        setTeam1Color(localTeam1Color);
        setTeam2Color(localTeam2Color);
        coinFlip();
        router.push('/game');
    }

    const handleChildData = (dataFromChild:number[]) => {
        setTeam1Name(KEYEDTEAMS[dataFromChild[0]]);
        setTeam2Name(KEYEDTEAMS[dataFromChild[1]]);
        setTeam1Color(KEYEDCOLORS[dataFromChild[0]]);
        setTeam2Color(KEYEDCOLORS[dataFromChild[1]]);
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
            <Schedule onEmitData={handleChildData} KEYEDCOLORS={KEYEDCOLORS} KEYEDTEAMS={KEYEDTEAMS}/>
            <h1 className='text-4xl my-4 text-center'>Set Teams</h1>
            <div className={`${BAG_BORDER['base']} ${BAG_BORDER[localTeam1Color]}`}>
                <h2 className="w-full text-2xl font-bold">
                    Team 1
                </h2>
                <div className="flex-1">                                
                    <label htmlFor='team1name' className="capitalize block">name</label>
                    <select className={`${BAG_BUTTON['base']} ${BAG_BUTTON[localTeam1Color]} text-left w-full`} id="team1name" value={localTeam1ID} onChange={handleTeam1NameChange}>
                        <option value={0}>--- SELECT ---</option>
                        {teams.map((team) => (
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
                        {teams.map((team) => (
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
