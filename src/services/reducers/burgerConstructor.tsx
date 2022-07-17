import {ADD_TO_CONSTRUCTOR, IAddToConstructor} from "../actions/addToConstructor";
import {IRemoveToConstructor, REMOVE_TO_CONSTRUCTOR} from "../actions/removeToConstructor";
import {ISortIngredient, SORT_INGREDIENT} from '../actions/sortIngredient';
import {IRemoveEl, REMOVE_ALL_EL_TO_CONSTRUCTOR} from '../actions/removeAllElToConstructor';
import {IIngredients} from "../interface/interface";

export interface IState {
    data: IIngredients[];
}

const initialState: IState = {
    data: []
}

function burgerConstructor(state = initialState, action: IAddToConstructor | IRemoveToConstructor | ISortIngredient | IRemoveEl): IState {
    if (action.type === ADD_TO_CONSTRUCTOR) {
        if (action.payload.type === 'bun') {
            state.data = state.data.filter(item => item.type !== 'bun');
        }
        return {
            ...state,
            data: [...state.data, action.payload]
        } as IState
    } else if (action.type === REMOVE_TO_CONSTRUCTOR) {
        return ({
            ...state,
            data: state.data.filter(element => element.uuid !== action.payload)
        })
    } else if (action.type === SORT_INGREDIENT) {
        const arrIngredients = [...state.data];
        const indexCurrentIngredients = arrIngredients.indexOf(action.payload.element)
        arrIngredients.splice(indexCurrentIngredients, 0, ...arrIngredients.splice(action.payload.toIndex, 1))
        return {
            ...state,
            data: arrIngredients,
        }
    } else if (action.type === REMOVE_ALL_EL_TO_CONSTRUCTOR) {
      return ({
          data: action.el
      })
    } else {
        return state;
    }
}

export default burgerConstructor;