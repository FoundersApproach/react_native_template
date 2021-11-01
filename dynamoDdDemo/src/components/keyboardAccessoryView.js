import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View, Text, TouchableOpacity, ScrollView, StyleSheet, PointPropType, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import Theme from '../theme/theme'
import { RFValue } from 'react-native-responsive-fontsize';
let _safeAreaBottom = 0
let _safeAreaTop = 0
export default class KeyboardAccessoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardShow: false,
            keyboardHeight: 0
        }
    }

    componentWillMount() {
        if (Platform.OS == "ios") {

            StaticSafeAreaInsets.getSafeAreaInsets((values) => {
                console.log(values)
              
        
             if (values.safeAreaInsetsTop && values.safeAreaInsetsTop > 0) {
                _safeAreaTop = values.safeAreaInsetsTop;
             }

              if (values.safeAreaInsetsBottom && values.safeAreaInsetsBottom > 0) {
                _safeAreaBottom = values.safeAreaInsetsBottom;
              }
              
        
              
            });

            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => this.keyboardDidShow(event));
            this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', (event) => this.keyboardDidHide(event));
        }
    }

    componentWillUnmount() {
        if (Platform.OS == "ios") {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    keyboardDidShow = (event) => {
        
        this.setState({ keyboardShow: true, keyboardHeight: event.endCoordinates.height }) //<<You got the keyboard height 
    }

    keyboardDidHide = (event) => {
        this.setState({ keyboardShow: false, keyboardHeight: 0 })
    }

    btnDoneClicked() {
        //this.props.onKeyboardDoneClicked()
        Keyboard.dismiss()
    }

    render() {

        if (Platform.OS == "android") {
            return (<View></View>)
        }

        return (
            this.state.keyboardHeight == 0 ? (
                <View></View>
            ) : (
                    <View style={{
                        position: "absolute",
                        bottom: this.state.keyboardHeight, right: 0,
                        width: '100%',  backgroundColor: '#f0f0f0',
                        paddingVertical:RFValue(7),
                        paddingHorizontal: RFValue(10)
                    }}>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => this.btnDoneClicked()}
                            style={{ width: '100%', 
                            flexDirection: 'row-reverse', }}>
                            <Text style={{
                                color: Theme.colors.appGreen,
                                fontSize: Theme.fontSize.size_18,
                                fontFamily: Theme.fontFamily.appFontProximaNovaBold
                            }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                )


        )
    }
}