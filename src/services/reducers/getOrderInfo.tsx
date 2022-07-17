import {GET_ORDER, GET_ORDER_REQUEST, GET_ORDER_ERROR, TOrderActions} from '../actions/getOrder';
import {IOrder} from "../interface/interface";

interface IState {
    data: {
        success: boolean;
        orders: IOrder[];
    };
    loading: boolean;
    status: string;
}

const initialState: IState = {
    data: {
        success: false,
        orders: []
    },
    loading: false,
    status: 'No error'
}


function orderReducer(state = initialState, action: TOrderActions) {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER:
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case GET_ORDER_ERROR:
            return {
                ...state,
                error: action.status,
                loading: false
            }
        default: {
            return state;
        };
    }
};

export default orderReducer;