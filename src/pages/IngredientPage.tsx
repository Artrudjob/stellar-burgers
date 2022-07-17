import React from 'react';
import style from '../styles/ingredientPage.module.css'
import IngredientsDetails from '../components/IngredientDetails/IngredientsDetails';

function IngredientPage(): JSX.Element {
    return (
        <section className={style.ingredient}>
            <div className={style.ingredient__container}>
                <h1 className={`text text_type_main-large`}>Детали ингредиента</h1>
                <IngredientsDetails />
            </div>
        </section>
    )
}

export default IngredientPage;