'use client'; // Required for client-side hooks in the App Router
import { useEffect, useId } from 'react';
import { useCornholeStore } from '../../providers/cornhole-store-provider'
import { BAG_BORDER, BAG_TOTAL } from '../../const/style';
import { FinalScore } from '@/app/stores/cornhole-store';
 
export default function History() {

    const latestGameId = useId();

    const { history, team1name, team2name, team1color, team2color, score, addHistory } = useCornholeStore(
        (state) => state,
    )

    useEffect(() => {
        const F:FinalScore = {
            id: latestGameId,
            team1: {
                name: team1name,
                score: score.team1,
                color: team1color
            },
            team2: {
                name: team2name,
                score: score.team2,
                color: team2color
            }
        }
        addHistory(F)        
    }, []);

    return (
        <div>
            {history.length > 0 &&
            <>
                <h2 className='text-2xl mb-6 mt-8'>History</h2>
                {history.reverse().map((scores, index, array) => (
                    <div key={scores.id}>
                        <dl className={`${BAG_BORDER['base']} ${BAG_BORDER[scores.team1.color]} grid grid-cols-[1fr_auto]`}>
                            <dt className="w-full text-2xl font-bold text-left">
                                {scores.team1.name}
                            </dt>
                            <dd className={`${BAG_TOTAL['base']}${BAG_TOTAL[scores.team1.color]} text-right`}>
                                {scores.team1.score}
                            </dd>
                        </dl>
                        <dl className={`${BAG_BORDER['base']} ${BAG_BORDER[scores.team2.color]} grid grid-cols-[1fr_auto]`}>
                            <dt className="w-full text-2xl font-bold text-left">
                                {scores.team2.name}
                            </dt>
                            <dd className={`${BAG_TOTAL['base']}${BAG_TOTAL[scores.team2.color]} text-right`}>
                                {scores.team2.score}
                            </dd>
                        </dl>
                        {index !== array.length - 1 &&
                            <hr/>
                        }
                    </div>
                ))}
                </>
            }
        </div>
    )
}