'use client'; // Required for client-side hooks in the App Router
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ISOTOUSDATE, ISOTOUSTIME, KEYEDTEAMS, KEYEDCOLORS, RAWGAMES } from '../const/data';
import { BAG_BUTTON, DEFAULT_BUTTON } from '../const/style'
import { GAMES_API } from '../const/type';
import { useCornholeStore } from '../providers/cornhole-store-provider';
import LeagueFooter from '../_components/league-footer';
import Summary from './_components/summary';
import { FULL_GAME } from '../const/type';

type F = {
    date:string;
    times: {
        time:string;
        games:FULL_GAME[]
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
                day: game.day,
                time: game.time,
                board: Number(game.board),
                visitor_id: Number(game.visitor_id),
                home_id: Number(game.home_id),
                game_1_home_score: Number(game.game_1_home_score),
                game_1_visitor_score: Number(game.game_1_visitor_score),
                game_2_home_score: Number(game.game_2_home_score),
                game_2_visitor_score: Number(game.game_2_visitor_score),
                game_3_home_score: Number(game.game_3_home_score),
                game_3_visitor_score: Number(game.game_3_visitor_score)
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


    return (
        <div className='max-w-3xl px-4 mx-auto text-center place-content-center'>
            <main className="pb-12">
                {games.map((day) => (
                    <div key={day.date} className='pt-8'>
                        <h2 className='text-4xl'>{ISOTOUSDATE(day.date)}</h2>
                        {day.times.map(games => (
                            <div key={games.time} className=" border-2 p-2 mb-4">
                                <h3 className='text-3xl'>{ISOTOUSTIME(games.time)}</h3>
                                {games.games.map(game => (
                                    <div key={game.board} className='flex mt-2 gap-2'>
                                        <div className='flex-1'>
                                            <h3 className='text-2xl'>Board {game.board}</h3>
                                            <p className='flex gap-2 md:items-center items-start flex-col md:flex-row' >
                                                <span className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[game.visitor_id]]}`}>{KEYEDTEAMS[game.visitor_id] || ''}</span>
                                                <span className='hidden md:inline'>vs</span>
                                                <span className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[game.home_id]]}`}>{KEYEDTEAMS[game.home_id] || ''}</span>
                                            </p>
                                        </div>
                                        <div className='flex-0 self-center'>
                                            {game.game_1_home_score === 0 && game.game_1_visitor_score === 0 ?
                                                <button type='button' className={DEFAULT_BUTTON} onClick={() => startLeagueGame(game.id, game.visitor_id, game.home_id)}>start</button>
                                            :
                                                <Summary game={game}/>
                                            }                                            
                                        </div>      
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </main>
            <LeagueFooter/>
        </div>
    )
    
}