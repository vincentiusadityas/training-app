import * as actionType from './signup-page-action-type';

const initialState = {
    isLoading: false,
    hasError: false,
    errorMessage: '',
};

export default signupReducer = (state = initialState, action) => {
    const { type, value } = action;
    switch (type) {
        case actionType.ADD_USER_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionType.ADD_USER_FINISH:
            console.log("add user finsihed")
            return {
                ...state,
                isLoading: false,
            };

        case actionType.ADD_USER_ERROR:
            console.log("add user error: ", value)
            return {
                ...state,
                isLoading: false,
                hasError: true,
                errorMessage: value
            };
    
        default:
            return state;
    };
}