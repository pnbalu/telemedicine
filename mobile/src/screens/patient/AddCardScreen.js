import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function AddCardScreen({ navigation }) {
  const { gradient } = useTheme();
  const [scanning, setScanning] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const formatCardNumber = (text) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const handleCardNumberChange = (text) => {
    const formatted = formatCardNumber(text);
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (field, text) => {
    // Only allow digits
    const cleaned = text.replace(/\D/g, '');
    if (field === 'expiryMonth') {
      // Month: 01-12
      const month = cleaned.substring(0, 2);
      if (parseInt(month) > 12) return;
      setCardData({ ...cardData, expiryMonth: month });
    } else {
      // Year: 2 digits
      setCardData({ ...cardData, expiryYear: cleaned.substring(0, 2) });
    }
  };

  const handleCVVChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    setCardData({ ...cardData, cvv: cleaned.substring(0, 4) });
  };

  const scanCardFront = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is needed to scan card');
        return;
      }

      setScanning(true);
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 10],
        quality: 1,
      });

      setScanning(false);

      if (!result.canceled) {
        // Simulate OCR extraction from card front
        // In production, use ML Kit or OCR service
        Alert.alert(
          'Card Scanned',
          'Extracting card details...',
          [{ text: 'OK' }]
        );
        
        // Simulate OCR delay
        setTimeout(() => {
          setCardData({
            ...cardData,
            cardNumber: '4532 1234 5678 9010',
            cardHolder: 'JOHN DOE',
            expiryMonth: '12',
            expiryYear: '25',
          });
          
          Alert.alert(
            'Success',
            'Card details extracted!\n\nPlease verify the information and enter CVV.',
            [{ text: 'OK' }]
          );
        }, 1500);
      }
    } catch (error) {
      setScanning(false);
      Alert.alert('Error', 'Failed to scan card. Please try again or enter manually.');
    }
  };

  const scanCardBack = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is needed to scan card');
        return;
      }

      setScanning(true);
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 10],
        quality: 1,
      });

      setScanning(false);

      if (!result.canceled) {
        // Simulate OCR extraction from card back (CVV)
        Alert.alert(
          'Back Scanned',
          'Extracting CVV...',
          [{ text: 'OK' }]
        );
        
        // Simulate OCR delay
        setTimeout(() => {
          setCardData({
            ...cardData,
            cvv: '123',
          });
          
          Alert.alert(
            'Success',
            'CVV extracted from card back!',
            [{ text: 'OK' }]
          );
        }, 1500);
      }
    } catch (error) {
      setScanning(false);
      Alert.alert('Error', 'Failed to scan card. Please try again or enter manually.');
    }
  };

  const validateCard = () => {
    const cardNumberClean = cardData.cardNumber.replace(/\s/g, '');
    
    if (cardNumberClean.length < 13 || cardNumberClean.length > 16) {
      Alert.alert('Invalid Card', 'Card number must be 13-16 digits');
      return false;
    }
    
    if (!cardData.cardHolder.trim()) {
      Alert.alert('Required Field', 'Please enter cardholder name');
      return false;
    }
    
    if (!cardData.expiryMonth || !cardData.expiryYear) {
      Alert.alert('Required Field', 'Please enter expiry date');
      return false;
    }
    
    if (cardData.cvv.length < 3) {
      Alert.alert('Invalid CVV', 'CVV must be 3-4 digits');
      return false;
    }
    
    return true;
  };

  const handleSave = () => {
    if (!validateCard()) return;

    Alert.alert(
      'Add Card',
      'Add this card as a payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Card',
          onPress: () => {
            // TODO: Save to backend
            Alert.alert(
              'Success',
              'Payment card added successfully!',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          }
        }
      ]
    );
  };

  const getCardType = () => {
    const number = cardData.cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return { name: 'Visa', icon: 'card', color: argonTheme.colors.primary };
    if (number.startsWith('5')) return { name: 'Mastercard', icon: 'card', color: argonTheme.colors.warning };
    if (number.startsWith('3')) return { name: 'Amex', icon: 'card', color: argonTheme.colors.info };
    return { name: 'Card', icon: 'card-outline', color: argonTheme.colors.muted };
  };

  const cardType = getCardType();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Scan Options */}
        <View style={styles.scanSection}>
          <Text style={styles.scanTitle}>Quick Scan</Text>
          <View style={styles.scanButtons}>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={scanCardFront}
              disabled={scanning}
            >
              <LinearGradient
                colors={gradient}
                style={styles.scanButtonGradient}
              >
                <Ionicons name="card-outline" size={32} color={argonTheme.colors.white} />
                <Text style={styles.scanButtonLabel}>Scan Front</Text>
                <Text style={styles.scanButtonSubtext}>Card number, name, expiry</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.scanButton}
              onPress={scanCardBack}
              disabled={scanning}
            >
              <LinearGradient
                colors={[gradient[1], gradient[0]]}
                style={styles.scanButtonGradient}
              >
                <Ionicons name="shield-checkmark-outline" size={32} color={argonTheme.colors.white} />
                <Text style={styles.scanButtonLabel}>Scan Back</Text>
                <Text style={styles.scanButtonSubtext}>CVV security code</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>OR ENTER MANUALLY</Text>
        </View>

        {/* Card Preview */}
        <View style={styles.cardPreview}>
          <LinearGradient
            colors={cardType.color === argonTheme.colors.muted ? gradient : [cardType.color, cardType.color + 'CC']}
            style={styles.previewCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.previewHeader}>
              <Ionicons name={cardType.icon} size={36} color={argonTheme.colors.white} />
              <Text style={styles.cardTypeText}>{cardType.name}</Text>
            </View>

            <Text style={styles.previewNumber}>
              {cardData.cardNumber || '•••• •••• •••• ••••'}
            </Text>

            <View style={styles.previewFooter}>
              <View>
                <Text style={styles.previewLabel}>CARDHOLDER</Text>
                <Text style={styles.previewValue}>
                  {cardData.cardHolder || 'YOUR NAME'}
                </Text>
              </View>
              <View>
                <Text style={styles.previewLabel}>EXPIRES</Text>
                <Text style={styles.previewValue}>
                  {cardData.expiryMonth || 'MM'}/{cardData.expiryYear || 'YY'}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Card Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={argonTheme.colors.muted}
                value={cardData.cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cardholder Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor={argonTheme.colors.muted}
                value={cardData.cardHolder}
                onChangeText={(text) => setCardData({ ...cardData, cardHolder: text.toUpperCase() })}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Expiry Date *</Text>
              <View style={styles.expiryContainer}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="MM"
                    placeholderTextColor={argonTheme.colors.muted}
                    value={cardData.expiryMonth}
                    onChangeText={(text) => handleExpiryChange('expiryMonth', text)}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                <Text style={styles.expirySlash}>/</Text>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="YY"
                    placeholderTextColor={argonTheme.colors.muted}
                    value={cardData.expiryYear}
                    onChangeText={(text) => handleExpiryChange('expiryYear', text)}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
              <Text style={styles.label}>CVV *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={argonTheme.colors.muted} />
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor={argonTheme.colors.muted}
                  value={cardData.cvv}
                  onChangeText={handleCVVChange}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="shield-checkmark" size={20} color={argonTheme.colors.success} />
          <Text style={styles.infoText}>
            Your card information is encrypted and securely stored. We use industry-standard security protocols.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <LinearGradient
              colors={gradient}
              style={styles.saveButtonGradient}
            >
              <Ionicons name="card" size={20} color={argonTheme.colors.white} />
              <Text style={styles.saveButtonText}>Add Card</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle-outline" size={20} color={argonTheme.colors.danger} />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  scanSection: {
    marginBottom: 24,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  scanButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  scanButton: {
    flex: 1,
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  scanButtonGradient: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  scanButtonLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginTop: 8,
  },
  scanButtonSubtext: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.muted,
    letterSpacing: 1,
  },
  cardPreview: {
    marginBottom: 24,
  },
  previewCard: {
    borderRadius: argonTheme.borderRadius.xl,
    padding: 24,
    ...argonTheme.shadows.lg,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  cardTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  previewNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    letterSpacing: 2,
    marginBottom: 20,
  },
  previewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    letterSpacing: 1,
  },
  previewValue: {
    fontSize: 14,
    fontWeight: '500',
    color: argonTheme.colors.white,
  },
  formCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 20,
    marginBottom: 20,
    ...argonTheme.shadows.md,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  row: {
    flexDirection: 'row',
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expirySlash: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.success + '15',
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.success,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    marginBottom: 20,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.success,
    lineHeight: 18,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 40,
  },
  saveButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  saveButtonText: {
    color: argonTheme.colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: argonTheme.colors.danger,
    gap: 8,
  },
  cancelButtonText: {
    color: argonTheme.colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});

