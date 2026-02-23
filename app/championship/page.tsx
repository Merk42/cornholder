'use client'

import { useEffect, useMemo, useState } from "react";
import { CHAMPIONSHIP, ISOTOUS, KEYEDCOLORS, KEYEDTEAMS } from "../const/data";
import { BAG_BUTTON } from "../const/style";
import { CHAMPIONSHIP_API, THEME } from "../const/type";

interface Champ {
    homeName: string;
    visitorName:string;
    homeColor:THEME;
    visitorColor:THEME;
    board:number;
    time:string;

    winner_game_id:string;
    winner_game_position:string;
    id: string;
}

function Matchup({match}:{match:Champ}) {
    return (
        <div className="pairing rounded-md">
            <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[match.visitorColor]} text-left`}>{match.visitorName}</div>
            <div className="px-4 text-sm">Board {match.board} @ {match.time}</div>
            <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[match.homeColor]} text-left`}>{match.homeName}</div>
        </div>
    )
}

export default function Championship() {
    const url = '/pwa/cornholder/api/championship.php';
    const intervalTime = 5000;

    const [data, setData] = useState<CHAMPIONSHIP_API[]>([])
    const fetchData = async () => {
        try {
        const response = await fetch(url);
        if (!response.ok) {
            setData(CHAMPIONSHIP)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        } catch (err) {
        // setError(err);
        console.error("Error fetching data:", err);
        setData(CHAMPIONSHIP)
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchData();

        // Set up the interval for subsequent fetches
        const timerId = setInterval(fetchData, intervalTime);

        // Clean up the interval when the component unmounts
        return () => {
        clearInterval(timerId);
        };
    }, [url, intervalTime]); // Dependencies array: re-run effect if url or intervalTime changes



    const pairedup = useMemo(() => {
        const groupedByObject = Object.groupBy(data, (product) => {
            return product.round;
        });
        const ROUNDS = 4;
        const BR:Champ[][] = [];
        // let placeholder = 65;
        for (let i = 1; i <= ROUNDS; i++) {
            const ROUND = groupedByObject[i];
            if (ROUND && ROUND.length) {
                const C:Champ[] = ROUND.map(f => {
                    return {
                        homeName: f.home_id ? KEYEDTEAMS[f.home_id] : 'TBD',
                        visitorName: f.visitor_id ? KEYEDTEAMS[f.visitor_id] : "TBD",
                        homeColor: f.home_id ? KEYEDCOLORS[f.home_id]: "base" ,
                        visitorColor:f.visitor_id ? KEYEDCOLORS[f.visitor_id] : "base",
                        board: f.board,
                        time: ISOTOUS(f.time),
                        winner_game_id: f.winner_game_id,
                        winner_game_position: f.winner_game_position,
                        id: f.id
                    }
                })
                BR.push(C)
            } else {
                const EXPONENT = ROUNDS - i;
                const ARRLENGTH = 2**EXPONENT;
                BR.push(new Array(ARRLENGTH).fill({
                        homeName:"TBD",
                        visitorName:"TBD",
                        homeColor:"",
                        visitorColor:""
                    }))
                // placeholder++;
            }
        }
        const pairArray = (arr:Champ[]) => {
            const paired = [];
            for (let i = 0; i < arr.length; i += 2) {
                // Slice two elements to create a pair
                paired.push(arr.slice(i, i + 2));
            }
            return paired;
        };


        return BR.map((column) => pairArray(column))
    }, [data])
    

    return (
        <div className={`grid grid-cols-4 gap-3`}>
            {pairedup.map((column, i) => (
                <div key={i} className="gap-8 flex flex-col justify-around pairing-col">
                    {column.map((pair, index) => (
                        // A unique key is important for React to efficiently update the DOM
                        <div key={index} className="four">
                            <Matchup match={pair[0]} />
                            {pair[1] &&
                                <Matchup match={pair[1]} />
                            }
                        </div>
                    ))}                    
                </div>
            ))}
        </div>
    )
}
