'use client'; // Required for client-side hooks in the App Router
import { useMemo, useState } from 'react';
import Modal from "@/app/_components/modal";
import { BAG_BORDER, BAG_BUTTON, DEFAULT_BUTTON } from '@/app/const/style';
import { FULL_GAME } from '@/app/const/type';
import { KEYEDTEAMS, KEYEDCOLORS } from '@/app/const/data';

export default function Summary({game}:{game:FULL_GAME}) {
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true)
    }

    const totals = useMemo<{visitor:number,home:number}>(() => {
        const T = {
            visitor:0,
            home:0
        }
        if (game.game_1_home_score > game.game_1_visitor_score) {
            T.home = T.home+1
        } else {
            T.visitor = T.visitor+1
        }
        if (game.game_2_home_score > game.game_2_visitor_score) {
            T.home = T.home+1
        } else {
            T.visitor = T.visitor+1
        }
        if (game.game_3_home_score > game.game_3_visitor_score) {
            T.home = T.home+1
        } else {
            T.visitor = T.visitor+1
        }
        return T
    },[game])
    return (
        <>
        <button className={DEFAULT_BUTTON} onClick={openModal}>summary</button>
        <Modal openModal={modal} closeModal={() => setModal(false)}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>F</th>
                    </tr>
                </thead>
                {game &&
                <tbody> 
                    <tr className={`${BAG_BORDER['base']} ${BAG_BORDER[KEYEDCOLORS[game.visitor_id]]} table-row`}>
                        <th className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[game.visitor_id]]}`}>{KEYEDTEAMS[game.visitor_id]}</th>
                        <td className='px-4 py-2'>{game.game_1_visitor_score}</td>
                        <td className='px-4 py-2'>{game.game_2_visitor_score}</td>
                        <td className='px-4 py-2'>{game.game_3_visitor_score}</td>
                        <td className='px-4 py-2'>{totals.visitor}</td>
                    </tr>
                    <tr className={`${BAG_BORDER['base']} ${BAG_BORDER[KEYEDCOLORS[game.home_id]]} table-row`}>
                        <th className={`${BAG_BUTTON['base']}  ${BAG_BUTTON[KEYEDCOLORS[game.home_id]]}`}>{KEYEDTEAMS[game.home_id]}</th>
                        <td className='px-4 py-2'>{game.game_1_home_score}</td>
                        <td className='px-4 py-2'>{game.game_2_home_score}</td>
                        <td className='px-4 py-2'>{game.game_3_home_score}</td>
                        <td className='px-4 py-2'>{totals.home}</td>
                    </tr>
                </tbody>
                }
            </table>
        </Modal>
        </>
    )
}