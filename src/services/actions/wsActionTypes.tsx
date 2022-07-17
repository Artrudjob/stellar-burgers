import {IWsMessages} from "../interface/interface";

const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
}

interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IWsMessages;
}

interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: IWsMessages;
}

export type TWsActions = IWsConnectionStart | IWsConnectionSuccess | IWsConnectionError | IWsConnectionClosed | IWsGetMessage | IWsSendMessage;

const wsConnectionStart = (payload: string): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: payload
    }

}

const wsConnectionSuccess = (): IWsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

const wsConnectionError = (message: string): IWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: message
    }
}

const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

const wsGetMessage = (message: IWsMessages): IWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

const wsSendMessage = (message: IWsMessages): IWsSendMessage => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export {
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE,
    wsConnectionStart, wsConnectionClosed
}