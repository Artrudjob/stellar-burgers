import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import appHeaderStyle from './appHeader.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

    return (
        <>
            <section className={appHeaderStyle.header}>
                <header className={appHeaderStyle.header__container}>
                    <nav className={appHeaderStyle.header__containerLinks}>
                        <NavLink className={`${appHeaderStyle.header__link} pl-4 pr-4 pb-4 pt-4`} to="/">
                            { ({isActive}) => isActive ?
                                <>
                                    <BurgerIcon type={"primary"} />
                                    <p className={`text text_type_main-default p-2 ${appHeaderStyle.header__text}`}>Конструктор</p>
                                </>
                                :
                                <>
                                    <BurgerIcon type={"secondary"} />
                                    <p className={`text text_type_main-default text_color_inactive p-2 ${appHeaderStyle.header__text}`}>Конструктор</p>
                                </>
                            }
                        </NavLink>
                        <NavLink className={`${appHeaderStyle.header__link} pl-4`} to="feed">
                            { ({isActive}) => isActive ?
                                <>
                                    <ListIcon type="primary" />
                                    <p className={`text text_type_main-default p-2 ${appHeaderStyle.header__text}`}>Лента заказов</p>
                                </>
                                :
                                <>
                                    <ListIcon type="secondary" />
                                    <p className={`text text_type_main-default text_color_inactive p-2 ${appHeaderStyle.header__text}`}>Лента заказов</p>
                                </>
                            }
                        </NavLink>
                    </nav>
                    <div>
                        <Logo />
                    </div>
                    <nav className={appHeaderStyle.header__containerLinks}>
                        <NavLink className={`${appHeaderStyle.header__link}`} to="profile">
                            { ({isActive}) => isActive ?
                                <>
                                    <ProfileIcon type={"primary"} />
                                    <p className={`text text_type_main-default p-2 ${appHeaderStyle.header__text}`}>Личный кабинет</p>
                                </>
                                :
                                <>
                                    <ProfileIcon type={"secondary"} />
                                    <p className={`text text_type_main-default text_color_inactive p-2 ${appHeaderStyle.header__text}`}>Личный кабинет</p>
                                </>
                            }
                        </NavLink>
                    </nav>
                </header>
            </section>
            <Outlet />
        </>
    )
}

export default AppHeader;