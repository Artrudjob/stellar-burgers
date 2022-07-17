import {IIngredients} from '../interface/interface';

export const ADD_CURRENT_INGREDIENT: 'ADD_CURRENT_INGREDIENT' = 'ADD_CURRENT_INGREDIENT';

export interface IAddCurrentIngredient {
    readonly type: typeof ADD_CURRENT_INGREDIENT;
    readonly dataIngredient: IIngredients;
}

export const addCurrentIngredient = (ingredient: IIngredients): IAddCurrentIngredient => ({
    type: ADD_CURRENT_INGREDIENT,
    dataIngredient: ingredient
})