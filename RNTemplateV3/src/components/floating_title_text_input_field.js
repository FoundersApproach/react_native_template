import React, { Component, PureComponent } from 'react';
import { TouchableOpacity, View, Animated, StyleSheet, TextInput, Image, Platform, Alert, Text } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';

import styContainer from '../styles/commonStyle';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Theme from '../theme/theme'
import * as Animatable from 'react-native-animatable';
import commonStyle from '../styles/commonStyle';


export class FloatingTitleTextInputField extends PureComponent {
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        iconImage: number,
        iconTintColor: string,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        otherTextInputProps: object,
        bottomLineColor: string,
        isModel: bool,
        isCurrentLocationButtonEnabled: bool,
        customContainerWidth: string,
        txt_header: string
    }

    static defaultProps = {
        keyboardType: 'default',
        otherTextInputAttributes: {},
    }

    componentDidUpdate() {

    }

    constructor(props) {
        super(props);
        const { value } = this.props;
        //console.log(this.props)
        this.position = new Animated.Value(value ? 1 : 0);
        this.state = {
            isFieldActive: false,
            notShowPassword: true
        }
    }

    componentDidMount() {
        if (this.props.value != "" && this.props.value !== undefined) {
            this.setState({
                isFieldActive: true
            })
        }

        
        if (this.props.otherTextInputProps && this.props.otherTextInputProps.secureTextEntry)
        {
        }
        else
        {
            this.setState({
                notShowPassword: false
            })
        }

    }

    updateActiveState(val) {
        this.setState({ isFieldActive: val });
        if (val) {
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
            }).start();
        }
        else {
            Animated.timing(this.position, {
                toValue: 0,
                duration: 150,
            }).start();
        }
    }

    _handleFocus = () => {
        if (this.props.onFocus != undefined) {
            const { attrName } = this.props;
            this.props.onFocus(attrName)
        }

        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
            }).start();
        }
    }

    _handleBlur = () => {

        //const { attrName } = this.props;
        //this.props.onBlur(attrName)

        if (this.props.onBlur != undefined) {
            const { attrName } = this.props;
            this.props.onBlur(attrName)
        }

        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 150,
            }).start();
        }


    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    onPlaceItemClicked(item) {
        if (this.props.onPlaceItemClicked) {
            this.props.onPlaceItemClicked(item)
        }
    }

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
            }),
            left: Platform.OS == "android" ? 3 : 0,
            fontSize: isFieldActive ? Theme.fontSize.extraSmall : Theme.fontSize.semiRegular,
            fontFamily: Theme.fontFamily.fontPoppinsRegular,
            color: isFieldActive ? Theme.colors.appBlue : 'darkgray',
        }
    }

    

    componentWillUpdate() {

    }

    currentLocationClicked() {
        if (this.props.currentLocationClicked) {
            this.props.currentLocationClicked()
        }
    }

    btnShowPasswordClicked()
    {
        this.setState({
            notShowPassword: !this.state.notShowPassword
        })
    }

    render() {
        // const { onFocus, onBlur } = this.props
        return (

            <View animation="fadeIn"
                onUpdateLayout
                style={[Styles.container, { justifyContent: 'center' }]}>

                <View style={{ width: this.props.customContainerWidth ? this.props.customContainerWidth : '100%' }}>
                    {
                        this.props.txt_header && this.props.txt_header != "" ? (
                            <Text style={commonStyle.txtFormFieldTitle}>{this.props.txt_header}</Text>
                        ) : (
                            <View></View>
                        )
                    }
                    <View style={{ flexDirection: 'row', borderWidth:this.props.bottomLineColor ? 1 : 0, borderColor:'red' ,backgroundColor: Theme.colors.appTextInputBG ,borderRadius:RFValue(5) }}>
                        <View style={{ flex: 1, 
                                    paddingHorizontal:RFValue(10), 
                                    alignItems:'center',
                                    flexDirection:'row' }}>
                           

                            <TextInput
                                placeholder={this.props.title}
                                allowFontScaling={false}
                                value={this.props.value}
                                style={Styles.textInput}
                                underlineColorAndroid='transparent'
                                onFocus={this._handleFocus}
                                onBlur={this._handleBlur}
                                onChangeText={this._onChangeText}
                                keyboardType={this.props.keyboardType}
                                {...this.props.otherTextInputProps}
                                secureTextEntry={this.state.notShowPassword}
                            />
                            {
                                this.props.otherTextInputProps && this.props.otherTextInputProps.secureTextEntry ? (
                                    <TouchableOpacity 
                                        onPress={() => this.btnShowPasswordClicked()}
                                        activeOpacity={0.7} style={{
                                        padding: RFValue(4)
                                    }}>
                                        <Image style={{
                                            height:RFValue(20),
                                            width: RFValue(20),
                                            tintColor: Theme.colors.appLightGray
                                        }} source={Theme.icons.icEye}></Image>
                                    </TouchableOpacity>
                                ) : (
                                    null
                                )
                            }
                        </View>
                        {
                            this.props.iconImage ? (
                                <View style={{ justifyContent: 'center',paddingHorizontal:RFValue(10), paddingLeft:0 }}>
                                    <Image
                                        source={this.props.iconImage}
                                        style={{
                                            height: RFValue(24), width: RFValue(24),
                                            tintColor: this.props.bottomLineColor == Theme.colors.appRed ? Theme.colors.appRed : (this.props.iconTintColor ? this.props.iconTintColor : 'black')
                                        }}>

                                    </Image>
                                </View>
                            ) : (
                                <View></View>
                            )
                        }
                        
                    </View>

                    

                    
                    {
                        this.props.isModel ? (
                            <TouchableOpacity
                                onPress={this._handleFocus}
                                style={[Styles.textInput, { height:'100%',width: '100%', position: 'absolute' }]}>

                            </TouchableOpacity>
                        ) : (
                                <View></View>
                            )
                    }
                </View>
            </View >

        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row'
    },
    textInput: {
        fontSize: Theme.fontSize.size_14,
        fontFamily: Theme.fontFamily.appFontProximaNovaRegular,
        fontWeight:'500',
        flex:1,
        color: Theme.colors.appBlack,
        height: RFValue(40),

    },
    titleStyles: {
        position: 'absolute',
        fontFamily: Theme.fontFamily.fontPoppinsRegular,

        fontSize: Theme.fontSize.extraSmall
    },

})
