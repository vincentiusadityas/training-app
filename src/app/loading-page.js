'use strict'

import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import auth from '@react-native-firebase/auth'

export default class AuthLoadingScreen extends Component {
    // componentDidMount() {
    //     this._bootstrapAsync();
    // }

    // // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken');

    //     // This will switch to the App screen or Auth screen and this loading
    //     // screen will be unmounted and thrown away.
    //     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // };
    componentDidMount() {
        auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user? 'App' : 'Auth');
        });
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})