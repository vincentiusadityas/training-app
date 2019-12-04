'use strict'

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, } from 'react-native';
import { ScrollView } from 'react-navigation';

import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class TrainingRequestPage extends Component {

    static navigationOptions = {
        title: 'Request Training',
    };

    constructor(props) {
        super(props);

        const date = new Date();

        this.state = {
            manager: '',
            topic: '',
            location: '',
            startDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            endDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            price: '',
        };
    };

    handleChange = (name, event) => {
        this.setState({ [name]: event.nativeEvent.text });
    };

    onSubmitPressed = () => {
        if (this.state.manager == '') {
            this.setState({
                managerError: true,
            })
        } else {
            this.setState({
                managerError: false,
            })
        }

        if (this.state.topic == '') {
            this.setState({
                topicError: true,
            })
        } else {
            this.setState({
                topicError: false,
            })
        }

        if (this.state.location == '') {
            this.setState({
                locationError: true,
            })
        } else {
            this.setState({
                locationError: false,
            })
        }

        if (this.state.startDate == '') {
            this.setState({
                startDateError: true,
            })
        } else {
            this.setState({
                startDateError: false,
            })
        }

        if (this.state.endDate == '') {
            this.setState({
                endDateError: true,
            })
        } else {
            this.setState({
                endDateError: false,
            })
        }

        if (this.state.price == '') {
            this.setState({
                priceError: true,
            })
        } else {
            this.setState({
                priceError: false,
            })
        }

        if (this.state.manager == '' || this.state.topic == '' || this.state.location == '' ||
            this.state.startDate == '' || this.state.endDate == '' || this.state.price == '') {
            alert("Please fill in all required data!")
        } else {
            this.addTrainingRequest(auth().currentUser.uid)
        }
    }

    addTrainingRequest = (uid) => {
        const { manager, topic, location, startDate, endDate, price } = this.state

        firestore().collection('requests')
            .add({
                manager: manager,
                topic: topic,
                location: location,
                startDate: startDate,
                endDate: endDate,
                price: price,
            })
            .then(function (reqRef) {
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
                                .then(function () {
                                    console.log("Document successfully updated!");
                                    alert("Training request added!");
                                })
                                .catch(function (error) {
                                    console.error("Error updating document: ", error);
                                });

                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

        var date = new Date();
        this.setState({
            manager: '',
            topic: '',
            location: '',
            startDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            endDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            price: '',
        });
    }

    render() {
        console.log(this.state.endDate);

        return (
            <ScrollView style={styles.container}>
                <View>

                    <Text> Training Manager {!!this.state.managerError && (
                        <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>

                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.manager}
                        onChange={(event) => this.handleChange("manager", event)}
                        style={styles.textInput}
                        placeholder='training manager' />

                    <Text>
                        Topic {!!this.state.topicError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={this.state.topic}
                        onChange={(event) => this.handleChange("topic", event)}
                        style={styles.textArea}
                        placeholder='topic' />

                    <Text>
                        Location {!!this.state.locationError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={this.state.location}
                        onChange={(event) => this.handleChange("location", event)}
                        style={styles.textArea}
                        placeholder='location' />

                    <Text>
                        Start Date {!!this.state.startDateError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <DatePicker
                        style={{ width: 200, marginBottom: 10 }}
                        date={this.state.startDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={this.state.startDate}
                        maxDate={this.state.endDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ startDate: date }) }}
                    />

                    <Text>
                        End Date {!!this.state.endDateError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <DatePicker
                        style={{ width: 200, marginBottom: 10 }}
                        date={this.state.startDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={this.state.startDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ endDate: date }) }}
                    />

                    <Text>
                        Price {!!this.state.priceError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    {/* <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.price}
                        onChange={(event) => {
                            new Intl.N
                        }}
                        style={styles.textInput}
                        keyboardType={'number-pad'}
                        placeholder='price' /> */}
                    <TextInputMask
                        type={'money'}
                        options={{
                            precision: 0,
                            separator: ',',
                            delimiter: '.',
                            unit: 'Rp',
                            suffixUnit: ''
                        }}
                        value={this.state.price}
                        onChangeText={text => {
                            this.setState({
                                price: text
                            })
                        }}
                        placeholder={"Rp0"}
                        style={styles.textInput}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this.onSubmitPressed} >

                        <Text> Submit </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 16,
    },
    textInput: {
        height: 36,
        padding: 4,
        marginTop: 3,
        marginRight: 5,
        marginBottom: 10,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
        padding: 4,
        marginTop: 3,
        marginRight: 5,
        marginBottom: 10,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    radioButton: {
        marginTop: 3,
        marginBottom: 10
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#48BBEC',
        padding: 10,
        borderRadius: 20,
        width: 120,
        alignSelf: "center",
        marginTop: 10,
    },
});