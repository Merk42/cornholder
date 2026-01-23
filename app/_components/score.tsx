interface ScoreType {
    options: {
        team:string;
        score: number
    }[];
}

export default function Score({options}:ScoreType) {
    return (
        <div className="grid grid-cols-[repeat(2,1fr)] w-full">
            <div className="bg-red-600 place-content-center aspect-[1] text-center text-white text-[10vw]">
            {options[0].score}
            </div>
            <div className="bg-blue-600 place-content-center aspect-[1] text-center text-[white] text-[10vw]">
            {options[1].score}
            </div>
       </div>
    )
}