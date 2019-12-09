'use strict'

import React, { Component } from 'react';
import { Alert, View, FlatList, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';

import ListItem from './list-item'

export default class TrainingListPageLayout extends Component {

    keyExtractor = (item, index) => item.toString() + index.toString();

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }

    onPressItem = (index) => {
        const req = this.props.requestList[index];
        const message =
            "Training Manager: " + req.manager + "\n" +
            "Topic: " + req.topic + "\n" +
            "Location: " + req.location + "\n" +
            "Start Date: " + req.startDate + "\n" +
            "End Date: " + req.endDate + "\n" +
            "Price: " + req.price + "\n"

        Alert.alert(
            'Training Request Detail',
            message,
            [
                { text: 'Close', },
            ],
            { cancelable: true }
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                item={item}
                index={index}
                onPressItem={this.onPressItem}
            />
        )
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        const { requestList, isLoading } = this.props;

        return (
            <View>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isLoading}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size='large'
                                animating={isLoading} />
                            <Text>Fetching data ...</Text>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={requestList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})