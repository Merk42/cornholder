export default function Score({red, blue}:{red:number, blue:number}) {
    return (
        <div className="grid grid-cols-[repeat(2,1fr)] w-full">
            <div className="bg-red-600 place-content-center aspect-[1] text-center text-white text-[10vw]">
            {red}
            </div>
            <div className="bg-blue-600 place-content-center aspect-[1] text-center text-[white] text-[10vw]">
            {blue}
            </div>
       </div>
    )
}