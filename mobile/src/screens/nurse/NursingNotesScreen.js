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
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function NursingNotesScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [newNote, setNewNote] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const notes = [
    {
      id: 1,
      patient: 'John Doe',
      room: '302-A',
      note: 'Patient responsive, vitals stable. Complained of mild pain, administered prescribed pain medication.',
      time: '2:30 PM',
      date: 'Oct 13, 2025',
      nurse: 'You',
    },
    {
      id: 2,
      patient: 'Sarah Smith',
      room: '305-B',
      note: 'IV line replaced successfully. Patient tolerated procedure well. No signs of infection.',
      time: '11:00 AM',
      date: 'Oct 13, 2025',
      nurse: 'You',
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      room: '301-C',
      note: 'Patient showing improvement. BP readings normal. Encouraged mobility exercises.',
      time: '9:15 AM',
      date: 'Oct 13, 2025',
      nurse: 'You',
    },
  ];

  const patients = [
    { id: 1, name: 'John Doe', room: '302-A' },
    { id: 2, name: 'Sarah Smith', room: '305-B' },
    { id: 3, name: 'Mike Wilson', room: '301-C' },
  ];

  const handleSaveNote = () => {
    if (!selectedPatient) {
      Alert.alert('Select Patient', 'Please select a patient first');
      return;
    }
    if (!newNote.trim()) {
      Alert.alert('Enter Note', 'Please enter nursing notes');
      return;
    }

    Alert.alert('Success', 'Nursing note saved successfully!');
    setNewNote('');
    setSelectedPatient(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nursing Notes</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Note Section */}
        <View style={styles.newNoteCard}>
          <Text style={styles.newNoteTitle}>Add New Note</Text>
          
          {/* Patient Selector */}
          <TouchableOpacity style={styles.patientSelector}>
            <Ionicons name="person-outline" size={20} color={argonTheme.colors.muted} />
            <Text style={styles.patientSelectorText}>
              {selectedPatient ? `${selectedPatient.name} (${selectedPatient.room})` : 'Select Patient'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          {/* Note Input */}
          <TextInput
            style={styles.noteInput}
            placeholder="Enter nursing notes (assessment, interventions, patient response)..."
            placeholderTextColor={argonTheme.colors.muted}
            value={newNote}
            onChangeText={setNewNote}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Quick Templates */}
          <Text style={styles.templatesLabel}>Quick Templates:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesScroll}>
            <TouchableOpacity style={styles.templateChip}>
              <Text style={styles.templateText}>Vitals Recorded</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.templateChip}>
              <Text style={styles.templateText}>Medication Given</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.templateChip}>
              <Text style={styles.templateText}>Patient Stable</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.templateChip}>
              <Text style={styles.templateText}>Pain Assessment</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
            <LinearGradient colors={gradient} style={styles.saveGradient}>
              <Ionicons name="checkmark-circle" size={18} color={argonTheme.colors.white} />
              <Text style={styles.saveText}>Save Note</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recent Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Notes</Text>
          {notes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <View style={styles.notePatientInfo}>
                  <Text style={styles.notePatient}>{note.patient}</Text>
                  <View style={styles.noteRoomBadge}>
                    <Ionicons name="bed-outline" size={12} color={primaryColor} />
                    <Text style={[styles.noteRoom, { color: primaryColor }]}>{note.room}</Text>
                  </View>
                </View>
                <View style={styles.noteTimestamp}>
                  <Text style={styles.noteTime}>{note.time}</Text>
                  <Text style={styles.noteDate}>{note.date}</Text>
                </View>
              </View>

              <Text style={styles.noteText}>{note.note}</Text>

              <View style={styles.noteFooter}>
                <View style={styles.noteNurse}>
                  <Ionicons name="person-circle-outline" size={14} color={argonTheme.colors.muted} />
                  <Text style={styles.noteNurseText}>{note.nurse}</Text>
                </View>
              </View>
            </View>
          ))}
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
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  newNoteCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 24,
    ...argonTheme.shadows.md,
  },
  newNoteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 14,
  },
  patientSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  patientSelectorText: {
    flex: 1,
    fontSize: 14,
    color: argonTheme.colors.text,
  },
  noteInput: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    padding: 14,
    fontSize: 14,
    color: argonTheme.colors.text,
    minHeight: 120,
    marginBottom: 14,
  },
  templatesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.muted,
    marginBottom: 8,
  },
  templatesScroll: {
    marginBottom: 16,
  },
  templateChip: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  templateText: {
    fontSize: 12,
    color: argonTheme.colors.text,
  },
  saveButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  saveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
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
  noteCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notePatientInfo: {
    flex: 1,
  },
  notePatient: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  noteRoomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  noteRoom: {
    fontSize: 12,
    fontWeight: '600',
  },
  noteTimestamp: {
    alignItems: 'flex-end',
  },
  noteTime: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  noteDate: {
    fontSize: 11,
    color: argonTheme.colors.muted,
    marginTop: 2,
  },
  noteText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 20,
    marginBottom: 10,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteNurse: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteNurseText: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
});

