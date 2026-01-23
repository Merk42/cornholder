import Image from "next/image";
import Score from "./_components/score";
import Inning from "./_components/inning";

export default function Home() {


  let inning = {
    '2': {
      'board':0,
      'hole':0
    },
    '3': {
      'board':0,
      'hole':0
    }
  }

  const EXSCORE = [
    {
      team:'team 1',
      score: 3
    },
    {
      team: 'opposing team 2',
      score: 20
    }
  ]

  return (
    <div>
      <main>
       <Score options={EXSCORE} />


       <div>
        <Inning/>
       </div>
      </main>
    </div>
  );
}
