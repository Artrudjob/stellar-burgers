import React from 'react';
import ingredientsDetailsStyle from './ingredientsDetails.module.css'
import {useLocation} from 'react-router-dom';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '../../services/hooks/hooks';
import Loader from '../Loader/Loader';

function IngredientsDetails() {
    const location = useLocation();
    const arrData = useAppSelector((store) => store.getAllIngredients.ingredients, shallowEqual);

    const currentId = location.pathname.split(':')[1];
    const ingredient = arrData.find((el) => el._id === currentId);


    if (arrData.length === 0) {
        return (
            <>
                <Loader />
            </>
        )
    } else {
        return (
            <>
                <img src={ingredient?.image} alt={ingredient?.name}
                     className={ingredientsDetailsStyle.ingredientsDetails__image}/>
                <p className={'text text_type_main-medium mt-4'}>{ingredient?.name}</p>
                <div className={`${ingredientsDetailsStyle.ingredientsDetails__box} mt-8 mb-15`}>
                    <div>
                        <p className={'text text_type_main-small text_color_inactive'}>Калории. ккал</p>
                        <p className={'text text_type_digits-default text_color_inactive mt-2'}>{ingredient?.calories}</p>
                    </div>
                    <div>
                        <p className={'text text_type_main-small text_color_inactive'}>Белки, г</p>
                        <p className={'text text_type_digits-default text_color_inactive mt-2'}>{ingredient?.proteins}</p>
                    </div>
                    <div>
                        <p className={'text text_type_main-small text_color_inactive'}>Жиры, г</p>
                        <p className={'text text_type_digits-default text_color_inactive mt-2'}>{ingredient?.fat}</p>
                    </div>
                    <div>
                        <p className={'text text_type_main-small text_color_inactive'}>Углеводы, г</p>
                        <p className={'text text_type_digits-default text_color_inactive mt-2'}>{ingredient?.carbohydrates}</p>
                    </div>
                </div>
            </>
        )
    }
};


export default IngredientsDetails;