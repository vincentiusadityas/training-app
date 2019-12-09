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

export default class SignUpPageLayout extends Component {
    render() {
        const { 
            errors, 
            isLoading, 
            handleChange, 
            onSubmitPressed, 
            fullName,
            address,
            id,
            phoneNo,
            email,
            password
        } = this.props

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
                    <Text>Full Name {!!errors.fullNameError && (
                        <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>

                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={fullName}
                        onChange={(event) => handleChange("fullName", event)}
                        style={styles.textInput}
                        placeholder='full name' />

                    <Text>
                        Address {!!errors.addressError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={address}
                        onChange={(event) => handleChange("address", event)}
                        style={styles.textArea}
                        placeholder='address' />

                    <Text>
                        ID {!!errors.idError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={id}
                        onChange={(event) => handleChange("id", event)}
                        style={styles.textInput}
                        placeholder='nomor KTP' />

                    <Text>
                        Phone No. {!!errors.phoneNoError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={phoneNo}
                        onChange={(event) => handleChange("phoneNo", event)}
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
                        onPress={(value) => handleChange('sex', value)} />

                    <Text>
                        Email {!!errors.emailError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        value={email}
                        autoCapitalize='none'
                        onChange={(event) => handleChange("email", event)}
                        placeholder='email' />

                    <Text>
                        Password {!!errors.passwordError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={password}
                        onChange={(event) => handleChange("password", event)}
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='password' />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={onSubmitPressed} >

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