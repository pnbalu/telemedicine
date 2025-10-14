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

export default function DoctorScheduleScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.getDate(),
      dayName: weekDays[date.getDay()],
      isToday: i === 0,
    };
  });

  const schedule = [
    { time: '09:00 AM', patient: 'John Doe', type: 'Video Call', duration: '30 min', status: 'completed' },
    { time: '10:00 AM', patient: 'Sarah Smith', type: 'Video Call', duration: '30 min', status: 'completed' },
    { time: '11:30 AM', patient: 'Break Time', type: 'break', duration: '30 min', status: 'break' },
    { time: '02:00 PM', patient: 'Michael Brown', type: 'Video Call', duration: '30 min', status: 'upcoming' },
    { time: '03:00 PM', patient: 'Emily Wilson', type: 'Video Call', duration: '15 min', status: 'upcoming' },
    { time: '04:00 PM', patient: 'Available Slot', type: 'available', duration: '30 min', status: 'available' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Schedule</Text>
          <Text style={styles.headerSubtitle}>October 2025</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="add-circle-outline" size={26} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Date Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dateSelector}
        contentContainerStyle={styles.dateSelectorContent}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateCard,
              date.day === selectedDate && { 
                backgroundColor: primaryColor,
                borderColor: primaryColor 
              },
              date.isToday && styles.todayCard
            ]}
            onPress={() => setSelectedDate(date.day)}
          >
            <Text style={[
              styles.dayName,
              date.day === selectedDate && styles.dayNameActive
            ]}>
              {date.dayName}
            </Text>
            <Text style={[
              styles.dayNumber,
              date.day === selectedDate && styles.dayNumberActive
            ]}>
              {date.day}
            </Text>
            {date.isToday && date.day !== selectedDate && (
              <View style={styles.todayDot} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Schedule Summary */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>6</Text>
          <Text style={styles.summaryLabel}>Appointments</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>4.5h</Text>
          <Text style={styles.summaryLabel}>Total Time</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: argonTheme.colors.success }]}>2</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
      </View>

      {/* Timeline */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {schedule.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{item.time}</Text>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>

            <View style={styles.timelineDot}>
              <View style={[
                styles.dot,
                { backgroundColor: 
                  item.status === 'completed' ? argonTheme.colors.success :
                  item.status === 'upcoming' ? primaryColor :
                  item.status === 'break' ? argonTheme.colors.warning :
                  argonTheme.colors.border
                }
              ]} />
              {index < schedule.length - 1 && <View style={styles.line} />}
            </View>

            <View style={[
              styles.appointmentBox,
              item.status === 'break' && styles.breakBox,
              item.status === 'available' && styles.availableBox
            ]}>
              <View style={styles.appointmentHeader}>
                <Text style={[
                  styles.appointmentPatient,
                  (item.status === 'break' || item.status === 'available') && styles.appointmentPatientMuted
                ]}>
                  {item.patient}
                </Text>
                {item.status === 'upcoming' && (
                  <TouchableOpacity style={styles.joinButton}>
                    <LinearGradient colors={gradient} style={styles.joinGradient}>
                      <Ionicons name="videocam" size={12} color={argonTheme.colors.white} />
                      <Text style={styles.joinText}>Join</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {item.status === 'completed' && (
                  <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.success} />
                )}
              </View>
              {item.type !== 'break' && item.type !== 'available' && (
                <View style={styles.appointmentDetails}>
                  <Ionicons name="videocam" size={14} color={argonTheme.colors.muted} />
                  <Text style={styles.appointmentType}>{item.type}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  headerButton: {
    padding: 4,
  },
  dateSelector: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
  },
  dateSelectorContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  dateCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: 60,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    position: 'relative',
  },
  todayCard: {
    borderColor: argonTheme.colors.info,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.textMuted,
    marginBottom: 4,
  },
  dayNameActive: {
    color: argonTheme.colors.white,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  dayNumberActive: {
    color: argonTheme.colors.white,
  },
  todayDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: argonTheme.colors.info,
  },
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: argonTheme.colors.border,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 11,
    color: argonTheme.colors.textMuted,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeColumn: {
    width: 80,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  durationText: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  timelineDot: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: argonTheme.colors.border,
    marginVertical: 4,
  },
  appointmentBox: {
    flex: 1,
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 12,
    marginLeft: 12,
    ...argonTheme.shadows.sm,
  },
  breakBox: {
    backgroundColor: argonTheme.colors.warning + '10',
    borderWidth: 1,
    borderColor: argonTheme.colors.warning + '30',
    borderStyle: 'dashed',
  },
  availableBox: {
    backgroundColor: argonTheme.colors.background,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    borderStyle: 'dashed',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  appointmentPatient: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
  appointmentPatientMuted: {
    color: argonTheme.colors.textMuted,
  },
  joinButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  joinGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  joinText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appointmentType: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
});

