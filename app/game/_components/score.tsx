import { useCounterStore } from '../../providers/counter-store-provider'

export default function Score() {

    const { redteam, blueteam, score } = useCounterStore(
        (state) => state,
    )

    return (
        <div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div className="bg-red-600 place-content-center aspect-[1] text-center text-white text-[10vw]">
                {score.red}
                </div>
                <div className="bg-blue-600 place-content-center aspect-[1] text-center text-[white] text-[10vw]">
                {score.blue}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] w-full">
                <div>{redteam}</div>
                <div>{blueteam}</div>
            </div>
        </div>
    )
}