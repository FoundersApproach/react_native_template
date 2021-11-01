export default (AppConstants = {
    AlertDefaultTitle: "Meal Prime",
    errorAlertDefaultTitle: "Oops! An error occured.",
    api_dev_secret_key: "",
    api_dev_secret_key_live:"",
    loaderTimeOutDuration: 40,
    StringLiterals: {
        strBundleKeyDev_Android: "com.fa.rntemplatev3",
        strBundleKeyDev_iOS: "com.fa.rntemplatev3",
        strBundleKeyLive_Android: "com.fa.rntemplatev3.live",
        strBundleKeyLive_iOS: "com.fa.rntemplatev3.live",
        strServerConfigurationURL: "",
        strCodePushKey_DEV_Android: "dev_cp_key_android",
        strCodePushKey_DEV_iOS: "dev_cp_key_ios",
        strCodePushKey_LIVE_Android: "live_cp_key_android",
        strCodePushKey_LIVE_iOS: "live_cp_key_ios",
    },
    AsyncKeyLiterals: {
        strConfigData: "strConfigData",
        kPushToken: "kPushToken",
        kTutorialSeeen:"kTutorialSeeen",
        strCurrentUserData: "strCurrentUserData",
    },
    NavigateTo: {
        nav_screen_tutorial: "nav_screen_tutorial",
        nav_screen_signin: "nav_screen_signin",
        nav_screen_signup: "nav_screen_signup",
        nav_screen_welcome:"nav_screen_welcome",
        nav_screen_home:"nav_screen_home",
        nav_screen_preference:"nav_screen_preference",
        nav_screen_alexa_linking_success:"nav_screen_alexa_linking_success",
    },
    
    imgPickerOptions: {
        title: 'Choose Profile Photo From',
        takePhotoButtonTitle: "Take Photo",
        chooseFromLibraryButtonTitle: "Choose From Library",
        allowsEditing: true,
        imageFileType: 'png',
        maxWidth: 500,
        maxHeight: 500,
        cameraType: 'front',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    },
    
    RNLocationConfigVar: {
        distanceFilter: 100,
        desiredAccuracy: {
            ios: "best",
            android: "balancedPowerAccuracy"
        },
        // Android only
        androidProvider: "auto",
        interval: 30000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 10 * 1000, // Milliseconds
        // iOS Only
        activityType: "other",
        allowsBackgroundLocationUpdates: true,
        headingFilter: 1, // Degrees
        headingOrientation: "portrait",
        pausesLocationUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: false,
    },
    firebaseEvent: {
        
    },
    
})