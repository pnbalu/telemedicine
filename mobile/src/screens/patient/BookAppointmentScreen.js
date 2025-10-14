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

export default function BookAppointmentScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [step, setStep] = useState(1); // 1: Type, 2: Date/Time, 3: Confirm
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const consultationTypes = [
    {
      id: 'ai',
      title: 'AI Health Assistant',
      description: 'Quick consultation with AI',
      price: '$15',
      duration: '5-10 min',
      icon: 'chatbubbles',
      color: gradient, // Use dynamic gradient
    },
    {
      id: 'doctor',
      title: 'Video with Doctor',
      description: 'Live consultation',
      price: '$75',
      duration: '30 min',
      icon: 'videocam',
      color: gradient, // Use dynamic gradient
    },
  ];

  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate time slots (9 AM - 5 PM)
  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 17 && minute === 30) continue; // Stop at 5:00 PM
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        slots.push(time);
      }
    }
    return slots;
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDay = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatTimeSlot = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleContinue = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2 && selectedDate && selectedTime) {
      setStep(3);
    } else if (step === 3) {
      const appointmentDate = formatDate(selectedDate);
      const appointmentTime = formatTimeSlot(selectedTime);
      alert(`Appointment scheduled successfully!\n\nType: ${consultationTypes.find(t => t.id === selectedType).title}\nDate: ${appointmentDate}\nTime: ${appointmentTime}\n\nYou can join 15 minutes before the scheduled time.`);
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const selectedTypeData = consultationTypes.find(t => t.id === selectedType);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <Text style={styles.headerStep}>Step {step} of 3</Text>
        </View>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((s) => (
          <View
            key={s}
            style={[
              styles.progressDot,
              s <= step && {
                backgroundColor: primaryColor,
                width: 24,
              },
              s < step && {
                backgroundColor: argonTheme.colors.success,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step 1: Choose Type */}
        {step === 1 && (
          <>
            <Text style={styles.sectionTitle}>Choose Consultation Type</Text>

        {consultationTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeCard,
              selectedType === type.id && styles.typeCardSelected
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <LinearGradient
              colors={type.color}
              style={styles.typeIcon}
            >
              <Ionicons name={type.icon} size={32} color={argonTheme.colors.white} />
            </LinearGradient>

            <View style={styles.typeInfo}>
              <Text style={styles.typeTitle}>{type.title}</Text>
              <Text style={styles.typeDescription}>{type.description}</Text>
              <View style={styles.typeDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="cash-outline" size={14} color={argonTheme.colors.textMuted} />
                  <Text style={styles.detailText}>{type.price}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={14} color={argonTheme.colors.textMuted} />
                  <Text style={styles.detailText}>{type.duration}</Text>
                </View>
              </View>
            </View>

            {selectedType === type.id && (
              <Ionicons name="checkmark-circle" size={24} color={argonTheme.colors.success} />
            )}
          </TouchableOpacity>
        ))}
          </>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
              {getAvailableDates().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateCard,
                    selectedDate?.toDateString() === date.toDateString() && {
                      borderColor: primaryColor,
                      backgroundColor: primaryColor + '10',
                    }
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[
                    styles.dateDay,
                    selectedDate?.toDateString() === date.toDateString() && { color: primaryColor }
                  ]}>
                    {formatDay(date)}
                  </Text>
                  <Text style={[
                    styles.dateNumber,
                    selectedDate?.toDateString() === date.toDateString() && { color: primaryColor }
                  ]}>
                    {date.getDate()}
                  </Text>
                  <Text style={[
                    styles.dateLabel,
                    selectedDate?.toDateString() === date.toDateString() && {
                      color: primaryColor,
                      fontWeight: '600',
                    }
                  ]}>
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedDate && (
              <>
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Select Time</Text>
                <View style={styles.timeGrid}>
                  {getAvailableTimeSlots().map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeSlot,
                        selectedTime?.getHours() === time.getHours() && 
                        selectedTime?.getMinutes() === time.getMinutes() && {
                          backgroundColor: primaryColor,
                          borderColor: primaryColor,
                        }
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Ionicons 
                        name="time-outline" 
                        size={16} 
                        color={
                          selectedTime?.getHours() === time.getHours() && 
                          selectedTime?.getMinutes() === time.getMinutes()
                            ? argonTheme.colors.white 
                            : primaryColor
                        } 
                      />
                      <Text style={[
                        styles.timeText,
                        selectedTime?.getHours() === time.getHours() && 
                        selectedTime?.getMinutes() === time.getMinutes() && 
                        styles.timeTextSelected
                      ]}>
                        {formatTimeSlot(time)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && selectedTypeData && selectedDate && selectedTime && (
          <>
            <Text style={styles.sectionTitle}>Confirm Appointment</Text>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <LinearGradient
                  colors={selectedTypeData.color}
                  style={styles.summaryIcon}
                >
                  <Ionicons name={selectedTypeData.icon} size={32} color={argonTheme.colors.white} />
                </LinearGradient>
                <View style={styles.summaryHeaderText}>
                  <Text style={styles.summaryTitle}>{selectedTypeData.title}</Text>
                  <Text style={styles.summarySubtitle}>{selectedTypeData.description}</Text>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Ionicons name="calendar" size={20} color={primaryColor} />
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>{formatDate(selectedDate)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Ionicons name="time" size={20} color={primaryColor} />
                <Text style={styles.summaryLabel}>Time</Text>
                <Text style={styles.summaryValue}>{formatTimeSlot(selectedTime)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Ionicons name="hourglass" size={20} color={primaryColor} />
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>{selectedTypeData.duration}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Ionicons name="cash" size={20} color={primaryColor} />
                <Text style={styles.summaryLabel}>Price</Text>
                <Text style={styles.summaryValue}>{selectedTypeData.price}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={24} color={argonTheme.colors.info} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Appointment Policy</Text>
                <Text style={styles.infoText}>
                  • You can join 15 minutes before scheduled time{'\n'}
                  • Appointments can be joined up to 30 minutes after start time{'\n'}
                  • Add to your calendar to get reminders{'\n'}
                  • Cancel up to 24 hours before for full refund
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Continue Button */}
        {((step === 1 && selectedType) || 
          (step === 2 && selectedDate && selectedTime) || 
          step === 3) && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={gradient}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>
                {step === 3 ? 'Confirm & Book' : 'Continue'}
              </Text>
              <Ionicons 
                name={step === 3 ? 'checkmark-circle' : 'arrow-forward'} 
                size={20} 
                color={argonTheme.colors.white} 
              />
            </LinearGradient>
          </TouchableOpacity>
        )}
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
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerStep: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: argonTheme.colors.border,
  },
  progressDotActive: {
    backgroundColor: argonTheme.colors.primary,
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: argonTheme.colors.success,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  typeCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...argonTheme.shadows.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: argonTheme.colors.success,
  },
  typeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeInfo: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    marginBottom: 8,
  },
  typeDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    fontWeight: '500',
  },
  continueButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
    marginTop: 24,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.info + '10',
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginTop: 24,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.info,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 20,
  },
  dateScroll: {
    marginBottom: 16,
  },
  dateCard: {
    width: 80,
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    ...argonTheme.shadows.sm,
  },
  dateCardSelected: {
    borderColor: argonTheme.colors.primary,
    backgroundColor: argonTheme.colors.primary + '10',
  },
  dateDay: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateDaySelected: {
    color: argonTheme.colors.primary,
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  dateNumberSelected: {
    color: argonTheme.colors.primary,
  },
  dateLabel: {
    fontSize: 11,
    color: argonTheme.colors.textMuted,
  },
  dateLabelSelected: {
    color: argonTheme.colors.primary,
    fontWeight: '600',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '31%',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  timeSlotSelected: {
    backgroundColor: argonTheme.colors.primary,
    borderColor: argonTheme.colors.primary,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  timeTextSelected: {
    color: argonTheme.colors.white,
  },
  summaryCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 20,
    marginBottom: 20,
    ...argonTheme.shadows.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  summaryHeaderText: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: argonTheme.colors.border,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 15,
    color: argonTheme.colors.text,
    marginLeft: 4,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
});

