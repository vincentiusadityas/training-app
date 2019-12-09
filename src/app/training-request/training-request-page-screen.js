'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux'

import TrainingRequestPageLayout from '../../modules/training-request/component/training-request-page-layout'
import * as requestAddAction from '../../modules/training-request/store/training-request-page-action'
import * as updateInput from '../../common/store/action/general-action'

import auth from '@react-native-firebase/auth';

class TrainingRequestPageScreen extends Component {

    static navigationOptions = {
        title: 'Request Training',
    };

    constructor(props) {
        super(props);

        const date = new Date();

        this.state = {
            manager: '',
            topic: '',
            location: '',
            currentDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            startDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            endDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            price: '',
        };
    };

    handleChange = (name, e) => {
        var txt = '';
        if (name == 'startDate' || name == 'endDate' || name == 'price') {
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
        if (this.state.manager == '') {
            this.setState({
                managerError: true,
            })
        } else {
            this.setState({
                managerError: false,
            })
        }

        if (this.state.topic == '') {
            this.setState({
                topicError: true,
            })
        } else {
            this.setState({
                topicError: false,
            })
        }

        if (this.state.location == '') {
            this.setState({
                locationError: true,
            })
        } else {
            this.setState({
                locationError: false,
            })
        }

        if (this.state.startDate == '') {
            this.setState({
                startDateError: true,
            })
        } else {
            this.setState({
                startDateError: false,
            })
        }

        if (this.state.endDate == '') {
            this.setState({
                endDateError: true,
            })
        } else {
            this.setState({
                endDateError: false,
            })
        }

        if (this.state.price == '') {
            this.setState({
                priceError: true,
            })
        } else {
            this.setState({
                priceError: false,
            })
        }

        if (this.state.manager == '' || this.state.topic == '' || this.state.location == '' ||
            this.state.startDate == '' || this.state.endDate == '' || this.state.price == '') {
            alert("Please fill in all required data!")
        } else {
            this.props.addTrainingRequest(this.state.manager, this.state.topic, this.state.location,
                this.state.startDate, this.state.endDate, this.state.price, auth().currentUser.uid)

            var date = new Date();
            this.setState({
                manager: '',
                topic: '',
                location: '',
                currentDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                startDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                endDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                price: '',
            });
        }
    }

    render() {
        const { isLoading } = this.props.trainingRequestReducer
        const {
            manager, topic, location, currentDate, startDate, endDate, price,
            managerError, topicError, locationError, startDateError, endDateError, priceError
        } = this.state;

        const errors = { managerError, topicError, locationError, startDateError, endDateError, priceError }
        
        return (
            <TrainingRequestPageLayout
                isLoading={isLoading}
                handleChange={this.handleChange}
                errors={errors}
                manager={manager}
                topic={topic}
                location={location}
                currentDate={currentDate}
                startDate={startDate}
                endDate={endDate}
                price={price}
                onSubmitPressed={this.onSubmitPressed}
            />
        )
    }
}

const mapStateToProps = (state) => ({ ...state });

const mapActionToProps = () => ({
    ...requestAddAction,
    ...updateInput,
});

export default connect(mapStateToProps, mapActionToProps())(TrainingRequestPageScreen)