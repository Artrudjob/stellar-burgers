import { baseUrl, checkResponse } from '../../consts/consts';
import {IIngredients} from '../interface/interface';
import {AppDispatch, AppThunk} from '../store';


const GET_ALL_INGREDIENTS: 'GET_ALL_INGREDIENTS' = 'GET_ALL_INGREDIENTS';
const GET_ALL_INGREDIENTS_FAILURE: 'GET_ALL_INGREDIENTS_FAILURE' = 'GET_ALL_INGREDIENTS_FAILURE';

interface IGetAllIngredients {
    readonly type: typeof GET_ALL_INGREDIENTS;
    readonly payload: IIngredients[];
}

interface IGetAllIngredientsFailure {
    readonly type: typeof GET_ALL_INGREDIENTS_FAILURE;
    readonly status: string;
}

const getAllIngredients = (ingredients: IIngredients[]): IGetAllIngredients => ({
    type: GET_ALL_INGREDIENTS,
    payload: ingredients
})

const getAllIngredientsFailure = (err: string): IGetAllIngredientsFailure => ({
    type: GET_ALL_INGREDIENTS_FAILURE,
    status: err
})

const fetchIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}ingredients`)
            .then(checkResponse)
            .then((result) => {
                dispatch(getAllIngredients(result.data));
                return result.data
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(getAllIngredientsFailure(err));
            })
    }
}
export type TIngredientsActions = IGetAllIngredients | IGetAllIngredientsFailure;

export { GET_ALL_INGREDIENTS, GET_ALL_INGREDIENTS_FAILURE, getAllIngredients, fetchIngredients }
