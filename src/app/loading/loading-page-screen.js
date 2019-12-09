'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingLayout from '../../modules/loading/component/loading-page-layout'

import auth from '@react-native-firebase/auth'

class AuthLoadingScreen extends Component {

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user? 'App' : 'Auth');
        });
    }

    // Render any loading content that you like here
    render() {
        return (
            <LoadingLayout />
        );
    }
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(AuthLoadingScreen)