'use strict'

import React, { Component } from 'react';
import {
    StyleSheet, Text, TextInput, View,
    TouchableOpacity, Modal, ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-navigation';

import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';

export default class TrainingRequestPageLayout extends Component {

    render() {
        const {
            isLoading, errors, manager, topic, location, currentDate, startDate, endDate, price,
            handleChange, onSubmitPressed
        } = this.props;

        return (
            <ScrollView style={styles.container}>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isLoading}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size='large'
                                animating={isLoading} />
                            <Text>Adding request ...</Text>
                        </View>
                    </View>
                </Modal>
                <View>
                    <Text> Training Manager {!!errors.managerError && (
                        <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>

                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={manager}
                        onChange={(event) => handleChange("manager", event)}
                        style={styles.textInput}
                        placeholder='training manager' />

                    <Text>
                        Topic {!!errors.topicError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={topic}
                        onChange={(event) => handleChange("topic", event)}
                        style={styles.textArea}
                        placeholder='topic' />

                    <Text>
                        Location {!!errors.locationError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid={'transparent'}
                        value={location}
                        onChange={(event) => handleChange("location", event)}
                        style={styles.textArea}
                        placeholder='location' />

                    <Text>
                        Start Date {!!errors.startDateError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <DatePicker
                        style={{ width: 200, marginBottom: 10 }}
                        date={startDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={currentDate}
                        maxDate={endDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => handleChange("startDate", date)}
                    />

                    <Text>
                        End Date {!!errors.endDateError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <DatePicker
                        style={{ width: 200, marginBottom: 10 }}
                        date={endDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={startDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => handleChange("endDate", date)}
                    />

                    <Text>
                        Price {!!errors.priceError && (
                            <Text style={{ color: "red" }}>*required</Text>)}
                    </Text>
                    <TextInputMask
                        type={'money'}
                        options={{
                            precision: 0,
                            separator: ',',
                            delimiter: '.',
                            unit: 'Rp',
                            suffixUnit: ''
                        }}
                        value={price}
                        onChangeText={(price) => handleChange("price", price)}
                        placeholder={"Rp0"}
                        style={styles.textInput}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={onSubmitPressed} >

                        <Text> Submit </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

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
    radioButton: {
        marginTop: 3,
        marginBottom: 10
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#48BBEC',
        padding: 10,
        borderRadius: 20,
        width: 120,
        alignSelf: "center",
        marginTop: 10,
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
});