import React, { Component } from 'react';
import { PropTypes, func } from 'prop-types';
import { Modal, View, Text, ScrollView, StyleSheet, Image,Alert, TouchableOpacity, Platform } from 'react-native';
import styContainer from '../styles/commonStyle';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Theme from '../theme/theme'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import CardView from 'react-native-cardview'

import AppConstants from '../module/constantVairable'
import { EventRegister } from 'react-native-event-listeners';

export default class CustomButton extends Component {
    static propTypes = {
        title: PropTypes.string,
        
        bgColor: PropTypes.string,
        textColor: PropTypes.string,
        defineHeight: PropTypes.number,
        defineWidth: PropTypes.number,
        defineFontSize: PropTypes.number,
        defineFontFamily: PropTypes.number,
        defineBorderRadius: PropTypes.number,
        defineOpacity: PropTypes.number,
        isBordered: PropTypes.number
    };

    constructor(props) {
        super(props);
    }


    onButtonClicked() {
        EventRegister.emit("checkCodePushUpdateListener")
        if (this.props.onButtonClicked) {
            this.props.onButtonClicked()
        }
    }

    render() {
        return (
            <CardView 
                cornerRadius={this.props.defineBorderRadius ? this.props.defineBorderRadius : RFValue(14)}
                // cardElevation={Platform.OS == "ios" ? 2 : 4}
                cardElevation={0}
                style={{
                    opacity: this.props.defineOpacity ? this.props.defineOpacity : 1,
                    width: this.props.defineWidth ? this.props.defineWidth : '100%',
                    height: this.props.defineHeight ? RFValue(this.props.defineHeight) : RFValue(50),
                    backgroundColor:'white',
                    
                }}>

                <TouchableOpacity style={{
                    backgroundColor: this.props.isBordered ? null : (this.props.bgColor ? this.props.bgColor : Theme.colors.appGreen),
                    borderColor: this.props.borderColor ? this.props.borderColor : Theme.colors.appGreen,
                    borderWidth: this.props.borderWidth ? this.props.borderWidth : 2,
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems:'center',
                    alignSelf: 'center',
                    flexDirection:'row',
                    overflow:'hidden',
                    borderRadius:this.props.defineBorderRadius ? this.props.defineBorderRadius : RFValue(14)
                }} activeOpacity={0.9} onPress={() => this.onButtonClicked()}>

                    {
                        this.props.icon ? (
                            <Image style={{
                                height: RFValue(20),
                                width: RFValue(20)
                            }} source={this.props.icon}></Image>
                        ) : (
                            null
                        )
                    }
                    
                    <Text style={{
                        color: this.props.textColor ? this.props.textColor : (this.props.isBordered ? Theme.colors.appBlack : 'white'),
                        fontSize: this.props.defineFontSize ? this.props.defineFontSize : Theme.fontSize.size_16,
                        fontFamily: this.props.defineFontFamily ? this.props.defineFontFamily : Theme.fontFamily.appFontSFProDisplayRegular,
                        fontWeight:'500',
                        textAlign: 'center', paddingLeft: 10, paddingRight: 10,
                        letterSpacing:0.6
                    }}>{this.props.title}</Text>
                </TouchableOpacity>
            </CardView>
        )
    }
}