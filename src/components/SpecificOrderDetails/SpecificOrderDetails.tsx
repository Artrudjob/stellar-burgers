import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector} from '../../services/hooks/hooks';
import {useLocation} from 'react-router-dom';
import {wsConnectionStart} from '../../services/actions/wsActionTypes';
import {orderTime, wssUrl} from '../../consts/consts';
import {getOrderInfo} from '../../services/actions/getOrder';
import Loader from '../Loader/Loader';
import style from '../../styles/feedDetailsPage.module.css';
import {formatDistanceStrict} from 'date-fns';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';



function SpecificOrderDetails(): JSX.Element {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const numberOrder = location.pathname.split(':')[1];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(wsConnectionStart(`${wssUrl}/all`));
        dispatch(getOrderInfo(numberOrder, setLoading));
    }, [SpecificOrderDetails]);

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

        const matchedIngredients = allIngredients.filter((item) => arrIngredientsId[0].includes(item._id));

        const burgerComposition = matchedIngredients.map((element) => {
            let countIngredient;
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

        const arrDataPrice = matchedIngredients.map((item) => {
            if (item.type === 'bun') {
                return  item.price * 2
            } else {
                return  item.price
            }
        });
        const sumPrice: number = arrDataPrice.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);

        orderDetails = orderData.data.orders.map((item) => {
            return (
                <div className={style.feedDetails__box} key={item._id}>
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
        <div className={`mt-10 mb-10`}>
            {orderDetails}
        </div>
}

export default SpecificOrderDetails;