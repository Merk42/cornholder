import { useCounterStore } from '../../providers/counter-store-provider'
import { SCORE } from '@/app/const/style'
export default function Score() {

    const { team1name, team2name, team1color, team2color, score, firsttoss } = useCounterStore(
        (state) => state,
    )

    return (
        <div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className={`${SCORE['base']}${SCORE[team1color]}`}>
                {score.team1}
                </div>
                <div className={`${SCORE['base']}${SCORE[team2color]}`}>
                {score.team2}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className={`${firsttoss === 'team1' ? 'font-bold' : ''} text-center truncate text-lg`}>{team1name}</div>
                <div className={`${firsttoss === 'team2' ? 'font-bold' : ''} text-center truncate text-lg`}>{team2name}</div>
            </div>
        </div>
    )
}