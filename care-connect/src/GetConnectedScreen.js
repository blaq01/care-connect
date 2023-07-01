import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Card } from '@rneui/themed';
import firebase from 'firebase/compat/app';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, Ionicons, FontAwesome, MaterialIcons  } from '@expo/vector-icons';

const GetConnectedScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

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
      header: () => (
        <View style={{ height: 300, backgroundColor: '#0080bf' }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 30, padding: 15 }}
          />
          <View style={{ paddingTop: 30 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff', paddingTop: 10, left: 17, shadowColor: '#B2BEB5' }}>
              Hi {displayName},
            </Text>
          </View>

          <View>
            <Text style={styles.titleText}>let's get you Connected...</Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const handleConsultMedicalProvider = () => {
    navigation.navigate('PaystackPayment');
  };

  const handleBookMentalHealthSession = () => {
    navigation.navigate('PaystackPayment');
  };

  const handleGetToKnowUs = () => {
    navigation.navigate('AboutUs');
  };

  const data = [
    {
      id: '1',
      title: 'Book a Medical Provider',
      content: 'Doctor',
      iconName: 'doctor',
      onPress: handleConsultMedicalProvider,
    },
    {
      id: '2',
      title: 'Book a Mental Health Session',
      content: 'Therapist/Psychiatrist',
      iconName: 'stethoscope',
      onPress: handleBookMentalHealthSession,
    },
    {
      id: '3',
      title: 'Get to Know Us',
      content: 'About us',
      iconName: 'info-circle',
      onPress: handleGetToKnowUs,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item.onPress}>
      <View style={styles.tabItem}>
        <View style={styles.circularIcon}>
          <MaterialCommunityIcons name={item.iconName} size={40} color="#0080bf" borderRadius={50} />
        </View>
        <View style={styles.tabTextContainer}>
          <Text style={styles.tabText}>{item.title}</Text>
          <Text style={styles.subText}>{item.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('GetConnected')}>
          <MaterialIcons name="local-hospital" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>Get Care</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={34} color="#0080bf" />
          <Text style={styles.bottomText}>{displayName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#fff',
    left: 20,
    paddingTop: 10,
  },
  flatList: {
    paddingHorizontal: 16,
  },
  tabItem: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#818589',
    padding: 10,
  },
  tabTextContainer: {
    flex: 1,
    marginLeft: 3,
  },
  subText: {
    fontSize: 14,
    color: '#818589',
    left: 10
  },
  separator: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 1,
  },
  circularIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#E5E4E2',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'black'
  },
});

export default GetConnectedScreen;
