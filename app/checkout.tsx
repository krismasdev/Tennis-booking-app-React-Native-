import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function CheckoutScreen() {
  const params = useLocalSearchParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('full');
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [showCreateMatch, setShowCreateMatch] = useState(false);

  // Use passed parameters or default values
  const bookingDetails = {
    date: params.date || 'Wed 07 May',
    time: params.time || '08:30-10:30',
    court: params.court || 'Padelcenter trosa Vagnharad - Bana 4',
    type: params.type || 'Indoor | Double | Padel',
    price: params.price ? parseInt(params.price as string) : 400,
    currency: 'SEK'
  };

  const handleGoToPayment = () => {
    // Navigate to payment processing
    alert('Proceeding to payment...');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Booking Details Card */}
        <View style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/images/padlcenter.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingDate}>{bookingDetails.date}, {bookingDetails.time}</Text>
              <Text style={styles.bookingVenue}>{bookingDetails.court}</Text>
              <Text style={styles.bookingType}>{bookingDetails.type}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.paymentSection}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'full' && styles.paymentOptionSelected
            ]}
            onPress={() => setSelectedPaymentMethod('full')}
          >
            <View style={styles.radioContainer}>
              <View style={[
                styles.radioButton,
                selectedPaymentMethod === 'full' && styles.radioButtonSelected
              ]}>
                {selectedPaymentMethod === 'full' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentText}>Pay full</Text>
            </View>
            <Text style={styles.paymentAmount}>{bookingDetails.price} {bookingDetails.currency}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'split' && styles.paymentOptionSelected
            ]}
            onPress={() => setSelectedPaymentMethod('split')}
          >
            <View style={styles.radioContainer}>
              <View style={[
                styles.radioButton,
                selectedPaymentMethod === 'split' && styles.radioButtonSelected
              ]}>
                {selectedPaymentMethod === 'split' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentText}>Split Payment</Text>
              <TouchableOpacity style={styles.infoButton}>
                <Ionicons name="information-circle-outline" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.paymentAmount}>103 {bookingDetails.currency}</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Code Section */}
        <TouchableOpacity 
          style={styles.expandableSection}
          onPress={() => setShowPromoCode(!showPromoCode)}
        >
          <Text style={styles.expandableTitle}>Enter promo code</Text>
          <Ionicons 
            name={showPromoCode ? "remove" : "add"} 
            size={24} 
            color="#000" 
          />
        </TouchableOpacity>

        {/* Create Match Section */}
        <TouchableOpacity 
          style={styles.expandableSection}
          onPress={() => setShowCreateMatch(!showCreateMatch)}
        >
          <Text style={styles.expandableTitle}>Create match</Text>
          <Ionicons 
            name={showCreateMatch ? "remove" : "add"} 
            size={24} 
            color="#000" 
          />
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Fixed Payment Button */}
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity 
          style={styles.paymentButton}
          onPress={handleGoToPayment}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentButtonText}>Go to payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  logo: {
    width: 50,
    height: 50,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  bookingVenue: {
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  bookingType: {
    fontSize: 12,
    color: '#666',
  },
  paymentSection: {
    marginBottom: 30,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionSelected: {
    borderColor: '#00E8B1',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: '#00E8B1',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00E8B1',
  },
  paymentText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  infoButton: {
    marginLeft: 8,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  expandableSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  expandableTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },
  paymentButtonContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  paymentButton: {
    backgroundColor: '#00E8B1',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
}); 