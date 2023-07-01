import React, { useState,  } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../config/firebase';
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  //const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () =>
        (
          <View style={{ backgroundColor: '#fff' }}>
            <View>
            <Ionicons name="arrow-back" size={24} color="#000" onPress={() => navigation.goBack()} style={{marginTop: 30, padding: 15}}/>
        </View>
            
              </View>
),
});
}, [navigation]);

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (email.length < 6) {
      setEmailError('Email should be minimum 6 characters');
    } else if (/\s/.test(email)) {
      setEmailError('Email cannot contain spaces');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should be minimum 6 characters');
    } else if (/\s/.test(password)) {
      setPasswordError('Password cannot contain spaces');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    validateEmail();
    validatePassword();
  
    // Check if there are no validation errors
    if (!emailError && !passwordError) {
      const usersRef = firebase.database().ref('users');
      const providersRef = firebase.database().ref('providers');
  
      usersRef
        .orderByChild('email')
        .equalTo(email)
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            // Email found in users database, login as user
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                // Login successful
                const user = userCredential.user;
                console.log('Logged in user:', user);
                setLoginSuccess(true); // Set the login success state
                navigation.navigate('Home');
              })
              .catch((error) => {
                // Handle login error
                console.log('Login error:', error);
                setLoginError('Invalid email or password'); // Set the error message state
              });
          } else {
            // Email not found in users database, check providers database
            providersRef
              .orderByChild('email')
              .equalTo(email)
              .once('value', (snapshot) => {
                if (snapshot.exists()) {
                  // Email found in providers database, login as provider
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                      // Login successful
                      const user = userCredential.user;
                      console.log('Logged in user:', user);
                      setLoginSuccess(true); // Set the login success state
                      navigation.navigate('DoctorProfile');
                    })
                    .catch((error) => {
                      // Handle login error
                      console.log('Login error:', error);
                      setLoginError('Invalid email or password'); // Set the error message state
                    });
                } else {
                  // Email not found in providers database either
                  setLoginError('Invalid email or password'); // Set the error message state
                }
              });
          }
        });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require('../assets/log.jpg')} style={styles.Image} />

      <View style={styles.form}>
        {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
      <Text style={styles.title}>Login</Text>
      {loginError && <Text style={styles.error} className="error-message">{loginError}</Text>}


      <TextInput
        style={styles.input}
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

      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      /> */}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

     {/* <Button title="Login" onPress={handleLogin} /> */}
        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
          Already have an account? Sign up.
        </Text>
    </View>
    </KeyboardAvoidingView>
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
    width: 500,
    height: 350,
    marginBottom: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 50,
    color: '#0080bf',
  },
  form: {
    width: '80%',
  },
  // emailinput: {
  //   marginBottom: 10,
  //   padding: 10,
  //   borderBottomColor: '#ccc',
  //   borderBottomWidth: 1,
  //   //textTransform: 'lowercase'
  // },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
  signupText: {
    marginTop: 10,
    textAlign: 'center',
    padding: 20,
  },
  // input: {
  //   width: '100%',
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
  // loginButton: {
  //   width: '100%',
  //   height: 40,
  //   backgroundColor: 'blue',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   marginBottom: 10,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  // signupText: {
  //   color: 'blue',
  //   marginTop: 20,
  // },
  inputError: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  }
});

export default LoginScreen;
