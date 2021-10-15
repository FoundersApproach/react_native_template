import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal, Image,
    ActivityIndicator, Animated, Easing, Text, TouchableOpacity
} from 'react-native';
import Theme from '../theme/theme'
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styContainer from '../styles/commonStyle';

export default class ImagePickerPopUp extends Component {

    constructor(props) {
        super(props);
    }

    onRequestCloseImagePickerModal() {
        this.props.onRequestCloseImagePickerModal()
    }

    btnImagePickerClicked(item) {
        this.props.btnImagePickerClicked(item)
    }

    render() {
        return (
            <Modal useNativeDriver={true}
                transparent={true}
                animationType={'fade'}
                visible={this.props.popUpVisible}
                onRequestClose={() => { this.onRequestCloseImagePickerModal() }}>
                <View style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center' }}>
                    <View style={{ borderRadius: 10, backgroundColor: 'white', width: '85%', alignSelf: 'center' }}>
                        {/* <Text allowFontScaling={false} style={{ textAlign: 'center', fontFamily: Theme.fontFamily.fontPoppinsRegular, fontSize: Theme.fontSize.regular, marginTop: 14.5 }}>Choose Image</Text> */}
                        <Text allowFontScaling={false} style={{ textAlign: 'center', fontFamily: Theme.fontFamily.fontArial, fontSize: Theme.fontSize.small, marginTop: 10, marginHorizontal: 10 }}>Where would you like to choose a image from?</Text>
                        <Text allowFontScaling={false} style={{ height: 20 }}></Text>
                        <TouchableOpacity
                            onPress={() => this.btnImagePickerClicked("Photo")}
                            activeOpacity={0.7}
                            style={[styContainer.profilePicturePickerButton, { borderTopWidth: 0.3 }]}>
                            <Text allowFontScaling={false} style={[styContainer.profilePicturePickerText, { fontFamily: Theme.fontFamily.fontArial }]}>Photo Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.btnImagePickerClicked("Camera")}
                            activeOpacity={0.7}
                            style={styContainer.profilePicturePickerButton}>
                            <Text allowFontScaling={false} style={[styContainer.profilePicturePickerText, { fontFamily: Theme.fontFamily.fontArial }]}>Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.onRequestCloseImagePickerModal() }}
                            activeOpacity={0.7}
                            style={styContainer.profilePicturePickerButton}>
                            <Text allowFontScaling={false} style={[styContainer.profilePicturePickerText, { fontFamily: Theme.fontFamily.fontArial, fontWeight:'600' }]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

// const ImagePickerPopUp = props => {
//     const {
//         popUpVisible,
//         ...attributes
//     } = props;



// }

// export default ImagePickerPopUp;


