import * as actionType from './main-page-action-type'

import firestore from '@react-native-firebase/firestore'

const fetchUserStart = () => {
    return {
        type: actionType.FETCH_USER_START,
    };
};

const fetchUserError = (error) => {
    return {
        type: actionType.FETCH_USER_ERROR,
        value: error,
    };
};

const setUserData = (userData) => {
    return {
        type: actionType.SET_USER_DATA,
        value: userData,
    };
}

export const fetchUser = (uid) => async (dispatch) => {
    dispatch(fetchUserStart());
    firestore().collection('users').doc(uid)
        .onSnapshot((doc) => {
            if (doc != null) {
                var data = doc.data()
                dispatch(setUserData(data))
            } else {
                dispatch(fetchUserError("User not found!"))
            }
        })
}