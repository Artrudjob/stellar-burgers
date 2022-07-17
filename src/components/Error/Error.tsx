import React, {useCallback} from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import style from './error.module.css'

function NotFound404() {
    const navigate = useNavigate();
    const home = useCallback(
        () => {
            navigate('/', {replace: true});
        },
        [navigate]
    );

    return (
        <section className={style.notFound}>
            <p className={`text text_type_main-default`}>Страница не найдена</p>
            <div onClick={home} className={style.notFound__box}>
                <Logo />
                <p className={`text text_type_main-large mt-20`}>Вернуться на главную</p>
            </div>
            <p className={`text text_type_main-default`}>Page Not Found</p>
        </section>
    )
}

export default NotFound404;