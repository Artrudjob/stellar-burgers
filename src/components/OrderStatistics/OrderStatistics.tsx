import React, {FunctionComponent} from 'react';
import style from './orderStatistics.module.css';
import {IWsMessages} from '../../services/interface/interface';

interface IProps {
    wsData: IWsMessages;
}

const OrderStatistics: FunctionComponent<IProps> = (props) => {
    const total = props.wsData.total;
    const totalToday = props.wsData.totalToday;

    const completedOrders = props.wsData.orders.map(item => {
        if (item.status === 'done') {
            return (
                <li key={item._id}><p className={`text text_type_digits-default text_color_success`}>{item.number}</p></li>
            )
        }
    });

    const unfulfilledOrders = props.wsData.orders.map(item => {
        if (item.status !== 'done') {
            return (
                <ul className={style.statistics__style_reset} key={item._id}>
                    <li><p className={`text text_type_digits-default`}>{item.number}</p></li>
                </ul>
            )
        }
    })

    return (
        <div className={`mt-5`}>
            <div className={style.statistics__grid}>
                <p className={`text text_type_main-medium pb-6 ${style.statistics__completed}`}>Готовы:</p>
                <ul className={`${style.statistics__style_reset} ${style.statistics__gridbox} ${style.statistics__numbersCompl}`}>
                    {completedOrders}
                </ul>
                <p className={`text text_type_main-medium pb-6 ${style.statistics__unfulfilled}`}>В работе:</p>
                <ul className={`${style.statistics__style_reset} ${style.statistics__numbersUnfulfill}`}>
                    {unfulfilledOrders}
                </ul>
            </div>
            <p className={`text text_type_main-medium mt-10`}>Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${style.statistics__digits}`}>{total}</p>
            <p className={`text text_type_main-medium mt-10`}>Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${style.statistics__digits}`}>{totalToday}</p>
        </div>
    )
}

export default OrderStatistics;