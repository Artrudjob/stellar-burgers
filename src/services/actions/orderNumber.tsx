import {baseUrl, checkResponse, getCookie} from '../../consts/consts';
import {AppDispatch, AppThunk} from '../store';
import {IIngredients} from '../interface/interface';
import {IRemoveEl} from './removeAllElToConstructor';

const ORDER_NUMBER: 'ORDER_NUMBER' = 'ORDER_NUMBER';

export interface IOrderNumber {
    readonly type: typeof ORDER_NUMBER;
    readonly data: number
}

const burgerOrderNumber = (id: number): IOrderNumber => ({
    type: ORDER_NUMBER,
    data: id
})

const fetchOrderNumber: AppThunk = (ingredients: IIngredients[],
                          openModal: React.Dispatch<React.SetStateAction<boolean>>,
                          stateLoader: React.Dispatch<React.SetStateAction<boolean>>,
                          removeIngredients: IRemoveEl) => {
    return function (dispatch: AppDispatch) {
        stateLoader(true)
        fetch(`${baseUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${getCookie('accessToken')}`
            },
            body: JSON.stringify({
                'ingredients': ingredients.map(item => {
                    return item._id
                })
            })
        })
            .then(checkResponse)
            .then(result => {
                dispatch(burgerOrderNumber(result.order.number))
                openModal(true); //меняет состояние на true, чтобы открылась модалка
                dispatch(removeIngredients)
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
            })
            .finally(() => {
                stateLoader(false)
            })
    }
}

export { ORDER_NUMBER, burgerOrderNumber, fetchOrderNumber }