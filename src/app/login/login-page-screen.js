'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPageLayout from '../../modules/login/component/login-page-layout'
import * as authentication from '../../modules/login/store/authentication-action'
import * as updateInput from '../../common/store/action/general-action'

class LoginPageScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    state = {
        email: '',
        password: '',
    }

    handleChange = (name, e) => {
        const txt = e.nativeEvent.text
        this.props.updateInput(txt)
        this.state[name] = txt
    }

    onLoginPressed = async () => {
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
            await this.props.login(this.state.email, this.state.password)
        }
    }

    render() {
        const { isLoading, emailError, passwordError, } = this.props.loginReducer
        const errors = {
            emailError,
            passwordError
        }
        // console.log("HEHE:", this.props)

        return (
            <LoginPageLayout
                errors={errors}
                isLoading={isLoading}
                handleChange={this.handleChange}
                onLoginPressed={this.onLoginPressed}
                txt={this.props.generalReducer.txt}
            />
        )
    }
}

const mapStateToProps = (state) => ({ ...state });

const mapActionToProps = () => ({
    ...authentication,
    ...updateInput
});

export default connect(mapStateToProps, mapActionToProps())(LoginPageScreen)