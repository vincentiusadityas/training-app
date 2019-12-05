'use strict'

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class ProfilePage extends Component {
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

    // componentDidMount() {
    //     const { currentUser } = auth()
    //     this.setState({ currentUser })

    //     if (!currentUser) {
    //         this.signOutUser()
    //     }
    // }

    // signOutUser = async () => {
    //     try {
    //         await auth().signOut();
    //         this.props.navigation.navigate('Auth');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    handleChange = (name, event) => {
        this.setState({ [name]: event.nativeEvent.text });
    };

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
            this.updateUserData(this.state.currentUser.uid)
        }
    }

    updateUserData = (uid) => {
        
        const { fullName, address, id, phoneNo, sex } = this.state

        firestore().collection('users').doc(uid)
        .update({
            fullName: fullName,
            address: address,
            id: id,
            phoneNo: phoneNo,
            sex: sex,
        })
        .then(function() {
            console.log("Document successfully updated!");
            alert("Profile updated!")
        })
        .catch(function(error) {
            console.error("Error updating  document: ", error);
        });

    }

    render() {
        const { fullName, address, id, phoneNo, sex } = this.state
        
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text> Full Name {!!this.state.fullNameError && (
                        <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>

                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={fullName}
                        onChange={(event) => this.handleChange("fullName", event)}
                        style={styles.textInput}
                        placeholder='full name' />

                    <Text>
                        Address {!!this.state.addressError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={address}
                        onChange={(event) => this.handleChange("address", event)}
                        style={styles.textArea}
                        placeholder='address' />

                    <Text>
                        ID {!!this.state.idError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={id}
                        onChange={(event) => this.handleChange("id", event)}
                        style={styles.textInput}
                        placeholder='nomor KTP' />

                    <Text>
                        Phone No. {!!this.state.phoneNoError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={phoneNo}
                        onChange={(event) => this.handleChange("phoneNo", event)}
                        style={styles.textInput}
                        keyboardType={'number-pad'}
                        placeholder='phone number' />

                    <Text>
                        Sex
                    </Text>
                    <RadioForm
                        style={styles.radioButton}
                        radio_props={radio_props}
                        initial={sex}
                        formHorizontal={true}
                        labelStyle={{ marginRight: 20 }}
                        buttonSize={10}
                        onPress={(value) => { this.setState({ sex: value }) }} />

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={this.onSavePressed} >

                        <Text> Save </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 16,
    },
    textInput: {
        height: 36,
        padding: 4,
        marginTop: 3,
        marginRight: 5,
        marginBottom: 10,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
        padding: 4,
        marginTop: 3,
        marginRight: 5,
        marginBottom: 10,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    SubmitButton: {
        alignItems: 'center',
        backgroundColor: '#48BBEC',
        padding: 10,
        borderRadius: 20,
        width: 100,
        alignSelf: "center",
        marginTop: 10,
    },
    saveButton: {
        alignItems: 'center',
        backgroundColor: '#48BBEC',
        padding: 10,
        borderRadius: 20,
        width: 80,
        alignSelf: "center",
        marginTop: 10,
    },
});