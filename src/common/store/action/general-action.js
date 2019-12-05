import * as actionType from './general-action-type';

export const updateInput = (input) => ({
    type: actionType.UPDATE_INPUT,
    value: {txt: input,}
})