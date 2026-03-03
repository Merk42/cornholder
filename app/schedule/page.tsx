'use client'; // Required for client-side hooks in the App Router
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ISOTOUS, KEYEDTEAMS, KEYEDCOLORS, RAWGAMES } from '../const/data';
import { BAG_BUTTON, DEFAULT_BUTTON } from '../const/style'
import { GAMES_API } from '../const/type';
import { useCornholeStore } from '../providers/cornhole-store-provider';

type F = {
    date:string;
    times: {
        time:string;
        games:{
            id:number;
            board:number;
            team1:number;
            team2:number;
        }[]
    }[]
}[]

export default function Schedule() {

    const [games, setGames] = useState<F>([])

        const { setGameID, setTeam1Name, setTeam2Name, setFirst, setTeam1Color, setTeam2Color } = useCornholeStore(
            (state) => state,
        )
    const LEAGUE_ID = useCornholeStore((state) => state.league_id); 
    useEffect(() => {
        
        const fetchGames = async () => {
        
        try {
            // This URL points to your backend API endpoint, not the database directly
            const response = await fetch(`/pwa/cornholder/api/games.php?league_id=${LEAGUE_ID}`); 
            if (!response.ok) {
                const F = formatGames(RAWGAMES as GAMES_API[]);
                setGames(F);
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                const F = formatGames(data as GAMES_API[]);
                setGames(F);
            }
        } catch (error) {
            console.error(error);
            const F = formatGames(RAWGAMES as GAMES_API[]);
            setGames(F);
        } finally {
            // setIsLoading(false);
        }

        };

        fetchGames();
    }, [LEAGUE_ID]); // Empty dependency array means this runs once on mount

    
    function formatGames(games:GAMES_API[]):F {
        const dateMap = new Map();
        
        games.forEach(game => {
            const date = game.day;
            const time = game.time;
            
            if (!dateMap.has(date)) {
            dateMap.set(date, new Map());
            }
            
            const timeMap = dateMap.get(date);
            if (!timeMap.has(time)) {
            timeMap.set(time, []);
            }
            
            timeMap.get(time).push({
                id: Number(game.id),
                board: Number(game.board),
                team1: Number(game.visitor_id),
                team2: Number(game.home_id)
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
        const estString = date.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            timeZoneName: 'shortOffset' // Request short GMT format, e.g., "GMT-5"
        });
        // Extract the offset from the resulting string (e.g., "GMT-5" or "GMT-4")
        const offsetMatch = estString.match(/GMT([+-]\d+)/);
        const estOffset = offsetMatch ? Number(offsetMatch[1]) : 0;
        date.setHours(date.getHours() + estOffset);

        const THURSDAY = 4;
        const currentDay = date.getDay();
        const daysToAdd = (THURSDAY - currentDay + 7) % 7; 
        const nextThursday = new Date(date);
        nextThursday.setDate(date.getDate() + daysToAdd);
        return nextThursday.toISOString().split("T")[0];
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

    const router = useRouter();

    const coinFlip = () => {
        const newNumber = Math.random() > .5 ? 'team1' : 'team2';
        setFirst(newNumber);
    };
    
    const startLeagueGame = (game_id:string|number, visitor_id:string|number, home_id:string|number) => {
        setGameID(Number(game_id));
        setTeam1Name(KEYEDTEAMS[visitor_id.toString()]);
        setTeam2Name(KEYEDTEAMS[home_id.toString()]);
        setTeam1Color(KEYEDCOLORS[visitor_id.toString()]);
        setTeam2Color(KEYEDCOLORS[home_id.toString()]);
        coinFlip();
        router.push('/game');
    };


    if (upcoming.times.length === 0) {
        return (
            <div className='max-w-3xl px-4 mx-auto text-center place-content-center'>
                <p>No upcoming games</p>
                <Link className={DEFAULT_BUTTON} href="/championship">Championship</Link>
            </div>
        )
    } else {
        return (
            <div className='max-w-3xl px-4 mx-auto text-center place-content-center'>
                <h1>{USDate}</h1>
                
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
                                    <button type='button' className={DEFAULT_BUTTON} onClick={() => startLeagueGame(game.id, game.team1, game.team2)}>start</button>
                                </div>      
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}