import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks/hooks';
import {wsConnectionClosed, wsConnectionStart} from '../services/actions/wsActionTypes';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';
import OrderStatistics from '../components/OrderStatistics/OrderStatistics';
import style from '../styles/FeedPage.module.css';
import Loader from '../components/Loader/Loader';
import {wssUrl} from '../consts/consts';
import {IWsMessages} from "../services/interface/interface";


function FeedPage(): JSX.Element {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(`${wssUrl}/all`));

        return () => {
          dispatch(wsConnectionClosed());
        };
    }, [dispatch])

    const wsReducer = useAppSelector((store) => store.wsReducer);
    const wsData: IWsMessages | undefined = wsReducer.messages;

    return (
        <>
            {(wsData !== undefined) ?
                <section className={style.feed}>
                    <h2 className={`text text_type_main-large mt-10`}>Лента заказов</h2>
                    <div>
                        <div className={style.feed__flex}>
                            <div className={`${style.feed__box} ${style.feed_scrollbar}`}>
                                <OrdersFeed wsData={wsData}/>
                            </div>
                            <OrderStatistics wsData={wsData}/>
                        </div>
                    </div>
                </section>
                :
                <Loader />
            }
        </>
    )
}

export default FeedPage;