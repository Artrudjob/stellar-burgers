import React from 'react';
import constructorStyle from '../ingredientToConstructor/ingredientToConstructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {IIngredients} from '../../services/interface/interface';

interface IProps {
    element: IIngredients;
    onClick: (element: IIngredients) => void;
}

const BunIngredientBottom = ({ element, onClick, ...rest }: IProps): JSX.Element => {

    return (
        <div className={constructorStyle.constructor_position}
             onClick={() => onClick(element)}>
            <ConstructorElement
                type={'bottom'}
                isLocked={true}
                text={`${element.name} (Низ)`}
                price={element.price}
                thumbnail={element.image}
            />
        </div>
    )
}

export default BunIngredientBottom;