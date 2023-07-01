import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const CaringScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  // const name = navigation.getParam('displayName', '');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userRef = firebase.database().ref(`users/${currentUser.uid}`);
      userRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.firstname) {
          setDisplayName(userData.firstname);
        }
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () =>
        (
          <View style={{ height: 300, backgroundColor: '#0080bf' }}>
            <View>
            <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => navigation.goBack()} style={{marginTop: 50, padding: 10}}/>
        </View>
            {/* <BackArrow navigation={navigation.goBack} style={{ position: 'absolute', left: 30, bottom: 35 }} /> */}
            <View style={{paddingTop: 40}}>
              {/* <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff', paddingTop: 35, left: 17, shadowColor: '#B2BEB5'}}>Hi {displayName},</Text> */}
              <Text style={{ fontSize: 30, color: '#E5E4E2', textAlign: 'center', paddingHorizontal: 50}}>Welcome back!</Text>
              </View>

              <View>
              <Text style={{fontSize: 15, color: '#E5E4E2', textAlign: 'center',}}>let's get you Connected...</Text>
              </View>
              </View>
),
});
}, [navigation]);

 
  return (
    <View style={styles.container}>
    {/* <Image source={require('../assets/us.jpg')} style={styles.Image} /> */}
    {/* <Text style={styles.title}>Care Connect</Text> */}

    {/* <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
        </View> */}
{/* 
    <View style={{ paddingBottom: 40,alignItems: 'center'}}>
    <Text style={styles.title}>Join us</Text>
    <Text style={styles.content}>Join Care Connect and experience convenient and
     accessible healthcare like never before.</Text>
    </View> */}
     
    {/* <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', marginBottom: 20}}> */}
    {/* <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.nextButton}>
        <Text style={styles.nextText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('JoinUs')} style={styles.nextButton}>
        <Text style={styles.nextText}>Provider</Text>
      </TouchableOpacity> */}
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
backIcon: {
  marginLeft: 10,
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


export default CaringScreen;
