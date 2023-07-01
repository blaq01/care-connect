import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/database';



const VerifyCodeScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  const handleVerification = async () => {
    setLoading(true);

    try {
      // Verify email using Firebase authentication
      await firebase.auth().currentUser.reload();
      await firebase.auth().currentUser.sendEmailVerification();
      setLoading(false);
      navigation.navigate('SuccessfulSignup');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

// const VerifyCodeScreen = ({ navigation }) => {

//   const handleEmailVerification = async () => {
//     const user = firebase.auth().currentUser;
//     try {
//       await user.sendEmailVerification();
//       navigation.navigate('SuccessfulSignup');
//     } catch (error) {
//       console.log('Error sending verification email', error);
//     }
  // const handleEmailVerification = async () => {
  //   try {
  //     await firebase.auth().currentUser.sendEmailVerification();
  //     // Redirect to successful signup screen
  //     navigation.navigate('SuccessfulSignup');
  //   } catch (error) {
  //     console.log('Error sending verification email', error);
  //   }
  //};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.content}>A confirmation link has been sent to your email:</Text>
        <Text style={styles.email}>{firebase.auth().currentUser.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify Email</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    height: '40%',
    backgroundColor: '#FFFFFF',
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    paddingVertical: 15,
    color: '#6699CC',
  },
  content: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 15,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6699CC',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default VerifyCodeScreen;
