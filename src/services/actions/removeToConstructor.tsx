export const REMOVE_TO_CONSTRUCTOR: 'REMOVE_TO_CONSTRUCTOR' = 'REMOVE_TO_CONSTRUCTOR';

export interface IRemoveToConstructor {
    readonly type: typeof REMOVE_TO_CONSTRUCTOR;
    payload: string;
}

export const removeToConstructor = (uuid: string) => ({
    type: REMOVE_TO_CONSTRUCTOR,
    payload: uuid
})