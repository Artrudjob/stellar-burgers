import React, {useEffect} from 'react';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import appStyle from './app.module.css';

import AppHeader from '../AppHeader/AppHeader';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Modal from '../Modal/Modal';
import IngredientsDetails from '../IngredientDetails/IngredientsDetails';
import IngredientPage from '../../pages/IngredientPage';

import {fetchIngredients} from "../../services/actions/getAllIngredients";
import {getUser} from "../../services/actions/getUserInfo";

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const background = location.state?.background;

    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        dispatch(fetchIngredients());

        if (refreshToken !== null) {
            dispatch(getUser());
        }
    }, [dispatch]);

    function closeModals() {
        navigate('/');
    }

    return (
        <div className={appStyle.App}>
            <Routes location={background || location}>
                <Route path="/" element={<AppHeader />}>
                    <Route index element={<HomePage />} />
                    <Route path="ingredients/:id" element={<IngredientPage />} />
                    <Route path="profile" element={<ProtectedRoute children={<ProfilePage />} />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
            {background && <Routes>
                <Route path="ingredients/:id" element={
                    <Modal onOverlayClick={closeModals} closeModals={closeModals} title={'Детали ингредиента'}>
                        <IngredientsDetails onOverlayClick={closeModals} />
                    </Modal>
                } />
            </Routes>}
        </div>
    );
}

export default App;
