import React from 'react';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '../../services/hooks/hooks';
import burgersStyle from './burgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient'
import {Link, useLocation} from 'react-router-dom';
import {IIngredients} from "../../services/interface/interface";

type TProps = {
    onClick: (ingredient: IIngredients) => void;
}

function BurgerIngredients(props: TProps) {
    const location = useLocation();
    const arrData = useAppSelector((store) => store.getAllIngredients.ingredients, shallowEqual);
    const test = props.onClick;

    const [current, setCurrent] = React.useState('bun');
    const refItem = React.useRef<HTMLHeadingElement>(null);

    const bunsList = arrData.filter((dataItem) => dataItem.type === "bun").map((item) => {
        return (
            <Link to={`ingredients/:${item._id}`} state={{background: location}} style={{textDecoration: "none", color: "white"}} key={item._id}>
                <BurgerIngredient element={item} onClick={test} />
            </Link>
        )
    });

    const saucesList = arrData.filter((dataItem) => dataItem.type === "sauce").map((item) => {
        return (
            <Link to={`ingredients/:${item._id}`} state={{background: location}} style={{textDecoration: "none", color: "white"}} key={item._id}>
                <BurgerIngredient element={item} onClick={test} />
            </Link>
        )
    });

    const toppingsList = arrData.filter((dataItem) => dataItem.type === "main").map((item) => {
        return (
            <Link to={`ingredients/:${item._id}`} state={{background: location}} style={{textDecoration: "none", color: "white"}} key={item._id}>
                <BurgerIngredient element={item} onClick={test} />
            </Link>
        )
    });

    //меняем активную кнопку, в зависимости от количество пикселей, прокрученных от верха элемента
    function scrollIngredients() {
        if (refItem.current !== null) {
            const scrollTopElement: number = refItem.current.scrollTop;
            if (scrollTopElement < 299) {
                setCurrent('bun')
            } else if ((scrollTopElement > 298) && (scrollTopElement < 799)) {
                setCurrent('sauce')
            } else {
                setCurrent('main')
            }
        }
    }

    return (
        <section className={burgersStyle.burgersMenu} onScroll={scrollIngredients}>
            <h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
            <div className={`${burgersStyle.burgersMenu__flex} mt-5`}>
                <a href={"#bun"} className={burgersStyle.burgersMenu__link}>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </a>
                <a href={"#sauce"} className={burgersStyle.burgersMenu__link}>
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </a>
                <a href={"#main"} className={burgersStyle.burgersMenu__link}>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </a>
            </div>
            <div className={burgersStyle.burgersMenu_scrollbar} ref={refItem}>
                <h2 className={'text text_type_main-medium mt-10'} id={"bun"}>Булки</h2>
                <div className={`${burgersStyle.burgersMenu__gridContainer} mt-6`}>
                    {bunsList}
                </div>
                <h2 className={'text text_type_main-medium mt-15'} id={"sauce"}>Соусы</h2>
                <div className={`${burgersStyle.burgersMenu__gridContainer} mt-6`}>
                    {saucesList}
                </div>
                <h2 className={'text text_type_main-medium mt-10'} id={"main"}>Начинки</h2>
                <div className={`${burgersStyle.burgersMenu__gridContainer} mt-6`}>
                    {toppingsList}
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;

