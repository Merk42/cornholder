'use client'
import { useMemo, useState } from "react";
import { useCounterStore } from '../../providers/counter-store-provider'
import { useRouter } from 'next/navigation';
import { Team } from "@/app/stores/counter-store";
import { BAG_BORDER, BAG_BUTTON, BAG_TOTAL, SUBMIT } from "@/app/const/style";

export default function Inning() {

    const { team1name, team2name, team1color, team2color, score, increaseTeam1Score, increaseTeam2Score, setFirst } = useCounterStore(
        (state) => state,
    )

    const numbers = [...Array(5).keys()]
    const [onBoardTeam1Value, setOnBoardTeam1Value] = useState(0);
    const [inHoleTeam1Value, setInHoleTeam1Value] = useState(0);
    const [onBoardTeam2Value, setOnBoardTeam2Value] = useState(0);
    const [inHoleTeam2Value, setInHoleTeam2Value] = useState(0);
    const handleOnboardTeam1Change = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setOnBoardTeam1Value(VAL);
    };
    const handleInHoleTeam1Change = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setInHoleTeam1Value(VAL);
    };
    const handleOnboardTeam2Change = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setOnBoardTeam2Value(VAL);
    };
    const handleInHoleTeam2Change = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setInHoleTeam2Value(VAL);
    };

    const rTotal = useMemo<number>(() => {
        if (onBoardTeam1Value + inHoleTeam1Value > 4) {
            return 99
        }
        return onBoardTeam1Value+ (inHoleTeam1Value * 3)
        
    },[onBoardTeam1Value, inHoleTeam1Value])

    const bTotal = useMemo<number>(() => {
        if (onBoardTeam2Value + inHoleTeam2Value > 4) {
            return 99
        }
        return onBoardTeam2Value + (inHoleTeam2Value * 3)
        
    },[onBoardTeam2Value, inHoleTeam2Value])


    const newpoints = useMemo(() => {
        const change = {
            team: 'wash',
            value: 0
        }
        if (rTotal === 99 || bTotal === 99) {
            change.team = 'error'
            return change;
        }
        if (rTotal === bTotal) {
            return change;
        }
        if (rTotal > bTotal) {
            change.team = 'team1'
        } else {
            change.team = 'team2'
        }
        change.value = Math.abs(rTotal - bTotal)
        return change
    }, [rTotal, bTotal])

    const handleScoreUpdate = () => {
        if (newpoints.value !== 0) {
            if (newpoints.team === 'team1') {  
                increaseTeam1Score(newpoints.value);     
            }
            if (newpoints.team === 'team2') {      
                increaseTeam2Score(newpoints.value)
            }
            setFirst(newpoints.team as Team)
        }
        resetFields()
        if (score.team1 >= 21 || score.team2 >= 21) {
            router.push('/winner');
        }
        // increment a round?
    }

    const resetFields = () => {
        setOnBoardTeam1Value(0);
        setInHoleTeam1Value(0);
        setOnBoardTeam2Value(0);
        setInHoleTeam2Value(0);
    }

    const router = useRouter();

    const buttonColor = useMemo(() => {
        if (newpoints.team === 'team1') {
            return SUBMIT[team1color]
        }
        if (newpoints.team === 'team2') {
            return SUBMIT[team2color]
        }
        return 'bg-slate-800'
    },[newpoints.team, team1color, team2color])
    
    const buttonText = useMemo(() => {
        if (newpoints.team === 'error') {
            return 'Error entering bag count'
        }
        if (newpoints.team === 'wash') {
            return 'wash'
        }
        let name = '';
        if (newpoints.team === 'team1') {
            name = team1name
        }
        if (newpoints.team === 'team2') {
            name = team2name
        }
        return `${name} gets ${newpoints.value} point${newpoints.value > 1 ? 's' : ''}`
    },[newpoints, team1name, team2name])

    return (
        <div>
            <div className={`${BAG_BORDER['base']} ${BAG_BORDER[team1color]}`}>
                <h2 className="w-full text-2xl font-bold">
                    {team1name}
                </h2>
                <div className="flex-1">
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend className="capitalize">on board</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'onboard-team1-' + number} type="radio" name="team1-onboard" value={number} onChange={handleOnboardTeam1Change} checked={onBoardTeam1Value === number}/>
                                <label htmlFor={'onboard-team1-' + number} className={`${BAG_BUTTON['base']} ${BAG_BUTTON[team1color]}`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend className="capitalize">in hole</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'inhole-team1-' + number} type="radio" name="team1-inhole" value={number} onChange={handleInHoleTeam1Change} checked={inHoleTeam1Value === number}/>
                                <label htmlFor={'inhole-team1-' + number} className={`${BAG_BUTTON['base']} ${BAG_BUTTON[team1color]}`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                </div>
                <div className={`${BAG_TOTAL['base']}${BAG_TOTAL[team1color]}`}>{rTotal !== 99 ? rTotal : '--'}</div>
            </div>
            <div className={`${BAG_BORDER['base']} ${BAG_BORDER[team2color]}`}>
                <h2 className="w-full text-2xl font-bold">
                    {team2name}
                </h2>
                <div className="flex-1">
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend className="capitalize">on board</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'onboard-team2-' + number} type="radio" name="team2-onboard" value={number} onChange={handleOnboardTeam2Change} checked={onBoardTeam2Value === number}/>
                                <label htmlFor={'onboard-team2-' + number} className={`${BAG_BUTTON['base']} ${BAG_BUTTON[team2color]}`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend className="capitalize">in hole</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'inhole-team2-' + number} type="radio" name="team2-inhole" value={number} onChange={handleInHoleTeam2Change} checked={inHoleTeam2Value === number}/>
                                <label htmlFor={'inhole-team2-' + number} className={`${BAG_BUTTON['base']} ${BAG_BUTTON[team2color]}`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                </div>
                <div className={`${BAG_TOTAL['base']}${BAG_TOTAL[team2color]}`}>{bTotal !== 99 ? bTotal : '--'}</div>
            </div>
            <button className={`${buttonColor} text-center w-full mt-2 p-4 text-white capitalize`} onClick={handleScoreUpdate} disabled={bTotal === 99 || rTotal === 99}>{buttonText}</button>
        </div>
        

    )
}
