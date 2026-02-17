'use client'

import { useMemo } from "react";
import { KEYEDCOLORS, KEYEDTEAMS } from "../const/data";
import { BAG_BUTTON } from "../const/style";
export default function Championship() {

    interface R {
        board:number;
        team1:string;
        team2:string
    }



    const pairedup = useMemo(() => {

        const BR:R[][] = [
            [
                {
                    board:1,
                    team1:'1',
                    team2:'2'
                },
                {
                    board:2,
                    team1:'3',
                    team2:'4'
                },
                {
                    board:3,
                    team1:'5',
                    team2:'6'
                },
                {
                    board:1,
                    team1:'7',
                    team2:'8'
                },
                {
                    board:2,
                    team1:'9',
                    team2:'10'
                },
                {
                    board:3,
                    team1:'11',
                    team2:'12'
                },
                {
                    board:1,
                    team1:'13',
                    team2:'14'
                },
                {
                    board:2,
                    team1:'15',
                    team2:'16'
                }                                    
            ],
            [
                {
                    board:1,
                    team1:'a',
                    team2:'a'
                },
                {
                    board:2,
                    team1:'b',
                    team2:'b'
                },
                {
                    board:3,
                    team1:'c',
                    team2:'c'
                },
                {
                    board:1,
                    team1:'d',
                    team2:'d'
                }
            ],
            [
                {
                    board:1,
                    team1:'e',
                    team2:'e'
                },
                {
                    board:2,
                    team1:'f',
                    team2:'f'
                }
            ],
            [
                {
                    board:1,
                    team1:'g',
                    team2:'g'
                }
            ]
        ]

        const pairArray = (arr:R[]) => {
        const paired = [];
        for (let i = 0; i < arr.length; i += 2) {
            // Slice two elements to create a pair
            paired.push(arr.slice(i, i + 2));
        }
        return paired;
        };


        return BR.map((column) => pairArray(column))
    }, [])
    

    return (
        <div className={`grid grid-cols-4 gap-3`}>
            {pairedup.map((column, i) => (
                <div key={i} className="h-dvh flex flex-col justify-around pairing-col">
                    {column.map((pair, index) => (
                        // A unique key is important for React to efficiently update the DOM
                        <div key={index} className="four">
                        
                            <div className="pairing">
                                <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[pair[0].team1]]} text-left`}>{KEYEDTEAMS[pair[0].team1]}</div>
                                <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[pair[0].team2]]} text-left`}>{KEYEDTEAMS[pair[0].team2]}</div>
                            </div>
                            {pair[1] &&
                            <div className="pairing">
                                <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[pair[1].team1]]} text-left`}>{KEYEDTEAMS[pair[1].team1]}</div>
                                <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[pair[1].team2]]} text-left`}>{KEYEDTEAMS[pair[1].team2]}</div>
                            </div>
                            }
                        </div>
                    ))}                    
                </div>
            ))}
        </div>
    )
}
