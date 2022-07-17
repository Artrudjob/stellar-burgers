import {Action, ActionCreator, applyMiddleware, compose, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import rootReducer from './rootReducer';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    TWsActions
} from './actions/wsActionTypes';
import {IAddCurrentIngredient} from './actions/addCurrentIngredient';
import {IAddToConstructor} from './actions/addToConstructor';
import {TAuthActions} from './actions/authActions';
import {TIngredientsActions} from './actions/getAllIngredients';
import {TOrderActions} from './actions/getOrder';
import {IOrderNumber} from './actions/orderNumber';
import {IRemoveEl} from './actions/removeAllElToConstructor';
import {IRemoveCurrentIngredient} from './actions/removeCurrentIngredient';
import {IRemoveToConstructor} from './actions/removeToConstructor';
import {ISortIngredient} from './actions/sortIngredient';

const wsActions = {
    wsStart: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    wsSendMessage: WS_SEND_MESSAGE
}

export type TWebsActions = typeof wsActions;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
const store = createStore(rootReducer, enhancer);

type TAllActions = IAddCurrentIngredient
    | IAddToConstructor
    | TAuthActions
    | TIngredientsActions
    | TOrderActions
    | IOrderNumber
    | IRemoveEl
    | IRemoveCurrentIngredient
    | IRemoveToConstructor
    | ISortIngredient
    | TWsActions;

export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<
        void,
        Action,
        RootState,
        TAllActions
    >
>

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;