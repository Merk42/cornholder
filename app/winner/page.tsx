'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON } from '../const/style';

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
        <div className="w-3xl mx-auto text-center">
            <h1 className='text-4xl'>{phrase}</h1>
            <p className='text-3xl'>{score.red}:{score.blue}</p>
            <button onClick={handleClickSame} className={DEFAULT_BUTTON}>New Game<br></br><span className='text-xs'>(same teams)</span></button> 
            <button onClick={handleClickDiff} className={DEFAULT_BUTTON}>New Game<br></br><span className='text-xs'>(different teams)</span></button> 
        </div>
        
    )
} 