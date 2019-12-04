'use strict'

import React, { Component } from 'react';
import {
    ActivityIndicator, Modal, StyleSheet, Text,
    TextInput, View, TouchableOpacity,
} from 'react-native';

import { ScrollView } from 'react-navigation';
import RadioForm from 'react-native-simple-radio-button';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class SignUpPage extends Component {

    static navigationOptions = {
        title: 'Registration',
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            fullName: '',
            address: '',
            id: '',
            phoneNo: '',
            sex: 0,
            email: '',
            password: '',
        };
    };

    handleChange = (name, event) => {
        this.setState({ [name]: event.nativeEvent.text });
    };

    onSubmitPressed = () => {
        if (this.state.fullName == '') {
            this.setState({
                fullNameError: true,
            })
        } else {
            this.setState({
                fullNameError: false,
            })
        }

        if (this.state.address == '') {
            this.setState({
                addressError: true,
            })
        } else {
            this.setState({
                addressError: false,
            })
        }

        if (this.state.id == '') {
            this.setState({
                idError: true,
            })
        } else {
            this.setState({
                idError: false,
            })
        }

        if (this.state.phoneNo == '') {
            this.setState({
                phoneNoError: true,
            })
        } else {
            this.setState({
                phoneNoError: false,
            })
        }

        if (this.state.email == '') {
            this.setState({
                emailError: true,
            })
        } else {
            this.setState({
                emailError: false,
            })
        }

        if (this.state.password == '') {
            this.setState({
                passwordError: true,
            })
        } else {
            this.setState({
                passwordError: false,
            })
        }

        if (this.state.fullName == '' || this.state.address == '' || this.state.id == '' ||
            this.state.phoneNo == '' || this.state.email == '' || this.state.password == '') {
            alert("Please fill in all required data!")
        } else {
            this.setState({
                isLoading: true,
            })
            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(authUser => {
                    // Create a user in your Firebase realtime database
                    this.addUser(authUser.user.uid);
                })
                .then(() => this.props.navigation.navigate('App'))
                .catch(error => {
                    this.setState({
                        isLoading: false,
                    })

                    alert(error.message.split('] ')[1]);
                })
            // .catch(error => alert(error.message.split('] ')[1]))
        }
    }

    addUser = (uid) => {
        const { fullName, address, id, phoneNo, sex, email } = this.state

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

    render() {
        const { isLoading } = this.state

        return (
            <ScrollView style={styles.container}>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isLoading}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size='large'
                                animating={isLoading} />
                            <Text>Registering ...</Text>
                        </View>
                    </View>
                </Modal>
                <View>
                    <Text>Full Name {!!this.state.fullNameError && (
                        <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>

                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.fullName}
                        onChange={(event) => this.handleChange("fullName", event)}
                        style={styles.textInput}
                        placeholder='full name' />

                    <Text>
                        Address {!!this.state.addressError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={this.state.address}
                        onChange={(event) => this.handleChange("address", event)}
                        style={styles.textArea}
                        placeholder='address' />

                    <Text>
                        ID {!!this.state.idError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.id}
                        onChange={(event) => this.handleChange("id", event)}
                        style={styles.textInput}
                        placeholder='nomor KTP' />

                    <Text>
                        Phone No. {!!this.state.phoneNoError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.phoneNo}
                        onChange={(event) => this.handleChange("phoneNo", event)}
                        style={styles.textInput}
                        keyboardType={'number-pad'}
                        placeholder='phone number' />

                    <Text>
                        Sex
                    </Text>
                    <RadioForm
                        style={styles.radioButton}
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        labelStyle={{ marginRight: 20 }}
                        buttonSize={10}
                        onPress={(value) => { this.setState({ sex: value }) }} />

                    <Text>
                        Email {!!this.state.emailError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        value={this.state.email}
                        autoCapitalize='none'
                        onChange={(event) => this.handleChange("email", event)}
                        placeholder='email' />

                    <Text>
                        Password {!!this.state.passwordError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.password}
                        onChange={(event) => this.handleChange("password", event)}
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='password' />

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
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});