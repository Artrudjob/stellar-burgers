import React from 'react';
import constructorStyle from '../ingredientToConstructor/ingredientToConstructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {IIngredients} from '../../services/interface/interface';

interface IProps {
    element: IIngredients;
    onClick: (element: IIngredients) => void;
}

const BunIngredientTop = ({ element, onClick, ...rest }: IProps): JSX.Element => {

    return (
        <div className={constructorStyle.constructor_position}
             onClick={() => onClick(element)}>
            <ConstructorElement
                type={'top'}
                isLocked={true}
                text={`${element.name} (Вверх)`}
                price={element.price}
                thumbnail={element.image}
            />
        </div>
    )
}

export default BunIngredientTop;