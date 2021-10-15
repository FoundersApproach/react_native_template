/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{Component} from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import CodePush from 'react-native-code-push';
 import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
 import { EventRegister } from 'react-native-event-listeners';
 import DeviceInfo from "react-native-device-info";
 import AppConstants from "./src/module/constantVairable";
 import { setLiveFlag } from './src/api/api';
 
 import Theme from "./src/theme/theme";
 import { RFValue } from 'react-native-responsive-fontsize';
//  import { SignInStack,AppTutorialStack, WelcomeStack, PreferenceViewStack, AlexaSkillLinkingSuccessStack } from './src/navigation/navrouter';
 import SplashScreen from 'react-native-splash-screen';
 import CodePushUpdaterView from './src/components/codePushUpdaterView'
 import { getDataFromCachedWithKey } from './src/module/cacheData';

 
 class App extends Component<Props> {
   
   constructor(props) {
     super(props);
     _this = this
     this.state = {
       is_codepush_updating_app: false,
       is_codepush_installing_updates: false,
       navigateTo: ''
     }
   }
 
   async componentDidMount() 
   {
     
    
 
     if (Platform.OS == "android" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyDev_Android) {
       setLiveFlag(false)
     } else if (Platform.OS == "ios" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyDev_iOS) {
       setLiveFlag(false)
     } else if (Platform.OS == "android" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyLive_Android) {
       setLiveFlag(true)
     } else if (Platform.OS == "ios" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyLive_iOS) {
       setLiveFlag(true)
     }
     
 
     if (this.switchRootViewListener)
     {
       EventRegister.removeEventListener(this.switchRootViewListener)
     }
     this.switchRootViewListener = EventRegister.addEventListener('switchRootViewListener', (data) => {
       this.setState({
         navigateTo: data.navigateTo
       })
     })
 
     this.codepushSync()
 
     setTimeout(() => {
       EventRegister.emit("checkCodePushUpdateListener")
     }, 5 * 1000);
     
     setTimeout(() => {
       SplashScreen.hide()
     }, 1 * 1000);
     
 
   }
   
 
   codepushSync()
   {
     if (this.checkCodePushUpdateListener)
     {
       EventRegister.removeEventListener(this.checkCodePushUpdateListener)
     }
     this.checkCodePushUpdateListener = EventRegister.addEventListener('checkCodePushUpdateListener', (data) => {
       let codePushDeploymentKey = ""
       if (Platform.OS == "android" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyDev_Android) {
         codePushDeploymentKey = AppConstants.StringLiterals.strCodePushKey_DEV_Android; //Staging
       } else if (Platform.OS == "ios" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyDev_iOS) {
         codePushDeploymentKey = AppConstants.StringLiterals.strCodePushKey_DEV_iOS; //Staging
       } else if (Platform.OS == "android" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyLive_Android) {
         codePushDeploymentKey = AppConstants.StringLiterals.strCodePushKey_LIVE_Android; //LIVE
       } else if (Platform.OS == "ios" && DeviceInfo.getBundleId() == AppConstants.StringLiterals.strBundleKeyLive_iOS) {
         codePushDeploymentKey = AppConstants.StringLiterals.strCodePushKey_LIVE_iOS; //LIVE
       }
 
       if (codePushDeploymentKey != "")
       {
         
         CodePush.sync(
           {
             deploymentKey: codePushDeploymentKey, 
             installMode: CodePush.InstallMode.ON_NEXT_RESTART
           },
           (syncStatus) => {
             console.log(">>>>>> CodePush >>>> " + syncStatus)
             
             switch(syncStatus) {
               case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                   // this.setState({ syncMessage: "Checking for update." });
                  
                   break;
               case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                   // this.setState({ syncMessage: "Downloading package." });
                   this.setState({
                     is_codepush_updating_app: true
                   })
                   break;
               case CodePush.SyncStatus.AWAITING_USER_ACTION:
                               
                   break;
               case CodePush.SyncStatus.INSTALLING_UPDATE:
                   // this.setState({ syncMessage: "Installing update." });
                   this.setState({
                     is_codepush_installing_updates: true
                   })
                   break;
               case CodePush.SyncStatus.UP_TO_DATE:
                   // this.setState({ syncMessage: "App up to date.", progress: false });
                   
                   break;
               case CodePush.SyncStatus.UPDATE_IGNORED:
                   // this.setState({ syncMessage: "Update cancelled by user.", progress: false });
                   
                   break;
               case CodePush.SyncStatus.UPDATE_INSTALLED:
                   // this.setState({ syncMessage: "Update installed.", progress: false });
                   setTimeout(() => {
                     CodePush.restartApp()  
                   }, 3 * 1000);
                   
                   break;
               case CodePush.SyncStatus.UNKNOWN_ERROR:
                   // this.setState({ syncMessage: "An unknown error occurred.", progress: false });
                    
                   break;
             }
           });
         }
 
     })
   }
   
 
   render()
   {
     return (
       <NavigationContainer>
         
         {
           this.state.is_codepush_updating_app ? (
             <CodePushUpdaterView title={this.state.is_codepush_updating_app ? "Downloading Updates..." : "Installing Updates..."} desc="App will restart once download is complete." />
           ) : (
             null
           )
         }
         <View style={{
           flex:1,
           justifyContent:'center',
           alignItems:'center'
         }}>
          <Text style={{
            fontWeight:'700'
          }}>
            FA React-Native Template V3
          </Text>
         </View>
         {/* {
           this.state.navigateTo == AppConstants.NavigateTo.nav_screen_tutorial ? (
             <AppTutorialStack/>
           ) : (
 
             this.state.navigateTo == AppConstants.NavigateTo.nav_screen_welcome ? (
               <WelcomeStack/>
             ) : (
               this.state.navigateTo == AppConstants.NavigateTo.nav_screen_signup ? (
                 <SignInStack initialRouteName="signUpWithEmailView"/>
               ) : (
               this.state.navigateTo == AppConstants.NavigateTo.nav_screen_signin ? (
                 <SignInStack initialRouteName="signInWithEmailView"/>
               ) : (
                 this.state.navigateTo == AppConstants.NavigateTo.nav_screen_preference ? (
                   <PreferenceViewStack/>
                 ) : (
                   this.state.navigateTo == AppConstants.NavigateTo.nav_screen_home ? (
                     <HomeView/>
                   ) : (
                     this.state.navigateTo == AppConstants.NavigateTo.nav_screen_alexa_linking_success ? (
                       <AlexaSkillLinkingSuccessStack />
                     ) : (
                       null
                     )
                   )
                 )
               )
             )
             )
           )
         } */}
         
       </NavigationContainer>
     );
   }
 };
 
 export default App;
 