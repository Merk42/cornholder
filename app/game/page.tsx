'use client'
import Score from "./_components/score";
import Inning from "./_components/inning";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { useCounterStore } from '../providers/counter-store-provider'


export default function Home() {

    
  const { count, incrementCount, decrementCount, updateBlue, updateRed } = useCounterStore(
    (state) => state,
  )


  const [redScore, setRedScore] = useState<number>(0);
  const [blueScore, setBlueScore] = useState<number>(0);

  const handleScoreUpdate = (e) => {
    console.log(e)
    if (e.team === 'red') {
      setRedScore(redScore + e.value)
      updateRed(e.value)
    }
    if (e.team === 'blue') {
      setBlueScore(blueScore + e.value)
      updateBlue(e.value)
    }
  }
  const router = useRouter();
  useEffect(() => {
    if (redScore >= 21 || blueScore >= 21) {
      router.push('/winner');
    }
  }, [redScore, blueScore, router]);


  return (
    <div>
      <main>
       <Score/>


       <div>
        <Inning onChange={handleScoreUpdate}/>
       </div>
      </main>
      <div>
              Count: {count}
      <hr />
      <button type="button" onClick={incrementCount}>
        Increment Count
      </button>
      <button type="button" onClick={decrementCount}>
        Decrement Count
      </button>
      </div>
    </div>
  );
}
