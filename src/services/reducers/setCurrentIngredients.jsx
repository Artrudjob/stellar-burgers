import ADD_CURRENT_INGREDIENT from '../actions/addCurrentIngredient';
import REMOVE_CURRENT_INGREDIENT from '../actions/removeCurrentIngredient';

const initialState = {
    dataIngredient: null
}

function setCurrentIngredients(state = initialState, action) {
    if (action.type === 'ADD_CURRENT_INGREDIENT') {
        return {
            ...state,
            dataIngredient: action.dataIngredient
        }
    } else if (action.type === 'REMOVE_CURRENT_INGREDIENT') {
        return {
            ...state,
            dataIngredient: action.dataIngredient //вернуть null
        }
    } else {
        return state;
    }
    //console.log(22222)
    /* switch (action.type) {
         case CURRENT_INGREDIENT:
             console.log(action.dataIngredient)
             return { ...state,
                 dataIngredient: action.dataIngredient
             }
         default:
             return state
     } */
}

export default setCurrentIngredients;