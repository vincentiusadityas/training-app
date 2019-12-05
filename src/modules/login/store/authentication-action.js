import * as actionType from './authentication-action-type';

import auth from '@react-native-firebase/auth'

export const loginStart = () => {
    return {
        type: actionType.LOGIN_START,
    };
};

export const loginFinished = (user) => {
    return {
        type: actionType.LOGIN_FINISHED,
        value: user,
    }
}

export const loginError = (error) => {
    return {
        type: actionType.LOGIN_ERROR,
        value: error,
    }
}

export const login = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(loginFinished());
            this.props.navigation.navigate('App');
        })
        .catch(error => {
            dispatch(loginError());
            alert(error.message.split('] ')[1]);
        })
}