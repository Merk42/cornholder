'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'


export default function Winner() {
    const router = useRouter();
    const { redteam, blueteam, score, resetScore } = useCounterStore(
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

    const handleClickSame = () => {
        resetScore()
        router.push('/game');
    }
    const handleClickDiff = () => {
        resetScore()
        router.push('/start');
    }

    return (
        <div>
            <h1>{phrase}</h1>
            <p>{score.red}:{score.blue}</p>
            <button onClick={handleClickSame}>New Game (same teams)</button> 
            <button onClick={handleClickDiff}>New Game (different teams)</button> 
        </div>
        
    )
} 