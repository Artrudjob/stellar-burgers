import React, {useEffect} from 'react';
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import {fetchSignOut} from '../../services/actions/authActions';
import style from './profile.module.css';
import { useAppDispatch } from '../../services/hooks/hooks';
import {getUser} from '../../services/actions/authActions';

function Profile() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [])

    const location = useLocation();

    //Выйти с аккаунта
    function signOut() {
        dispatch(fetchSignOut());
    };


    // @ts-ignore
    const setActive = ({isActive}) => isActive ?
        `${style.activeStyle} text text_type_main-medium mt-5 ${style.profile__links}`
        :
        `text_color_inactive text text_type_main-medium mt-5 ${style.profile__links}`;

    return (
        <section className={style.profile}>
            <div className={style.profile__gridBox}>
                <nav className={style.profile__navigation}>
                    <NavLink to="" end className={setActive}>Профиль</NavLink>
                    <NavLink to="orders"
                             className={setActive}>История
                        заказов</NavLink>
                    <NavLink to="/"
                             className={`text text_type_main-medium text_color_inactive mt-8 ${style.profile__links}`}
                             onClick={signOut}>Выход</NavLink>
                    {location.pathname === '/profile' ?
                        <p className={`text text_type_main-default text_color_inactive mt-25 ${style.profile_text}`}>В этом разделе вы можете изменить свои персональные данные</p>
                        :
                        <p className={`text text_type_main-default text_color_inactive mt-25 ${style.profile_text}`}>В этом разделе вы можете просмотреть свою историю заказов</p>
                    }
                </nav>
                <Outlet/>
            </div>
        </section>
    )
}

export default Profile;