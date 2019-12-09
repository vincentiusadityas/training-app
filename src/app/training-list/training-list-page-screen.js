'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import TrainingListPageLayout from '../../modules/training-list/component/training-list-page-layout';
import * as trainingListAction from '../../modules/training-list/store/training-list-page-action';

import firestore from '@react-native-firebase/firestore';

class TrainingListPageScreen extends Component {
    static navigationOptions = {
        title: 'Training List',
    };

    constructor(props) {
        super(props);

        this.state = {
            requestList: [],
            isModalVisible: false,
        };
    };

    componentDidMount() {
        this.props.fetchList()
    }

    render() {
        const { requestList, isLoading } = this.props.requestListReducer;
        return (
            <TrainingListPageLayout 
                requestList={requestList}
                isLoading={isLoading}
            />
        )
    }
}

const mapStateToProps = (state) => ({ ...state });

const mapActionToProps = () => ({
    ...trainingListAction
});

export default connect(mapStateToProps, mapActionToProps())(TrainingListPageScreen)