'use client'

import { useMemo } from "react";
import { KEYEDCOLORS, KEYEDTEAMS } from "../const/data";
import { BAG_BUTTON } from "../const/style";
export default function Championship() {

    interface R {
        round?:number;
        board?:number;
        team1:string;
        team2:string
    }

    const pairedup = useMemo(() => {
        const DB = [
            {
                round:1,
                team1:'12',
                team2:'10'
            },
            {
                round:1,
                team1:'7',
                team2:'6'
            },
            {
                round:1,
                team1:'13',
                team2:'15'
            },
            {
                round:1,
                team1:'7',
                team2:'2'
            },
            {
                round:1,
                team1:'8',
                team2:'3'
            },
            {
                round:1,
                team1:'14',
                team2:'17'
            },
            {
                round:1,
                team1:'5',
                team2:'16'
            },
            {
                round:1,
                team1:'11',
                team2:'9'
            }
        ]
        const groupedByObject = Object.groupBy(DB, (product) => {
            return product.round;
        });
        const ROUNDS = 4;
        const BR:R[][] = [];
        let placeholder = 65;
        for (let i = 1; i <= ROUNDS; i++) {
            if (groupedByObject[i]?.length) {
                BR.push(groupedByObject[i] || [])
            } else {
                const EXPONENT = ROUNDS - i;
                const ARRLENGTH = 2**EXPONENT;
                BR.push(new Array(ARRLENGTH).fill({team1:String.fromCharCode(placeholder),team2:String.fromCharCode(placeholder)}))
                placeholder++;
            }
        }
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
                <div key={i} className="gap-8 flex flex-col justify-around pairing-col">
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
