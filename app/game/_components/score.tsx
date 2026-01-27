import { useCounterStore } from '../../providers/counter-store-provider'

export default function Score() {

    const { redteam, blueteam, score, firsttoss } = useCounterStore(
        (state) => state,
    )

    return (
        <div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className={`${firsttoss === 'red' ? 'font-bold' : ''} bg-red-600 place-content-center aspect-[1] text-center text-white text-[10vw]`}>
                {score.red}
                </div>
                <div className={`${firsttoss === 'blue' ? 'font-bold' : ''} bg-blue-600 place-content-center aspect-[1] text-center text-white text-[10vw]`}>
                {score.blue}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className="text-center truncate text-lg">{redteam}</div>
                <div className="text-center truncate text-lg">{blueteam}</div>
            </div>
        </div>
    )
}