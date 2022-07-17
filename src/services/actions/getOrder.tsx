import {baseUrl, checkResponse} from '../../consts/consts';
import {IOrder} from '../interface/interface';
import {AppDispatch, AppThunk} from '../store';

const GET_ORDER: 'GET_ORDER' = 'GET_ORDER';
const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

interface IAnswer {
    success: boolean;
    orders: Array<IOrder>
}

interface IGetOrder {
    readonly type: typeof GET_ORDER;
    readonly payload: {
        success: boolean;
        orders: Array<IOrder>
    }
}

interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderFailure {
    readonly type: typeof GET_ORDER_ERROR;
    readonly status: string;
}

const getOrder = (order: IAnswer): IGetOrder => ({
    type: GET_ORDER,
    payload: order
});

const getOrderFailure = (err: string): IGetOrderFailure => ({
    type: GET_ORDER_ERROR,
    status: err
})


const getOrderInfo: AppThunk = (number: string, loading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        loading(true);
        fetch(`${baseUrl}orders/${number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
            .then(result => {
                dispatch(getOrder(result));
                loading(false);
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(getOrderFailure(err));
                alert(`Ошибка - ${err}, перезагрузите страницу.`)
            })
    }
};

export type TOrderActions = IGetOrder |  IGetOrderRequest | IGetOrderFailure;

export { GET_ORDER, GET_ORDER_REQUEST, GET_ORDER_ERROR, getOrderInfo };