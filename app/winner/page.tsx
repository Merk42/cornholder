'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON, FINAL } from '../const/style';

export default function Winner() {
    const router = useRouter();
    const { team1name, team2name, team1color, team2color, score, resetScore } = useCounterStore(
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
                <dt className={`${FINAL.name['base']}${FINAL.name[team1color]}`}>{team1name}</dt>
                <dd className={`${FINAL.score['base']}${FINAL.score[team1color]}`}>{score.team1}</dd>
                <dt className={`${FINAL.name['base']}${FINAL.name[team2color]}`}>{team2name}</dt>
                <dd className={`${FINAL.score['base']}${FINAL.score[team2color]}`}>{score.team2}</dd>
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