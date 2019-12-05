'use strict'

import React, { Component } from 'react';
import { Alert, StyleSheet, Image, View, TouchableHighlight, FlatList, Text } from 'react-native';

import firestore from '@react-native-firebase/firestore';

class ListItem extends React.PureComponent {
    onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    render() {
        const item = this.props.item;
        const price = item.price;

        return (
            <TouchableHighlight onPress={this.onPress} underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={require('../../../resources/logo.png')} />
                        <View style={styles.textContainer}>
                            <Text style={styles.heading1}>Topic: {item.topic}</Text>
                            <Text style={styles.heading2}>From {item.startDate} to {item.endDate}</Text>
                            <Text style={styles.heading2}>Status: REQUESTED</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
}

export default class TrainingListPage extends Component {
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
        var requestList = []
        firestore().collection('requests')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    requestList.push(doc.data())
                });
            }).then(() => {
                this.setState({
                    requestList: requestList,
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    manageState(list) {
        this.setState({
            requestList: list,
        })
    }

    keyExtractor = (item, index) => index.toString();

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }

    onPressItem = (index) => {
        const req = this.state.requestList[index];
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
        const { requestList  } = this.state;
        
        return (
            <View>
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
    thumb: { width: 80, height: 80, marginRight: 10 },
    textContainer: { flex: 1 },
    separator: { height: 1, backgroundColor: '#dddddd' },
    heading1: { fontSize: 25, fontWeight: 'bold', color: '#48BBEC' },
    heading2: { fontSize: 20, color: '#656565' },
    rowContainer: { flexDirection: 'row', padding: 10 },
    topContainer: { fontSize: 20, fontWeight: 'bold', paddingStart: 10, paddingTop: 5, paddingBottom: 5 }
});