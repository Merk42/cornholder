'use client'
import { useEffect, useMemo, useState } from "react";

function CustomRadioButton({ name, value, label, selectedvalue, onChange, legend}) {

const colors = {
  red: 'border-red-800 peer-checked:bg-red-800',
  blue: 'border-blue-800 peer-checked:bg-blue-800'
}


  return (
    <span className='flex grow'>
        <input
            className="hidden peer"
            id={name + '-' + value.toString()}
            type="radio"
            name={name}
            value={value}
            checked={selectedvalue.toString() === value.toString()}
            onChange={onChange}/>
        <label
            className={`${colors[legend]} cursor-pointer grow text-center border-2 p-2 rounded-md peer-checked:text-white`}
            htmlFor={name + '-' + value.toString()}>
            {label}
        </label>
    </span>
  );
}

function OnBoard({ onChange, color }) {

    const numbers = [...Array(5).keys()]

    const [onBoardValue, setOnBoardValue] = useState(0);

    const handleChange = (event) => {
        console.log('handleChange', event.target.value)
        const VAL = Number(event.target.value);
       setOnBoardValue(VAL);
       // maybe emit?
       onChange(VAL)
    };

    return (
        <fieldset className="grid grid-cols-[repeat(5,1fr)]">
            <legend>on board</legend>
            {numbers.map((number) => (
                <CustomRadioButton
                key={number}
                name={'onboard-' + color}
                value={number}
                label={number}
                selectedvalue={onBoardValue}
                legend={color}
                onChange={handleChange}
                />
            ))}
        </fieldset>
    )
}

function InHole({ onChange, color }) {

    const numbers = [...Array(5).keys()]

    const [inHoleValue, setInHoleValue] = useState(0);

    const handleChange = (event) => {
       setInHoleValue(event.target.value);
       // maybe emit?
       onChange(event.target.value)
    };

    return (
        <fieldset className="grid grid-cols-[repeat(5,1fr)]">
            <legend>in hole</legend>
            {numbers.map((number) => (
                <CustomRadioButton
                key={number}
                name={'inhole-' + color}
                value={number}
                label={number}
                selectedvalue={inHoleValue}
                legend={color}
                onChange={handleChange}
                />
            ))}              
        </fieldset>
    )
}

function InningHalf ({onChange, color}) {
    const [onBoardTotal, setOnBoardTotal] = useState<number>(0);

    const [inHoleTotal, setInHoleTotal] = useState<number>(0);

    const handleOnBoardChange = (total:number) => {
        setOnBoardTotal(Number(total)); // Receive and store data from child
    }
     
    const handleInHoleChange = (total:number) => {
        setInHoleTotal(Number(total)); // Receive and store data from child
    }

    const points = (onboard:number, inhole:number) => {
        if (onboard + inhole > 4) {
            return 0
        }
        return onboard + (inhole * 3)
    }

    useEffect(() => {
         onChange(points(onBoardTotal, inHoleTotal))
    },[onBoardTotal, inHoleTotal, onChange]);

    return (
        <div>
            <OnBoard onChange={handleOnBoardChange} color={color}/>
            <InHole onChange={handleInHoleChange} color={color}/>
            <pre>{points(onBoardTotal, inHoleTotal)}</pre>
        </div>
    )
}

export default function Inning() {

    const colors = {
        red: 'bg-red-800',
        blue: 'bg-blue-800',
        wash: 'bg-slate-800'
    }


    const [redTotal, setRedTotal] = useState<number>(0);
    const [blueTotal, setBlueTotal] = useState<number>(0);

    const handleRedTeamTotalChange = (total:number) => {
        setRedTotal(total)
    }
    const handleBlueTeamTotalChange = (total:number) => {
        setBlueTotal(total)
    }


    const result = (redTotal:number, blueTotal:number) => {
         const change = {
            team: '',
            value: 0
         }   
         if (redTotal === blueTotal) {
            return change;
         }
         if (redTotal > blueTotal) {
            change.team = 'red'
         } else {
            change.team = 'blue'
         }
         change.value = Math.abs(redTotal - blueTotal)
         return change
    }

    const visibleTodos = useMemo(() => {
        const change = {
            team: 'wash',
            value: 0
         }   
         if (redTotal === blueTotal) {
            return change;
         }
         if (redTotal > blueTotal) {
            change.team = 'red'
         } else {
            change.team = 'blue'
         }
         change.value = Math.abs(redTotal - blueTotal)
         return change
  }, [redTotal, blueTotal])

    return (
        <div>
            <InningHalf onChange={handleRedTeamTotalChange} color='red'/>
            <pre>red: {redTotal}</pre>
            <InningHalf onChange={handleBlueTeamTotalChange} color='blue'/>
            <pre>blue: {blueTotal}</pre>
            <button className={`${colors[visibleTodos.team]} cursor-pointer grow text-center border-2 p-2 rounded-md text-white`}>
                {visibleTodos.value === 0 ? (
                    <span>wash</span>
                ) : (
                    <span>{visibleTodos.team} gets {visibleTodos.value} points</span>
                )}
            </button>
        </div>
        

    )
}
