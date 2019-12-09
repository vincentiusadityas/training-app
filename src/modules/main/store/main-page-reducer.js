import * as actionType from './main-page-action-type'

const initialState = {
    userData: {},
    isLoading: false,
    errorMessage: null,
}

export default userReducer = (state = initialState, action) => {
    const { type, value } = action;
    switch (type) {
        case actionType.SET_USER_DATA:
            return {
                ...state,
                userData: value,
                isLoading: false,
            };

        case actionType.FETCH_USER_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionType.FETCH_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: value
            };

        default:
            return state;
    }
} 