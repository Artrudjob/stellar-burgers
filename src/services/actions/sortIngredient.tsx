import {IIngredients} from '../interface/interface';

export const SORT_INGREDIENT: 'SORT_INGREDIENT' = 'SORT_INGREDIENT';

export interface ISortIngredient {
    readonly type: typeof SORT_INGREDIENT;
    readonly payload: {
        element: IIngredients;
        toIndex: number;
    }
}

export const sortIngredient = (element: IIngredients, toIndex: number): ISortIngredient => ({
    type: SORT_INGREDIENT,
    payload: {
        element: element,
        toIndex: toIndex
    }
})