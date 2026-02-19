'use client'

import { useEffect, useMemo, useState } from "react";
import { KEYEDTEAMS, KEYEDCOLORS } from "../const/data";
import { BAG_BUTTON } from "../const/style";
type stand = {
    id:string|number;
    wins:number;
    losses:number;
    draws:number;
    win_percent:number;  
    scored:number;
    allowed:number;
    diff:number;
}

type fullteam = {
    id: string;
    name: string;

}

type fullgame = {
    id: string|number,
    day: string;
    time: string;
    board: string|number;
    visitor_id:string|number;
    home_id:string|number;
    home_score:number;
    visitor_score:number;
    game_2_home_score:number;
    game_2_visitor_score:number;
    game_3_home_score:number;
    game_3_visitor_score:number;
}
export default function Standings() {

    const [games, setGames] = useState<fullgame[]>([])

    useEffect(() => {
        const fetchGames = async () => {

        try {
            // This URL points to your backend API endpoint, not the database directly
            const response = await fetch('/pwa/cornholder/api/games.php'); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data:fullgame[] = await response.json();
                setGames(data.filter(game => game.home_score !== null));
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setIsLoading(false);
        }

        };

        fetchGames();
    }, []); // Empty dependency array means this runs once on mount



    const st = useMemo<stand[]>(() => {

        function homewlt(g:{
            home_score:number,
            visitor_score:number,
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
                if (g.home_score === g.visitor_score) {
                    WLT.t++
                } else if (g.home_score >= g.visitor_score) {
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
            id:0,
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
            console.log("STATS", STATS)

            const HOME_SCORED:number = Number(GAME.home_score) + Number(GAME.game_2_home_score) +  Number(GAME.game_3_home_score);
            const VISITOR_SCORED:number = Number(GAME.visitor_score) + Number(GAME.game_2_visitor_score) + Number(GAME.game_3_visitor_score);
            HOMETEAM.id = HID;
            HOMETEAM.wins = Number(HOMETEAM.wins) + STATS.w;
            HOMETEAM.losses = Number(HOMETEAM.losses) + STATS.l;
            HOMETEAM.draws = Number(HOMETEAM.draws) + STATS.t;
            HOMETEAM.win_percent = HOMETEAM.wins === 0 && HOMETEAM.losses === 0 ? 0 : Math.floor(Number(HOMETEAM.wins) / (Number(HOMETEAM.losses) + Number(HOMETEAM.wins)) * 100);
            HOMETEAM.scored = Number(HOMETEAM.scored) + HOME_SCORED;
            HOMETEAM.allowed = Number(HOMETEAM.allowed) + VISITOR_SCORED;
            HOMETEAM.diff = HOMETEAM.scored - HOMETEAM.allowed;
            VISITORTEAM.id = VID;
            VISITORTEAM.wins = Number(VISITORTEAM.wins) + STATS.l;
            VISITORTEAM.losses = Number(VISITORTEAM.losses) + STATS.w;
            VISITORTEAM.draws = Number(VISITORTEAM.draws) + STATS.t;
            VISITORTEAM.win_percent = VISITORTEAM.wins === 0 && VISITORTEAM.losses === 0 ? 0 : Math.floor(VISITORTEAM.wins / (VISITORTEAM.losses + VISITORTEAM.wins) * 100);
            VISITORTEAM.scored = Number(VISITORTEAM.scored) + VISITOR_SCORED;
            VISITORTEAM.allowed = Number(VISITORTEAM.allowed) + HOME_SCORED;
            VISITORTEAM.diff = VISITORTEAM.scored - VISITORTEAM.allowed;

            standingmap.set(GAME.home_id, HOMETEAM)
            standingmap.set(GAME.visitor_id, VISITORTEAM)
        }
        console.log(standingmap)
        const STANDINGS_ARR = [...standingmap.values()]
        // return STANDINGS_ARR;
        return STANDINGS_ARR.sort(
    (teamA, teamB) =>
        teamB.win_percent - teamA.win_percent || // Primary sort (descending numbers)
        teamB.diff - teamA.diff         // Secondary sort (ascending strings)
)
    }, [games])


    return (
        <div>
        <div>standings</div>
        <table>
            <tbody>
            <tr>
                <th className="px-2 capitalize">name</th>
                <th className="px-2 capitalize">wins</th>
                <th className="px-2 capitalize">losses</th>
                <th className="px-2 capitalize">draws</th>
                <th className="px-2 capitalize">win %</th>
                <th className="px-2 capitalize">scored</th>
                <th className="px-2 capitalize">allowed</th>
                <th className="px-2 capitalize">diff</th>
            </tr>
        {st.map(team => (
            <tr key={team.id} className="my-2">
                <td className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[team.id]]}`}>{KEYEDTEAMS[team.id]}</td>
                <td className="text-right px-2">{team.wins}</td>
                <td className="text-right px-2">{team.losses}</td>
                <td className="text-right px-2">{team.draws}</td>
                <td className="text-right px-2">{team.win_percent}</td>
                <td className="text-right px-2">{team.scored}</td>
                <td className="text-right px-2">{team.allowed}</td>
                <td className="text-right px-2">{team.diff}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    )
}