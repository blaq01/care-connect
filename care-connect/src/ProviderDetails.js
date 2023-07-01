import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { Picker } from '@react-native-picker/picker';

const ProviderDetails = () => {
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
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [state, setState] = useState('');
  const country = 'Nigeria';
  const nigeriaStates = [
    'State',
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT - Abuja',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];
  

  const handleProfilePictureSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // if (!result.cancelled) {
    //   setProfilePicture(result.uri);
    // }
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

 
    // if (
    //   !profilePicture ||
    //   !firstname ||
    //   !lastname ||
    //   !address ||
    //   !phoneNumber ||
    //   !gender ||
    //   !dob ||
    //   !pharmacyAddress ||
    //   !specialty ||
    //   !experience ||
    //   !bio ||
    //   !state
    // ) {
    //   setError('All fields are required');
    //   return;
    // }
    const handleFormSubmit = () => {
      // Get the current user
      const currentUser = firebase.auth().currentUser;
    
      // Create a reference to the current user's data in the Firebase Realtime Database
      const providerRef = firebase.database().ref(`providers/${currentUser.uid}`);
    
    const formData = {
      // profilePicture,
      firstname,
      lastname,
      address,
      phoneNumber,
      gender,
      dob: dob.toISOString(),
      pharmacyAddress,
      specialty,
      experience,
      bio,
      state,
      country,
    };
  
    
    providerRef.update(formData)
    .then(() => {
      // Form data saved successfully
      console.log('Form data saved successfully');
      //navigation.navigate('GetConnected', { displayName: {} });
      navigation.navigate('DoctorProfile', {displayName});
    })
    .catch((error) => {
      // Error saving form data
      console.error('Error saving form data:', error);
    });
};
    
  return (
    <KeyboardAvoidingView style={styles.container}>
    <ScrollView>
      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.welcomeText}>Complete profile setup</Text>
        {/* {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        )}
        <TouchableOpacity onPress={handleProfilePictureSelect} style={styles.button}>
          <Text style={styles.buttonText}>Choose Profile Picture</Text>
        </TouchableOpacity> */}
        <TextInput
          style={styles.input}
          placeholder="Firstname"
          value={firstname}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Lastname"
          value={lastname}
          onChangeText={setLastName}
        />
        <View style={styles.pickerContainer}>
        <Picker
        style={styles.input}
        selectedValue={state}
        onValueChange={setState}
        mode="dropdown"
        itemStyle={styles.pickerItem}
        >
        {nigeriaStates.map((state) => (
        <Picker.Item key={state} label={state} value={state} />
        ))}
        </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.phoneNumberContainer}>
        <Text style={styles.phoneNumberCode}>+234</Text>
        <TextInput
        style={styles.phoneNumberInput}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        />
        </View>

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

        <View style={styles.pickerContainer}>
        <Picker
        style={styles.input}
        selectedValue={specialty}
        onValueChange={setSpecialty}
        mode="dropdown"
        itemStyle={styles.pickerItem}
        >
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Therapist/Psychiatrist" value="therapist" />
        </Picker>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Experience"
          value={experience}
          onChangeText={setExperience}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
        />
        
        <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: '26%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingTop: 6,
    marginBottom: 9,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#818589',
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
  pickerItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneNumberCode: {
    fontSize: 16,
    color: '#818589',
    marginRight: 5,
  },
  phoneNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  
});

export default ProviderDetails;
