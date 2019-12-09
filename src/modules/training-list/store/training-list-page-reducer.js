import * as actionType from './training-list-page-action-type'

const initialState = {
    requestList: [],
    isLoading: false,
    errorMessage: null,
}

export default requestListReducer = (state = initialState, action) => {
    const { type, value } = action;
    switch (type) {
        case actionType.FETCH_LIST_FINSIH:
            console.log("FINSIH: ", value)
            return {
                ...state,
                requestList: value,
                isLoading: false,
            };

        case actionType.FETCH_LIST_START:
            return {
                ...state,
                isLoading: true,
            };

        case actionType.FETCH_LIST_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: value
            };

        default:
            return state;
    }
} 