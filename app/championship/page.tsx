'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { CHAMPIONSHIP, ISOTOUS, KEYEDCOLORS, KEYEDTEAMS } from "../const/data";
import { BAG_BUTTON, DEFAULT_BUTTON } from "../const/style";
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
    home_id:string;
    visitor_id:string;
    division:string;
}
const url = '/pwa/cornholder/api/championship.php';


function Modal({ openModal, closeModal, children }:{openModal:boolean, closeModal:() => void, children:React.ReactNode}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
        className=" mx-auto my-auto p-4 rounded-lg shadow-xl backdrop:bg-gray-400/50"
        ref={ref}
        onCancel={closeModal}
    >
      {children}
      <button onClick={closeModal}>
        Close
      </button>
    </dialog>
  );
}

function Matchup({match}:{match:Champ}) {

    const [modal, setModal] = useState(false);  
     const handleSubmit = (winner_id:string, winner_game_id:string, winner_game_position:string) => {
        const post = { request: 3, winner_id:winner_id, winner_game_id: winner_game_id, winner_game_position: winner_game_position }; 
        fetch(url, { // Replace with your actual API endpoint
        method: 'POST',
        headers: { "Content-Type": "application/json" }, // Important: defines the content type
        body: JSON.stringify(post) // Convert the JavaScript object to a JSON string
        }).then(() => {
            console.log('Updated bracket');
            setModal(false)
        // You can add logic here to redirect the user or show a success message
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    const openModal = () => {
        if (match.visitorName === 'TBD' || match.homeName === 'TBD') {
            return false
        }
        setModal(true)
    }

    return (
        <div className="pairing rounded-md">
            <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[match.visitorColor]} text-left`}>{match.visitorName}</div>
            <button onClick={openModal} className="w-full text-left rounded-md px-4 text-sm border-2 bg-foreground text-background">Board {match.board} @ {match.time}</button>
            <div className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[match.homeColor]} text-left`}>{match.homeName}</div>
            <Modal openModal={modal} closeModal={() => setModal(false)}>
                <h1 className="text-3xl">Winner</h1>
                <div className="flex gap-2 mb-4">
                    <button className={DEFAULT_BUTTON} onClick={() => handleSubmit(match.visitor_id, match.winner_game_id, match.winner_game_position)}>{match.visitorName}</button>
                    <button className={DEFAULT_BUTTON} onClick={() => handleSubmit(match.home_id, match.winner_game_id, match.winner_game_position)}>{match.homeName}</button>
                </div>
            </Modal>
        </div>
    )
}

export default function Championship() {
    const brnames = [
        "quarterfinals",
        "semifinals",
        "finals",
        "winner"
    ]
    const intervalTime = 5000;
    // todo either change this to post, or change endpoint for other
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
    }, [intervalTime]); // Dependencies array: re-run effect if url or intervalTime changes

    const pairArray = (arr:Champ[]) => {
        const paired = [];
        for (let i = 0; i < arr.length; i += 2) {
            // Slice two elements to create a pair
            paired.push(arr.slice(i, i + 2));
        }
        return paired;
    };

    const brackets = (groupedByObject:Partial<Record<number, CHAMPIONSHIP_API[]>>) => {
        const ROUNDS = Object.keys(groupedByObject).length;
        const BR:Champ[][] = [];
        // let placeholder = 65;
        for (let i = 1; i <= ROUNDS; i++) {
            const ROUND = groupedByObject[i];
            if (ROUND) {
                const C:Champ[] = ROUND.map(f => {
                    return {
                        homeName: Number(f.home_id) !== 0 ? KEYEDTEAMS[f.home_id] : 'TBD',
                        visitorName: Number(f.visitor_id) !== 0 ? KEYEDTEAMS[f.visitor_id] : "TBD",
                        homeColor: Number(f.home_id) !== 0 ? KEYEDCOLORS[f.home_id]: "base" ,
                        visitorColor: Number(f.visitor_id) !== 0 ? KEYEDCOLORS[f.visitor_id] : "base",
                        board: f.board,
                        time: ISOTOUS(f.time),
                        winner_game_id: f.winner_game_id,
                        winner_game_position: f.winner_game_position,
                        id: f.id,
                        home_id: f.home_id,
                        visitor_id: f.visitor_id,
                        division: f.division
                    }
                })
                BR.push(C)
            }
        }
        return BR.map((column) => pairArray(column))
    }

    const pairedup = useMemo(() => {
        const GBD = Object.groupBy(data, (game) => {
            return game.division;
        })
        const LLL:Champ[][][][] = []
        for (const DS of Object.values(GBD)) {
            if (DS) {
                const groupedByObject = Object.groupBy(DS, (product) => {
                    return product.round;
                });
                LLL.push(brackets(groupedByObject));
            }
        }
        return LLL
    }, [data])

    
    const winner = (visitor_id:string,home_id:string):{color:THEME,name:string} => {
        if (!!Number(home_id)) {
            return {
                name: KEYEDTEAMS[home_id],
                color: KEYEDCOLORS[home_id],
            }
        }
        if (!!Number(visitor_id)) {
            return {
                name: KEYEDTEAMS[visitor_id],
                color: KEYEDCOLORS[visitor_id],
            }
        }
        return {
            name:'TBD',
            color:'base'
        }
    }
    return (
        <div id="brackets" className="m-2">
            {pairedup.map((divshn) => (
                <div key={divshn[0][0][0].id} className="mt-8">
                    <h2 className="capitalize text-3xl text-left md:text-center sticky md:static top-0 bg-background">{divshn[0][0][0].division}</h2>
                    <div className="grid-rows-[auto_1fr] md:grid grid-cols-[repeat(4,_1fr)] grid-flow-col gap-3">
                    {divshn.map((column, i, array) => (        
                        <>
                        <h3 className="capitalize text-2xl my-4 text-right md:text-center sticky md:static top-0 bg-background w-1/2 ml-[50%] md:w-full md:ml-[0]">{brnames[i]}</h3>
                        <div key={i} className="gap-8 whitespace-nowrap flex flex-col justify-around pairing-col">
                            {i === array.length - 1 ?
                                <div className={`${BAG_BUTTON['base']} ${BAG_BUTTON[winner(column[0][0].visitor_id, column[0][0].home_id).color]} text-left grow-0`}>{winner(column[0][0].visitor_id, column[0][0].home_id).name}</div>
                            :                                    
                                column.map((pair, index) => (
                                    <div key={index} className="four">
                                        <Matchup match={pair[0]} />
                                        {pair[1] &&
                                            <Matchup match={pair[1]} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        </>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
