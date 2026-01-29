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
        <div className="max-w-3xl px-4 mx-auto text-center h-dvh place-content-center">
            <h1 className='text-4xl mb-6'>{phrase}</h1>
            <dl className='grid grid-cols-[1fr_auto]'>
                <dt className='text-left text-2xl p-2 border-2 border-red-800'>{redteam}</dt>
                <dd className='text-2xl p-2 border-2 border-red-800'>{score.red}</dd>
                <dt className='text-left text-2xl p-2 border-2 border-blue-800'>{blueteam}</dt>
                <dd className='text-2xl p-2 border-2 border-blue-800'>{score.blue}</dd>
            </dl>
            <div className='mt-4'>
                <button onClick={handleClickSame} className={`leading-none ${DEFAULT_BUTTON}`}>New Game<br></br><span className='text-xs'>(same teams)</span></button> 
            </div>
            <div className='mt-2'>
                <button onClick={handleClickDiff} className={`leading-none ${DEFAULT_BUTTON}`}>New Game<br></br><span className='text-xs'>(different teams)</span></button> 
            </div>
        </div>
        
    )
} 