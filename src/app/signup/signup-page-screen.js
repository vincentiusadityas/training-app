'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignUpPageLayout from '../../modules/signup/component/signup-page-layout'
import * as signupAction from '../../modules/signup/store/signup-page-action'
import * as updateInput from '../../common/store/action/general-action'

class SignUpPageScreen extends Component {

    static navigationOptions = {
        title: 'Registration',
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            fullName: '',
            address: '',
            id: '',
            phoneNo: '',
            sex: 0,
            email: '',
            password: '',
        };
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

    onSubmitPressed = () => {
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

        if (this.state.fullName == '' || this.state.address == '' || this.state.id == '' ||
            this.state.phoneNo == '' || this.state.email == '' || this.state.password == '') {
            alert("Please fill in all required data!")
        } else {
            this.props.createUser(this.state.fullName, this.state.address, 
                this.state.id, this.state.phoneNo, this.state.sex, 
                this.state.email, this.state.password, this.props.navigation);
        }
    }

    render() {
        const { isLoading } = this.props.signupReducer
        const {
            fullName, address, id, phoneNo, sex, email, password,
            fullNameError, addressError, idError, phoneNoError, emailError, passwordError
        } = this.state
        const errors = {
            fullNameError, addressError, idError, phoneNoError, emailError, passwordError
        }

        return (
            <SignUpPageLayout
                isLoading={isLoading}
                handleChange={this.handleChange}
                onSubmitPressed={this.onSubmitPressed}
                errors={errors}
                fullName={fullName}
                address={address}
                id={id}
                phoneNo={phoneNo}
                sex={sex}
                email={email}
                password={password}
            />
        )
    }
}

const mapStateToProps = (state) => ({ ...state });

const mapActionToProps = () => ({
    ...updateInput,
    ...signupAction
});

export default connect(mapStateToProps, mapActionToProps())(SignUpPageScreen)