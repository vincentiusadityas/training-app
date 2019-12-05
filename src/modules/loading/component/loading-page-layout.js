'use strict'

import React, { Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class LoadingLayout extends Component {
    
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