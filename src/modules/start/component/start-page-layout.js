'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, } from 'react-native';

export default class StartPageLayout extends Component {
    static navigationOptions = {
        title: 'Training App',
    };

    render() {
        // console.log("B: ", this.props)
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Welcome to The Training App!
                </Text>
                <Image source={require('../../../../resources/logo.png')} style={styles.image} />
                <Text style={styles.description}>
                    Please login or register if you don't have an account!
                </Text>
                <View style={styles.buttons}>
                    <Button onPress={this.props.onLoginPressed} color='#48BBEC' title='Login' />
                    <Button onPress={this.props.onSignupPressed} color='#f194ff' title='Sign up' />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    description: { marginBottom: 20, fontSize: 18, textAlign: 'center', color: '#656565' },
    container: { padding: 30, marginTop: 50 },
    buttons: { flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 105 },
    image: { width: 217, height: 138, marginBottom: 20, alignSelf: 'center' },
});