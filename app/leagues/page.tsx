'use client'; // Required for client-side hooks in the App Router
import { useRouter } from 'next/navigation';
import { useCornholeStore } from '../providers/cornhole-store-provider';
import { DEFAULT_BUTTON } from "../const/style"
export default function Leagues() {
    const { setLeagueID } = useCornholeStore(
        (state) => state,
    )
    const LEAGUES_API = [
        {
            name:"ROOT down",
            id: '1'
        }
    ]

    const router = useRouter();
    function handleClick(id:string) {
        setLeagueID(Number(id));
        router.push('/schedule');
    }

    return (
        <ul>
        {LEAGUES_API.map(league => (
            <li key={league.id} >
                <button className={DEFAULT_BUTTON} onClick={() => handleClick(league.id)}>{league.name}</button>
            </li>
        ))}
        </ul>
    )
}