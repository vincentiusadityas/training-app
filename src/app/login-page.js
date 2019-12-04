'use strict'

import React, { Component } from 'react';
import { Modal, ActivityIndicator, StyleSheet, 
    Text, TextInput, View, TouchableOpacity, } from 'react-native';

import auth from '@react-native-firebase/auth'

export default class LoginPage extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };
    };

    handleChange = (name, event) => {
        this.setState({ [name]: event.nativeEvent.text });
    };

    onLoginPressed = () => {
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

        if (this.state.email == '' || this.state.password == '') {
            alert("Please fill in your email and password!")
        } else {
            this.setState({
                isLoading: true,
            })
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('App'))
                .catch(error => {
                    this.setState({
                        isLoading: false,
                    })
                    alert(error.message.split('] ')[1]);
                })
        }
    }

    render() {
        const { isLoading } = this.state

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
                                animating={this.state.isLoading} />
                            <Text>Signing in ...</Text>
                        </View>
                    </View>
                </Modal>
                <View>
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
                        style={styles.loginButton}
                        onPress={this.onLoginPressed} >

                        <Text> Login </Text>
                    </TouchableOpacity>
                </View>
            </View>
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