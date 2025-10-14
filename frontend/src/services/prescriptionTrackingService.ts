// Prescription Tracking and Management Service
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: 'oral' | 'topical' | 'injection' | 'inhaler' | 'other';
  prescribedDate: Date;
  startDate: Date;
  endDate?: Date;
  duration: string;
  refillsRemaining: number;
  instructions: string;
  sideEffects?: string[];
  interactions?: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  medications: Medication[];
  diagnosis: string;
  prescribedDate: Date;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  notes?: string;
  followUpDate?: Date;
}

export interface MedicationReminder {
  id: string;
  medicationId: string;
  medicationName: string;
  time: string; // HH:MM format
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
  enabled: boolean;
  lastTaken?: Date;
  adherenceRate: number; // 0-100
}

export interface AdherenceRecord {
  medicationId: string;
  scheduledTime: Date;
  takenTime?: Date;
  taken: boolean;
  skipped: boolean;
  skipReason?: string;
}

export interface PrescriptionAnalytics {
  totalPrescriptions: number;
  activeMedications: number;
  overallAdherence: number;
  upcomingRefills: Array<{
    medicationName: string;
    daysRemaining: number;
    pharmacy?: string;
  }>;
  missedDoses: number;
  interactions: Array<{
    medication1: string;
    medication2: string;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
  }>;
  recommendations: string[];
}

class PrescriptionTrackingService {
  /**
   * Get all active prescriptions for a patient
   */
  async getActivePrescriptions(patientId: string): Promise<Prescription[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    return [
      {
        id: 'rx001',
        patientId,
        patientName: 'John Doe',
        doctorId: 'doc001',
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialty: 'Cardiologist',
        prescribedDate: new Date('2025-10-05'),
        status: 'active',
        diagnosis: 'Hypertension, High Cholesterol',
        medications: [
          {
            id: 'med001',
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            route: 'oral',
            prescribedDate: new Date('2025-10-05'),
            startDate: new Date('2025-10-06'),
            duration: '90 days',
            refillsRemaining: 2,
            instructions: 'Take in the morning with or without food',
            sideEffects: ['Dizziness', 'Dry cough', 'Headache'],
            interactions: ['NSAIDs', 'Potassium supplements']
          },
          {
            id: 'med002',
            name: 'Atorvastatin',
            dosage: '20mg',
            frequency: 'Once daily',
            route: 'oral',
            prescribedDate: new Date('2025-10-05'),
            startDate: new Date('2025-10-06'),
            duration: '90 days',
            refillsRemaining: 2,
            instructions: 'Take at bedtime',
            sideEffects: ['Muscle pain', 'Liver problems', 'Digestive issues'],
            interactions: ['Grapefruit juice', 'Some antibiotics']
          },
          {
            id: 'med003',
            name: 'Aspirin',
            dosage: '81mg',
            frequency: 'Once daily',
            route: 'oral',
            prescribedDate: new Date('2025-10-05'),
            startDate: new Date('2025-10-06'),
            duration: 'Ongoing',
            refillsRemaining: 5,
            instructions: 'Take with food to prevent stomach upset',
            sideEffects: ['Stomach upset', 'Easy bruising', 'Bleeding'],
            interactions: ['Blood thinners', 'NSAIDs']
          }
        ],
        followUpDate: new Date('2025-11-05'),
        notes: 'Monitor blood pressure weekly. Return for follow-up in 4 weeks.'
      },
      {
        id: 'rx002',
        patientId,
        patientName: 'John Doe',
        doctorId: 'doc002',
        doctorName: 'Dr. Emily Davis',
        doctorSpecialty: 'General Physician',
        prescribedDate: new Date('2025-09-28'),
        status: 'active',
        diagnosis: 'Vitamin D Deficiency, Common Cold',
        medications: [
          {
            id: 'med004',
            name: 'Vitamin D3',
            dosage: '2000 IU',
            frequency: 'Once daily',
            route: 'oral',
            prescribedDate: new Date('2025-09-28'),
            startDate: new Date('2025-09-29'),
            duration: '180 days',
            refillsRemaining: 1,
            instructions: 'Take with a meal containing fat for better absorption',
            sideEffects: ['Nausea (rare)', 'Constipation (rare)'],
          },
          {
            id: 'med005',
            name: 'Acetaminophen',
            dosage: '500mg',
            frequency: 'Every 6 hours as needed',
            route: 'oral',
            prescribedDate: new Date('2025-09-28'),
            startDate: new Date('2025-09-28'),
            endDate: new Date('2025-10-05'),
            duration: '7 days',
            refillsRemaining: 0,
            instructions: 'Do not exceed 4000mg in 24 hours. Take with food.',
            sideEffects: ['Liver damage (if overdose)', 'Allergic reactions (rare)'],
            interactions: ['Alcohol', 'Blood thinners']
          }
        ],
        notes: 'Short-term pain relief for cold symptoms. Vitamin D for long-term supplementation.'
      }
    ];
  }

  /**
   * Get medication reminders for a patient
   */
  async getMedicationReminders(patientId: string): Promise<MedicationReminder[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: 'rem001',
        medicationId: 'med001',
        medicationName: 'Lisinopril 10mg',
        time: '08:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        enabled: true,
        adherenceRate: 95
      },
      {
        id: 'rem002',
        medicationId: 'med002',
        medicationName: 'Atorvastatin 20mg',
        time: '21:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        enabled: true,
        adherenceRate: 92
      },
      {
        id: 'rem003',
        medicationId: 'med003',
        medicationName: 'Aspirin 81mg',
        time: '08:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        enabled: true,
        adherenceRate: 98
      },
      {
        id: 'rem004',
        medicationId: 'med004',
        medicationName: 'Vitamin D3 2000 IU',
        time: '12:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        enabled: true,
        adherenceRate: 88
      }
    ];
  }

  /**
   * Record medication intake
   */
  async recordMedicationTaken(
    medicationId: string,
    taken: boolean,
    skipReason?: string
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In production, this would save to backend
    console.log('Medication recorded:', {
      medicationId,
      taken,
      skipReason,
      timestamp: new Date()
    });
  }

  /**
   * Check for drug interactions
   */
  async checkDrugInteractions(medications: Medication[]): Promise<Array<{
    medication1: string;
    medication2: string;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
  }>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const interactions = [];
    
    // Check known interactions
    const medNames = medications.map(m => m.name.toLowerCase());
    
    if (medNames.includes('lisinopril') && medNames.includes('aspirin')) {
      interactions.push({
        medication1: 'Lisinopril',
        medication2: 'Aspirin',
        severity: 'mild' as const,
        description: 'Aspirin may reduce the effectiveness of Lisinopril. Monitor blood pressure regularly.'
      });
    }
    
    if (medNames.includes('atorvastatin') && medNames.includes('acetaminophen')) {
      interactions.push({
        medication1: 'Atorvastatin',
        medication2: 'Acetaminophen',
        severity: 'mild' as const,
        description: 'Both medications can affect the liver. Avoid excessive acetaminophen use.'
      });
    }
    
    return interactions;
  }

  /**
   * Get prescription analytics and insights
   */
  async getPrescriptionAnalytics(patientId: string): Promise<PrescriptionAnalytics> {
    const prescriptions = await this.getActivePrescriptions(patientId);
    const reminders = await this.getMedicationReminders(patientId);
    
    const activeMedications = prescriptions.flatMap(p => 
      p.medications.filter(m => !m.endDate || new Date(m.endDate) > new Date())
    );
    
    const interactions = await this.checkDrugInteractions(activeMedications);
    
    // Calculate overall adherence
    const totalAdherence = reminders.reduce((sum, r) => sum + r.adherenceRate, 0);
    const overallAdherence = reminders.length > 0 ? Math.round(totalAdherence / reminders.length) : 0;
    
    // Find upcoming refills (medications with < 14 days of supply)
    const upcomingRefills = activeMedications
      .filter(m => m.refillsRemaining > 0)
      .map(m => ({
        medicationName: `${m.name} ${m.dosage}`,
        daysRemaining: Math.floor(Math.random() * 14) + 1, // Mock calculation
        pharmacy: 'CVS Pharmacy - Main St'
      }))
      .filter(r => r.daysRemaining <= 14);
    
    // Generate recommendations
    const recommendations = [];
    
    if (overallAdherence < 80) {
      recommendations.push('Your medication adherence is below 80%. Consider setting up automatic refills and using medication reminders.');
    }
    
    if (upcomingRefills.length > 0) {
      recommendations.push(`You have ${upcomingRefills.length} medication(s) that need refilling soon. Contact your pharmacy to ensure continuity.`);
    }
    
    if (interactions.some(i => i.severity === 'moderate' || i.severity === 'severe')) {
      recommendations.push('You have potential drug interactions. Discuss with your healthcare provider at your next visit.');
    }
    
    if (activeMedications.some(m => m.sideEffects && m.sideEffects.length > 0)) {
      recommendations.push('Monitor for any side effects and report them to your healthcare provider if they persist.');
    }
    
    return {
      totalPrescriptions: prescriptions.length,
      activeMedications: activeMedications.length,
      overallAdherence,
      upcomingRefills,
      missedDoses: Math.floor((100 - overallAdherence) * 0.3), // Mock calculation
      interactions,
      recommendations
    };
  }

  /**
   * Request prescription refill
   */
  async requestRefill(medicationId: string, pharmacyId: string): Promise<{
    success: boolean;
    refillId?: string;
    estimatedReadyTime?: Date;
    message: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Simulate successful refill request
    return {
      success: true,
      refillId: `REFILL-${Date.now()}`,
      estimatedReadyTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      message: 'Refill request submitted successfully. Your pharmacy will notify you when ready.'
    };
  }

  /**
   * Update medication reminder settings
   */
  async updateReminder(
    reminderId: string,
    updates: Partial<MedicationReminder>
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Reminder updated:', { reminderId, updates });
  }

  /**
   * Get adherence history for a specific medication
   */
  async getAdherenceHistory(
    medicationId: string,
    days: number = 30
  ): Promise<AdherenceRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Generate mock adherence data
    const records: AdherenceRecord[] = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(8, 0, 0, 0);
      
      // 90% adherence rate
      const taken = Math.random() < 0.9;
      
      records.push({
        medicationId,
        scheduledTime: date,
        taken,
        skipped: !taken,
        takenTime: taken ? new Date(date.getTime() + Math.random() * 3600000) : undefined,
        skipReason: !taken ? 'Forgot' : undefined
      });
    }
    
    return records.reverse();
  }

  /**
   * AI-powered medication insights
   */
  async getAIPrescriptionInsights(patientId: string): Promise<{
    insights: string[];
    warnings: string[];
    optimizations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const analytics = await this.getPrescriptionAnalytics(patientId);
    const prescriptions = await this.getActivePrescriptions(patientId);
    
    const insights = [
      `You're taking ${analytics.activeMedications} active medications with an adherence rate of ${analytics.overallAdherence}%.`,
      'Your current medication regimen is well-balanced for managing hypertension and cholesterol.',
      'Most of your medications are scheduled at convenient times to minimize missed doses.'
    ];
    
    const warnings = [];
    
    if (analytics.interactions.length > 0) {
      warnings.push(`Detected ${analytics.interactions.length} potential drug interaction(s). Review with your doctor.`);
    }
    
    if (analytics.upcomingRefills.length > 0) {
      warnings.push(`${analytics.upcomingRefills.length} medication(s) need refilling within the next 2 weeks.`);
    }
    
    if (analytics.overallAdherence < 85) {
      warnings.push('Adherence below optimal level. Missing doses may reduce medication effectiveness.');
    }
    
    const optimizations = [
      'Consider combining your morning medications (Lisinopril and Aspirin) with a single reminder.',
      'Atorvastatin at bedtime aligns well with cholesterol synthesis patterns - keep this schedule.',
      'Enable push notifications for better medication adherence tracking.'
    ];
    
    return { insights, warnings, optimizations };
  }
}

export const prescriptionTrackingService = new PrescriptionTrackingService();

