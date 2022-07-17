import React from 'react';
import burgersStyle from './burgerIngredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from 'react-dnd';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '../../services/hooks/hooks';
import {IIngredients} from '../../services/interface/interface';

type TProps = {
    element: IIngredients;
    onClick: (element: IIngredients) => void;
}

function BurgerIngredient(props: TProps): JSX.Element {
    const ingredientsBurger = useAppSelector((store) => store.burgerConstructor.data, shallowEqual)
    const [countIngredient, setCountIngredient] = React.useState(0);

    const element = props.element;
    const keyElement = element._id;
    const [{isDrag}, dragRef] = useDrag({
        type: 'NEW_INGREDIENT',
        item: element,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        }),
    });

    React.useEffect(() => {
        setCountIngredient(ingredientsBurger.filter(el => el._id === element._id).length)
    }, [ingredientsBurger])

    const active = isDrag && burgersStyle.burgersMenu__active;

    if (element.type === 'bun') {
        return (
            <div key={keyElement} className={`${burgersStyle.burgersMenu__flexBox} ${active}`} onClick={() => props.onClick(element)} ref={dragRef}>
                {countIngredient !== 0 && <Counter count={countIngredient} size={"default"}/>}
                <img className={burgersStyle.burgersMenu__image} src={element.image} alt={element.name}/>
                <div className={`${burgersStyle.burgersMenu__miniFlexBox} mt-2`}>
                    <p className={'text text_type_digits-default pr-2'}>{element.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`text text_type_main-small mt-2 ${burgersStyle.burgersMenu__text_position}`}>{element.name}</p>
            </div>
        )
    } else if (element.type === 'sauce') {
        return (
            <div key={keyElement} className={`${burgersStyle.burgersMenu__flexBox} ${active}`} onClick={() => props.onClick(element)} ref={dragRef}>
                {countIngredient !== 0 && <Counter count={countIngredient} size={"default"}/>}
                <img className={burgersStyle.burgersMenu__image} src={element.image} alt={element.name}/>
                <div className={`${burgersStyle.burgersMenu__miniFlexBox} mt-2`}>
                    <p className={'text text_type_digits-default pr-2'}>{element.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`text text_type_main-small mt-2 ${burgersStyle.burgersMenu__text_position}`}>{element.name}</p>
            </div>
        ) 
    } else {
        return (
            <div key={keyElement} className={`${burgersStyle.burgersMenu__flexBox} ${active}`} onClick={() => props.onClick(element)} ref={dragRef}>
                {countIngredient !== 0 && <Counter count={countIngredient} size={"default"}/>}
                <img className={burgersStyle.burgersMenu__image} src={element.image} alt={element.name}/>
                <div className={`${burgersStyle.burgersMenu__miniFlexBox} mt-2`}>
                    <p className={'text text_type_digits-default pr-2'}>{element.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`text text_type_main-small mt-2 ${burgersStyle.burgersMenu__text_position}`}>{element.name}</p>
            </div>
        )
    }
}

export default BurgerIngredient;