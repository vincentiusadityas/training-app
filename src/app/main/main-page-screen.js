'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Alert } from 'react-native'

import auth from '@react-native-firebase/auth'

import MainPageLayout from '../../modules/main/component/main-page-layout'
import * as authentication from '../../modules/login/store/authentication-action'
import * as mainPageAction from '../../modules/main/store/main-page-action'

class MainPageScreen extends Component {
    static navigationOptions = {
        title: 'Training App',
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1,
        }
    };

    componentDidMount() {
        this.props.fetchUser(auth().currentUser.uid)
    }

    signOutUser = async () => {
        await this.props.logout()
    }

    onRequestPressed = () => {
        this.props.navigation.navigate('TrainingRequest');
    }

    onListPressed = () => {
        this.props.navigation.navigate('TrainingList');
    }

    onProfilePressed = () => {
        // const { fullName, address, id, phoneNo, sex } = this.state;
        const props = this.props.userReducer.userData
        this.props.navigation.navigate('Profile', {
            fullName: props.fullName,
            address: props.address,
            id: props.id,
            phoneNo: props.phoneNo,
            sex: props.sex
        })
    }

    onLogoutPressed = () => {
        Alert.alert(
            'Alert',
            'Are you sure to log out?',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'OK', onPress: () => this.signOutUser() },
            ],
            { cancelable: true }
        )
    }

    render() {
        const { isLoading, userData: { fullName } } = this.props.userReducer
        
        return (
            <MainPageLayout
                isLoading={isLoading}
                fullName={fullName}
                onRequestPressed={this.onRequestPressed}
                onListPressed={this.onListPressed}
                onProfilePressed={this.onProfilePressed}
                onLogoutPressed={this.onLogoutPressed}
            />
        )
    }
}

const mapStateToProps = (state) => ({ ...state });

const mapActionToProps = () => ({
    ...authentication,
    ...mainPageAction
});

export default connect(mapStateToProps, mapActionToProps())(MainPageScreen)