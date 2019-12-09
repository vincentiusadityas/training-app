import * as actionType from './training-request-page-action-type';

import firestore from '@react-native-firebase/firestore';

const addRequestStart = () => {
    return {
        type: actionType.ADD_REQUEST_START
    };
};

const addRequestFinish = () => {
    return {
        type: actionType.ADD_REQUETS_FINISH
    };
};

const addRequestError = (error) => {
    return {
        type: actionType.ADD_REQUEST_ERROR,
        value: error
    };
};

export const addTrainingRequest = (manager, topic, location, startDate,
    endDate, price, uid) => async (dispatch) => {
        dispatch(addRequestStart())

        firestore().collection('requests')
            .add({
                manager: manager,
                topic: topic,
                location: location,
                startDate: startDate,
                endDate: endDate,
                price: price,
            })
            .then((reqRef) => {
                console.log("Document successfully written!");
                firestore().collection('users').doc(uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            var data = doc.data();
                            var requestList = []
                            if (data.requests) {
                                requestList = data.requests
                                requestList.push(reqRef.id)
                            } else {
                                requestList.push(reqRef.id)
                            }

                            firestore().collection('users').doc(uid)
                                .update({
                                    requests: requestList
                                })
                                .then(() => {
                                    dispatch(addRequestFinish());
                                    console.log("Document successfully updated!");
                                    alert("Training request added!");
                                })
                                .catch((error) => {
                                    dispatch(addRequestError(error));
                                    console.error("Error updating document: ", error);
                                });

                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        dispatch(addRequestError(error));
                        console.log("Error getting document:", error);
                    });
            })
            .catch((error) => {
                dispatch(addRequestError(error));
                console.error("Error writing document: ", error);
            });

    }