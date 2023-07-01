import React, { useState, useEffect, useRef  } from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet, Text, TextInput, Button, ScrollView, ActivityIndicator, Animated, TouchableWithoutFeedback   } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import { MaterialIcons } from "@expo/vector-icons";


const ProviderItem = ({ provider, onPress }) => (
  <View style={styles.providerItem}>
    <Image source={{ uri: provider.profilePicture }} style={styles.providerImage} />
    <View style={styles.providerInfo}>
      <Text style={styles.providerName}>Dr. {`${provider.firstname} ${provider.lastname}`}</Text>
      <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
      <Text style={styles.providerExperience}>Ex. {provider.experience} yrs</Text>
    </View>
    <View style={styles.providerButtons}>
      <View style={styles.providerButtonContainer}>
        <TouchableOpacity onPress={() => onPress(provider)}>
          <MaterialIcons name="videocam" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.providerButtonContainers}>
        <TouchableOpacity onPress={() => onPress(provider)}>
          <MaterialIcons name="phone" size={31} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const HomeScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const viewRef = useRef(null);
  const menuTranslate = useRef(new Animated.Value(-300)).current;

  const openMenu = () => {
    Animated.timing(menuTranslate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    Animated.timing(menuTranslate, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(false);
  };


  useEffect(() => {
    const fetchProviders = async () => {
      try {
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
        
        const providerRef = firebase.database().ref('providers');
        providerRef.on('value', (snapshot) => {
          const providerData = snapshot.val();
          if (providerData) {
            const providerList = Object.values(providerData);
            setProviders(providerList);
          }
          setLoading(false);
        });
      } catch (error) {
        console.log('Error fetching providers:', error);
        setLoading(false);
      }
    };
  
    fetchProviders();
  }, []);
  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <View style={{ height: 300, backgroundColor: '#0080bf' }}>
          {/* <View>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              onPress={() => navigation.goBack()}
              style={{ marginTop: 50, padding: 10 }}
            />
          </View> */}
          <View style={{ paddingTop: 130 }}>
            <Text style={{ fontSize: 30, color: '#E5E4E2', textAlign: 'center', paddingHorizontal: 50 }}>
              Consultation Details
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 15, color: '#E5E4E2', textAlign: 'center' }}>let's get you Connected...</Text>
          </View>

          {/* <TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Add this line to navigate back to the homepage
          style={{ position: 'absolute', top: 50, right: 10, padding: 10, }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>Cancel</Text>
        </TouchableOpacity> */}
        </View>
      ),
    });
  }, [navigation]);

  //const handleProviderSelection = (provider) => {
    // Logic to handle the selection of a provider
    //navigation.navigate('DoctorProfile', { provider: provider.uid });
    // Replace 'ProviderProfile' with the name of the screen/component representing the provider's profile
    // You can pass any necessary data related to the provider using the second parameter of the navigate function
  //};

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      // Navigate to the login screen or any other appropriate screen
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  
  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.mainContainer}>
          <FlatList
            data={providers}
            keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
            renderItem={({ item }) => (
              <ProviderItem
              provider={item}
              onPress={(provider) => navigation.navigate('VideoCall', { provider })}
                //onPress={() => handleProviderSelection(item)}
              />
            )}
          />
          {isMenuOpen && (
            <>
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <MaterialIcons name="close" size={24} color="#0080bf" />
              </TouchableOpacity>
              <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuTranslate }] }]}>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* {isMenuOpen && (
        <>
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <MaterialIcons name="close" size={24} color="#0080bf" />
          </TouchableOpacity>
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuTranslate }] }]} ref={viewRef}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}

      <FlatList
        data={providers}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <ProviderItem
             provider={item}
             onPress={() => handleProviderSelection(item)}
          />
        )}
      /> */}


        <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('GetConnected')}>
          <MaterialIcons name="local-hospital" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>Get Care</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={openMenu}>
        <MaterialIcons name="person" size={34} color="#0080bf" />
        <Text style={styles.bottomText}>{displayName}</Text>
      </TouchableOpacity>

        {/* <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>{displayName}</Text>
        </TouchableOpacity> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  providerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  providerImage: {
    width: 95,
    height: 95,
    borderRadius: 30,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  providerSpecialty: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold'
  },
  providerExperience: {
    fontSize: 12,
    color: '#888',
  },
  providerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // providerButton: {
  //   marginLeft: 8,
  // },
  providerButtonContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#ffc3a0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  providerButtonContainers: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#56ab2f',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  // bottomBar: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   height: 50,
  //   borderTopWidth: 1,
  //   borderTopColor: '#E5E4E2',
  // },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'black'
  },
  mainContainer: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 64,
    width: 170,
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 20,
    color: '#0080bf',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#E5E4E2',
  },
});

export default HomeScreen;
