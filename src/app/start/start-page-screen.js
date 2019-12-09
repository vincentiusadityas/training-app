'use strict';

import React, { Component } from 'react';
import StartPageLayout from '../../modules/start/component/start-page-layout'
import { connect } from 'react-redux';

class StartPageScreen extends Component {
    static navigationOptions = {
        title: 'Training App',
    };

    onLoginPressed = () => {
        this.props.navigation.navigate('Login')
    };

    onSignupPressed = () => {
        this.props.navigation.navigate('Registration');
    };

    render() {
        return (
            <StartPageLayout
                onSignupPressed={this.onSignupPressed}
                onLoginPressed={this.onLoginPressed}
            />
        )
    }
};

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(StartPageScreen)