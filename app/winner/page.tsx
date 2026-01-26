'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';

import { useCounterStore } from '../providers/counter-store-provider'
import Link from 'next/link';

export default function Winner() {

    const { redteam, blueteam, score } = useCounterStore(
        (state) => state,
    )

    const phrase = useMemo(() => {
        if (score.blue === score.red) {
            return "It's a tie!"
        }
        if (score.blue > score.red) {
            return `${blueteam} wins`
        } else {
            return `${redteam} wins`
        }
    }, [redteam, blueteam, score])

    return (
        <div>
            <h1>{phrase}</h1>
            <p>{score.red}:{score.blue}</p>
            <Link href="/start">New Game</Link> 
        </div>
        
    )
} 