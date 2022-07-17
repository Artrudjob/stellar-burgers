import {IOrderNumber, ORDER_NUMBER} from '../actions/orderNumber';

interface IState {
    orderNumber: number[];
}

const initialState: IState = {
    orderNumber: []
}

function getOrderNumber(state = initialState, action: IOrderNumber) {
    if (action.type === ORDER_NUMBER) {
        return {
            orderNumber: [action.data]
        }
    } else {
        return state
    }
}

export default getOrderNumber;