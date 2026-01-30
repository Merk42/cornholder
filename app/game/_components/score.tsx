import { useCounterStore } from '../../providers/counter-store-provider'
import { SCORE } from '@/app/const/style'
export default function Score() {

    const { redteam, blueteam, score, firsttoss } = useCounterStore(
        (state) => state,
    )

    return (
        <div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className={`${SCORE['base']}${SCORE['red']}`}>
                {score.red}
                </div>
                <div className={`${SCORE['base']}${SCORE['blue']}`}>
                {score.blue}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className={`${firsttoss === 'red' ? 'font-bold' : ''} text-center truncate text-lg`}>{redteam}</div>
                <div className={`${firsttoss === 'blue' ? 'font-bold' : ''} text-center truncate text-lg`}>{blueteam}</div>
            </div>
        </div>
    )
}