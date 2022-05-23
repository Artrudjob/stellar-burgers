import { REGISTER_USER } from '../actions/resgisterUser';

const initialState = {
    data: {}
}

function registerUserReducer(state = initialState, action) {
    if (action.type === REGISTER_USER) {
        console.log(action.payload);
        return ({
            data: action.payload
        })
    } else {
        return state;
    }
}

export default registerUserReducer;