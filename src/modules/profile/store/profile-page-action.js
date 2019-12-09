import * as actionType from './profile-page-action-type';

import firestore from '@react-native-firebase/firestore'

const updateProfileStart = () => {
    return {
        type: actionType.PROFILE_UPDATE_START
    };
};

const updateProfileFinish = () => {
    return {
        type: actionType.PROFILE_UPDATE_FINSIH
    };
};

const updateProfileError = (error) => {
    return {
        type: actionType.PROFILE_UPDATE_ERROR,
        value: error
    };
};

export const updateProfile = (uid, fullName, address, id, phoneNo, sex) => async (dispatch) => {
    dispatch(updateProfileStart());

    firestore().collection('users').doc(uid)
        .update({
            fullName: fullName,
            address: address,
            id: id,
            phoneNo: phoneNo,
            sex: sex,
        })
        .then(function () {
            console.log("Document successfully updated!");
            dispatch(updateProfileFinish());
            alert("Profile updated!")

        })
        .catch(function (error) {
            console.error("Error updating  document: ", error);
            dispatch(updateProfileError(error));
        });


}