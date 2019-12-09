import * as actionType from './authentication-action-type';

const initialState = {
    loggedIn: false,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    user: null
};

export default authenticationReducer = (state = initialState, action) => {
    const { type, value } = action;
    switch (type) {
        case actionType.LOGIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionType.LOGIN_FINISHED:
            console.log("login finsihed")
            return {
                ...state,
                isLoading: false,
                loggedIn: true,
                user: value,
            };
        case actionType.LOGIN_ERROR:
            console.log("login error")
            return {
                ...state,
                isLoading: false,
                loggedIn: false,
                hasError: true,
                user: null,
                errorMessage: value
            };
        case actionType.LOGOUT_START:
            console.log("logout start")
            return {
                ...state,
                isLoading: true,
            };
        case actionType.LOGOUT_FINISHED:
            console.log("logged out")
            return {
                ...initialState,
            };
        case actionType.LOGOUT_ERROR:
            console.log("logout error")
            return {
                ...state,
                isLoading: false,
                loggedIn: true,
                hasError: true,
                errorMessage: value
            };
        default:
            return state;
    };
}