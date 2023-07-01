// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Ionicons } from '@expo/vector-icons';


// const ProviderAuth = ({ navigation }) => {
//   //const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [specialty, setSpecialty] = useState('');


//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: true,

//       header: () =>
//         (
//           <View style={{ backgroundColor: '#fff' }}>
//             <View>
//             <Ionicons name="arrow-back" size={24} color="#000" onPress={() => navigation.goBack()} style={{marginTop: 50, padding: 15}}/>
//         </View>
            
//               </View>
// ),
// });
// }, [navigation]);

//   const registerProvider = () => {
//     // Validate input data
//     if ( !email || !password || !specialty) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     // Create a new provider object
//     const provider = {
//       //name: name,
//       email: email,
//       password: password,
//       specialty: specialty,
//     };

//     // Store the provider data in the Firebase database
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         // Send verification email to the provider
//         userCredential.user.sendEmailVerification();

//         // Store the provider data in the Firebase database
//         firebase
//           .database()
//           .ref('providers')
//           .push(provider)
//           .then(() => {
//             alert('Provider registered successfully. Verification email sent.');
//             // Clear the form fields
//            // setName('');
//             setEmail('');
//             setPassword('');
//             setSpecialty('');

//             // Redirect to VerifyProvider screen
//             navigation.navigate('VerifyProvider', { email: provider.email });
//           })
//           .catch((error) => {
//             alert('Failed to register provider: ' + error.message);
//           });
//       })
//       .catch((error) => {
//         alert('Failed to register provider: ' + error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       {/* <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       /> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <View style={styles.dropdownContainer}>
//         <Text style={styles.dropdownLabel}>Specialty:</Text>
//         <Picker
//           style={styles.dropdown}
//           selectedValue={specialty}
//           onValueChange={(itemValue) => setSpecialty(itemValue)}
//         >
//           <Picker.Item label="Select Specialty" value="" />
//           <Picker.Item label="Doctor" value="doctor" />
//           <Picker.Item label="Therapist/Psychiatrist" value="therapist" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={registerProvider}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>

//       <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
//           Already have an account? Login.
//         </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#ffffff',
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   dropdownContainer: {
//     marginBottom: 10,
//   },
//   dropdownLabel: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     height: 40,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: '#0080bf',
//     borderRadius: 5,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loginText: {
//     marginTop: 10,
//     textAlign: 'center',
//     padding: 20,
//   },
// });

// export default ProviderAuth;

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const ProviderAuth = ({ navigation }) => {
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
  
              // Store the provider email in the Realtime Database
              const providersRef = firebase.database().ref('providers');
              const providerRef = providersRef.child(user.uid);
              providerRef.set({ email })
                .then(() => {
                  console.log('Provider data saved:', email);
                  // You can redirect the provider to the desired screen here
                  navigation.navigate('VerifyProvider', { email: user.email });
                })
                .catch((error) => {
                  console.log('Error saving provider data:', error);
                  // Handle error while saving provider data
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

export default ProviderAuth;
