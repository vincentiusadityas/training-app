import * as actionType from './training-request-page-action-type';

const initialState = {
    isLoading: false,
    errorMessage: null,
};

export default trainingRequestReducer = (state = initialState, action) => {
    const { type, value } = action;
    switch (type) {
        case actionType.ADD_REQUEST_START:
            return {
                isLoading: true,
            };

        case actionType.ADD_REQUETS_FINISH:
            console.log("add request finsihed")
            return {
                ...state,
                isLoading: false,
            };

        case actionType.ADD_REQUEST_ERROR:
            console.log("add request error: ", value)
            return {
                isLoading: false,
                errorMessage: value
            };

        default:
            return state;
    };
}