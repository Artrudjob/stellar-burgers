import React, {FunctionComponent} from 'react';
import styleOrderDetails from './orderDetails.module.css';

interface IProps {
    title: string;
    onOverlayClick: () => void;
}

const OrderDetails: FunctionComponent<IProps> = ({title}) => {
    return (
        <>
            <h3 className={'text text_type_digits-large mt-30'}>{title}</h3>
            <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
            <div className={`${styleOrderDetails.orderDetails__img} mt-15`}></div>
            <p className={'text text_type_main-medium mt-15'}>Ваш заказ начали готовить</p>
            <p className={'text text_type_main-medium text_color_inactive mt-2 mb-30'}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;