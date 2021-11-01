import React, { Component } from 'react';
import { PropTypes, func } from 'prop-types';
import { Modal, View, Text, ScrollView, StyleSheet, Image,Alert, TouchableOpacity } from 'react-native';
import styContainer from '../styles/commonStyle';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Theme from '../theme/theme'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import CardView from 'react-native-cardview'

import AppConstants from '../module/constantVairable'

export default class NavigationBackButton extends Component {
    static propTypes = {
        
    };

    constructor(props) {
        super(props);
    }


    onButtonClicked() {
        if (this.props.onButtonClicked) {
            this.props.onButtonClicked()
        }
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.onButtonClicked()}
                activeOpacity={0.7} style={{
                    paddingVertical: RFValue(5),
                    paddingHorizontal: RFValue(3),
                    flexDirection: 'row',
                    alignItems:'center',
                }}>
                    <Image style={{
                        height: RFValue(18),
                        width: RFValue(18),
                        tintColor: Theme.colors.appGreen
                    }} source={Theme.icons.ic_back}></Image>

                    <Text style={{
                        fontFamily: Theme.fontFamily.appFontSFProDisplayBold,
                        fontSize: Theme.fontSize.size_13,
                        marginLeft: RFValue(2),
                        color: Theme.colors.appGreen
                    }}>Back</Text>
                </TouchableOpacity>
        )
    }
}