'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useCornholeStore } from '../providers/cornhole-store-provider'
import Gamegrid from './_components/gamegrid';
import Endscore from './_components/endscore';
import History from './_components/history';

export default function Winner() {
    const { team1name, team2name,  score, } = useCornholeStore(
        (state) => state,
    )

    const phrase = useMemo(() => {
        if (score.team2 === score.team1) {
            return "It's a tie!"
        }
        if (score.team2 > score.team1) {
            return `${team2name} wins`
        } else {
            return `${team1name} wins`
        }
    }, [team1name, team2name, score])

    const LEAGUE_ID = useCornholeStore((state) => state.league_id); 

    return (  
        <div className="max-w-3xl px-4 mx-auto text-center place-content-center">    
            <h1 className='text-4xl mb-6'>{phrase}</h1>
            {LEAGUE_ID == 0 ?
                <Gamegrid/>
                :
                <>
                <Endscore/>
                <History/>
                </>
            }
        </div>
    )
} 