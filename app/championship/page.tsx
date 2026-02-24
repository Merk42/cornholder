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
                        id: f.id,
                        home_id: f.home_id,
                        visitor_id: f.visitor_id
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
        <div className={`flex gap-3`}>
            {pairedup.map((column, i) => (
                <div key={i} className="gap-8 grow whitespace-nowrap flex flex-col justify-around pairing-col">
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
