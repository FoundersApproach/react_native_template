import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import Theme from '../theme/theme'
import { View } from 'react-native-animatable';
import CustomButton from './customButton';
import { RFValue } from 'react-native-responsive-fontsize';
var _this = null
export default class DatePickerKeyboardView extends Component {
    static propTypes = {
        title: PropTypes.string,
        pickerMode: PropTypes.string,
        maximumDate: PropTypes.Date,
        minimumDate: PropTypes.Date,
        initialDate: PropTypes.Date,
        minuteInterval: PropTypes.number
    };

    constructor(props) {
        super(props);
        _this = this
        this.state = {
            selectedDate: props.initialDate,
        }
    }

    onDateChangeListener(date) {
        console.log(date)
        this.setState({
            selectedDate: date
        })

        /*KeyboardRegistry.onItemSelected('DatePickerKeyboardView', {
            selectedDate: date,
        });*/
    }

    btnDoneClicked() {
        _this.props.onDoneClicked(_this.state.selectedDate)
    }

    render() {
        return (
            <View style={[styles.keyboardContainer, {}]}>
                {
                    this.props.title.trim() == "" ? (
                        <View></View>
                    ) : (
                            <Text allowFontScaling={false} style={{ fontFamily: Theme.fontFamily.book, marginBottom: 40, color: Theme.colors.nappBlue, fontSize: Theme.fontSize.regularX }}>{this.props.title}</Text>
                        )
                }

                <DatePicker
                    style={{ minWidth: 320 }}
                    maximumDate={this.props.maximumDate}
                    minimumDate={this.props.minimumDate}
                    mode={this.props.pickerMode}
                    date={this.state.selectedDate}
                    minuteInterval={this.props.minuteInterval}
                    onDateChange={date => _this.onDateChangeListener(date)}
                />

                <View style={[styContainer.defaultButton, { marginBottom: RFValue(20) }]}>
                    <CustomButton title="Done" onButtonClicked={this.btnDoneClicked} />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//KeyboardRegistry.registerKeyboard('DatePickerKeyboardView', () => DatePickerKeyboardView);