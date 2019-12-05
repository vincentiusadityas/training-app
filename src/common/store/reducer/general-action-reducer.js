import * as actionType from '../action/general-action-type'

initialState = {
    txt: ''
}
export default generalActionReducer = (state = initialState, action) => {
    const { type, value } = action;

    switch (type) {
        case(actionType.UPDATE_INPUT):
            return {
                input: value
            }
        default:
            return state
    }
}