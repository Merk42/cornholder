import { useCornholeStore } from '../../providers/cornhole-store-provider'
import { BAG_BORDER, BAG_TOTAL } from '../../const/style';

export default function History() {

    const { history } = useCornholeStore(
        (state) => state,
    )

    return (
        <div>
            {history.length > 0 &&
            <>
                <h2 className='text-2xl mb-6 mt-8'>History</h2>
                {history.map((scores) => (
                    <div className='mb-2' key={scores.team1.name}>
                        <dl className={`${BAG_BORDER['base']} grid grid-cols-[1fr_auto]`}>
                            <dt className="w-full text-base text-left">
                                {scores.team1.name}
                            </dt>
                            <dd className={`${BAG_TOTAL['base']} text-right text-base`}>
                                {scores.team1.score}
                            </dd>
                        </dl>
                        <dl className={`${BAG_BORDER['base']} grid grid-cols-[1fr_auto]`}>
                            <dt className="w-full text-base text-left">
                                {scores.team2.name}
                            </dt>
                            <dd className={`${BAG_TOTAL['base']} text-right text-base`}>
                                {scores.team2.score}
                            </dd>
                        </dl>
                        <hr></hr>
                    </div>  
                ))}
                </>
            }
        </div>
    )
}