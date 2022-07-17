import React, {ChangeEvent} from 'react';
import {Link, Navigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import registerStyle from './register.module.css';
import {Button, Input, ShowIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {fetchRegisterUser} from '../../services/actions/authActions';
import {IUserData} from '../../services/interface/interface';

function Register() {
    const dispatch = useAppDispatch();

    const userData: IUserData = useAppSelector((store) => store.authReducer);

    const [name, setName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>, value: (e: string) => void): void {
        value(e.target.value);
    }

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        dispatch(fetchRegisterUser(userEmail, userPassword, name));
    }

    if (userData.isAuthorization) {
        return (
            <Navigate to='/' />
        )
    }

    return (
        <section className={registerStyle.register}>
            <div className={registerStyle.register__container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={`text text_type_main-medium ${registerStyle.register__title}`}>Регистрация</h2>
                    <fieldset className={registerStyle.register__fieldset}>
                        <div className={`mt-6 ${registerStyle.register__input}`}>
                            <Input value={name} type="text" placeholder="Имя" name="new-name" size="default"
                                   onChange={(e) => {handleChange(e, setName)}}/>
                        </div>
                        <div className={`mt-6 ${registerStyle.register__input}`}>
                            <Input value={userEmail} type="email" placeholder="E-mail" name="new-email" size="default"
                                   onChange={(e) => {handleChange(e, setUserEmail)}}/>
                        </div>
                        <div className={`mt-6 ${registerStyle.register__input}`}>
                            <Input value={userPassword} type="password" placeholder="Пароль" name="new-password" size="default"
                                   onChange={(e) => {handleChange(e, setUserPassword)}} />
                            <div className={registerStyle.register__image}>
                                <ShowIcon type={"primary"} />
                            </div>
                        </div>
                        {/*
                            // @ts-ignore */}
                        <Button type={"primary"} size={"medium"} className={`text text_type_main-small mt-6`}>Зарегистрироваться</Button>
                        <p className={`text text_type_main-default mt-20 ${registerStyle.register__text}`}>Уже зарегистрированы?
                            <Link to="/Login" className={`pl-2 ${registerStyle.register__link}`}>Войти</Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default Register;