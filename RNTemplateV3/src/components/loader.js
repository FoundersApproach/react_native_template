import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal, Image,
    ActivityIndicator, Animated, Easing
} from 'react-native';
import Theme from '../theme/theme'
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;

    return (
        <Modal useNativeDriver={true}
            transparent={true}
            animationType={'fade'}
            visible={loading}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
                <LottieView
                    style={{ height: RFValue(200) }}
                    autoPlay
                    source={require('../components/loader.json')}
                />
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000020'
    }
});

export default Loader;