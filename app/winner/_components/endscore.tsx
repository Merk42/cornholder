'use client'; // Required for client-side hooks in the App Router
import { useRouter } from 'next/navigation';
import { useCornholeStore } from '../../providers/cornhole-store-provider'
import { DEFAULT_BUTTON, BAG_BORDER, BAG_TOTAL } from '../../const/style';
import { FinalScore } from '../../stores/cornhole-store';

export default function Endscore() {

    const router = useRouter();
    const { team1name, team2name, team1color, team2color, score, resetScore, addHistory } = useCornholeStore(
        (state) => state,
    )

    const handleClickSame = () => {
        resetScore();
        const F:FinalScore = {
            team1: {
                name: team1name,
                score: score.team1
            },
            team2: {
                name: team2name,
                score: score.team2
            }
        }
        addHistory(F)
        router.push('/game');
    }
    const handleClickDiff = () => {
        resetScore()
        const F:FinalScore = {
            team1: {
                name: team1name,
                score: score.team1
            },
            team2: {
                name: team2name,
                score: score.team2
            }
        }
        addHistory(F)
        router.push('/start');
    }

    return (
        <div>
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