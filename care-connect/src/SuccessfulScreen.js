import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
// import PaystackWebView from 'react-native-paystack';

const SuccessfulSignupScreen = () => {
  const navigation = useNavigation();
  //const [profilePicture, setProfilePicture] = useState(null);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [pharmacyAddress, setPharmacyAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState('');


  const handleProfilePictureSelect = async () => {
    // Same as before
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // Permission denied
      return;
  };

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.cancelled) {
    setProfilePicture(result.uri);
  }
};


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

const handleFormSubmit = () => {
  // Get the current user
  const currentUser = firebase.auth().currentUser;

  // Create a reference to the current user's data in the Firebase Realtime Database
  const userRef = firebase.database().ref(`users/${currentUser.uid}`);

  // Prepare the form data
  const formData = {
    //profilePicture,
    firstname,
    lastname,
    address,
    phoneNumber,
    gender,
    dob: dob.toISOString(),
    pharmacyAddress,
  };

  // Save the form data to the current user's data in the Firebase Realtime Database
  userRef.update(formData)
    .then(() => {
      // Form data saved successfully
      console.log('Form data saved successfully');
      //navigation.navigate('GetConnected', { displayName: {} });
      navigation.navigate('PaystackPayment', {displayName});
    })
    .catch((error) => {
      // Error saving form data
      console.error('Error saving form data:', error);
    });
};

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={styles.welcomeText}>Complete profile setup</Text>
      {/* Render the profile picture */}
      {/* {profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      )}
      {/* Button to select profile picture */}
      {/* <TouchableOpacity onPress={handleProfilePictureSelect} style={styles.button}>
        <Text style={styles.buttonText}>Choose Profile Picture</Text>
      </TouchableOpacity> */}
      {/* Firstname input */}
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        value={firstname}
        onChangeText={setFirstName}
      />
      {/* Lastname input */}
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        value={lastname}
        onChangeText={setLastName}
      />
      {/* Address input */}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      {/* Phone number input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      {/* Gender selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGender('male')}
          style={[styles.genderOption, gender === 'male' && styles.genderOptionSelected]}
        >
          <Text style={styles.genderOptionText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender('female')}
          style={[styles.genderOption, gender === 'female' && styles.genderOptionSelected]}
        >
          <Text style={styles.genderOptionText}>Female</Text>
        </TouchableOpacity>
      </View>
      {/* Date of Birth picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>Date of Birth: {dob.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setDob(selectedDate);
            setShowDatePicker(false);
          }}
        />
      )}
      {/* Pharmacy address input */}
      <TextInput
        style={styles.input}
        placeholder="Pharmacy Address (Optional)"
        value={pharmacyAddress}
        onChangeText={setPharmacyAddress}
      />
       
      {/* Button to submit the form */}
      <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: '26%'
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#818589'
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: '#f0f0f0',
  },
  genderOptionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6699CC',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SuccessfulSignupScreen;
