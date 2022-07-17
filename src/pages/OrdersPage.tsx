import React, {useEffect} from 'react';
import Order from '../components/Order/Order';
import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../services/hooks/hooks';
import {wsConnectionClosed, wsConnectionStart} from '../services/actions/wsActionTypes';
import {getCookie, wssUrl} from '../consts/consts';

function OrdersPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(`${wssUrl}?token=${getCookie('accessToken')?.replace('Bearer ', '')}`));

        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [OrdersPage]);

    const userOrders = useAppSelector((store) => {
        return store.wsReducer.messages?.orders;
    }, shallowEqual);

    return (
        <div>
            <Order userOrders={userOrders}/>
        </div>
    )
}

export default OrdersPage;