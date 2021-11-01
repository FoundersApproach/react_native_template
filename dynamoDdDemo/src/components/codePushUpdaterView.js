import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, PointPropType, Platform } from 'react-native';

import LottieView from 'lottie-react-native';
import Theme from "../theme/theme"
import { RFValue } from 'react-native-responsive-fontsize';

export default class CodePushUpdaterView extends Component {

    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
    };
    constructor(props) {
        super(props);
        //
    }

    render() {
        return (
            <View style={{
                position:'absolute',
                zIndex:999,
                backgroundColor:'rgba(52, 52, 52, 0.8)',
                height:'100%',
                width:'100%',
                alignItems:'center',
                justifyContent:'center'
              }}>
                <View style={{
                  backgroundColor:'white',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius:10,
                  width:'90%'
                }}>
                  <LottieView
                      style={{ height: RFValue(70), alignSelf:'center', marginBottom:RFValue(10) }}
                      autoPlay
                      source={Theme.icons.downloadingLoader}
                  />
                  <Text style={{
                    fontWeight: Platform.OS == "android" ? '700' : '600',
                    textAlign:'center'
                  }}>{this.props.title}</Text>
      
                  <Text style={{
                    marginTop:10,
                    textAlign:'center'
                  }}>
                    {this.props.desc}
                  </Text>
                </View>
              </View>
        )
    }
}
