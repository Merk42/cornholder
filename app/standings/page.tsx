'use client'

import { useEffect, useMemo, useState } from "react";
import { KEYEDTEAMS, KEYEDCOLORS } from "../const/data";
import { BAG_BUTTON, BAG_BORDER } from "../const/style";
import { FULL_GAME, GAMES_API } from "../const/type";
import { useCornholeStore } from "../providers/cornhole-store-provider";
type stand = {
    id:string;
    wins:number;
    losses:number;
    draws:number;
    win_percent:number;  
    scored:number;
    allowed:number;
    diff:number;
}

export default function Standings() {

    const [games, setGames] = useState<FULL_GAME[]>([]);
    const [isCards, setIsCards] = useState<boolean>(false)
    const LEAGUE_ID = useCornholeStore((state) => state.league_id); 
    useEffect(() => {
        const fetchGames = async () => {

        try {
            // This URL points to your backend API endpoint, not the database directly
            const response = await fetch(`/pwa/cornholder/api/games.php?league_id=${LEAGUE_ID}`); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data:GAMES_API[] = await response.json();
                // setGames(data.filter(game => game.home_score !== null));
                const filteredAndMapped:FULL_GAME[] = data
                .filter(game => game.game_1_home_score !== null) // Filter: keeps only even numbers
                .map(game => ({
                    id: game.id.toString(),
                    day: game.day,
                    time: game.time,
                    board: Number(game.board),
                    visitor_id: game.visitor_id.toString(),
                    home_id: game.home_id.toString(),
                    game_1_home_score: Number(game.game_1_home_score),
                    game_1_visitor_score: Number(game.game_1_visitor_score),
                    game_2_home_score: Number(game.game_2_home_score),
                    game_2_visitor_score: Number(game.game_2_visitor_score),
                    game_3_home_score: Number(game.game_3_home_score),
                    game_3_visitor_score: Number(game.game_3_visitor_score)
                }));
                setGames(filteredAndMapped);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setIsLoading(false);
        }

        };

        fetchGames();
    }, [LEAGUE_ID]); // Empty dependency array means this runs once on mount



    const st = useMemo<stand[]>(() => {

        function homewlt(g:{
            game_1_home_score:number,
            game_1_visitor_score:number,
            game_2_home_score:number,
            game_2_visitor_score:number,
            game_3_home_score:number,
            game_3_visitor_score:number}):{w:number,l:number,t:number} {
                const RES = {
                    w:0,
                    l:0,
                    t:0
                }
                const WLT = {
                    w:0,
                    l:0,
                    t:0
                }
                if (g.game_1_home_score === g.game_1_visitor_score) {
                    WLT.t++
                } else if (g.game_1_home_score >= g.game_1_visitor_score) {
                    WLT.w++
                } else {
                    WLT.l++
                }
                if (g.game_2_home_score === g.game_2_visitor_score) {
                    WLT.t++
                } else if (g.game_2_home_score >= g.game_2_visitor_score) {
                    WLT.w++
                } else {
                    WLT.l++
                }
                if (g.game_3_home_score === g.game_3_visitor_score) {
                    WLT.t++
                } else if (g.game_3_home_score >= g.game_3_visitor_score) {
                    WLT.w++
                } else {
                    WLT.l++
                }
                if (WLT.w >= 2) {
                    RES.w = 1
                }
                if (WLT.l >= 2) {
                    RES.l = 1
                }
                if (WLT.t === 3 || (WLT.w === 1 && WLT.l === 1 && WLT.t === 1)) {
                    RES.t = 1
                }
                return RES
        }


        const INITIAL:stand = {
            id:'0',
            wins:0,
            losses:0,
            draws:0,
            win_percent:0,
            scored:0,
            allowed:0,
            diff:0
        }
        const standingmap = new Map()
        for (const GAME of games) {
        
            const HOMETEAM:stand = standingmap.get(GAME.home_id) || {...INITIAL}
            const VISITORTEAM:stand = standingmap.get(GAME.visitor_id) || {...INITIAL}
            const HID = GAME.home_id;
            const VID = GAME.visitor_id;
            const STATS = homewlt(GAME);
            const HOME_SCORED:number = Math.max(0, GAME.game_1_home_score) + Math.max(0, GAME.game_2_home_score) +  Math.max(0, GAME.game_3_home_score);
            const VISITOR_SCORED:number = Math.max(0, GAME.game_1_visitor_score) + Math.max(0, GAME.game_2_visitor_score) + Math.max(0, GAME.game_3_visitor_score);
            HOMETEAM.id = HID;
            HOMETEAM.wins = HOMETEAM.wins + STATS.w;
            HOMETEAM.losses = HOMETEAM.losses + STATS.l;
            HOMETEAM.draws = HOMETEAM.draws + STATS.t;
            HOMETEAM.win_percent = HOMETEAM.wins === 0 && HOMETEAM.losses === 0 ? 0 : Math.floor(HOMETEAM.wins / (HOMETEAM.losses + HOMETEAM.wins) * 100);
            HOMETEAM.scored = HOMETEAM.scored + HOME_SCORED;
            HOMETEAM.allowed = HOMETEAM.allowed + VISITOR_SCORED;
            HOMETEAM.diff = HOMETEAM.scored - HOMETEAM.allowed;
            VISITORTEAM.id = VID;
            VISITORTEAM.wins = VISITORTEAM.wins + STATS.l;
            VISITORTEAM.losses = VISITORTEAM.losses + STATS.w;
            VISITORTEAM.draws = VISITORTEAM.draws + STATS.t;
            VISITORTEAM.win_percent = VISITORTEAM.wins === 0 && VISITORTEAM.losses === 0 ? 0 : Math.floor(VISITORTEAM.wins / (VISITORTEAM.losses + VISITORTEAM.wins) * 100);
            VISITORTEAM.scored = VISITORTEAM.scored + VISITOR_SCORED;
            VISITORTEAM.allowed = VISITORTEAM.allowed + HOME_SCORED;
            VISITORTEAM.diff = VISITORTEAM.scored - VISITORTEAM.allowed;

            standingmap.set(GAME.home_id, HOMETEAM)
            standingmap.set(GAME.visitor_id, VISITORTEAM)
        }
        const STANDINGS_ARR = [...standingmap.values()]
        // return STANDINGS_ARR;
        return STANDINGS_ARR.sort(
    (teamA, teamB) =>
        teamB.win_percent - teamA.win_percent || // Primary sort (descending numbers)
        teamB.diff - teamA.diff         // Secondary sort (ascending strings)
)
    }, [games])

    const layout = useMemo(() => {
        if (isCards) {
            return "block before:content-[attr(data-col)] before:font-bold] before:block"
        }
        return ""
    }, [isCards])


    return (
        <div className="max-w-3xl px-4 mx-auto">
            <h1 className="text-4xl my-4 text-center">Standings</h1>
            <div className="md:hidden">
                <button onClick={() => {setIsCards(!isCards)}}>switch layout</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <tbody>
                    <tr className={isCards ? 'hidden' : ''}>
                        <th className="px-2 capitalize">name</th>
                        <th className="px-2 capitalize">wins</th>
                        <th className="px-2 capitalize">losses</th>
                        <th className="px-2 capitalize">draws</th>
                        <th className="px-2 capitalize whitespace-nowrap">win %</th>
                        <th className="px-2 capitalize">scored</th>
                        <th className="px-2 capitalize">allowed</th>
                        <th className="px-2 capitalize">diff</th>
                    </tr>
                {st.map(team => (
                    <tr key={team.id} className={`${BAG_BORDER['base']} ${BAG_BORDER[KEYEDCOLORS[team.id]]} table-row`}>
                        <td className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[team.id]]} ${layout}`}>{KEYEDTEAMS[team.id]}</td>
                        <td data-col="wins" className={`${layout} text-right px-2`}>{team.wins}</td>
                        <td data-col="losses" className={`${layout} text-right px-2`}>{team.losses}</td>
                        <td data-col="draws" className={`${layout} text-right px-2`}>{team.draws}</td>
                        <td data-col="win %" className={`${layout} text-right px-2`}>{team.win_percent}</td>
                        <td data-col="scored"className={`${layout} text-right px-2`}>{team.scored}</td>
                        <td data-col="allowed" className={`${layout} text-right px-2`}>{team.allowed}</td>
                        <td data-col="diff" className={`${layout} text-right px-2`}>{team.diff}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}