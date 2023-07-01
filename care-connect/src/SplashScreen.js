import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Check if the user is already logged in
    //checkUserLoggedIn();

    // Set a timer to automatically navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Realiable');
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // const checkUserLoggedIn = async () => {
  //   // Check if the user is already logged in
  //   const userToken = await AsyncStorage.getItem('userToken');
  //   if (userToken) {
  //     // User is logged in, navigate to the Home screen
  //     navigation.navigate('Home');
  //   }
  // };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/care.png')} style={styles.logo} />
    {/* <Text style={styles.title}>Care Connect</Text> */}
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
},
logo: {
  width: 150,
  height: 150,
  marginBottom: 20,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff'
},
});


export default SplashScreen;
