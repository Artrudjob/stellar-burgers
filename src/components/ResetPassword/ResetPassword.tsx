import React, {ChangeEvent} from 'react';
import style from './resetPassword.module.css';
import {Button, Input, ShowIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { fetchNewPassword } from '../../services/actions/authActions';
import {IUserData} from '../../services/interface/interface';

function ResetPassword() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = React.useState('');
    const [codeMessage, setCodeMessage] = React.useState('');

    const userData: IUserData = useAppSelector((store) => store.authReducer);

    function handleChange(e: ChangeEvent<HTMLInputElement>, value: (e: string) => void): void {
        value(e.target.value);
    }

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        dispatch(fetchNewPassword(newPassword, codeMessage, navigate));
    }

    if ((userData.isAuthorization) || (location.state !== 'forgot-password')) {
        return (
            <Navigate to='/' />
        )
    }

    return (
        <section className={style.resetPassword}>
            <div className={style.resetPassword__container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={`text text_type_main-medium ${style.resetPassword__title}`}>Восстановление пароля</h2>
                    <fieldset className={style.resetPassword__fieldset}>
                        <div className={`mt-6 ${style.resetPassword__input}`}>
                            <Input value={newPassword} type="password" placeholder="Введите новый пароль" name="reset-password"
                                   size="default" onChange={(e) => {handleChange(e, setNewPassword)}} />
                            <div className={style.resetPassword__image}>
                                <ShowIcon type={"primary"} />
                            </div>
                        </div>
                        <div className={`mb-6 ${style.resetPassword__input}`}>
                            <Input value={codeMessage} type="text" placeholder="Введите код из письма" name="code-message"
                                   size="default" onChange={(e) => {handleChange(e, setCodeMessage)}} />
                        </div>
                        {/*
                        //@ts-ignore */}
                        <Button type={"primary"} size={"medium"} className={`text text_type_main-small mt-6`}>Сохранить</Button>
                        <p className={`text text_type_main-default mt-20 ${style.resetPassword__text}`}>Вспомнили пароль?
                            <Link to="/Login" className={`pl-2 ${style.resetPassword__link}`}>Войти</Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword;