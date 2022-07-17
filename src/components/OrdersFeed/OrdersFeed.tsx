import React, {FunctionComponent} from 'react';
import style from './ordersFeed.module.css';
import { formatDistanceStrict } from 'date-fns';
import { useAppSelector } from '../../services/hooks/hooks';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useLocation} from 'react-router-dom';
import { orderTime } from '../../consts/consts';
import {IWsMessages} from '../../services/interface/interface';

interface IProps {
    wsData: IWsMessages;
}

const OrdersFeed: FunctionComponent<IProps> = (props): JSX.Element => {
    const allIngredients = useAppSelector((store) => store.getAllIngredients.ingredients);
    const location = useLocation();

    const allOrders = props.wsData?.orders.map(order => {
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
        })

        const currentId = order.number;
        const activeStyle = {
            color: 'white',
            textDecoration: 'none',
        };

        return (
            <div className={`mr-2 ${style.order__box}`} key={order.number}>
                <Link className={style.order__container} to={`/feed/:${currentId}`} state={{background: location}} style={activeStyle}>
                    <div className={style.order__flexContainer}>
                        <p className={`text text_type_digits-default pt-6`}>#{order.number}</p>
                        <p className={`text text_type_main-small text_color_inactive pt-6`}>{orderTime(order.createdAt, formatDistanceStrict)}</p>
                    </div>
                    <h2 className={`text text_type_main-medium pt-6`}>{order.name}</h2>
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
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </Link>
            </div>
        )
    });

    return (
        <>
            {allOrders}
        </>
    )
}

export default OrdersFeed;