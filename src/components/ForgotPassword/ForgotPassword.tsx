import React, {ChangeEvent} from 'react';
import style from './forgotPassword.module.css';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch, useAppSelector} from '../../services/hooks/hooks';
import { fetchUserEmail } from '../../services/actions/authActions';
import { IUserData } from '../../services/interface/interface';

function ForgotPassword(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [value, setValue] = React.useState('')

    const userData: IUserData = useAppSelector((store) => store.authReducer);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value)
    }

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        dispatch(fetchUserEmail(value, navigate))
    }

    if (userData.isAuthorization) {
        return (
            <Navigate to='/' />
        )
    }

    return (
        <section className={style.forgotPassword}>
            <div className={style.forgotPassword__container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={`text text_type_main-medium ${style.forgotPassword__title}`}>Восстановление пароля</h2>
                    <fieldset className={style.forgotPassword__fieldset}>
                        <div className={`mt-6 mb-6 ${style.forgotPassword__input}`}>
                            <Input value={value} type="email" placeholder="E-mail" name="find-email" size="default" onChange={handleChange} />
                        </div>
                        {/*
                        // @ts-ignore */}
                        <Button type={"primary"} size={"medium"} className={`text text_type_main-small mt-6`}>Восстановить</Button>
                        <p className={`text text_type_main-default mt-20 ${style.forgotPassword__text}`}>Вспомнили пароль?
                            <Link to="/Login" className={`pl-2 ${style.forgotPassword__link}`}>Войти</Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword;