import {baseUrl, checkResponse, getUserInfo, updateUserInfo} from '../../consts/consts';
import {AppDispatch, AppThunk} from '../store';

const POST_AUTH: 'POST_AUTH' = 'POST_AUTH';
const POST_AUTH_FAILURE: 'POST_AUTH_FAILURE' = 'POST_AUTH_FAILURE';

const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER';
const RESISTER_USER_FAILURE: 'RESISTER_USER_FAILURE' = 'RESISTER_USER_FAILURE';

const GET_USER_INFO: 'GET_USER_INFO' = 'GET_USER_INFO';
const GET_USER_INFO_FAILURE: 'GET_USER_INFO_FAILED' = 'GET_USER_INFO_FAILED';

const UPDATE_USER_INFO: 'UPDATE_USER_INFO' = 'UPDATE_USER_INFO';
const UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE' = 'UPDATE_USER_FAILURE';

const POST_USER_EMAIL: 'POST_USER_EMAIL' = 'POST_USER_EMAIL';
const POST_USER_EMAIL_FAILURE: 'POST_USER_EMAIL_FAILURE' = 'POST_USER_EMAIL_FAILURE';

const POST_NEW_PASSWORD: 'POST_NEW_PASSWORD' = 'POST_NEW_PASSWORD';
const POST_NEW_PASSWORD_FAILURE: 'POST_NEW_PASSWORD_FAILURE' = 'POST_NEW_PASSWORD_FAILURE';

const SIGN_OUT_ACCOUNT: 'SIGN_OUT_ACCOUNT' = 'SIGN_OUT_ACCOUNT';
const SIGN_OUT_ACCOUNT_FAILURE: 'SIGN_OUT_ACCOUNT_FAILURE' = 'SIGN_OUT_ACCOUNT_FAILURE';

type TSuccessMessage = {
    success: boolean;
    message: string
}

//interface actions
interface IPostAuth {
    readonly type: typeof POST_AUTH;
    readonly payload: {
        email: string;
        name: string;
    }
}

interface IPostAuthFailure {
    readonly type: typeof POST_AUTH_FAILURE;
    readonly status: string;
}

interface IRegisterUser {
    readonly type: typeof REGISTER_USER;
    readonly payload: {
        email: string;
        name: string;
    }
}

interface IRegisterUserFailure {
    readonly type: typeof RESISTER_USER_FAILURE;
    readonly status: string;
}

interface IUserData {
    readonly type: typeof GET_USER_INFO;
    readonly payload: {
        email: string;
        name: string;
    }
}

interface IUserDataFailure {
    readonly type: typeof GET_USER_INFO_FAILURE;
    readonly status: string;
}

interface IUpdateUserData {
    readonly type: typeof UPDATE_USER_INFO;
    readonly payload: {
        email: string;
        name: string;
    }
}

interface IUpdateUserDataFailure {
    readonly type: typeof UPDATE_USER_FAILURE;
    readonly status: string;
}

interface IPostUserEmail {
    readonly type: typeof POST_USER_EMAIL;
    readonly payload: {
        message: TSuccessMessage
    };
}

interface IPostUserEmailFailure {
    readonly type: typeof POST_USER_EMAIL_FAILURE;
    readonly status: string;
}

interface IPostNewPassword {
    readonly type: typeof POST_NEW_PASSWORD;
    readonly payload: {
        message: TSuccessMessage
    }
}

interface IPostNewPasswordFailure {
    readonly type: typeof POST_NEW_PASSWORD_FAILURE;
    readonly status: string;
}

interface ISignOutAccount {
    readonly type: typeof SIGN_OUT_ACCOUNT;
    readonly payload: TSuccessMessage;
}

interface ISignOutAccountFailure {
    readonly type: typeof SIGN_OUT_ACCOUNT_FAILURE;
    readonly status: string;
}

//actions
const postAuth = (userEmail: string, userName: string): IPostAuth => ({
    type: POST_AUTH,
    payload: {
        email: userEmail,
        name: userName
    }
});

const postAuthFailure = (err: string): IPostAuthFailure => ({
    type: POST_AUTH_FAILURE,
    status: err
});

const registerUser = (userEmail: string, userName: string): IRegisterUser => ({
    type: REGISTER_USER,
    payload: {
        email: userEmail,
        name: userName
    }
});

const registerUserFailure = (err: string): IRegisterUserFailure => ({
    type: RESISTER_USER_FAILURE,
    status: err
});

const userData = (userEmail: string, userName: string): IUserData => ({
    type: GET_USER_INFO,
    payload: {
        email: userEmail,
        name: userName
    }
});

const userDataFailure = (err: string): IUserDataFailure => ({
    type: GET_USER_INFO_FAILURE,
    status: err
});

const updateUserData = (userEmail: string, userName: string): IUpdateUserData => ({
    type: UPDATE_USER_INFO,
    payload: {
        email: userEmail,
        name: userName
    }
});

const updateUserDataFailure = (err: string): IUpdateUserDataFailure => ({
    type: UPDATE_USER_FAILURE,
    status: err
});

const postUserEmail = (successMessage: TSuccessMessage): IPostUserEmail => ({
    type: POST_USER_EMAIL,
    payload: {
        message: successMessage
    }
});

const postUserEmailFailure = (err: string): IPostUserEmailFailure => ({
    type: POST_USER_EMAIL_FAILURE,
    status: err
});

const postNewPassword = (successMessage: TSuccessMessage): IPostNewPassword => ({
    type: POST_NEW_PASSWORD,
    payload: {
        message: successMessage
    }
})

const postNewPasswordFailure = (err: string): IPostNewPasswordFailure => ({
    type: POST_NEW_PASSWORD_FAILURE,
    status: err
})

const signOutAccount = (answer: TSuccessMessage): ISignOutAccount => ({
    type: SIGN_OUT_ACCOUNT,
    payload: answer
})

const signOutAccountFailure = (err: string): ISignOutAccountFailure => ({
    type: SIGN_OUT_ACCOUNT_FAILURE,
    status: err
})

//async functions
const fetchPostAuth: AppThunk = (userEmail: string, userPassword: string) => {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': `${userEmail}`,
                'password': `${userPassword}`
            })
        })
            .then(checkResponse)
            .then(result => {
                dispatch(postAuth(result.user.email, result.user.name));

                localStorage.setItem('refreshToken', result.refreshToken);
                document.cookie = `accessToken=${result.accessToken}`;
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(postAuthFailure(err));
            })
    }
};

const fetchRegisterUser: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': `${email}`,
                'password': `${password}`,
                'name': `${name}`
            })
        })
            .then(checkResponse)
            .then((result) => {
                dispatch(registerUser(result.user.email, result.user.name));

                localStorage.setItem('refreshToken', result.refreshToken);
                document.cookie = `accessToken=${result.accessToken}`;
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(registerUserFailure(err));
            })
    }
};

const getUser: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        getUserInfo()
            .then((res) => {
                dispatch(userData(res.user.email, res.user.name));
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(userDataFailure(err));
            })
    }
};

const updateInfo: AppThunk = (userEmail: string, userName: string) => {
    return function (dispatch: AppDispatch) {
        updateUserInfo(userEmail, userName)
            .then((res) => {
                dispatch(updateUserData(userEmail, userName))
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(updateUserDataFailure(err));
            })
    }
};

const fetchUserEmail: AppThunk = (userEmail: string, navigate: any) => {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': `${userEmail}`
            })
        })
            .then(checkResponse)
            .then((result) => {
                dispatch(postUserEmail(result.message));
                navigate('/reset-password', {replace: true, state: 'forgot-password'});
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`)
                dispatch(postUserEmailFailure(err))
            })
    }
}

const fetchNewPassword: AppThunk = (newPassword: string, token: string, navigate: any) => {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'password': `${newPassword}`,
                'token': `${token}`
            })
        })
            .then(checkResponse)
            .then((result) => {
                postNewPassword(result.message)
                navigate('/');
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(postNewPasswordFailure(err));
            })
    }
};

const fetchSignOut: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'token': localStorage.getItem('refreshToken')
            })
        })
            .then(checkResponse)
            .then(result => {
                dispatch(signOutAccount(result));
                localStorage.removeItem('refreshToken');
                document.cookie = 'accessToken=;max-age=-1';
                localStorage.removeItem('ExpiredTime');
            })
            .catch((err) => {
                console.log(`Что-то пошло не так: ${err}`);
                dispatch(signOutAccountFailure(err));
            })
    }
}

export type TAuthActions = IPostAuth
    | IPostAuthFailure
    | IRegisterUser
    | IRegisterUserFailure
    | IUserData
    | IUserDataFailure
    | IUpdateUserData
    | IUpdateUserDataFailure
    | IPostUserEmail
    | IPostUserEmailFailure
    | IPostNewPassword
    | IPostNewPasswordFailure
    | ISignOutAccount
    | ISignOutAccountFailure;

export {
    POST_AUTH,
    POST_AUTH_FAILURE,
    REGISTER_USER,
    RESISTER_USER_FAILURE,
    GET_USER_INFO,
    GET_USER_INFO_FAILURE,
    UPDATE_USER_INFO,
    UPDATE_USER_FAILURE,
    POST_USER_EMAIL,
    POST_USER_EMAIL_FAILURE,
    POST_NEW_PASSWORD,
    POST_NEW_PASSWORD_FAILURE,
    SIGN_OUT_ACCOUNT,
    SIGN_OUT_ACCOUNT_FAILURE,
    fetchPostAuth,
    fetchRegisterUser,
    getUser, updateInfo,
    fetchUserEmail,
    fetchNewPassword,
    fetchSignOut
};