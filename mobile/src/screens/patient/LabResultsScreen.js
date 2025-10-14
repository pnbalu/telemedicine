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
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function LabResultsScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [expandedVisit, setExpandedVisit] = useState(null);

  // Organize lab results by doctor visits
  const doctorVisits = [
    {
      visitId: 1,
      visitDate: 'Oct 10, 2025',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      reason: 'Annual Health Checkup',
      tests: [
        {
          id: 1,
          testName: 'Complete Blood Count (CBC)',
          status: 'normal',
          results: [
            { name: 'White Blood Cells', value: '7.5', unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
            { name: 'Red Blood Cells', value: '4.8', unit: 'M/uL', range: '4.5-5.5', status: 'normal' },
            { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '13.5-17.5', status: 'normal' },
            { name: 'Platelets', value: '225', unit: 'K/uL', range: '150-400', status: 'normal' },
          ],
          lab: 'Central Medical Lab',
        },
      ],
    },
    {
      visitId: 2,
      visitDate: 'Oct 8, 2025',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      reason: 'Heart Health Follow-up',
      tests: [
        {
          id: 2,
          testName: 'Lipid Panel',
          status: 'warning',
          results: [
            { name: 'Total Cholesterol', value: '215', unit: 'mg/dL', range: '<200', status: 'high' },
            { name: 'LDL Cholesterol', value: '135', unit: 'mg/dL', range: '<100', status: 'high' },
            { name: 'HDL Cholesterol', value: '48', unit: 'mg/dL', range: '>40', status: 'normal' },
            { name: 'Triglycerides', value: '160', unit: 'mg/dL', range: '<150', status: 'high' },
          ],
          lab: 'Quest Diagnostics',
          doctorNotes: 'Your cholesterol levels are elevated. I recommend:\n• Start statin medication (Atorvastatin 10mg daily)\n• Reduce saturated fat intake\n• Increase physical activity to 30 min/day\n• Follow-up in 3 months to recheck levels',
        },
      ],
    },
    {
      visitId: 3,
      visitDate: 'Oct 5, 2025',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      reason: 'Fatigue & Weight Issues',
      tests: [
        {
          id: 3,
          testName: 'Thyroid Function Tests',
          status: 'normal',
          results: [
            { name: 'TSH', value: '2.1', unit: 'mIU/L', range: '0.4-4.0', status: 'normal' },
            { name: 'Free T4', value: '1.2', unit: 'ng/dL', range: '0.8-1.8', status: 'normal' },
            { name: 'Free T3', value: '3.2', unit: 'pg/mL', range: '2.3-4.2', status: 'normal' },
          ],
          lab: 'LabCorp',
        },
      ],
    },
    {
      visitId: 4,
      visitDate: 'Sep 28, 2025',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      reason: 'Routine Metabolic Check',
      tests: [
        {
          id: 4,
          testName: 'Comprehensive Metabolic Panel',
          status: 'normal',
          results: [
            { name: 'Glucose', value: '92', unit: 'mg/dL', range: '70-100', status: 'normal' },
            { name: 'Calcium', value: '9.5', unit: 'mg/dL', range: '8.5-10.5', status: 'normal' },
            { name: 'Creatinine', value: '0.9', unit: 'mg/dL', range: '0.7-1.3', status: 'normal' },
            { name: 'BUN', value: '15', unit: 'mg/dL', range: '7-20', status: 'normal' },
          ],
          lab: 'Central Medical Lab',
        },
      ],
    },
    {
      visitId: 5,
      visitDate: 'Sep 15, 2025',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      reason: 'Bone Health Concern',
      tests: [
        {
          id: 5,
          testName: 'Vitamin D Test',
          status: 'warning',
          results: [
            { name: 'Vitamin D, 25-OH', value: '22', unit: 'ng/mL', range: '30-100', status: 'low' },
          ],
          lab: 'LabCorp',
          doctorNotes: 'Your Vitamin D levels are below normal range. Recommendations:\n• Start Vitamin D3 supplement 2000 IU daily\n• Increase sun exposure (15-20 min/day)\n• Eat more fatty fish, eggs, fortified dairy\n• Retest in 8 weeks',
        },
      ],
    },
    {
      visitId: 6,
      visitDate: 'Aug 20, 2025',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      reason: 'Diabetes Risk Assessment',
      tests: [
        {
          id: 6,
          testName: 'HbA1c (Diabetes Screening)',
          status: 'normal',
          results: [
            { name: 'Hemoglobin A1c', value: '5.4', unit: '%', range: '<5.7', status: 'normal' },
          ],
          lab: 'Quest Diagnostics',
        },
      ],
    },
    {
      visitId: 7,
      visitDate: 'Aug 5, 2025',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      reason: 'Pre-Surgery Screening',
      tests: [
        {
          id: 7,
          testName: 'Complete Blood Count (CBC)',
          status: 'normal',
          results: [
            { name: 'White Blood Cells', value: '7.2', unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
            { name: 'Red Blood Cells', value: '4.7', unit: 'M/uL', range: '4.5-5.5', status: 'normal' },
            { name: 'Hemoglobin', value: '14.0', unit: 'g/dL', range: '13.5-17.5', status: 'normal' },
            { name: 'Platelets', value: '235', unit: 'K/uL', range: '150-400', status: 'normal' },
          ],
          lab: 'Central Medical Lab',
        },
      ],
    },
    {
      visitId: 8,
      visitDate: 'Jul 10, 2025',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      reason: 'Cholesterol Management',
      tests: [
        {
          id: 8,
          testName: 'Lipid Panel',
          status: 'warning',
          results: [
            { name: 'Total Cholesterol', value: '220', unit: 'mg/dL', range: '<200', status: 'high' },
            { name: 'LDL Cholesterol', value: '140', unit: 'mg/dL', range: '<100', status: 'high' },
            { name: 'HDL Cholesterol', value: '45', unit: 'mg/dL', range: '>40', status: 'normal' },
            { name: 'Triglycerides', value: '175', unit: 'mg/dL', range: '<150', status: 'high' },
          ],
          lab: 'Quest Diagnostics',
          doctorNotes: 'Lipid levels remain elevated despite previous interventions. Action plan:\n• Increase statin dose to Atorvastatin 20mg\n• Consider adding Ezetimibe 10mg\n• Strict diet modification required\n• Monthly monitoring recommended\n• Schedule cardiology follow-up in 6 weeks',
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return argonTheme.colors.success;
      case 'warning': return argonTheme.colors.warning;
      case 'high': return argonTheme.colors.danger;
      case 'low': return argonTheme.colors.info;
      default: return argonTheme.colors.muted;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return 'checkmark-circle';
      case 'warning': return 'alert-circle';
      default: return 'information-circle';
    }
  };

  const getResultStatusIcon = (status) => {
    switch (status) {
      case 'normal': return 'checkmark';
      case 'high': return 'arrow-up';
      case 'low': return 'arrow-down';
      default: return 'remove';
    }
  };

  const getVisitStatus = (visit) => {
    return visit.tests.some(t => t.status === 'warning') ? 'warning' : 'normal';
  };

  // Generate HTML for PDF
  const generateTestResultHTML = (test, visit) => {
    const resultsHTML = test.results.map(result => `
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="padding: 12px; text-align: left;">${result.name}</td>
        <td style="padding: 12px; text-align: center;"><strong>${result.value} ${result.unit}</strong></td>
        <td style="padding: 12px; text-align: center;">${result.range} ${result.unit}</td>
        <td style="padding: 12px; text-align: center;">
          <span style="color: ${getStatusColor(result.status)}; font-weight: bold;">
            ${result.status.toUpperCase()}
          </span>
        </td>
      </tr>
    `).join('');

    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; background-color: #f5f5f5; }
            .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 20px; }
            .logo { font-size: 28px; font-weight: bold; color: ${primaryColor}; margin-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; color: #333; margin: 10px 0; }
            .subtitle { font-size: 14px; color: #666; }
            .info-section { margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 6px; }
            .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
            .label { font-weight: 600; color: #555; }
            .value { color: #333; }
            .test-name { font-size: 20px; font-weight: bold; color: #333; margin: 20px 0 15px 0; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th { background-color: ${primaryColor}; color: white; padding: 12px; text-align: left; font-weight: 600; }
            .notes { margin-top: 20px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; }
            .notes-title { font-weight: bold; color: #856404; margin-bottom: 10px; }
            .notes-text { color: #856404; line-height: 1.6; white-space: pre-line; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏥 TeleMedX</div>
              <div class="title">Laboratory Test Results</div>
              <div class="subtitle">Confidential Medical Document</div>
            </div>
            
            <div class="info-section">
              <div class="info-row">
                <span class="label">Patient:</span>
                <span class="value">John Doe</span>
              </div>
              <div class="info-row">
                <span class="label">Visit Date:</span>
                <span class="value">${visit.visitDate}</span>
              </div>
              <div class="info-row">
                <span class="label">Doctor:</span>
                <span class="value">${visit.doctor} (${visit.specialty})</span>
              </div>
              <div class="info-row">
                <span class="label">Reason:</span>
                <span class="value">${visit.reason}</span>
              </div>
              <div class="info-row">
                <span class="label">Laboratory:</span>
                <span class="value">${test.lab}</span>
              </div>
            </div>

            <div class="test-name">${test.testName}</div>
            
            <table>
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th style="text-align: center;">Result</th>
                  <th style="text-align: center;">Reference Range</th>
                  <th style="text-align: center;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${resultsHTML}
              </tbody>
            </table>

            ${test.doctorNotes ? `
              <div class="notes">
                <div class="notes-title">📋 Doctor's Notes:</div>
                <div class="notes-text">${test.doctorNotes}</div>
              </div>
            ` : ''}

            <div class="footer">
              <p><strong>Important:</strong> This document is for informational purposes only. Please consult your healthcare provider for medical advice.</p>
              <p>Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>© ${new Date().getFullYear()} TeleMedX - All Rights Reserved</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  // Download single test result
  const handleDownloadTest = async (test, visit) => {
    try {
      const html = generateTestResultHTML(test, visit);
      const { uri } = await Print.printToFileAsync({ html });
      
      const filename = `${test.testName.replace(/\s+/g, '_')}_${visit.visitDate.replace(/\s+/g, '_')}.pdf`;
      const newPath = `${FileSystem.documentDirectory}${filename}`;
      
      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });
      
      Alert.alert(
        'Download Complete',
        `Lab result saved as:\n${filename}\n\nLocation: Documents folder`,
        [
          { text: 'OK' },
          {
            text: 'Share',
            onPress: () => handleShareTest(newPath, filename)
          }
        ]
      );
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Download Failed', 'Unable to download lab result. Please try again.');
    }
  };

  // Share single test result
  const handleShareTest = async (test, visit) => {
    try {
      const html = generateTestResultHTML(test, visit);
      const { uri } = await Print.printToFileAsync({ html });
      
      const shareAvailable = await Sharing.isAvailableAsync();
      if (!shareAvailable) {
        Alert.alert('Sharing Not Available', 'Sharing is not supported on this device.');
        return;
      }
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Share ${test.testName} Results`,
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Share Failed', 'Unable to share lab result. Please try again.');
    }
  };

  // Download all results
  const handleDownloadAll = async () => {
    try {
      Alert.alert(
        'Download All Results',
        `This will download ${doctorVisits.length} doctor visits with all lab results. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Download',
            onPress: async () => {
              let allHTML = '';
              
              doctorVisits.forEach((visit) => {
                visit.tests.forEach((test) => {
                  allHTML += generateTestResultHTML(test, visit);
                  allHTML += '<div style="page-break-after: always;"></div>';
                });
              });
              
              const { uri } = await Print.printToFileAsync({ html: allHTML });
              const filename = `All_Lab_Results_${new Date().toISOString().split('T')[0]}.pdf`;
              const newPath = `${FileSystem.documentDirectory}${filename}`;
              
              await FileSystem.moveAsync({
                from: uri,
                to: newPath,
              });
              
              Alert.alert(
                'Download Complete',
                `All lab results saved as:\n${filename}`,
                [
                  { text: 'OK' },
                  {
                    text: 'Share',
                    onPress: async () => {
                      const shareAvailable = await Sharing.isAvailableAsync();
                      if (shareAvailable) {
                        await Sharing.shareAsync(newPath, {
                          mimeType: 'application/pdf',
                          dialogTitle: 'Share All Lab Results',
                        });
                      }
                    }
                  }
                ]
              );
            }
          }
        ]
      );
    } catch (error) {
      console.error('Download all error:', error);
      Alert.alert('Download Failed', 'Unable to download all results. Please try again.');
    }
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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Lab Results</Text>
          <Text style={styles.headerSubtitle}>{doctorVisits.length} doctor visit{doctorVisits.length !== 1 ? 's' : ''}</Text>
        </View>
        <TouchableOpacity onPress={handleDownloadAll}>
          <Ionicons name="download-outline" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {doctorVisits.map((visit) => {
          const isExpanded = expandedVisit === visit.visitId;
          const visitStatus = getVisitStatus(visit);
          
          return (
            <TouchableOpacity
              key={visit.visitId}
              style={styles.visitCard}
              onPress={() => setExpandedVisit(isExpanded ? null : visit.visitId)}
              activeOpacity={0.7}
            >
              {/* Visit Summary */}
              <View style={styles.visitSummary}>
                <View style={styles.visitLeft}>
                  <LinearGradient
                    colors={gradient}
                    style={styles.visitIcon}
                  >
                    <Ionicons name="flask" size={24} color={argonTheme.colors.white} />
                  </LinearGradient>
                  <View style={styles.visitInfoContainer}>
                    <Text style={styles.visitDateTitle}>{visit.visitDate}</Text>
                    <Text style={styles.visitDoctorName}>{visit.doctor}</Text>
                    <Text style={styles.visitReasonText}>{visit.reason}</Text>
                    <View style={styles.testsCount}>
                      <Ionicons name="document-text-outline" size={12} color={argonTheme.colors.muted} />
                      <Text style={styles.testsCountText}> {visit.tests.length} test{visit.tests.length > 1 ? 's' : ''}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.visitRight}>
                  <View style={[
                    styles.visitStatusBadge,
                    { backgroundColor: getStatusColor(visitStatus) + '20' }
                  ]}>
                    <Ionicons 
                      name={getStatusIcon(visitStatus)} 
                      size={18} 
                      color={getStatusColor(visitStatus)} 
                    />
                  </View>
                  <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={22} 
                    color={primaryColor} 
                    style={{ marginTop: 8 }}
                  />
                </View>
              </View>

              {/* Expanded Lab Results */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.divider} />
                  
                  {visit.tests.map((test) => (
                    <View key={test.id} style={styles.testSection}>
                      <View style={styles.testHeader}>
                        <View style={[
                          styles.testStatusDot,
                          { backgroundColor: getStatusColor(test.status) }
                        ]} />
                        <Text style={styles.testTitle}>{test.testName}</Text>
                      </View>
                      
                      {test.results.map((param, index) => (
                        <View key={index} style={styles.parameterRow}>
                          <View style={styles.parameterLeft}>
                            <Text style={styles.parameterName}>{param.name}</Text>
                            <Text style={styles.parameterRange}>Normal: {param.range}</Text>
                          </View>
                          <View style={styles.parameterRight}>
                            <Text style={[
                              styles.parameterValue,
                              { color: getStatusColor(param.status) }
                            ]}>
                              {param.value}
                            </Text>
                            <Text style={styles.parameterUnit}>{param.unit}</Text>
                            <Ionicons 
                              name={getResultStatusIcon(param.status)} 
                              size={16} 
                              color={getStatusColor(param.status)} 
                              style={{ marginLeft: 4 }}
                            />
                          </View>
                        </View>
                      ))}
                      
                      <Text style={styles.labInfo}>
                        <Ionicons name="business-outline" size={12} color={argonTheme.colors.muted} />
                        {' '}{test.lab}
                      </Text>
                      
                      {/* Doctor Notes - Only show for abnormal results */}
                      {test.doctorNotes && (
                        <View style={styles.doctorNotesContainer}>
                          <View style={styles.doctorNotesHeader}>
                            <Ionicons name="medical" size={16} color={argonTheme.colors.warning} />
                            <Text style={styles.doctorNotesTitle}>Doctor's Notes</Text>
                          </View>
                          <Text style={styles.doctorNotesText}>{test.doctorNotes}</Text>
                        </View>
                      )}

                      {/* Action Buttons for this specific test */}
                      <View style={styles.actions}>
                        <TouchableOpacity 
                          style={styles.actionBtn}
                          onPress={() => handleDownloadTest(test, visit)}
                        >
                          <Ionicons name="download-outline" size={18} color={primaryColor} />
                          <Text style={[styles.actionText, { color: primaryColor }]}>Download</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.actionBtn}
                          onPress={() => handleShareTest(test, visit)}
                        >
                          <Ionicons name="share-outline" size={18} color={primaryColor} />
                          <Text style={[styles.actionText, { color: primaryColor }]}>Share</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {doctorVisits.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="flask-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No Lab Results Yet</Text>
            <Text style={styles.emptyText}>Your lab results will appear here after doctor visits</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={argonTheme.colors.info} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Understanding Your Results</Text>
            <Text style={styles.infoText}>
              • Tap on any visit date to view detailed lab results{'\n'}
              • ✓ Green = Normal range{'\n'}
              • ↑ Red = Above normal{'\n'}
              • ↓ Blue = Below normal{'\n'}
              • Consult your doctor for interpretation
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
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  visitCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 16,
    ...argonTheme.shadows.md,
  },
  visitSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  visitLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  visitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitInfoContainer: {
    flex: 1,
  },
  visitDateTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  visitDoctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  visitReasonText: {
    fontSize: 13,
    color: argonTheme.colors.muted,
    marginBottom: 6,
  },
  testsCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testsCountText: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
  visitRight: {
    alignItems: 'center',
    gap: 8,
  },
  visitStatusBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedContent: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: argonTheme.colors.border,
    marginBottom: 16,
  },
  testSection: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 12,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  testStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  testTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '30',
  },
  parameterLeft: {
    flex: 1,
  },
  parameterName: {
    fontSize: 14,
    fontWeight: '500',
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  parameterRange: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  parameterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  parameterValue: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  parameterUnit: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  labInfo: {
    fontSize: 12,
    color: argonTheme.colors.muted,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
  },
  doctorNotesContainer: {
    backgroundColor: argonTheme.colors.warning + '10',
    borderLeftWidth: 3,
    borderLeftColor: argonTheme.colors.warning,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginTop: 12,
  },
  doctorNotesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  doctorNotesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.warning,
  },
  doctorNotesText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: argonTheme.borderRadius.md,
    backgroundColor: argonTheme.colors.background,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.muted,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.info + '10',
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
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
});
