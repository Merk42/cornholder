'use client'
import Score from "./_components/score";
import Inning from "./_components/inning";



export default function Home() {

  return (
    <div>
      <main className="w-3xl mx-auto">
       <Score/>
       <div>
        <Inning/>
       </div>
      </main>
    </div>
  );
}
