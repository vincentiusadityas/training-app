'use strict'

import React, { Component } from 'react';
import {
    Modal, ActivityIndicator, StyleSheet,
    Text, TextInput, View, TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth'

export default class LoginPageLayout extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        // console.log(this.props)
        const { 
            errors, 
            isLoading, 
            handleChange, 
            onLoginPressed, 
            txt
        } = this.props
        
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isLoading}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size='large'
                                animating={isLoading} />
                            <Text>Signing in ...</Text>
                        </View>
                    </View>
                </Modal>
                <View>
                    <Text>
                        Email {!!errors.emailError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        value={txt}
                        autoCapitalize='none'
                        onChange={(event) => handleChange("email", event)}
                        placeholder='email' />

                    <Text>
                        Password {!!errors.passwordError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={txt}
                        onChange={(event) => handleChange("password", event)}
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='password' />

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={onLoginPressed} >

                        <Text> Login </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginHorizontal: 16,
        alignItems: 'center',
    },
    textInput: {
        padding: 4,
        marginTop: 3,
        marginRight: 5,
        marginBottom: 10,
        fontSize: 18,
        width: 250,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: '#48BBEC',
        padding: 10,
        borderRadius: 20,
        width: 100,
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