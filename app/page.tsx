'use client'
import Score from "./_components/score";
import Inning from "./_components/inning";
import { useState } from "react";
export default function Home() {

  const [redScore, setRedScore] = useState<number>(0);
  const [blueScore, setBlueScore] = useState<number>(0);

  const handleScoreUpdate = (e) => {
    console.log(e)
    if (e.team === 'red') {
      setRedScore(redScore + e.value)
    }
    if (e.team === 'blue') {
      setBlueScore(blueScore + e.value)
    }
  }

  return (
    <div>
      <main>
       <Score red={redScore} blue={blueScore} />


       <div>
        <Inning onChange={handleScoreUpdate}/>
       </div>
      </main>
    </div>
  );
}
