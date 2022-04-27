import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import constructorStyle from './burgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
    const arrData = useSelector(store => store.getAllIngredients.ingredients, shallowEqual)

    const [ingredientsPrice, setIngredientsPrice] = useState(0); // состояние начальной цены ингредиентов
    React.useEffect(() => {
        const arrDataPrice = arrData.map(item => item.price);
        if (arrDataPrice.length !== 0) {
            setIngredientsPrice(arrDataPrice.reduce((total, value) => total + value));
        }
    }, [arrData])

    const topBun = arrData.map(element => {
        if (element.name === 'Краторная булка N-200i') {
            return (
                <div className={constructorStyle.constructor_position} key={element._id} onClick={() => props.onClick(element)}>
                    <ConstructorElement
                        key={element._id}
                        type="top"
                        isLocked={true}
                        text={`${element.name} (верх)`}
                        price={element.price}
                        thumbnail={element.image}
                    />
                </div>
            )
        } else {
            return null;
        }
    })

   const allIngredients = arrData.map(element => {
        if ((element.name !== 'Краторная булка N-200i') && (element.type !== 'bun')) {
            return (
                <div className={constructorStyle.constructor__flexContainer} key={element._id} onClick={() => props.onClick(element)}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        key={element._id}
                        text={element.name}
                        price={element.price}
                        thumbnail={element.image}
                    />
                </div>
            )
        } else {
            return null;
        }
    })

    const bottomBun = arrData.map(element => {
        if (element.name === 'Краторная булка N-200i') {
            return (
                <div className={constructorStyle.constructor_position} key={element._id} onClick={() => props.onClick(element)}>
                    <ConstructorElement
                        key={element._id}
                        type="bottom"
                        isLocked={true}
                        text={`${element.name} (низ)`}
                        price={element.price}
                        thumbnail={element.image}
                    />
                </div>
            )
        } else {
            return null;
        }
    })

    return (
        <section className={`${constructorStyle.constructor} mt-25`}>
            <div className={`${constructorStyle.constructor__boxList}`}>
                {topBun}
                <div className={`${constructorStyle.constructor__boxList} ${constructorStyle.constructor__boxList_scrollbar}`}>
                    {allIngredients}
                </div>
                {bottomBun}
            </div>
            <div className={`${constructorStyle.constructor__info} mt-10`}>
                <div>
                    <p className={`text text_type_digits-medium ${constructorStyle.constructor__infoText}`}>{ingredientsPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={props.openOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    onClick: PropTypes.func.isRequired,
    openOrderDetails: PropTypes.func.isRequired
}

export default BurgerConstructor;