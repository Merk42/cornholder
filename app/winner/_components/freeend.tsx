'use client'; // Required for client-side hooks in the App Router
import { useRouter } from 'next/navigation';
import { useCornholeStore } from '../../providers/cornhole-store-provider'
import { DEFAULT_BUTTON } from '../../const/style';

export default function Freeend() {
    const router = useRouter();
    const { resetScore } = useCornholeStore(
        (state) => state,
    )

    const handleClickSame = () => {  
        resetScore();
        router.push('/game');
    }
    const handleClickDiff = () => {
        resetScore()
        router.push('/start');
    }

    return (
        <div className='mt-4 flex justify-center gap-2'>
            <button onClick={handleClickSame} className={`leading-none ${DEFAULT_BUTTON}`}>New Game<br></br><span className='text-xs'>(same teams)</span></button> 
            <button onClick={handleClickDiff} className={`leading-none ${DEFAULT_BUTTON}`}>New Game<br></br><span className='text-xs'>(different teams)</span></button> 
        </div>
    )
}