import {ADD_CURRENT_INGREDIENT, IAddCurrentIngredient} from '../actions/addCurrentIngredient';
import {IRemoveCurrentIngredient, REMOVE_CURRENT_INGREDIENT} from '../actions/removeCurrentIngredient';

interface IState {
    dataIngredient: null;
}

const initialState: IState = {
    dataIngredient: null
}

function setCurrentIngredients(state = initialState, action: IAddCurrentIngredient | IRemoveCurrentIngredient) {
    if (action.type === ADD_CURRENT_INGREDIENT) {
        return {
            ...state,
            dataIngredient: action.dataIngredient
        }
    } else if (action.type === REMOVE_CURRENT_INGREDIENT) {
        return {
            ...state,
            dataIngredient: action.dataIngredient //вернуть null
        }
    } else {
        return state;
    }
}

export default setCurrentIngredients;