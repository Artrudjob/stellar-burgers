import React, {useEffect} from 'react';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../services/hooks/hooks';
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
import OrdersPage from '../../pages/OrdersPage';
import UserInfoPage from '../../pages/UserInfoPage';
import FeedPage from '../../pages/FeedPage';
import FeedDetailsPage from '../../pages/FeedDetailsPage';
import SpecificOrderDetails from '../SpecificOrderDetails/SpecificOrderDetails';

import {fetchIngredients} from '../../services/actions/getAllIngredients';
import {getUser} from '../../services/actions/authActions';

interface ILocation {
    pathname: string;
    state: {
        background: { pathname: string };
    };
}

const App: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = useLocation() as ILocation;

    const background = location.state?.background;
    const numberOrder = location.pathname.split(':')[1];

    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        dispatch(fetchIngredients());

        if (refreshToken !== null) {
            dispatch(getUser());
        }
    }, [dispatch]);

    function closeModals() {
        navigate(-1);
    }

    return (
        <div className={appStyle.App}>
            <Routes location={background || location}>
                <Route path="/" element={<AppHeader />}>
                    <Route index element={<HomePage />} />
                    <Route path="ingredients/:id" element={<IngredientPage />} />
                    <Route path="profile/*" element={<ProtectedRoute children={<ProfilePage />} />} >
                        <Route path="" element={<UserInfoPage />} />
                        <Route path="orders" element={<OrdersPage />} />
                    </Route>
                    <Route path="orders/:id" element={<FeedDetailsPage />} />
                    <Route path="feed" element={<FeedPage />} />
                    <Route path="feed/:id" element={<FeedDetailsPage />} />
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
                        <IngredientsDetails />
                    </Modal>
                } />
            </Routes>}
            {background && <Routes>
                <Route path="feed/:id" element={
                    <Modal onOverlayClick={closeModals} closeModals={closeModals} title={`#${numberOrder}`}>
                        <SpecificOrderDetails />
                    </Modal>
                } />
            </Routes>}
            {background && <Routes>
                <Route path="orders/:id" element={
                    <Modal onOverlayClick={closeModals} closeModals={closeModals} title={`#${numberOrder}`}>
                        <SpecificOrderDetails />
                    </Modal>
                } />
            </Routes>}
        </div>
    );
}

export default App;
