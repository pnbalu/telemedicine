import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';

// Auth Screens
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from './src/screens/auth';

// Patient Screens
import {
  DashboardScreen,
  AppointmentsScreen,
  PrescriptionsScreen,
  ProfileScreen,
  BookAppointmentScreen,
  AIConsultationScreen,
  PersonalInfoScreen,
  MedicalHistoryScreen,
  InsuranceScreen,
  NotificationsScreen,
  PaymentMethodsScreen,
  PrivacySecurityScreen,
  HelpSupportScreen,
  LabResultsScreen,
  VideoConferenceScreen,
  MessagesScreen,
  ConversationScreen,
  NewMessageScreen,
  NotificationsCenterScreen,
  AddMedicalEntryScreen,
  AddCardScreen,
  FamilyMembersScreen,
  AddFamilyMemberScreen,
  FamilyMemberProfileScreen,
} from './src/screens/patient';

// Chat Screens
import { ChatScreen, FAQScreen, ChatHistoryScreen } from './src/screens/chat';

// Doctor Screens
import {
  DoctorDashboard,
  PatientListScreen,
  DoctorAppointmentsScreen,
  DoctorPrescriptionsScreen,
  DoctorProfileScreen,
  PatientRecordScreen,
  WritePrescriptionScreen,
  DoctorScheduleScreen,
  LabResultsReviewScreen,
  ConsultationRoomScreen,
  DoctorPersonalInfoScreen,
  DoctorCredentialsScreen,
  DoctorAvailabilityScreen,
  DoctorEarningsScreen,
} from './src/screens/doctor';

// Nurse Screens
import {
  NurseDashboard,
  PatientMonitoringScreen,
  VitalsRecordingScreen,
  MedicationTrackingScreen,
  NurseProfileScreen,
  NursingNotesScreen,
} from './src/screens/nurse';

// Theme & Context
import { argonTheme } from './src/theme/argonTheme';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { FamilyProvider } from './src/contexts/FamilyContext';
import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DoctorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DoctorDashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Patients') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'DoctorAppointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'DoctorProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: argonTheme.colors.success,
        tabBarInactiveTintColor: argonTheme.colors.muted,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: argonTheme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="DoctorDashboard" 
        component={DoctorDashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Patients" 
        component={PatientListScreen}
        options={{ title: 'Patients' }}
      />
      <Tab.Screen 
        name="DoctorAppointments" 
        component={DoctorAppointmentsScreen}
        options={{ title: 'Appointments' }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          title: 'Messages',
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: argonTheme.colors.danger,
            color: argonTheme.colors.white,
            fontSize: 10,
          }
        }}
      />
      <Tab.Screen 
        name="DoctorProfile" 
        component={DoctorProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function NurseTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'NurseDashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PatientMonitoring') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Vitals') {
            iconName = focused ? 'pulse' : 'pulse-outline';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'NurseProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: argonTheme.colors.info,
        tabBarInactiveTintColor: argonTheme.colors.muted,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: argonTheme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="NurseDashboard" 
        component={NurseDashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="PatientMonitoring" 
        component={PatientMonitoringScreen}
        options={{ title: 'Patients' }}
      />
      <Tab.Screen 
        name="Vitals" 
        component={VitalsRecordingScreen}
        options={{ title: 'Vitals' }}
      />
      <Tab.Screen 
        name="Medications" 
        component={MedicationTrackingScreen}
        options={{ 
          title: 'Medications',
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: argonTheme.colors.warning,
            color: argonTheme.colors.white,
            fontSize: 10,
          }
        }}
      />
      <Tab.Screen 
        name="NurseProfile" 
        component={NurseProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function PatientTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Prescriptions') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: argonTheme.colors.primary,
        tabBarInactiveTintColor: argonTheme.colors.muted,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: argonTheme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: argonTheme.colors.danger,
            color: argonTheme.colors.white,
            fontSize: 10,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
          }
        }}
      />
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  useEffect(() => {
    // Set timeout to skip loading screen after 3 seconds
    const timeout = setTimeout(() => {
      console.log('Font loading timeout - continuing anyway');
      setLoadTimeout(true);
      setFontsLoaded(true);
    }, 3000);

    async function loadFonts() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
        });
        console.log('Fonts loaded successfully');
        clearTimeout(timeout);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        clearTimeout(timeout);
        // Continue anyway
        setFontsLoaded(true);
      }
    }
    loadFonts();

    return () => clearTimeout(timeout);
  }, []);

  if (!fontsLoaded && !loadTimeout) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F5F7' }}>
        <Text style={{ fontSize: 18, color: '#5E72E4' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <FamilyProvider>
        <ThemeProvider>
          <PaperProvider theme={argonTheme}>
            <NavigationContainer>
              <StatusBar style="light" />
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          
          {/* Main App - Role Based */}
          <Stack.Screen name="Main" component={PatientTabs} />
          <Stack.Screen name="DoctorMain" component={DoctorTabs} />
          <Stack.Screen name="NurseMain" component={NurseTabs} />
          <Stack.Screen name="AdminMain" component={PatientTabs} />
            <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
            <Stack.Screen name="AIConsultation" component={AIConsultationScreen} />
            <Stack.Screen name="VideoConference" component={VideoConferenceScreen} />
            <Stack.Screen name="LabResults" component={LabResultsScreen} />
            
            {/* Messaging Screens */}
            <Stack.Screen name="Conversation" component={ConversationScreen} />
            <Stack.Screen name="NewMessage" component={NewMessageScreen} />
            <Stack.Screen name="NotificationsCenter" component={NotificationsCenterScreen} />
            
          {/* Chat Sub-screens */}
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="FAQList" component={FAQScreen} />
          <Stack.Screen name="ChatHistory" component={ChatHistoryScreen} />
            
          {/* Profile Sub-screens */}
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
          <Stack.Screen name="AddMedicalEntry" component={AddMedicalEntryScreen} />
          <Stack.Screen name="Insurance" component={InsuranceScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
          <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          
          {/* Family Management Screens */}
          <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} />
          <Stack.Screen name="AddFamilyMember" component={AddFamilyMemberScreen} />
          <Stack.Screen name="FamilyMemberProfile" component={FamilyMemberProfileScreen} />
          
          {/* Doctor Specific Screens */}
          <Stack.Screen name="PatientList" component={PatientListScreen} />
          <Stack.Screen name="DoctorPrescriptions" component={DoctorPrescriptionsScreen} />
          <Stack.Screen name="PatientRecord" component={PatientRecordScreen} />
          <Stack.Screen name="DoctorSchedule" component={DoctorScheduleScreen} />
          <Stack.Screen name="LabResultsReview" component={LabResultsReviewScreen} />
          <Stack.Screen name="WritePrescription" component={WritePrescriptionScreen} />
          <Stack.Screen name="ConsultationRoom" component={ConsultationRoomScreen} />
          <Stack.Screen name="DoctorPersonalInfo" component={DoctorPersonalInfoScreen} />
          <Stack.Screen name="DoctorCredentials" component={DoctorCredentialsScreen} />
          <Stack.Screen name="DoctorAvailability" component={DoctorAvailabilityScreen} />
          <Stack.Screen name="DoctorEarnings" component={DoctorEarningsScreen} />
          
          {/* Nurse Specific Screens */}
          <Stack.Screen name="VitalsRecording" component={VitalsRecordingScreen} />
          <Stack.Screen name="MedicationTracking" component={MedicationTrackingScreen} />
          <Stack.Screen name="NursingNotes" component={NursingNotesScreen} />
          <Stack.Screen name="NursePersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="NurseLicense" component={PersonalInfoScreen} />
          <Stack.Screen name="NurseSchedule" component={PersonalInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </ThemeProvider>
    </FamilyProvider>
    </AuthProvider>
  );
}

