'use client'
import { useCounterStore } from '../../providers/counter-store-provider'
import { SCORE } from '@/app/const/style'
import { Team } from '@/app/stores/counter-store'
import { useState } from 'react'
export default function Score() {

    const { team1name, team2name, team1color, team2color, score, firsttoss, increaseTeam1Score, increaseTeam2Score } = useCounterStore(
        (state) => state,
    )

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50 

    const onTouchStart = (e:any) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e:any) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = (team:Team) => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance

        const scoreChange = isLeftSwipe ? -1 : 1;
        if (team === 'team1') {
            increaseTeam1Score(scoreChange)
        }
        if (team === 'team2') {
            increaseTeam2Score(scoreChange)
        }
    // add your conditional logic here
    }

    return (
        <div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className={`${SCORE['base']}${SCORE[team1color]}`}
                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={() => onTouchEnd('team1')}>
                {score.team1}
                </div>
                <div className={`${SCORE['base']}${SCORE[team2color]}`}
                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={() => onTouchEnd('team2')}>
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