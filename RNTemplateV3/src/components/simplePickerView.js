import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, PointPropType, Platform } from 'react-native';

import { WheelPicker } from 'react-native-wheel-picker-android'

import Theme from "../theme/theme"
import { RFValue } from 'react-native-responsive-fontsize';

export default class SimplePickerView extends Component {

    static propTypes = {
        attrName: PropTypes.string,
        title: PropTypes.string,
        arrData: PropTypes.array,
        selectedIndex: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedIndx: props.selectedIndex
        }
    }

    onItemSelected = selectedItem => {
        console.log(selectedItem)
        this.setState({
            selectedIndx: selectedItem
        })
    }

    btnDoneClicked() {
        this.props.onDoneClicked(this.state.selectedIndx, this.props.attrName)
    }

    render() {
        return (
            <View style={[styles.keyboardContainer, { borderRadius: 10 }]}>
                <Text allowFontScaling={false} 
                style={{ fontFamily: Theme.fontFamily.fontArial, 
                    fontWeight:'500',
                marginBottom: Platform.OS === 'ios' ? RFValue(10) : RFValue(40), 
                color: Theme.colors.appIconTint, 
                fontSize: Theme.fontSize.small }}>{this.props.title}</Text>
                <WheelPicker
                    style={{ width: RFValue(350), height: RFValue(170), marginBottom: Platform.OS === 'ios' ? RFValue(20) : 0 }}
                    hideIndicator={true}
                    selectedItem={this.state.selectedIndx}
                    data={this.props.arrData}
                    selectedItemTextColor={Theme.colors.nappBlue}
                    selectedItemTextSize={Platform.OS == "android" ? RFValue(20) : RFValue(30)}
                    itemTextFontFamily={Theme.fontFamily.book}
                    selectedItemTextFontFamily={Theme.fontFamily.book}
                    onItemSelected={this.onItemSelected} />
                <TouchableOpacity
                    onPress={() => this.btnDoneClicked()}
                    activeOpacity={0.7}
                    style={{ borderRadius: RFValue(5), marginTop: RFValue(15), marginBottom: RFValue(15), height: RFValue(40), width: '90%', backgroundColor: Theme.colors.appOrange, justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ color: 'white', fontFamily: Theme.fontFamily.book, fontSize: Theme.fontSize.regular }}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});