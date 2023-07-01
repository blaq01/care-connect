import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, useWindowDimensions, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from 'firebase/compat/app';
import { Badge } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const DoctorProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [state, setState] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  //const { providerId } = route.params;
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [showTimePicker, setShowTimePicker] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedTime, setSelectedTime] = useState(new Date());
  // const [duration, setDuration] = useState('');
  // const [additionalInfo, setAdditionalInfo] = useState('');

  const photos = []; // Replace with your array of photos

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const providerRef = firebase.database().ref(`providers/${currentUser.uid}`);
      providerRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.firstname + '' + userData.lastname) {
          setDisplayName(userData.firstname + ' ' + userData.lastname);
          setSpecialty(userData.specialty);
          setState(userData.state + ', ' + userData.country);
          setExperience(userData.experience);
          // setProfile_Picture(userData.profilePicture)
          setBio(userData.bio);
          if (userData.schedule) {
            setSchedule(userData.schedule);
          }
          if (userData.coverPicture) {
            setCoverPicture({ uri: userData.coverPicture });
          }
          if (userData.profilePicture) {
            setProfilePicture({ uri: userData.profilePicture });
          }
        }
      });

      // Listen for real-time notifications count
      const notificationsRef = firebase.database().ref(`notifications/${currentUser.uid}`);
      notificationsRef.on('value', (snapshot) => {
        const notificationsData = snapshot.val();
        if (notificationsData) {
          const count = Object.keys(notificationsData).length;
          setNotificationCount(count);
        } else {
          setNotificationCount(0);
        }
      });
    }
  }, []);

  // const showDatePickerModal = () => {
  //   setShowDatePicker(true);
  // };

  // const hideDatePickerModal = () => {
  //   setShowDatePicker(false);
  // };

  // const handleDateChange = (event, date) => {
  //   if (date) {
  //     setSelectedDate(date);
  //   }
  //   hideDatePickerModal();
  // };

  // const showTimePickerModal = () => {
  //   setShowTimePicker(true);
  // };

  // const hideTimePickerModal = () => {
  //   setShowTimePicker(false);
  // };

  // const handleTimeChange = (event, time) => {
  //   if (time) {
  //     setSelectedTime(time);
  //   }
  //   hideTimePickerModal();
  // };


  // coverPicture
  const changeCoverPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      // Display an error message or handle the lack of permissions
      return;
    }
    console.log(coverPicture);
  
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!imageResult.cancelled) {
      // Update the profile picture in Firebase Realtime Database
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const providerRef = firebase.database().ref(`providers/${currentUser.uid}`);
        providerRef.update({
          coverPicture: imageResult.assets[0].uri,
        });
      }
    }
  };
  console.log(coverPicture);


  // profilePicture
  const changeProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      // Display an error message or handle the lack of permissions
      return;
    }
    console.log(profilePicture);
  
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!imageResult.cancelled) {
      // Update the profile picture in Firebase Realtime Database
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const providerRef = firebase.database().ref(`providers/${currentUser.uid}`);
        providerRef.update({
          profilePicture: imageResult.assets[0].uri,
        });
      }
    }
  };
  console.log(profilePicture);
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="gray color" />
      <View style={{ width: "100%" }}>
        <Image
          source={coverPicture ? { uri: coverPicture.uri } :require("../assets/cover.jpg")} // Replace with the path to your cover image
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      <TouchableOpacity
        style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "primary color",
        borderRadius: 16,
        padding: 4,
      }}
      onPress={changeCoverPicture}
    >
      <MaterialIcons name="photo-camera" size={34} color="#0080bf" />
    </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
  <Image
    source={profilePicture ? { uri: profilePicture.uri } : require("../assets/avatar.png")} // Replace with the default profile picture path
    resizeMode="contain"
    style={{
      height: 155,
      width: 155,
      borderRadius: 999,
      borderColor: "primary color",
      borderWidth: 2,
      marginTop: -90,
    }}
  />
   <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 0,
        right: 140,
        backgroundColor: "primary color",
        borderRadius: 16,
        padding: 4,
      }}
      onPress={changeProfilePicture}
    >
      <MaterialIcons name="photo-camera" size={34} color="#0080bf" />
    </TouchableOpacity>
  </View>
  {/* end of profilePicture */}

      {/* <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={profilePicture} // Replace with the path to your profile image
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: "primary color",
            borderWidth: 2,
            marginTop: -90,
          }}
        /> */}
        <View style={{ alignItems: "center" }}>
        
        <Text
          style={{
            fontSize: 20,
            color: '#71797E',
            marginVertical: 8,
            fontWeight: 'bold'

          }}
        >
          {displayName}
        </Text>
        <Text
          style={{
            color: "#36454F",
            fontSize: 16,
            textTransform: 'capitalize' 
          }}
        >
          {specialty}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black color" />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 4,
            }}
          >
            {state}
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                color: "#808080",
                fontWeight: 'bold'
              }}
            >
              {experience} <Text style={{ fontSize: 12 }}>yrs</Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#808080",
              }}
            >
              Experience
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                color: "#808080",
                fontWeight: 'bold'
              }}
            >
              67
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#808080",
              }}
            >
              Connected
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                color: "#808080",
                fontWeight: 'bold'
              }}
            >
              77K
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#808080",
              }}
            >
              Likes
            </Text>
          </View>
        </View>
        </View>
       
        <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', marginTop: 5 }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#818589',
              marginTop: 10,
              paddingHorizontal: 20
            }}
          >
            {bio}
          </Text>

          {/* Schedule section */}
          {/* <TouchableOpacity onPress={showDatePickerModal}>
        <TextInput
          placeholder="Date"
          value={selectedDate.toLocaleDateString()}
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity onPress={showTimePickerModal}>
        <TextInput
          placeholder="Time"
          value={selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TextInput
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />

      <TextInput
        placeholder="Additional Information"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        style={styles.input}
      /> */}

          
        </View>
      </View>

      {/* Notification icon in the header */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
        onPress={() => {
          // Handle notification icon press
          // You can navigate to the notifications screen or perform any other action here
        }}
      >
        <View>
          <MaterialIcons name="notifications" size={24} color="#E2DFD2" paddingTop={40}/>
          {notificationCount > 0 && (
            <Badge
              value={notificationCount}
              status="error"
              containerStyle={{  paddingTop: 20, right: -6 }}
            />
          )}
        </View>
      </TouchableOpacity>

      {/* bottom nav bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem}  onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('GetConnected')}>
          <MaterialIcons name="local-hospital" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>Get Care</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
        <View style={styles.profilePictureContainer}>
          {profilePicture ? (
        <Image
          source={profilePicture}
          style={styles.profilePicture}
        />
      ) : (
        <MaterialIcons name="person" size={24} color="black" />
      )}
    </View>
  </TouchableOpacity>
      </View>
      {/* end of bottom nav bar */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'background color',
    //paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'primary color',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateInput: {
    backgroundColor: 'white',
  },
  timeInput: {
    backgroundColor: 'white',
  },
  durationInput: {
    backgroundColor: 'white',
  },
  additionalInfoInput: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    //borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'black'
  },
  profilePictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EDEADE',
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});



export default DoctorProfileScreen;
