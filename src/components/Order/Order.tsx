import React, {FunctionComponent} from 'react';
import style from './order.module.css';
import { orderTime } from '../../consts/consts';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDistanceStrict } from 'date-fns';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '../../services/hooks/hooks';
import {Link, useLocation} from 'react-router-dom';
import { IOrder} from '../../services/interface/interface';

interface IProps {
    userOrders: undefined | IOrder[];
}

const Order: FunctionComponent<IProps> = (props) => {
    const location = useLocation();
    const allIngredients = useAppSelector((store) => store.getAllIngredients.ingredients, shallowEqual);
    const order = props.userOrders?.map((order) => {
        const arrIngredientsId = order.ingredients;
        const matchedIngredients = allIngredients.filter((item) => arrIngredientsId.includes(item._id));

        const arrDataPrice = matchedIngredients.map((item) => {
            if (item.type === 'bun') {
                return  item.price * 2
            } else {
                return  item.price
            }
        });
        const sumPrice = arrDataPrice.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);

        const imageIngredients = matchedIngredients.map((image) => {
            if (matchedIngredients.length < 6) {
                return (
                    <li className={style.order__list} key={image._id}>
                        <img className={style.order__img} src={image.image_mobile} alt={image.name}/>
                    </li>
                )
            } else {
                return (
                    <li className={style.order__list} key={image._id}>
                        <img className={style.order__img} src={image.image_mobile} alt={image.name}/>
                    </li>
                )
            }
        });

        let orderStatus;

        if (order.status === 'done') {
            orderStatus = <p className={`text text_color_success mt-2 mb-6`} key={order._id}>Выполнен</p>
        } else {
            orderStatus = <p className={`text text_color_error mt-2 mb-6`} key={order._id}>Не готов</p>
        }

        const activeStyle = {
            color: 'white',
            textDecoration: 'none',
        };

        const currentId = order.number;

        return (
            <div className={style.order__container} key={order._id}>
                <Link className={style.order__link} to={`/orders/:${currentId}`} state={{background: location}} style={activeStyle}>
                    <div className={style.order__flexContainer}>
                        <p className={`text text_type_digits-default pt-6`}>{order.number}</p>
                        <p className={`text text_type_main-small text_color_inactive pt-6`}>{orderTime(order.createdAt, formatDistanceStrict)}</p>
                    </div>
                    <h2 className={`text text_type_main-medium pt-6`}>{order.name}</h2>
                    {orderStatus}
                    <div className={`${style.order__flexContainer} mt-6 pb-6`}>
                        <ul className={style.order__style_reset}>
                            {imageIngredients}
                            {(matchedIngredients.length - 5) > 0 ?
                                <span className={`text text_type_digits-default ${style.order__count}`}>+{matchedIngredients.length - 5}</span>
                                :
                                undefined
                            }
                        </ul>
                        <div className={style.order__flexContainer}>
                            <p className={`text text_type_digits-default mr-2`}>{sumPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </Link>
            </div>
        )
    }).reverse();

    return (
        <div className={`${style.order__box} ${style.order_scrollbar}`}>
            {order}
        </div>
    )
}

export default Order;