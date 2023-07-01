import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/SplashScreen';
import ReliableScreen from './src/ReliableScreen';
import AvailabilityScreen from './src/AvailabilityScreen';
import SponsorsScreen from './src/SponsorsScreen';
import JoinUsScreen from './src/JoinUsScreen';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import VerifyCodeScreen from './src/VerifyCodeScreen';
import Successfulcreen from './src/SuccessfulScreen';
import GetConnectedScreen from './src/GetConnectedScreen';
import CaringScreen from './src/CaringScreen';
import PaystackPayment from './src/PaystackPayment';
import VideoCallScreen from './src/VideoCallScreen';
import DoctorProfileScreen from './src/DoctorProfileScreen';
import PsychiatristProfileScreen from './src/PsychiatristProfileScreen';
import HomeScreen from './src/HomeScreen';
import AboutUsScreen from './src/AboutUsScreen';
import ProviderAuth from './src/ProviderAuth';
import VerifyProvider from './src/VerifyProvider';
import ProviderDetails from './src/ProviderDetails';







const Stack = createNativeStackNavigator();


const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SuccessfulSignup" component={Successfulcreen} options={{headerShown: false}}/>
    </Stack.Navigator>
    
  );
};

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Realiable" component={ReliableScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Available" component={AvailabilityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Sponsors" component={SponsorsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JoinUs" component={JoinUsScreen} options={{ headerShown: false }} />
      
         {/* Auth Navigator: Include Login and Signup */}
         <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
        
        <Stack.Screen name="GetConnected" component={GetConnectedScreen} 
        options={{
          headerShown: true,
          }}/>
        <Stack.Screen name="Care" component={CaringScreen} />
        <Stack.Screen name="PaystackPayment" component={PaystackPayment} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />

        <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="PsychiatristProfile" component={PsychiatristProfileScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Provider" component={ProviderAuth} options={{headerShown: false}}/>
        <Stack.Screen name="VerifyProvider" component={VerifyProvider} options={{headerShown: false}}/>
        <Stack.Screen name="ProviderDetails" component={ProviderDetails} options={{headerShown: false}}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}

// const AppNavigator = createStackNavigator(
//   {
//     Splash: SplashScreen,
//     Signup: SignupScreen,
//     VerifyCode: VerifyCodeScreen,
//     Login: LoginScreen,
//     SuccessfulSignup: SuccessfulSignupScreen,
//     GetConnected: GetConnectedScreen,
//     PaystackPayment: PaystackPaymentScreen,
//     DoctorProfile: DoctorProfileScreen,
//     PsychiatristProfile: PsychiatristProfileScreen,
//     Home: HomeScreen,
//     AboutUs: AboutUsScreen,
//   },
//   {
//     initialRouteName: 'Splash', // Set the initial screen
//     defaultNavigationOptions: {
//       headerShown: false, // Hide the header for all screens
//     },
//   }
// );

export default App;
