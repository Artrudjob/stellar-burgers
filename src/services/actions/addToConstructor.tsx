import {v4 as uuid} from 'uuid'
import {IIngredients} from '../interface/interface';

export const ADD_TO_CONSTRUCTOR: 'ADD_TO_CONSTRUCTOR' = 'ADD_TO_CONSTRUCTOR';

export interface IAddToConstructor {
    readonly type: typeof ADD_TO_CONSTRUCTOR;
    payload: {
        type?: string
        uuid: string;
    }
}

export const addToConstructor = (ingredient: IIngredients): IAddToConstructor => ({
    type: ADD_TO_CONSTRUCTOR,
    payload: {
        ...ingredient,
        uuid: uuid()
    }
});