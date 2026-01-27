import Link from 'next/link'
import { DEFAULT_BUTTON } from './const/style';
export default function Home() {

  return (
    <div className='max-w-3xl px-4 text-center'>
      <h1 className='text-4xl my-4'>Corn Hole!</h1>
      <Link className={DEFAULT_BUTTON} href="/start">New Game</Link>
    </div>
  );
}
