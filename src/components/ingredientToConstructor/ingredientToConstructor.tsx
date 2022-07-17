import React, {useRef} from 'react';
import {useAppDispatch} from '../../services/hooks/hooks';
import constructorStyle from './ingredientToConstructor.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag, useDrop} from 'react-dnd';
import {removeToConstructor} from '../../services/actions/removeToConstructor';
import {IIngredients} from "../../services/interface/interface";

type TProps = {
    element: IIngredients;
    index: number;
    moveIngredientsToConstructor: (item: any, index: number) => void;
    onClick: (element: IIngredients) => void;
}

function IngredientToConstructor(props: TProps): JSX.Element {
    const ref = useRef(null);
    const dispatch = useAppDispatch();
    const element = props.element;

    const [{isDragging}, dragRef] = useDrag({
        type: 'SORT_INGREDIENT',
        item: element,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1;

    const [, dropRef] = useDrop({
        accept: 'SORT_INGREDIENT',
        hover: item => {
            props.moveIngredientsToConstructor(item, props.index)
        }
    })

    const dragDropRef: any = dragRef(dropRef(ref));


    function deleteIngredient(element: string) {
        dispatch(removeToConstructor(element));
    }

    return (
        <div className={constructorStyle.constructor__flexContainer}
             onClick={() => props.onClick(element)} ref={dragDropRef} style={{opacity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                handleClose={() => {
                    deleteIngredient(element.uuid)
                }}
            />
        </div>
    )
}

export default IngredientToConstructor;