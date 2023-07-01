import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const JoinUsScreen = ({ navigation }) => {
  
 
  return (
    <View style={styles.container}>
    <Image source={require('../assets/us.jpg')} style={styles.Image} />
    {/* <Text style={styles.title}>Care Connect</Text> */}

    <View style={{ paddingBottom: 40,alignItems: 'center'}}>
    <Text style={styles.title}>Join us</Text>
    <Text style={styles.content}>Join Care Connect and experience convenient and
     accessible healthcare like never before.</Text>
    </View>
     
    {/* <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', marginBottom: 20}}> */}
    <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.nextButton}>
        <Text style={styles.nextText}>Seeker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Provider')} style={styles.nextButton}>
        <Text style={styles.nextText}>Provider</Text>
      </TouchableOpacity>
      {/* </View> */}
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
Image: {
  width: 450,
  height: 350,
  marginBottom: 60,
},
nextButton: {
  width: '50%',
    height: 50,
    backgroundColor: '#0080bf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    // marginHorizontal:10
},
nextText: {
  // marginTop: 10,
  textAlign: 'center',
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',

},
title: {
  fontSize: 35,
  fontWeight: 'bold',
  color: '#36454F',
  paddingBottom: 20,
},
content: {
  textAlign: 'center',
  padding: 12,
  fontSize: 17,
  color: '#71797E',
},
});


export default JoinUsScreen;
