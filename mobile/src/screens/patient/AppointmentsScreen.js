import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Calendar from 'expo-calendar';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppointmentsScreen({ navigation }) {
  const { gradient } = useTheme();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const now = new Date();

  // Add appointment to phone calendar
  const addToCalendar = async (appointment) => {
    try {
      // Request calendar permissions
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow calendar access to add appointments',
          [{ text: 'OK' }]
        );
        return;
      }

      // Get default calendar or create one
      let calendarId;
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      
      if (Platform.OS === 'ios') {
        calendarId = calendars.find(cal => cal.allowsModifications)?.id;
      } else {
        // Android - find or create calendar
        calendarId = calendars.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER)?.id;
      }

      if (!calendarId) {
        Alert.alert('Error', 'No writable calendar found');
        return;
      }

      // Calculate end time (30 minutes after start for Video Call, 15 min for AI)
      const startDate = appointment.dateTime;
      const endDate = new Date(startDate.getTime() + (appointment.type === 'AI Chat' ? 15 : 30) * 60000);

      // Create event
      const eventId = await Calendar.createEventAsync(calendarId, {
        title: `${appointment.type} - ${appointment.doctor}`,
        startDate: startDate,
        endDate: endDate,
        location: 'TeleMedX Telemedicine Platform',
        notes: `Consultation with ${appointment.doctor} (${appointment.specialty})\n\nType: ${appointment.type}\nStatus: ${appointment.status}\n\nJoin 15 minutes before scheduled time via TeleMedX app.`,
        alarms: [
          { relativeOffset: -60 }, // 1 hour before
          { relativeOffset: -15 },  // 15 minutes before
        ],
      });

      Alert.alert(
        'Success',
        'Appointment added to your calendar!\n\nYou will receive reminders 1 hour and 15 minutes before.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Calendar error:', error);
      Alert.alert('Error', 'Failed to add to calendar. Please try again.');
    }
  };
  
  // Create appointments with current time for testing (always joinable)
  const getCurrentAppointmentTime = (minutesOffset = 0) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesOffset);
    return date;
  };

  const formatAppointmentDisplay = (date) => {
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  };

  const appointment1Time = getCurrentAppointmentTime(5); // 5 minutes from now
  const appointment2Time = getCurrentAppointmentTime(10); // 10 minutes from now
  const appointment3Time = getCurrentAppointmentTime(60); // 1 hour from now
  
  const apt1Display = formatAppointmentDisplay(appointment1Time);
  const apt2Display = formatAppointmentDisplay(appointment2Time);
  const apt3Display = formatAppointmentDisplay(appointment3Time);

  const allAppointments = [
    // UPCOMING - JOINABLE NOW - Video Call (5 minutes from now)
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: apt1Display.date,
      time: apt1Display.time,
      dateTime: appointment1Time,
      type: 'Video Call',
      status: 'confirmed',
    },
    // UPCOMING - JOINABLE NOW - AI Chat (10 minutes from now)
    {
      id: 2,
      doctor: 'AI Health Assistant',
      specialty: 'Initial Consultation',
      date: apt2Display.date,
      time: apt2Display.time,
      dateTime: appointment2Time,
      type: 'AI Chat',
      status: 'confirmed',
    },
    // UPCOMING - Soon - Video Call (1 hour from now)
    {
      id: 3,
      doctor: 'Dr. Emily Davis',
      specialty: 'General Physician',
      date: apt3Display.date,
      time: apt3Display.time,
      dateTime: appointment3Time,
      type: 'Video Call',
      status: 'confirmed',
    },
    // UPCOMING - Future
    {
      id: 4,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: 'Oct 18, 2025',
      time: '11:30 AM',
      dateTime: new Date('2025-10-18T11:30:00'),
      type: 'Video Call',
      status: 'pending',
    },
    // PAST - Completed yesterday
    {
      id: 5,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Oct 12, 2025',
      time: '2:00 PM',
      dateTime: new Date('2025-10-12T14:00:00'),
      type: 'Video Call',
      status: 'completed',
    },
    // PAST - Completed 3 days ago
    {
      id: 6,
      doctor: 'Dr. Robert Wilson',
      specialty: 'Orthopedist',
      date: 'Oct 10, 2025',
      time: '10:30 AM',
      dateTime: new Date('2025-10-10T10:30:00'),
      type: 'Video Call',
      status: 'completed',
    },
    // PAST - Cancelled
    {
      id: 7,
      doctor: 'Dr. Lisa Anderson',
      specialty: 'Pediatrician',
      date: 'Oct 8, 2025',
      time: '3:00 PM',
      dateTime: new Date('2025-10-08T15:00:00'),
      type: 'AI Chat',
      status: 'cancelled',
    },
    // PAST - Completed last week
    {
      id: 8,
      doctor: 'AI Health Assistant',
      specialty: 'Health Checkup',
      date: 'Oct 5, 2025',
      time: '9:00 AM',
      dateTime: new Date('2025-10-05T09:00:00'),
      type: 'AI Chat',
      status: 'completed',
    },
  ];

  // Filter appointments based on selected tab
  const upcomingAppointments = allAppointments.filter(apt => 
    apt.dateTime >= now && apt.status !== 'cancelled'
  );

  const pastAppointments = allAppointments.filter(apt => 
    apt.dateTime < now || apt.status === 'cancelled'
  ).sort((a, b) => b.dateTime - a.dateTime); // Most recent first

  const appointments = selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  const canJoin = (appointmentDateTime) => {
    const timeDiff = appointmentDateTime - now;
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    // Can join 15 minutes before (negative minutes) and up to 30 minutes after start time
    // minutesDiff positive = future, negative = past
    // Join window: from -30 (30 min after start) to +15 (15 min before start)
    return minutesDiff >= -30 && minutesDiff <= 15;
  };

  const getTimeStatus = (appointmentDateTime) => {
    const timeDiff = appointmentDateTime - now;
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesDiff < -30) return { text: 'Missed', color: argonTheme.colors.danger };
    if (minutesDiff < 0) return { text: 'In Progress', color: argonTheme.colors.success };
    if (minutesDiff <= 15) return { text: 'Starting Soon', color: argonTheme.colors.warning };
    if (minutesDiff <= 60) return { text: `In ${minutesDiff} min`, color: argonTheme.colors.info };
    
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
    
    if (daysDiff > 0) return { text: `In ${daysDiff} day${daysDiff > 1 ? 's' : ''}`, color: argonTheme.colors.muted };
    return { text: `In ${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`, color: argonTheme.colors.muted };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Appointments</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('BookAppointment')}
        >
          <Ionicons name="add-circle-outline" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'upcoming' && { 
                backgroundColor: gradient[0],
                borderColor: gradient[0],
              }
            ]}
            onPress={() => setSelectedTab('upcoming')}
          >
            <Ionicons 
              name="calendar" 
              size={14} 
              color={selectedTab === 'upcoming' ? argonTheme.colors.white : gradient[0]} 
            />
            <Text style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.tabTextActive
            ]}>
              Upcoming
            </Text>
            {upcomingAppointments.length > 0 && (
              <View style={[
                styles.tabBadge,
                selectedTab === 'upcoming' && styles.tabBadgeActive
              ]}>
                <Text style={[
                  styles.tabBadgeText,
                  selectedTab === 'upcoming' && styles.tabBadgeTextActive
                ]}>
                  {upcomingAppointments.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'past' && { 
                backgroundColor: gradient[0],
                borderColor: gradient[0],
              }
            ]}
            onPress={() => setSelectedTab('past')}
          >
            <Ionicons 
              name="time" 
              size={14} 
              color={selectedTab === 'past' ? argonTheme.colors.white : gradient[0]} 
            />
            <Text style={[
              styles.tabText,
              selectedTab === 'past' && styles.tabTextActive
            ]}>
              Past
            </Text>
            {pastAppointments.length > 0 && (
              <View style={[
                styles.tabBadge,
                selectedTab === 'past' && styles.tabBadgeActive
              ]}>
                <Text style={[
                  styles.tabBadgeText,
                  selectedTab === 'past' && styles.tabBadgeTextActive
                ]}>
                  {pastAppointments.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {appointments.map((appointment) => {
          const timeStatus = getTimeStatus(appointment.dateTime);
          const joinEnabled = canJoin(appointment.dateTime);
          
          return (
            <View key={appointment.id} style={styles.appointmentCard}>
              {/* Top Section with Doctor Info and Join Button */}
              <View style={styles.cardTop}>
                <View style={styles.doctorInfoRow}>
                  <View style={[
                    styles.avatar,
                    { backgroundColor: appointment.type === 'AI Chat' ? argonTheme.colors.info : gradient[0] }
                  ]}>
                    <Ionicons
                      name={appointment.type === 'AI Chat' ? 'chatbubbles' : 'person'}
                      size={22}
                      color={argonTheme.colors.white}
                    />
                  </View>
                  <View style={styles.doctorDetails}>
                    <Text style={styles.doctorName}>{appointment.doctor}</Text>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                    <View style={[
                      styles.typeBadge,
                      { backgroundColor: appointment.type === 'AI Chat' ? argonTheme.colors.info + '15' : gradient[0] + '15' }
                    ]}>
                      <Ionicons 
                        name={appointment.type === 'AI Chat' ? 'chatbubbles' : 'videocam'} 
                        size={10} 
                        color={appointment.type === 'AI Chat' ? argonTheme.colors.info : gradient[0]} 
                      />
                      <Text style={[
                        styles.typeText,
                        { color: appointment.type === 'AI Chat' ? argonTheme.colors.info : gradient[0] }
                      ]}>
                        {appointment.type}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedTab === 'upcoming' && joinEnabled && (
                  <TouchableOpacity 
                    style={styles.joinButtonCompact}
                    onPress={() => {
                      if (appointment.type === 'AI Chat') {
                        navigation.navigate('AIConsultation');
                      } else {
                        navigation.navigate('VideoConference', { appointment });
                      }
                    }}
                  >
                    <LinearGradient
                      colors={gradient}
                      style={styles.joinGradientCompact}
                    >
                      <Ionicons name="videocam" size={16} color={argonTheme.colors.white} />
                      <Text style={styles.joinText}>Join</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>

              {/* Appointment Details */}
              <View style={styles.cardBody}>
                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconBox}>
                      <Ionicons name="calendar-outline" size={14} color={gradient[0]} />
                    </View>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{appointment.date}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <View style={styles.detailIconBox}>
                      <Ionicons name="time-outline" size={14} color={gradient[0]} />
                    </View>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>{appointment.time}</Text>
                  </View>
                </View>

                {/* Status Badge */}
                <View style={[
                  styles.statusBadgeFull,
                  { backgroundColor: timeStatus.color + '12' }
                ]}>
                  <Ionicons 
                    name={timeStatus.text === 'Starting Soon' ? 'alert-circle' : timeStatus.text === 'In Progress' ? 'radio-button-on' : 'time'} 
                    size={14} 
                    color={timeStatus.color} 
                  />
                  <Text style={[
                    styles.statusTextFull,
                    { color: timeStatus.color }
                  ]}>
                    {timeStatus.text}
                  </Text>
                </View>
              </View>

              {selectedTab === 'upcoming' ? (
                !joinEnabled && (
                  <View style={styles.scheduledBanner}>
                    <Ionicons name="calendar" size={14} color={argonTheme.colors.info} />
                    <Text style={styles.scheduledText}>Scheduled • Join button available 15 min before</Text>
                  </View>
                )
              ) : (
                <View style={styles.completionBanner}>
                  <View style={[
                    styles.completionIcon,
                    { backgroundColor: appointment.status === 'completed' 
                        ? argonTheme.colors.success + '20' 
                        : argonTheme.colors.danger + '20' 
                    }
                  ]}>
                    <Ionicons 
                      name={appointment.status === 'completed' ? 'checkmark-circle' : 'close-circle'} 
                      size={24} 
                      color={appointment.status === 'completed' 
                        ? argonTheme.colors.success 
                        : argonTheme.colors.danger
                      } 
                    />
                  </View>
                  <Text style={styles.completionText}>
                    {appointment.status === 'completed' ? 'Consultation Completed' : 'Appointment Cancelled'}
                  </Text>
                </View>
              )}

              {selectedTab === 'upcoming' ? (
                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => addToCalendar(appointment)}
                  >
                    <Ionicons name="calendar-outline" size={18} color={argonTheme.colors.primary} />
                    <Text style={styles.actionButtonText}>Add to Calendar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      Alert.alert(
                        'Cancel Appointment',
                        `Are you sure you want to cancel your appointment with ${appointment.doctor}?`,
                        [
                          { text: 'No', style: 'cancel' },
                          { 
                            text: 'Yes, Cancel', 
                            style: 'destructive',
                            onPress: () => Alert.alert('Cancelled', 'Appointment has been cancelled')
                          }
                        ]
                      );
                    }}
                  >
                    <Ionicons name="close-circle-outline" size={18} color={argonTheme.colors.danger} />
                    <Text style={[styles.actionButtonText, { color: argonTheme.colors.danger }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.actionRow}>
                  {appointment.status === 'completed' && (
                    <>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => Alert.alert('Summary', 'Consultation summary:\n\n• Duration: 30 minutes\n• Diagnosis: Hypertension management\n• Prescription: Updated dosage\n• Follow-up: 3 months')}
                      >
                        <Ionicons name="document-text-outline" size={18} color={argonTheme.colors.info} />
                        <Text style={[styles.actionButtonText, { color: argonTheme.colors.info }]}>View Summary</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('BookAppointment')}
                      >
                        <Ionicons name="refresh-outline" size={18} color={argonTheme.colors.success} />
                        <Text style={[styles.actionButtonText, { color: argonTheme.colors.success }]}>Rebook</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {appointment.status === 'cancelled' && (
                    <TouchableOpacity 
                      style={[styles.actionButton, { flex: 1 }]}
                      onPress={() => navigation.navigate('BookAppointment')}
                    >
                      <Ionicons name="add-circle-outline" size={18} color={argonTheme.colors.primary} />
                      <Text style={styles.actionButtonText}>Book Again</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          );
        })}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  addButton: {
    padding: 4,
  },
  tabContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
    height: 50,
  },
  tabsContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    gap: 5,
    minWidth: 100,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  tabTextActive: {
    color: argonTheme.colors.white,
  },
  tabBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  tabBadgeTextActive: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
  },
  appointmentCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: argonTheme.colors.border + '40',
    ...argonTheme.shadows.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
    marginBottom: 6,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  joinButtonCompact: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.sm,
  },
  joinGradientCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 6,
  },
  joinText: {
    color: argonTheme.colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 10,
  },
  detailIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: argonTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 10,
    color: argonTheme.colors.muted,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    color: argonTheme.colors.text,
    fontWeight: '600',
  },
  statusBadgeFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: argonTheme.borderRadius.md,
    gap: 6,
  },
  statusTextFull: {
    fontSize: 12,
    fontWeight: '600',
  },
  scheduledBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.info + '10',
    paddingVertical: 10,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
  },
  scheduledText: {
    fontSize: 11,
    color: argonTheme.colors.info,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.primary,
  },
  completionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
  },
  completionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
});

