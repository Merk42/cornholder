'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCornholeStore } from '../../providers/cornhole-store-provider'
import { DEFAULT_BUTTON } from '@/app/const/style';

export default function Leagueend () {
    const router = useRouter();
    const { resetScore } = useCornholeStore(
        (state) => state,
    )

    const handleNextgame =  () => {
        resetScore();
        router.push('/game');
    }

    const { game_id, history, league_id } = useCornholeStore(
        (state) => state,
    )

    const isLast = useMemo(() =>  {
        return history.length > 2;
    }, [history])

    const handleSubmission =  () => {
        const post = { 
            game_id: game_id,
            game_1_visitor_score: history[0].team1.score,
            game_1_home_score: history[0].team2.score,
            game_2_visitor_score: history[1].team1.score,
            game_2_home_score: history[1].team2.score,
            game_3_visitor_score: history[2].team1.score,
            game_3_home_score: history[2].team2.score,
        }; 
        fetch(`/pwa/cornholder/api/games.php?league_id=${league_id}`, { // Replace with your actual API endpoint
        method: 'POST',
        headers: { "Content-Type": "application/json" }, // Important: defines the content type
        body: JSON.stringify(post) // Convert the JavaScript object to a JSON string
        }).then(() => {
            console.log('Updated bracket');
            router.push('/schedule');
        // You can add logic here to redirect the user or show a success message
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='mt-4 flex justify-center gap-2'>
            {isLast ?
                <button className={`leading-none ${DEFAULT_BUTTON}`} onClick={handleSubmission}>submit scores</button>
                :
                <button className={`leading-none ${DEFAULT_BUTTON}`} onClick={handleNextgame}>next game</button>
            }
        </div>
    )
}