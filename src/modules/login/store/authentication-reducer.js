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
            return {
                ...state,
                isLoading: false,
                loggedIn: true,
                user: value,
            }
        case actionType.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                loggedIn: false,
                hasError: true,
                user: null,
                errorMessage: value
            }
        default:
            return state;
    }
}