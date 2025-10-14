import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function DoctorAvailabilityScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const [weeklySchedule, setWeeklySchedule] = useState([
    {
      day: 'Monday',
      enabled: true,
      slots: [
        { start: '09:00 AM', end: '12:00 PM' },
        { start: '02:00 PM', end: '05:00 PM' },
      ]
    },
    {
      day: 'Tuesday',
      enabled: true,
      slots: [
        { start: '09:00 AM', end: '12:00 PM' },
        { start: '02:00 PM', end: '05:00 PM' },
      ]
    },
    {
      day: 'Wednesday',
      enabled: true,
      slots: [
        { start: '09:00 AM', end: '12:00 PM' },
        { start: '02:00 PM', end: '05:00 PM' },
      ]
    },
    {
      day: 'Thursday',
      enabled: true,
      slots: [
        { start: '09:00 AM', end: '12:00 PM' },
        { start: '02:00 PM', end: '05:00 PM' },
      ]
    },
    {
      day: 'Friday',
      enabled: true,
      slots: [
        { start: '09:00 AM', end: '12:00 PM' },
        { start: '02:00 PM', end: '04:00 PM' },
      ]
    },
    {
      day: 'Saturday',
      enabled: false,
      slots: []
    },
    {
      day: 'Sunday',
      enabled: false,
      slots: []
    },
  ]);

  const [consultationTypes, setConsultationTypes] = useState([
    {
      id: 1,
      name: 'Video Consultation',
      enabled: true,
      duration: 30,
      price: 150,
      icon: 'videocam',
      color: argonTheme.colors.primary,
    },
    {
      id: 2,
      name: 'In-Person Visit',
      enabled: true,
      duration: 45,
      price: 200,
      icon: 'person',
      color: argonTheme.colors.success,
    },
    {
      id: 3,
      name: 'Follow-up Call',
      enabled: true,
      duration: 15,
      price: 75,
      icon: 'call',
      color: argonTheme.colors.info,
    },
  ]);

  const [blackoutDates, setBlackoutDates] = useState([
    { id: 1, date: 'Dec 25, 2025', reason: 'Christmas Holiday' },
    { id: 2, date: 'Jan 1, 2026', reason: 'New Year Holiday' },
  ]);

  const [settings, setSettings] = useState({
    advanceBooking: 30, // days
    slotInterval: 30, // minutes
    bufferTime: 10, // minutes between appointments
    maxDailyAppointments: 12,
    autoAccept: false,
    allowWeekendEmergency: true,
  });

  const toggleDay = (index) => {
    if (!isEditing) return;
    const updated = [...weeklySchedule];
    updated[index].enabled = !updated[index].enabled;
    setWeeklySchedule(updated);
  };

  const toggleConsultationType = (id) => {
    if (!isEditing) return;
    const updated = consultationTypes.map(type =>
      type.id === id ? { ...type, enabled: !type.enabled } : type
    );
    setConsultationTypes(updated);
  };

  const addTimeSlot = (dayIndex) => {
    Alert.alert('Add Time Slot', 'Time slot picker will be implemented');
  };

  const addBlackoutDate = () => {
    Alert.alert('Add Blackout Date', 'Date picker will be implemented');
  };

  const handleSave = () => {
    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these availability changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            setIsEditing(false);
            Alert.alert('Success', 'Your availability has been updated successfully!');
          }
        }
      ]
    );
  };

  const getDayIcon = (day) => {
    return weeklySchedule.find(d => d.day === day)?.enabled ? 'checkmark-circle' : 'close-circle';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Availability Settings</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={[styles.summaryIcon, { backgroundColor: primaryColor + '15' }]}>
              <Ionicons name="calendar" size={28} color={primaryColor} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>Weekly Schedule</Text>
              <Text style={styles.summaryText}>
                {weeklySchedule.filter(d => d.enabled).length} days active
              </Text>
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>40</Text>
              <Text style={styles.summaryStatLabel}>Hours/Week</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>12</Text>
              <Text style={styles.summaryStatLabel}>Max Daily</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>30</Text>
              <Text style={styles.summaryStatLabel}>Min/Slot</Text>
            </View>
          </View>
        </View>

        {/* Weekly Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          {weeklySchedule.map((day, index) => (
            <View key={day.day} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <View style={styles.dayLeft}>
                  <Ionicons 
                    name={getDayIcon(day.day)} 
                    size={20} 
                    color={day.enabled ? argonTheme.colors.success : argonTheme.colors.muted} 
                  />
                  <Text style={[styles.dayName, !day.enabled && styles.dayNameDisabled]}>
                    {day.day}
                  </Text>
                </View>
                <Switch
                  value={day.enabled}
                  onValueChange={() => toggleDay(index)}
                  trackColor={{ false: argonTheme.colors.border, true: primaryColor }}
                  thumbColor={argonTheme.colors.white}
                  disabled={!isEditing}
                />
              </View>

              {day.enabled && day.slots.length > 0 && (
                <View style={styles.timeSlotsContainer}>
                  {day.slots.map((slot, slotIndex) => (
                    <View key={slotIndex} style={styles.timeSlot}>
                      <Ionicons name="time-outline" size={14} color={primaryColor} />
                      <Text style={styles.timeSlotText}>
                        {slot.start} - {slot.end}
                      </Text>
                      {isEditing && (
                        <TouchableOpacity>
                          <Ionicons name="close-circle" size={16} color={argonTheme.colors.danger} />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                  {isEditing && (
                    <TouchableOpacity 
                      style={styles.addSlotButton}
                      onPress={() => addTimeSlot(index)}
                    >
                      <Ionicons name="add" size={14} color={primaryColor} />
                      <Text style={[styles.addSlotText, { color: primaryColor }]}>Add Slot</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Consultation Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Types</Text>
          {consultationTypes.map((type) => (
            <View key={type.id} style={[styles.consultationCard, !type.enabled && styles.consultationCardDisabled]}>
              <View style={styles.consultationHeader}>
                <View style={[styles.consultationIcon, { backgroundColor: type.color + '15' }]}>
                  <Ionicons name={type.icon} size={24} color={type.color} />
                </View>
                <View style={styles.consultationInfo}>
                  <Text style={[styles.consultationName, !type.enabled && styles.textDisabled]}>
                    {type.name}
                  </Text>
                  <View style={styles.consultationMeta}>
                    <Text style={[styles.consultationDetail, !type.enabled && styles.textDisabled]}>
                      {type.duration} min • ${type.price}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={type.enabled}
                  onValueChange={() => toggleConsultationType(type.id)}
                  trackColor={{ false: argonTheme.colors.border, true: type.color }}
                  thumbColor={argonTheme.colors.white}
                  disabled={!isEditing}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Booking Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Settings</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="calendar-outline" size={20} color={argonTheme.colors.muted} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Advance Booking</Text>
                  <Text style={styles.settingHint}>How far in advance patients can book</Text>
                </View>
              </View>
              <Text style={styles.settingValue}>{settings.advanceBooking} days</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="timer-outline" size={20} color={argonTheme.colors.muted} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Slot Interval</Text>
                  <Text style={styles.settingHint}>Default appointment duration</Text>
                </View>
              </View>
              <Text style={styles.settingValue}>{settings.slotInterval} min</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="pause-outline" size={20} color={argonTheme.colors.muted} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Buffer Time</Text>
                  <Text style={styles.settingHint}>Gap between appointments</Text>
                </View>
              </View>
              <Text style={styles.settingValue}>{settings.bufferTime} min</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="people-outline" size={20} color={argonTheme.colors.muted} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Max Daily Appointments</Text>
                  <Text style={styles.settingHint}>Maximum per day</Text>
                </View>
              </View>
              <Text style={styles.settingValue}>{settings.maxDailyAppointments}</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="flash-outline" size={20} color={argonTheme.colors.muted} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Auto-Accept Bookings</Text>
                  <Text style={styles.settingHint}>Instantly confirm appointments</Text>
                </View>
              </View>
              <Switch
                value={settings.autoAccept}
                onValueChange={(value) => setSettings({ ...settings, autoAccept: value })}
                trackColor={{ false: argonTheme.colors.border, true: primaryColor }}
                thumbColor={argonTheme.colors.white}
                disabled={!isEditing}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="alert-circle-outline" size={20} color={argonTheme.colors.muted} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Weekend Emergency</Text>
                  <Text style={styles.settingHint}>Accept urgent weekend calls</Text>
                </View>
              </View>
              <Switch
                value={settings.allowWeekendEmergency}
                onValueChange={(value) => setSettings({ ...settings, allowWeekendEmergency: value })}
                trackColor={{ false: argonTheme.colors.border, true: argonTheme.colors.danger }}
                thumbColor={argonTheme.colors.white}
                disabled={!isEditing}
              />
            </View>
          </View>
        </View>

        {/* Blackout Dates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Blackout Dates</Text>
            {isEditing && (
              <TouchableOpacity onPress={addBlackoutDate}>
                <Ionicons name="add-circle" size={24} color={primaryColor} />
              </TouchableOpacity>
            )}
          </View>

          {blackoutDates.length > 0 ? (
            blackoutDates.map((blackout) => (
              <View key={blackout.id} style={styles.blackoutCard}>
                <View style={[styles.blackoutIcon, { backgroundColor: argonTheme.colors.danger + '15' }]}>
                  <Ionicons name="close-circle" size={20} color={argonTheme.colors.danger} />
                </View>
                <View style={styles.blackoutInfo}>
                  <Text style={styles.blackoutDate}>{blackout.date}</Text>
                  <Text style={styles.blackoutReason}>{blackout.reason}</Text>
                </View>
                {isEditing && (
                  <TouchableOpacity>
                    <Ionicons name="trash-outline" size={20} color={argonTheme.colors.danger} />
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={argonTheme.colors.muted} />
              <Text style={styles.emptyText}>No blackout dates set</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient colors={gradient} style={styles.saveGradient}>
                <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.white} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 24,
    ...argonTheme.shadows.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  summaryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: argonTheme.colors.border,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  dayCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dayName: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  dayNameDisabled: {
    color: argonTheme.colors.muted,
  },
  timeSlotsContainer: {
    marginTop: 12,
    gap: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  timeSlotText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  addSlotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: argonTheme.colors.border,
    gap: 6,
  },
  addSlotText: {
    fontSize: 13,
    fontWeight: '600',
  },
  consultationCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  consultationCardDisabled: {
    opacity: 0.5,
  },
  consultationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  consultationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultationInfo: {
    flex: 1,
  },
  consultationName: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  consultationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultationDetail: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  textDisabled: {
    color: argonTheme.colors.muted,
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    ...argonTheme.shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '20',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  settingHint: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.primary,
  },
  blackoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 12,
    marginBottom: 10,
    gap: 12,
    ...argonTheme.shadows.sm,
  },
  blackoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackoutInfo: {
    flex: 1,
  },
  blackoutDate: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  blackoutReason: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.muted,
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  saveButton: {
    flex: 2,
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
});

