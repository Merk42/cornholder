import Link from 'next/link';
import { DEFAULT_BUTTON } from '../const/style';
import { useCornholeStore } from '../providers/cornhole-store-provider';
export default function LeagueFooter() {

    const LEAGUE_ID = useCornholeStore((state) => state.league_id); 
    return (        
        <footer className='fixed inset-x-0 bottom-0  bg-background'>
            {LEAGUE_ID != 0 &&
            <ul className='flex justify-between p-4 max-w-3xl mx-auto'>
                <li>
                    <Link className={DEFAULT_BUTTON} href="/schedule">Schedule</Link>
                </li>
                <li>
                    <Link className={DEFAULT_BUTTON} href="/championship">Championship</Link>    
                </li>
                <li>
                    <Link className={DEFAULT_BUTTON} href="/standings">Standings</Link>
                </li>   
            </ul>
            }
        </footer>
    )
}