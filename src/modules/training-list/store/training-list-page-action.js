import * as actionType from './training-list-page-action-type'

import firestore from '@react-native-firebase/firestore'

const listFetchStart = () => {
    return {
        type: actionType.FETCH_LIST_START
    };
};

const listFetchError = (error) => {
    return {
        type: actionType.FETCH_LIST_ERROR,
        value: error
    };
};

const listFetchFinish = (list) => {
    return {
        type: actionType.FETCH_LIST_FINSIH,
        value: list
    };
};

export const fetchList = () => async (dispatch) => {
    dispatch(listFetchStart());

    var requestList = []
    firestore().collection('requests')
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                requestList.push(doc.data())
            });
            dispatch(listFetchFinish(requestList));
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            dispatch(listFetchError(error));
        });
}