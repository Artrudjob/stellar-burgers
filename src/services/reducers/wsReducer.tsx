import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE, TWsActions
} from '../actions/wsActionTypes';
import {IWsMessages} from '../interface/interface';

interface IState {
    wsConnected: boolean;
    messages: undefined | IWsMessages
    error: undefined | string;
}

const initialState: IState = {
    wsConnected: false,
    messages: undefined,
    error: undefined
};

function wsReducer(state = initialState, action: TWsActions): IState {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state, wsConnected: true, error: undefined
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state, wsConnected: false, error: action.payload
            };
        case WS_CONNECTION_CLOSED:
            return {
                wsConnected: false, error: undefined, messages: undefined
            };
        case WS_GET_MESSAGE:
            return {
                ...state, messages: action.payload, error: undefined
            };
        default:
            return state;
    }
}

export default wsReducer;