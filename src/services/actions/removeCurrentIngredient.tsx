export const REMOVE_CURRENT_INGREDIENT: 'REMOVE_CURRENT_INGREDIENT' = 'REMOVE_CURRENT_INGREDIENT';

export interface IRemoveCurrentIngredient {
    readonly type: typeof REMOVE_CURRENT_INGREDIENT;
    readonly dataIngredient: null;
}

export const removeCurrentIngredient: IRemoveCurrentIngredient = {
    type: REMOVE_CURRENT_INGREDIENT,
    dataIngredient: null
};

