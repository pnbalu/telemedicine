import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function PaymentMethodsScreen({ navigation }) {
  const { gradient } = useTheme();
  const [defaultCard, setDefaultCard] = useState(1);

  const cards = [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', name: 'John Doe' },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '09/24', name: 'John Doe' },
  ];

  const getCardIcon = (type) => {
    return type === 'visa' ? 'card' : 'card';
  };

  const getCardColor = (type) => {
    return type === 'visa' ? argonTheme.colors.primary : argonTheme.colors.warning;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Saved Cards</Text>

        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.cardItem, defaultCard === card.id && styles.cardItemActive]}
            onPress={() => setDefaultCard(card.id)}
          >
            <LinearGradient
              colors={[getCardColor(card.type), getCardColor(card.type) + 'CC']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Ionicons name={getCardIcon(card.type)} size={32} color={argonTheme.colors.white} />
                {defaultCard === card.id && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Text style={styles.cardExpiry}>{card.expiry}</Text>
                </View>
              </View>
            </LinearGradient>

            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color={argonTheme.colors.danger} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.addCardButton}
          onPress={() => navigation.navigate('AddCard')}
        >
          <LinearGradient
            colors={gradient}
            style={styles.addCardGradient}
          >
            <Ionicons name="add-circle-outline" size={24} color={argonTheme.colors.white} />
            <Text style={styles.addCardText}>Add New Card</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color={argonTheme.colors.success} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Secure Payments</Text>
            <Text style={styles.infoText}>
              Your payment information is encrypted and securely stored. We never share your data.
            </Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  cardItem: {
    marginBottom: 16,
    borderRadius: argonTheme.borderRadius.xl,
    ...argonTheme.shadows.lg,
    position: 'relative',
  },
  cardItemActive: {
    transform: [{ scale: 1.02 }],
  },
  cardGradient: {
    borderRadius: argonTheme.borderRadius.xl,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: argonTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    gap: 16,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  cardExpiry: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: argonTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...argonTheme.shadows.sm,
  },
  addCardButton: {
    marginBottom: 24,
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
  },
  addCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  infoCard: {
    backgroundColor: argonTheme.colors.success + '10',
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.success,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
});

