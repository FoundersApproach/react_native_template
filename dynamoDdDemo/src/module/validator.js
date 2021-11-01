import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import AppConstants from '../module/constantVairable'

export const EmailValidtor = (strEmail, strMsg = AppConstants.StringLiterals.strEmailFormatFail) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
    if (reg.test(strEmail) === false) {
        //ShowValidationMessage(strMsg)
        return false
    }
    else {
        return true
    }
}

export const checkBlankTextField = (arrTxtFields) => {
    isValidationSuccess = true
    arrTxtFields.forEach(element => {
        if (typeof (element) === 'string') {
            if (element.trim() == "") {
                isValidationSuccess = false
            }
        }
    });
    return isValidationSuccess
}

export const PasswordValidtor = (strPassword) => {
    if (strPassword.length < 5) {
        // ShowValidationMessage(AppConstants.StringLiterals.strPasswordFailMinCharacter,Toast.LONG)
        return false
    }
    else {
        var hasNumber = /\d/;
        if (hasNumber.test(strPassword)) {
            return true
        }
        else {
            // ShowValidationMessage(AppConstants.StringLiterals.strPasswordFailNumberCharacter,Toast.LONG)
            return false
        }
    }
}

export const ShowValidationMessage = (message, duration = Toast.SHORT, position = Toast.CENTER) => {
    Toast.showWithGravity(message, duration, position);
}