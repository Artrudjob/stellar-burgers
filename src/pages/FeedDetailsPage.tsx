import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks/hooks';
import {useLocation} from 'react-router-dom';
import {wsConnectionStart} from '../services/actions/wsActionTypes';
import { formatDistanceStrict } from 'date-fns';
import Loader from '../components/Loader/Loader';
import {getOrderInfo} from '../services/actions/getOrder';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../styles/feedDetailsPage.module.css';
import {wssUrl, orderTime} from '../consts/consts';
import {IIngredients} from '../services/interface/interface';

function FeedDetailsPage(): JSX.Element {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const numberOrder = location.pathname.split(':')[1];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(wsConnectionStart(`${wssUrl}/all`));
        dispatch(getOrderInfo(numberOrder, setLoading));
    }, [FeedDetailsPage]);

    const allIngredients = useAppSelector((store) => store.getAllIngredients.ingredients);
    const orderData = useAppSelector((store) => store.orderReducer);

    const createOrderDate: string = orderData.data.orders?.map((item) => {return item.createdAt}).join();
    let orderDetails;

    if (orderData.data.orders.length !== 0) {
        const orderStatus: JSX.Element[] = orderData.data.orders.map((item) => {
            if (item.status === 'done') {
                return (
                    <p className={`text text_color_success mb-15`} key={item._id}>Выполнен</p>
                )
            } else {
                return (
                    <p className={`text text_color_error mb-15`} key={item._id}>Не готов</p>
                )
            }
        });
        const arrIngredientsId: string[][] = orderData.data.orders.map((item) => item.ingredients);

        const matchedIngredients: IIngredients[] = allIngredients.filter((item) => arrIngredientsId[0].includes(item._id));

        const burgerComposition = matchedIngredients.map(element => {
            let countIngredient: number;
            if (element.type === 'bun') {
                countIngredient = 2;
            } else {
                countIngredient = 1;
            }

            return (
                <li key={element._id} className={style.feedDetails__list}>
                    <div className={style.feedDetails__gridBox}>
                        <img src={element.image_mobile} alt={element.name} className={style.feedDetails__img} />
                        <p className={`text text_type_main-default ${style.feedDetails__text}`}>{element.name}</p>
                        <div className={style.feedDetails__flexContainer}>
                            <p className={`text text_type_digits-default mr-2`}>{`${countIngredient} x ${element.price}`}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </li>
            )
        });

        const arrDataPrice = matchedIngredients.map(item => {
            if (item.type === 'bun') {
                return  item.price * 2
            } else {
                return  item.price
            }
        });
        const sumPrice = arrDataPrice.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        orderDetails = orderData.data.orders.map((item) => {
            return (
                <div className={style.feedDetails__box} key={item._id}>
                    <h2 className={`text text_type_digits-default mb-10`}>#{item.number}</h2>
                    <p className={`text text_type_main-medium mb-3`}>{item.name}</p>
                    {orderStatus}
                    <p className={`text text_type_main-medium mb-6`}>Состав:</p>
                    <div className={`${style.feed__composition} ${style.feed_scrollbar}`}>
                        <ul className={`${style.feedDetails__style_reset}`}>{burgerComposition}</ul>
                    </div>
                    <div className={`mt-10 ${style.feedDetails__flex}`}>
                        <p className={`text text_type_main-small text_color_inactive`}>{orderTime(createOrderDate, formatDistanceStrict)}</p>
                        <div className={style.feedDetails__flexContainer}>
                            <p className={`text text_type_digits-default mr-2`}>{sumPrice}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            )
        });
    };

    if (loading) {
        return (
            <Loader />
        )
    }
    return !loading &&
        <section className={style.feedDetails}>
            {orderDetails}
        </section>
}

export default FeedDetailsPage;