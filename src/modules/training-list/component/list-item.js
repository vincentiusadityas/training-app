import React, { PureComponent } from 'react';
import { Image, View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class ListItem extends PureComponent {

    onPress = () => {
        this.props.onPressItem(this.props.index);
    }
    
    render() {

        const item = this.props.item;

        return (
            <TouchableHighlight onPress={this.onPress} underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={require('../../../../resources/logo.png')} />
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

const styles = StyleSheet.create({
    thumb: { width: 80, height: 80, marginRight: 10 },
    textContainer: { flex: 1 },
    separator: { height: 1, backgroundColor: '#dddddd' },
    heading1: { fontSize: 25, fontWeight: 'bold', color: '#48BBEC' },
    heading2: { fontSize: 20, color: '#656565' },
    rowContainer: { flexDirection: 'row', padding: 10 },
    topContainer: { fontSize: 20, fontWeight: 'bold', paddingStart: 10, paddingTop: 5, paddingBottom: 5 }
});