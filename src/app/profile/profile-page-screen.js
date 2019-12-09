'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfilePageLayout from '../../modules/profile/component/profile-page-layout'
import * as updateInput from '../../common/store/action/general-action'
import * as profileAction from '../../modules/profile/store/profile-page-action'

import auth from '@react-native-firebase/auth';

class ProfilePageScreen extends Component {
    static navigationOptions = {
        title: 'My Profile',
    };

    constructor(props) {
        super(props);

        const { navigation } = this.props;

        this.state = {
            fullName: navigation.getParam('fullName'),
            address: navigation.getParam('address'),
            id: navigation.getParam('id'),
            phoneNo: navigation.getParam('phoneNo'),
            sex: navigation.getParam('sex')
        }
    };

    handleChange = (name, e) => {
        var txt = '';
        if (name == 'sex') {
            txt = e;
        } else {
            txt = e.nativeEvent.text
        }
        this.props.updateInput(txt)
        this.setState({
            [name]: txt
        })
    }

    onSavePressed = () => {
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

        if (this.state.fullName == '' || this.state.address == '' ||
            this.state.id == '' || this.state.phoneNo == '') {
            alert("You have to fill all field!")
        } else {
            this.updateUserData(auth().currentUser.uid)
        }
    }

    updateUserData = async (uid) => {

        const { fullName, address, id, phoneNo, sex } = this.state

        await this.props.updateProfile(uid, fullName, address, id, phoneNo, sex)

    }

    render() {
        console.log(this.props)
        const {
            fullName, address, id, phoneNo, sex,
            fullNameError, addressError, idError, phoneNoError
        } = this.state
        const errors = {
            fullNameError, addressError, idError, phoneNoError
        }
        const {
            isLoading
        } = this.props.profileReducer

        return (
            <ProfilePageLayout
                errors={errors}
                fullName={fullName}
                address={address}
                id={id}
                phoneNo={phoneNo}
                sex={sex}
                handleChange={this.handleChange}
                onSavePressed={this.onSavePressed}
                isLoading={isLoading}
            />
        )
    }
}

const mapStateToProps = (state) => ({ ...state });

const mapActionToProps = () => ({
    ...updateInput,
    ...profileAction
});

export default connect(mapStateToProps, mapActionToProps())(ProfilePageScreen)