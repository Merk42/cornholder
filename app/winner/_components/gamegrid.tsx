'use client'; // Required for client-side hooks in the App Router
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCornholeStore } from '../../providers/cornhole-store-provider'
import { FinalScore } from '../../stores/cornhole-store';

export default function Gamegrid () {
    const router = useRouter();
    const { team1name, team2name, score, resetScore, addHistory } = useCornholeStore(
        (state) => state,
    )

    const handleNextgame =  () => {
        resetScore();
        const F:FinalScore = {
            team1: {
                name: team1name,
                score: score.team1
            },
            team2: {
                name: team2name,
                score: score.team2
            }
        }
        addHistory(F)
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
        <div>
            {isLast ?
                <button onClick={handleSubmission}>submit scores</button>
                :
                <button onClick={handleNextgame}>next game</button>
            }
        </div>
    )
}