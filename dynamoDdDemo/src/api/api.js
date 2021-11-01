import { Platform, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AppConstants from '../module/constantVairable'
import { saveDataToCachedWithKey, getDataFromCachedWithKey, removeDataFromCachedWithKey } from '../module/cacheData'
import { EventRegister } from 'react-native-event-listeners';
import CodePush from 'react-native-code-push';



var serverConfigData = {}
var arrThreadIds =[]
var currentUserData = {}
var is_live = false
let obj_cp_package_data = {};

export const CALL_API = (service_name, param = {}, mtdh = 'POST') => {
    return new Promise((resolve, reject) => {
        var headers = {}
        headers["Content-Type"] = "application/json"
        headers["App-Track-Version"] = "v1"
        headers["App-Device-Type"] = Platform.OS
        headers["App-Store-Version"] = '1.0'
        headers["App-Device-Model"] = DeviceInfo.getBrand() + " | " + DeviceInfo.getDeviceId()
        headers["App-Os-Version"] = DeviceInfo.getDeviceId()
        headers["App-Secret"] = is_live ? AppConstants.api_dev_secret_key_live : AppConstants.api_dev_secret_key

        let url;
        if (service_name.includes("http")) {
            url = service_name
        }
        else {
            if (currentUserData.user_token) {
                headers["Auth-Token"] = currentUserData.user_token
            }

            url = (is_live ? serverConfigData.live_base_url_v2 : serverConfigData.dev_base_url) + "/Service.php?Service=" + service_name

        }

        console.log("^^^^^^^^^^^^^^^")
        console.log(param)
        console.log(headers)
        console.log(`URL: ${url}`)

        fetch(url, {
            method: mtdh,
            headers: headers,
            body: JSON.stringify(param),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                resolve(responseJson);
            })
            .catch((error) => {
                console.log(error.toString());
                //Alert.alert(error.toString())
                let errParam = {}
                errParam.errMsg = error.toString()
                console.log(errParam)
                resolve(errParam);

            })
    });
}

export const syncUserWithServer = () => {
    return new Promise((resolve, reject) => {
        //currentUserData.id,
        CALL_API("getTokenUser", null, "post").then((res) => {
            if (res) {
                if (res.status == 1) {

                    saveCurrentUserData(res.data)
                    saveDataToCachedWithKey(AppConstants.AsyncKeyLiterals.strCurrentUserData, res.data)
                    registerPushTokenId()

                    resolve({});
                }
                else if (res.status == 0) {
                    removeDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.strCurrentUserData)
                    EventRegister.emit('performLogoutListener', '')
                    resolve(false);
                }
            }
        })
    })
}

export const setLiveFlag = (flag) => {
    is_live = flag
}

export const getLiveFlag = () => {
    return is_live
}

export const Reload_API_Alert = (msg) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            Alert.alert(
                AppConstants.StringLiterals.strServerServiceError,
                null,
                [
                    {
                        text: 'Cancel', onPress: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: 'Reload', onPress: () => {
                            resolve(true);
                        }
                    },

                ],
                { cancelable: true },
            );
        }, 50)
    })
}

export var saveConfigurationData = (data) => {
    serverConfigData = data
}

export var getConfigurationData = (data) => {
    return serverConfigData
}


export var saveCurrentUserData = (data) => {
    currentUserData = data
}

export var getCurrentUserData = () => {
    if (currentUserData) {
        return currentUserData
    }
    else {
        return {}
    }
}

export const registerPushTokenId = () => {
    getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.kPushToken).then((resToken) => {
        if (resToken) {
            let param = {
                device_token: resToken.push_token,
                device_id: DeviceInfo.getUniqueId(),
                device_type: Platform.OS,
            }
            CALL_API("registerDeviceToken", param, "post").then((res) => {
                if (res) {
                    console.log(res)
                }
            })
        }
    })
}

export const deRegisterPushTokenId = () => {

    getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.kPushToken).then((resToken) => {
        if (resToken) {

            let param = {
                device_token: resToken.push_token,
                device_id: DeviceInfo.getUniqueId()
            }
            CALL_API("deRegisterDeviceToken", param, "post").then((res) => {
                if (res) {
                    console.log(res)
                }
            })
        }
    })
}

  
export const getCodePushPackageData = (res) => {
    return new Promise((resolve, reject) => {
        CodePush.getUpdateMetadata(CodePush.UpdateState.LATEST).then((metadata) => {
            if (metadata)
            {
                resolve(metadata)
            }
            else
            {
                resolve(false)
            }
          })
    })
};

