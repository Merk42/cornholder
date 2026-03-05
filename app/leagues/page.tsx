'use client'; // Required for client-side hooks in the App Router
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCornholeStore } from '../providers/cornhole-store-provider';
import { LEAGUES } from '../const/data';
import { DEFAULT_BUTTON } from "../const/style"
import { LEAGUES_API } from '../const/type';
export default function Leagues() {
    const { setLeagueID } = useCornholeStore(
        (state) => state,
    )

    const router = useRouter();
    const [leagues, setLeagues] = useState<LEAGUES_API[]>([])

    useEffect(() => {
        
        const fetchLeagues = async () => {
        
        try {
            // This URL points to your backend API endpoint, not the database directly
            const response = await fetch(`/pwa/cornholder/api/leagues.php`); 
            if (!response.ok) {
                setLeagues(LEAGUES);
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setLeagues(data);
            }
        } catch (error) {
            console.error(error);
            setLeagues(LEAGUES);
        } finally {
            // setIsLoading(false);
        }

        };

        fetchLeagues();
    }, []); // Empty dependency array means this runs once on mount


    function handleClick(id:string) {
        setLeagueID(Number(id));
        router.push('/schedule');
    }

    return (
        <div className='max-w-3xl px-4 mx-auto text-center place-content-center'>
            <h1 className='text-4xl my-4'>Leagues</h1>
            <ul>
            {leagues.map(league => (
                <li key={league.id} >
                    <button className={DEFAULT_BUTTON} onClick={() => handleClick(league.id)}>{league.name}</button>
                </li>
            ))}
            </ul>
        </div>
    )
}