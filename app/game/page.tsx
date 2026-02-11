'use client'
import Score from "./_components/score";
import Inning from "./_components/inning";



export default function Home() {

  return (
    <div>
      <main className="max-w-3xl px-4 mx-auto">
       <Score/>
       <div className="hidden md:block portrait:block">
        <Inning/>
       </div>
      </main>
    </div>
  );
}
