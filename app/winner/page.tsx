'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '../providers/counter-store-provider'
import { DEFAULT_BUTTON, BAG_BORDER, BAG_TOTAL } from '../const/style';

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
            <dl className={`${BAG_BORDER['base']} ${BAG_BORDER[team1color]} grid grid-cols-[1fr_auto]`}>
                <dt className="w-full text-2xl font-bold text-left">
                    {team1name}
                </dt>
                <dd className={`${BAG_TOTAL['base']}${BAG_TOTAL[team1color]} text-right`}>
                    {score.team1}
                </dd>
            </dl>
            <dl className={`${BAG_BORDER['base']} ${BAG_BORDER[team2color]} grid grid-cols-[1fr_auto]`}>
                <dt className="w-full text-2xl font-bold text-left">
                    {team2name}
                </dt>
                <dd className={`${BAG_TOTAL['base']}${BAG_TOTAL[team2color]} text-right`}>
                    {score.team2}
                </dd>
            </dl>
            <div className='mt-4 flex justify-center gap-2'>
                <button onClick={handleClickSame} className={`leading-none ${DEFAULT_BUTTON}`}>New Game<br></br><span className='text-xs'>(same teams)</span></button> 
                <button onClick={handleClickDiff} className={`leading-none ${DEFAULT_BUTTON}`}>New Game<br></br><span className='text-xs'>(different teams)</span></button> 
            </div>
        </div>        
    )
} 