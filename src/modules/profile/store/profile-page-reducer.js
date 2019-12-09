import * as actionType from './profile-page-action-type';

const initialState = {
    isLoading: false,
    errorMessage: null,
}

export default profileReducer = (state = initialState, action) => {
    const { type, value } = action

    switch (type) {
        case actionType.PROFILE_UPDATE_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionType.PROFILE_UPDATE_FINSIH:
            return {
                ...state,
                isLoading: false,
            };

        case actionType.PROFILE_UPDATE_FINSIH:
            return {
                ...state,
                isLoading: false,
                errorMessage: value
            };

        default:
            return state;
    }
}