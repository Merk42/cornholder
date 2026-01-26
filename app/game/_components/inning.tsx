'use client'
import { useMemo, useState } from "react";
import { useCounterStore } from '../../providers/counter-store-provider'
import { useRouter } from 'next/navigation';

export default function Inning() {

    const { score, updateRed, updateBlue } = useCounterStore(
        (state) => state,
    )

    const numbers = [...Array(5).keys()]
    const [onBoardRedValue, setOnBoardRedValue] = useState(0);
    const [inHoleRedValue, setInHoleRedValue] = useState(0);
    const [onBoardBlueValue, setOnBoardBlueValue] = useState(0);
    const [inHoleBlueValue, setInHoleBlueValue] = useState(0);
    const handleOnboardRedChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setOnBoardRedValue(VAL);
    };
    const handleInHoleRedChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setInHoleRedValue(VAL);
    };
    const handleOnboardBlueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setOnBoardBlueValue(VAL);
    };
    const handleInHoleBlueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const VAL = Number(event.target.value);
        setInHoleBlueValue(VAL);
    };

    const rTotal = useMemo(() => {
        if (onBoardRedValue + inHoleRedValue > 4) {
            return 0
        }
        return onBoardRedValue+ (inHoleRedValue * 3)
        
    },[onBoardRedValue, inHoleRedValue])

    const bTotal = useMemo(() => {
        if (onBoardBlueValue + inHoleBlueValue > 4) {
            return 0
        }
        return onBoardBlueValue + (inHoleBlueValue * 3)
        
    },[onBoardBlueValue, inHoleBlueValue])


    const newpoints = useMemo(() => {
        const change = {
            team: 'wash',
            value: 0
        }   
        if (rTotal === bTotal) {
            return change;
        }
        if (rTotal > bTotal) {
            change.team = 'red'
        } else {
            change.team = 'blue'
        }
        change.value = Math.abs(rTotal - bTotal)
        return change
    }, [rTotal, bTotal])

    const handleScoreUpdate = () => {
        if (newpoints.value !== 0) {
            if (newpoints.team === 'red') {  
                updateRed(newpoints.value)
            }
            if (newpoints.team === 'blue') {      
                updateBlue(newpoints.value)
            }
        }
        resetFields()
        if (score.red >= 21 || score.blue >= 21) {
        router.push('/winner');
        }
        // some kind of value reset?
        // increment a round?

    }

    const resetFields = () => {
        setOnBoardRedValue(0);
        setInHoleRedValue(0);
        setOnBoardBlueValue(0);
        setInHoleBlueValue(0);
    }

    const router = useRouter();

    const buttonColor = useMemo(() => {
        if (newpoints.team === 'red') {
            return 'bg-red-800'
        }
        if (newpoints.team === 'blue') {
            return 'bg-blue-800'
        }
        return 'bg-slate-800'
    },[newpoints.team])
    
    const buttonText = useMemo(() => {
        if (newpoints.team === 'wash') {
            return 'wash'
        }
        return `${newpoints.team} gets ${newpoints.value} point${newpoints.value > 1 ? 's' : ''}`
    },[newpoints])

    return (
        <div>
            <div className="flex border-red-800 border-2 p-2">
                <div className="flex-1">
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend>on board</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'onboard-red-' + number} type="radio" name="red-onboard" value={number} onChange={handleOnboardRedChange} checked={onBoardRedValue === number}/>
                                <label htmlFor={'onboard-red-' + number} className={`border-red-800 peer-checked:bg-red-800 cursor-pointer grow text-center border-2 p-2 rounded-md peer-checked:text-white`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend>in hole</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'inhole-red-' + number} type="radio" name="red-inhole" value={number} onChange={handleInHoleRedChange} checked={inHoleRedValue === number}/>
                                <label htmlFor={'inhole-red-' + number} className={`border-red-800 peer-checked:bg-red-800 cursor-pointer grow text-center border-2 p-2 rounded-md peer-checked:text-white`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                </div>
                <div className="flex-none w-[3ch] text-center self-center text-3xl text-red-800">{rTotal}</div>
            </div>
            <div className="flex border-blue-800 border-2 p-2">
                <div className="flex-1">
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend>on board</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'onboard-blue-' + number} type="radio" name="blue-onboard" value={number} onChange={handleOnboardBlueChange} checked={onBoardBlueValue === number}/>
                                <label htmlFor={'onboard-blue-' + number} className={`border-blue-800 peer-checked:bg-blue-800 cursor-pointer grow text-center border-2 p-2 rounded-md peer-checked:text-white`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                    <fieldset className="grid grid-cols-[repeat(5,1fr)]">
                        <legend>in hole</legend>
                        {numbers.map((number) => (
                            <span className='flex grow' key={number}>
                                <input className="hidden peer" id={'inhole-blue-' + number} type="radio" name="blue-inhole" value={number} onChange={handleInHoleBlueChange} checked={inHoleBlueValue === number}/>
                                <label htmlFor={'inhole-blue-' + number} className={`border-blue-800 peer-checked:bg-blue-800 cursor-pointer grow text-center border-2 p-2 rounded-md peer-checked:text-white`}>{number}</label>
                            </span>
                        ))}
                    </fieldset>
                </div>
                <div className="flex-none w-[3ch] text-center self-center text-3xl text-blue-800">{bTotal}</div>
            </div>
            <button className={`${buttonColor} text-center w-full mt-2 p-4 text-white capitalize`} onClick={handleScoreUpdate}>{buttonText}</button>
        </div>
        

    )
}
