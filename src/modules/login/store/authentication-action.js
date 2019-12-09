import * as actionType from './authentication-action-type';

import auth from '@react-native-firebase/auth'

const loginStart = () => {
    return {
        type: actionType.LOGIN_START,
    };
};

const loginFinished = (user) => {
    return {
        type: actionType.LOGIN_FINISHED,
        value: user,
    }
}

const loginError = (error) => {
    return {
        type: actionType.LOGIN_ERROR,
        value: error,
    }
}

export const login = (email, password, navigation) => async (dispatch) => {
    dispatch(loginStart());
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            navigation.navigate('App');
            dispatch(loginFinished());
        })
        .catch(error => {
            alert(error.message.split('] ')[1]);
            dispatch(loginError(error.message));
        })
}

const logoutStart = () => {
    return {
        type: actionType.LOGOUT_START,
    };
};

const logoutFinished = () => {
    return {
        type: actionType.LOGOUT_FINISHED,
    };
};

const logoutError = (error) => {
    return {
        type: actionType.LOGOUT_ERROR,
        value: error
    };
};

export const logout = () => async (dispatch) => {
    console.log("TEST LOGOUT")
    dispatch(logoutStart());
    try {
        auth().signOut();
        dispatch(logoutFinished());
    } catch (error) {
        dispatch(logoutError(error));
    }
}