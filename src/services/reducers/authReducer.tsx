import {
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
    TAuthActions
} from '../actions/authActions';
import {IUserData} from '../interface/interface';

const initialState: IUserData = {
    isAuthorization: false,
    name: '',
    email: '',
    restorePassword: false,
    resetPassword: false,
    message: ''
}

function authReducer(state = initialState, action: TAuthActions) {
    switch (action.type) {
        case POST_AUTH:
        case REGISTER_USER:
        case GET_USER_INFO:
        case UPDATE_USER_INFO: {
            return {
                status: 'success',
                isAuthorization: true,
                name: action.payload.name,
                email: action.payload.email
            };
        }
        case POST_USER_EMAIL:
            return {
                ...action,
                restorePassword: true,
                message: action.payload.message
            };
        case POST_NEW_PASSWORD:
            return {
                ...action,
                resetPassword: true,
                message: action.payload.message
            };
        case SIGN_OUT_ACCOUNT:
        case POST_AUTH_FAILURE:
        case RESISTER_USER_FAILURE:
        case GET_USER_INFO_FAILURE:
        case UPDATE_USER_FAILURE:
        case POST_USER_EMAIL_FAILURE:
        case POST_NEW_PASSWORD_FAILURE:
        case SIGN_OUT_ACCOUNT_FAILURE:
            return {
                ...initialState
            };
        default: {
            return state;
        };
    }
}

export default authReducer;