'use strict'

import React from 'react'
import { Modal, ActivityIndicator, StyleSheet, 
    Image, Text, View, TouchableOpacity } from 'react-native'

export default class MainPageLayout extends React.Component {
    render() {
        const { 
            fullName, 
            isLoading, 
            onListPressed, 
            onRequestPressed, 
            onProfilePressed,
            onLogoutPressed
        } = this.props

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
                        Hi, {fullName}!
                    </Text>
                    <Text style={styles.heading2}>
                        Welcome to The Training App
                    </Text>
                    <Image source={require('../../../../resources/training.png')} style={styles.image} />
                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={onRequestPressed}>
                                <Image source={require('../../../../resources/clipboard.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                Request Training
                            </Text>
                        </View>

                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={onListPressed}>
                                <Image source={require('../../../../resources/clipboard2.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                List Training
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={onProfilePressed}>
                                <Image source={require('../../../../resources/avatar.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.iconText}>
                                Profile
                            </Text>
                        </View>

                        <View style={styles.iconWrap}>
                            <TouchableOpacity onPress={onLogoutPressed}>
                                <Image source={require('../../../../resources/exit.png')} style={styles.icon} />
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