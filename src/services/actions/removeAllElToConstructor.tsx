const REMOVE_ALL_EL_TO_CONSTRUCTOR: 'REMOVE_ALL_EL_TO_CONSTRUCTOR' = 'REMOVE_ALL_EL_TO_CONSTRUCTOR';

export interface IRemoveEl {
    readonly type: typeof REMOVE_ALL_EL_TO_CONSTRUCTOR;
    readonly el: [];
}

const removeAllElToConstructor: IRemoveEl = ({
    type: REMOVE_ALL_EL_TO_CONSTRUCTOR,
    el: []
})

export { REMOVE_ALL_EL_TO_CONSTRUCTOR, removeAllElToConstructor }