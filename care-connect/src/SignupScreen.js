import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');

  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (email.trim().length < 6) {
      setEmailError('Email should be minimum 6 characters');
    } else if (email.includes(' ')) {
      setEmailError('Email cannot contain spaces');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else if (password.trim().length < 6) {
      setPasswordError('Password should be minimum 6 characters');
    } else if (password.includes(' ')) {
      setPasswordError('Password cannot contain spaces');
    } else {
      setPasswordError('');
    }
  };

  const handleSignup = () => {
    validateEmail();
    validatePassword();

    // Check if there are no validation errors
    if (!emailError && !passwordError) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signup successful
          const user = userCredential.user;
          console.log('Registered user:', user);
          // Send email verification to the user
          user.sendEmailVerification()
            .then(() => {
              // Verification email sent successfully
              console.log('Verification email sent to:', user.email);

              // Store the user email in the Realtime Database
              const usersRef = firebase.database().ref('users');
              const userRef = usersRef.child(user.uid);
              userRef.set({ email })
                .then(() => {
                  console.log('User data saved:', email);
                  // You can redirect the user to the desired screen here
                  navigation.navigate('VerifyCode', { email: user.email });
                })
                .catch((error) => {
                  console.log('Error saving user data:', error);
                  // Handle error while saving user data
                });
            })
            .catch((error) => {
              // Error sending verification email
              console.log('Error sending verification email:', error);
              // Handle error sending verification email
            });
        })
        .catch((error) => {
          // Handle signup error
          console.log('Signup error:', error);
          // Set an error message state and display it on the UI
          setSignupError('Invalid email or password'); // Set the error message state
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require('../assets/key.jpg')} style={styles.Image} />
      <View style={styles.form}>
        <Text style={styles.title}>Sign up</Text>

        {signupError && <Text style={styles.error} className="error-message">{signupError}</Text>}

        <TextInput
          style={styles.emailinput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onBlur={validateEmail}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          onBlur={validatePassword}
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%',
  },
  emailinput: {
    marginBottom: 10,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    textTransform: 'lowercase'
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 50,
    color: '#0080bf',
  },
  loginText: {
    marginTop: 10,
    textAlign: 'center',
    padding: 20,
  },
  Image: {
    width: 450,
    height: 315,
    marginBottom: 90,
  },
  button: {
    height: 40,
    backgroundColor: '#0080bf',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default SignupScreen;
