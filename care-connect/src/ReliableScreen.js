import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const ReliableScreen = ({ navigation }) => {
  
 
  return (
    <View style={styles.container}>
    <Image source={require('../assets/team.jpg')} style={styles.Image} />
    {/* <Text style={styles.title}>Care Connect</Text> */}

    <View style={{ paddingBottom: 40,alignItems: 'center', paddingHorizontal: 20,}}>
    <Text style={styles.title}>Reliable</Text>
    <Text style={styles.content}>Access to Quality Care: Care Connect offers access to a wide range of healthcare services,
     including general medical consultations, mental health support, and specialist consultations.</Text>
    </View>

    <TouchableOpacity onPress={() => navigation.navigate('Available')} style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
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
  marginBottom: 90,
},
nextButton: {
  width: '50%',
    height: 40,
    backgroundColor: '#0080bf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
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
  padding: 10,
  fontSize: 17,
  color: '#71797E',
},
});


export default ReliableScreen;
