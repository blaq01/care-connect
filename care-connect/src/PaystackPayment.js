import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import { PaystackWebView, Paystack } from 'react-native-paystack-webview';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Card } from '@rneui/themed';

const PaystackPayment = () => {
  const [duration, setDuration] = useState(0);
  const [complexity, setComplexity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [prescriptionRefill, setPrescriptionRefill] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [transactionReference, setTransactionReference] = useState('');

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
      header: () => (
        <View style={{ height: 300, backgroundColor: '#0080bf' }}>
          <View>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              onPress={() => navigation.goBack()}
              style={{ marginTop: 50, padding: 10 }}
            />
          </View>
          <View style={{ paddingTop: 40 }}>
            <Text style={{ fontSize: 30, color: '#E5E4E2', textAlign: 'center', paddingHorizontal: 50 }}>
              Consultation Details
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 15, color: '#E5E4E2', textAlign: 'center' }}>let's get you Connected...</Text>
          </View>

          <TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Add this line to navigate back to the homepage
          style={{ position: 'absolute', top: 50, right: 10, padding: 10, }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>Cancel</Text>
        </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const calculateTotalCharge = () => {
    let totalCharge = 0;
  
    // Calculate charge based on consultation duration
    totalCharge += duration * 200; // $200 per minute
  
    // Additional charge for complexity or specific specialties
    if (complexity === 'complex') {
      totalCharge += 3000; // Additional $2000 for complex cases
    }else if (complexity === 'simple') {
      totalCharge += 1500;
    }
  
    if (specialty === 'doctor') {
      totalCharge += 1000; // Additional $1000 for doctor consultations
    } else if (specialty === 'psychiatrist') {
      totalCharge += 3000; // Additional $3000 for psychiatrist consultations
    }
  
    // Charge for prescription refills
    if (prescriptionRefill) {
      totalCharge += 500; // $500 for prescription refill
    } 
  
    return totalCharge;
  };

  const handlePayment = async () => {
    try {
      const totalCharge = calculateTotalCharge();
      setPaymentLoading(true);
      // Perform any necessary actions before initiating payment

      // Call Paystack checkout function to initiate payment
      const transaction = {
        reference: `PAYMENT_REFERENCE_${Date.now()}`,
        amount: totalCharge, // Paystack accepts amount in kobo (smallest currency unit), multiply by 100 to convert to kobo
        email: 'user@example.com',
        currency: 'NGN',
      };

      // Set the transaction reference
      setTransactionReference(transaction.reference);

      // Handle payment initiation success
      // Store the transaction reference in the state or perform any necessary actions
      console.log('Payment initiated:', transaction.reference);
    } catch (error) {
      // Handle payment initiation error
      console.log('Payment initiation error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleSuccess = (reference) => {
    // Handle payment success
    navigation.navigate('Care');
    
    console.log('Payment successful:', reference);
    setPaymentStatus('Payment Successful');
  };

  const handleClose = () => {
    // Handle payment cancellation or closure
    console.log('Payment closed');
    setPaymentStatus('Payment Closed');
  };

  const handleError = (error) => {
    // Handle payment error
    console.log('Payment error:', error);
    setPaymentStatus('Payment Error');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text style={styles.title}>Consultation Details</Text> */}
        
        <Card containerStyle={styles.cardContainer}>
        <Text style={styles.label}>Consultation Duration (in minutes)</Text>
        <View style={styles.checkBoxContainer}>
          <Checkbox value={duration === 15} onValueChange={() => setDuration(15)} style={styles.checkBox} />
          <Text style={styles.checkBoxLabel}>15 min</Text>
          <Checkbox value={duration === 30} onValueChange={() => setDuration(30)} style={styles.checkBox} />
          <Text style={styles.checkBoxLabel}>30 min</Text>
          {/* <Checkbox value={duration === 60} onValueChange={() => setDuration(60)} style={styles.checkBox} />
          <Text style={styles.checkBoxLabel}>1hr</Text> */}
        </View>
        </Card>

        <Card containerStyle={styles.cardContainer}>
        <Text style={styles.label}>Complexity</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="simple"
            status={complexity === 'simple' ? 'checked' : 'unchecked'}
            onPress={() => setComplexity('simple')}
          />
          <Text style={styles.radioButtonLabel}>Simple</Text>
          <RadioButton
            value="complex"
            status={complexity === 'complex' ? 'checked' : 'unchecked'}
            onPress={() => setComplexity('complex')}
          />
          <Text style={styles.radioButtonLabel}>Complex</Text>
        </View>
        </Card>


        <Card containerStyle={styles.cardContainer}>
        <Text style={styles.label}>Specialty</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="doctor"
            status={specialty === 'doctor' ? 'checked' : 'unchecked'}
            onPress={() => setSpecialty('doctor')}
          />
          <Text style={styles.radioButtonLabel}>Doctor</Text>
          <RadioButton
            value="psychiatrist"
            status={specialty === 'psychiatrist' ? 'checked' : 'unchecked'}
            onPress={() => setSpecialty('psychiatrist')}
          />
          <Text style={styles.radioButtonLabel}>Therapist/Psychiatrist</Text>
        </View>
        </Card>


        <Card containerStyle={styles.cardContainer}>
        <Text style={styles.label}>Prescription Refills</Text>
        <View style={styles.checkBoxContainer}>
        <Checkbox
        value={prescriptionRefill}
        onValueChange={(value) => setPrescriptionRefill(value)}
        style={styles.checkBox}/>
        <Text style={styles.checkBoxLabel}>Prescription Refill</Text>
        </View>
        </Card>

        <View style={styles.totalChargeContainer}>
          <Text style={styles.totalChargeLabel}>Total Charge:</Text>
          <Text style={styles.totalChargeValue}>{calculateTotalCharge()}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={paymentLoading}>
          {paymentLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.payButtonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {transactionReference !== '' && (
        <Paystack
          paystackKey="pk_test_0313de4e855431a18837623b83edddd133b5a102"
          amount={calculateTotalCharge()} // Convert to kobo
          currency="NGN"
          refNumber={transactionReference}
          billingEmail={firebase.auth().currentUser.email}
          billingMobile="08012345678"
          billingName={displayName}
          channels={['card', 'bank']}
          onError={handleError}
          onCancel={handleClose}
          onSuccess={handleSuccess}
          autoStart={true}
          activityIndicatorColor="green"
          SafeAreaViewContainer={{ marginTop: 5 }}
        />
      )}

      {paymentStatus !== '' && (
        <View style={styles.paymentStatusContainer}>
          <Text style={styles.paymentStatus}>{paymentStatus}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    borderRadius: 15,
    marginBottom: 16,
    alignItems: 'flex-start',
    paddingBottom: 10,
    marginVertical: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    paddingBottom: 10,
    color: '#71797E',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, 
  },
  checkBox: {
    marginRight: 15,
  },
  checkBoxLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
    marginRight: 20,
  },
  totalChargeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    padding: 15,
  },
  totalChargeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#71797E',
  },
  totalChargeValue: {
    fontSize: 18,
    marginLeft: 10,
  },
  payButton: {
    backgroundColor: '#FF5733',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentStatusContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0080bf',
    paddingVertical: 10,
    alignItems: 'center',
  },
  paymentStatus: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaystackPayment;
