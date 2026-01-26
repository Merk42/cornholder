'use client'
import Score from "./_components/score";
import Inning from "./_components/inning";



export default function Home() {

  return (
    <div>
      <main>
       <Score/>
       <div>
        <Inning/>
       </div>
      </main>
    </div>
  );
}
