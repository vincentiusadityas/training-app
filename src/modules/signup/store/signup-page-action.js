import * as actionType from './signup-page-action-type';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const addUserStart = () => {
    return {
        type: actionType.ADD_USER_START
    };
};

const addUserFinish = () => {
    return {
        type: actionType.ADD_USER_FINISH
    };
};

const addUserError = (error) => {
    return {
        type: actionType.ADD_USER_ERROR,
        value: error
    };
};

export const createUser = (fullName, address, id, phoneNo, sex,
    email, password, navigation) => async (dispatch) => {
        dispatch(addUserStart())
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                addUser(fullName, address, id, phoneNo, sex, email, authUser.user.uid);
            })
            .then(() => {
                dispatch(addUserFinish())
                navigation.navigate('App')
            })
            .catch(error => {
                alert(error.message.split('] ')[1]);
                dispatch(addUserError(error.message))
            })
    }

addUser = (fullName, address, id, phoneNo, sex, email, uid) => {

    firestore().collection('users').doc(uid)
        .set({
            fullName: fullName,
            address: address,
            id: id,
            phoneNo: phoneNo,
            sex: sex,
            email: email,
        })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}