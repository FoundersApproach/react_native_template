
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Platform } from 'react-native';
const valFontFlag = Platform.OS == "android" ? 0 : 0
export default (Theme = {
  colors: {
      appLightBlack:'#454555',
      appBlack:"#030319",
      appGreen:'#5eb14e',
      appLightGray:"#a1a1a5",
      appTextInputBG: "#f4f4f4",
      appItemGray:"#f7f7f8",
      appRed:'red'
  },
  fontFamily: {
    appFontAvenirRegular:"Avenir-Regular",
    appFontSFProDisplayRegular:"SFProDisplay-Regular",
    appFontSFProDisplayBold:"SFProDisplay-Bold",
    appFontProximaNovaRegular:"proximanova-regular",
    appFontProximaNovaBold:"proximanova-bold",
    appFontComicNeueRegular:"ComicNeue-Regular",
    appFontComicNeueBold:"ComicNeue-Bold",
  },
  fontSize: {
    size_12: RFValue(12),
    size_13: RFValue(13),
    size_14: RFValue(14),
    size_15: RFValue(15),
    size_16: RFValue(16),
    size_17: RFValue(17),
    size_18: RFValue(18),
    size_19: RFValue(19),
    size_20: RFValue(20),
    size_21: RFValue(21),
    size_22: RFValue(22),
    size_23: RFValue(23),
    size_24: RFValue(24),
    size_25: RFValue(25),
    size_26: RFValue(26),
    size_32: RFValue(32),
    size_33: RFValue(33),
    size_34: RFValue(34),
  },
  icons: {
    downloadingLoader: require("../resources/loader/downloading.json"),
    icEye: require("../resources/imageAssets/ic_eye/ic_eye.png"),
    ic_check: require("../resources/imageAssets/ic_check/ic_check.png"),
    ic_back: require("../resources/imageAssets/ic_back/ic_back.png"),
    
    
  }
});
