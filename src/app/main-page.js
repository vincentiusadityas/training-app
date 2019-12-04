'use strict'

import React from 'react'
import { Modal, ActivityIndicator, StyleSheet, Alert, 
    Image, Text, View, TouchableOpacity } from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default class MainPage extends React.Component {
    static navigationOptions = {
        title: 'Training App',
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            uid: auth().currentUser.uid,
            fullName: '',
            address: '',
            id: '',
            phoneNo: '',
        };

        firestore().collection('users').doc(this.state.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    var data = doc.data()
                    this.setState({
                        fullName: data.fullName,
                        address: data.address,
                        id: data.id,
                        phoneNo: data.phoneNo,
                        sex: data.sex
                    })
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    };

    componentDidMount() {
        firestore().collection('users').doc(this.state.uid)
            .onSnapshot((doc) => {

                if (doc != null) {
                    var data = doc.data()
                    this.setState({
                        fullName: data.fullName,
                        address: data.address,
                        id: data.id,
                        phoneNo: data.phoneNo,
                        sex: data.sex
                    })
                }
            })
    }

    signOutUser = async () => {
        this.setState({
            isLoading: true,
        })
        try {
            await auth().signOut();
            this.props.navigation.navigate('Auth');
        } catch (e) {
            this.setState({
                isLoading: false,
            })
            console.log(e);
        }
    }

    onRequestPressed = () => {
        this.props.navigation.navigate('TrainingRequest');
    }

    onListPressed = () => {
        this.props.navigation.navigate('TrainingList');
    }

    onProfilePressed = () => {
        // const { fullName, address, id, phoneNo, sex } = this.state;
        this.props.navigation.navigate('Profile', {
            fullName: this.state.fullName,
            address: this.state.address,
            id: this.state.id,
            phoneNo: this.state.phoneNo,
            sex: this.state.sex
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
        const { isLoading } = this.state

        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isLoading}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size='large'
                                animating={isLoading} />
                            <Text>Registering ...</Text>
                        </View>
                    </View>
                </Modal>
                <View style={styles.topSection}>
                    <Text style={styles.heading1}>
                        Hi, {this.state.fullName}!
                    </Text>
                    <Text style={styles.heading2}>
                        Welcome to The Training App
                    </Text>
                    <Image source={require('../../resources/training.png')} style={styles.image} />
                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={this.onRequestPressed}>
                                <Image source={require('../../resources/clipboard.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                Request Training
                            </Text>
                        </View>

                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={this.onListPressed}>
                                <Image source={require('../../resources/clipboard2.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                List Training
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={this.onProfilePressed}>
                                <Image source={require('../../resources/avatar.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                Profile
                            </Text>
                        </View>

                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={this.onLogoutPressed}>
                                <Image source={require('../../resources/exit.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                Logout
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading1: {
        fontSize: 22,
    },
    heading2: {
        fontSize: 18,
    },
    image: { width: 237, height: 158, marginTop: 15, marginBottom: 20, alignSelf: 'center' },
    icon: {
        width: 50, height: 50
    },
    iconText: {
        marginTop: 5,
        alignSelf: 'center',
    },
    iconWrap: {
        width: 130,
        height: 130,
        alignItems: 'center',
    },
    topSection: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center'
    },
    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
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