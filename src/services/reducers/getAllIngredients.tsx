import {GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_FAILURE, TIngredientsActions} from '../actions/getAllIngredients';
import {IIngredientsData} from "../interface/interface";

const initialState: IIngredientsData = {
    ingredients: [],
    loading: false,
    error: null
}

function getAllIngredients(state = initialState, action: TIngredientsActions) {
    if (action.type === GET_ALL_INGREDIENTS) {
        return {
            ...state,
            ingredients: action.payload,
            loading: true,
        }
    } else if (action.type === GET_ALL_INGREDIENTS_FAILURE) {
        return {
            ...initialState
        }
    } else {
        return state;
    }
}

export default getAllIngredients;