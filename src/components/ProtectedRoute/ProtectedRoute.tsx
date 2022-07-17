import React from 'react';
import { useAppSelector } from '../../services/hooks/hooks';
import {Navigate, useLocation} from 'react-router-dom';
import {IUserData} from '../../services/interface/interface';

//компонент доступа к маршруту. Если пользователь не авторизирован, то идет переадресация
// на незащищенный маршрут. Если авторизирован, то пользователь может перейти на защищенный маршрут.

interface IProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: IProps): JSX.Element => {
    const location = useLocation();

    const userData: IUserData = useAppSelector((store) => store.authReducer); //получаем из хранилища данные о пользователе(авторизован ли он, его email и его имя)

    return (
        userData.isAuthorization ?
            <>{children}</>
                :
            <Navigate to='/login' state={location.pathname}/>
    )
}

export default ProtectedRoute;