// Enhanced Medical Records Service
export interface VitalSigns {
  id: string;
  date: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  weight: number;
  height?: number;
  oxygenSaturation?: number;
  respiratoryRate?: number;
  recordedBy: string;
  notes?: string;
  status: 'normal' | 'elevated' | 'high' | 'critical';
}

export interface LabResult {
  id: string;
  date: string;
  testName: string;
  category: 'blood' | 'urine' | 'imaging' | 'other';
  subcategory: string;
  results: LabValue[];
  status: 'normal' | 'abnormal' | 'critical';
  doctor: string;
  facility: string;
  notes?: string;
  followUpRequired?: boolean;
  priority: 'routine' | 'urgent' | 'stat';
  orderedBy: string;
  completedBy: string;
  visitId?: string;
  visitDate?: string;
  previousResultId?: string;
  isBaseline?: boolean;
  trendDirection?: 'improving' | 'stable' | 'declining';
  doctorResponse?: DoctorResponse;
}

export interface DoctorResponse {
  id: string;
  doctorId: string;
  doctorName: string;
  responseDate: string;
  responseType: 'review' | 'recommendation' | 'follow_up' | 'consultation';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'reviewed' | 'action_required' | 'resolved';
  attachments?: string[];
  recommendations?: string[];
  followUpDate?: string;
  medicationChanges?: string[];
  lifestyleAdvice?: string[];
}

export interface Visit {
  id: string;
  date: string;
  doctorId: string;
  doctorName: string;
  visitType: 'consultation' | 'follow_up' | 'emergency' | 'routine_checkup';
  reason: string;
  diagnosis?: string;
  labResults: LabResult[];
  prescriptions?: any[];
  notes: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  followUpRequired?: boolean;
  followUpDate?: string;
  doctorResponse?: DoctorResponse;
}

export interface LabValue {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'low' | 'high' | 'critical';
}

export interface Consultation {
  id: string;
  date: string;
  doctor: string;
  specialty: string;
  diagnosis: string;
  notes: string;
  prescriptions?: string[];
  followUpDate?: string;
  attachments?: string[];
}

export interface MedicalCondition {
  id: string;
  name: string;
  status: 'active' | 'resolved' | 'chronic';
  diagnosedDate: string;
  diagnosedBy: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  treatmentPlan?: string;
  lastReviewed?: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction: string;
  discoveredDate: string;
  status: 'active' | 'resolved';
}

export interface Immunization {
  id: string;
  vaccine: string;
  date: string;
  administeredBy: string;
  location: string;
  nextDue?: string;
  status: 'completed' | 'due' | 'overdue';
}

export interface Procedure {
  id: string;
  name: string;
  date: string;
  performedBy: string;
  facility: string;
  type: 'surgical' | 'diagnostic' | 'therapeutic';
  notes: string;
  recoveryTime?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  vitalSigns: VitalSigns[];
  labResults: LabResult[];
  consultations: Consultation[];
  conditions: MedicalCondition[];
  allergies: Allergy[];
  immunizations: Immunization[];
  procedures: Procedure[];
  visits: Visit[];
  lastUpdated: string;
}

export interface HealthTrend {
  metric: string;
  trend: 'improving' | 'stable' | 'declining';
  change: number;
  period: string;
  significance: 'low' | 'moderate' | 'high';
}

export interface LabGroup {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  results: LabResult[];
  dateRange: {
    start: string;
    end: string;
  };
  status: 'normal' | 'abnormal' | 'critical';
  trend?: 'improving' | 'stable' | 'declining';
}

export interface LabGroupingOptions {
  groupBy: 'category' | 'date' | 'doctor' | 'facility' | 'status' | 'priority' | 'subcategory' | 'visit';
  sortBy: 'date' | 'status' | 'testName' | 'priority';
  sortOrder: 'asc' | 'desc';
  dateRange?: {
    start: string;
    end: string;
  };
  filters?: {
    category?: string[];
    status?: string[];
    priority?: string[];
    doctor?: string[];
    showTrends?: boolean;
    showBaseline?: boolean;
  };
}

class MedicalRecordsService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Mock data - In production, this would come from an API
  private mockData: MedicalRecord = {
    id: '1',
    patientId: 'patient-1',
    vitalSigns: [
      {
        id: '1',
        date: '2025-10-05',
        bloodPressure: { systolic: 120, diastolic: 80 },
        heartRate: 72,
        temperature: 98.6,
        weight: 165,
        height: 70,
        oxygenSaturation: 98,
        respiratoryRate: 16,
        recordedBy: 'Dr. Sarah Johnson',
        status: 'normal'
      },
      {
        id: '2',
        date: '2025-09-28',
        bloodPressure: { systolic: 118, diastolic: 78 },
        heartRate: 70,
        temperature: 98.4,
        weight: 166,
        height: 70,
        oxygenSaturation: 99,
        respiratoryRate: 15,
        recordedBy: 'Dr. Sarah Johnson',
        status: 'normal'
      },
      {
        id: '3',
        date: '2025-09-15',
        bloodPressure: { systolic: 122, diastolic: 82 },
        heartRate: 74,
        temperature: 98.5,
        weight: 164,
        height: 70,
        oxygenSaturation: 97,
        respiratoryRate: 17,
        recordedBy: 'Dr. Emily Davis',
        status: 'normal'
      }
    ],
    labResults: [
      {
        id: '1',
        date: '2025-09-20',
        testName: 'Complete Blood Count',
        category: 'blood',
        subcategory: 'Hematology',
        results: [
          { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '12.0-16.0', status: 'normal' },
          { name: 'White Blood Cells', value: '7.2', unit: 'K/uL', referenceRange: '4.5-11.0', status: 'normal' },
          { name: 'Platelets', value: '285', unit: 'K/uL', referenceRange: '150-450', status: 'normal' }
        ],
        status: 'normal',
        doctor: 'Dr. Sarah Johnson',
        facility: 'Central Lab',
        priority: 'routine',
        orderedBy: 'Dr. Sarah Johnson',
        completedBy: 'Lab Tech - Mary Smith',
        visitId: 'visit-2025-09-20',
        visitDate: '2025-09-20',
        previousResultId: '1-prev',
        isBaseline: false,
        trendDirection: 'improving'
      },
      {
        id: '2',
        date: '2025-08-15',
        testName: 'Lipid Panel',
        category: 'blood',
        subcategory: 'Chemistry',
        results: [
          { name: 'Total Cholesterol', value: '205', unit: 'mg/dL', referenceRange: '<200', status: 'high' },
          { name: 'HDL Cholesterol', value: '45', unit: 'mg/dL', referenceRange: '>40', status: 'normal' },
          { name: 'LDL Cholesterol', value: '135', unit: 'mg/dL', referenceRange: '<100', status: 'high' },
          { name: 'Triglycerides', value: '125', unit: 'mg/dL', referenceRange: '<150', status: 'normal' }
        ],
        status: 'abnormal',
        doctor: 'Dr. Sarah Johnson',
        facility: 'Central Lab',
        priority: 'routine',
        orderedBy: 'Dr. Sarah Johnson',
        completedBy: 'Lab Tech - John Doe',
        followUpRequired: true,
        visitId: 'visit-2025-08-15',
        visitDate: '2025-08-15',
        previousResultId: '2-prev',
        isBaseline: false,
        trendDirection: 'stable'
      },
      {
        id: '3',
        date: '2025-07-10',
        testName: 'Blood Glucose',
        category: 'blood',
        subcategory: 'Chemistry',
        results: [
          { name: 'Fasting Glucose', value: '95', unit: 'mg/dL', referenceRange: '70-100', status: 'normal' },
          { name: 'HbA1c', value: '5.8', unit: '%', referenceRange: '<5.7', status: 'normal' }
        ],
        status: 'normal',
        doctor: 'Dr. Emily Davis',
        facility: 'Central Lab',
        priority: 'routine',
        orderedBy: 'Dr. Emily Davis',
        completedBy: 'Lab Tech - Sarah Wilson',
        visitId: 'visit-2025-07-10',
        visitDate: '2025-07-10',
        isBaseline: true,
        trendDirection: 'stable'
      },
      {
        id: '4',
        date: '2025-06-15',
        testName: 'Urinalysis',
        category: 'urine',
        subcategory: 'Urine Chemistry',
        results: [
          { name: 'Protein', value: 'Negative', unit: '', referenceRange: 'Negative', status: 'normal' },
          { name: 'Glucose', value: 'Negative', unit: '', referenceRange: 'Negative', status: 'normal' },
          { name: 'pH', value: '6.5', unit: '', referenceRange: '5.0-8.0', status: 'normal' }
        ],
        status: 'normal',
        doctor: 'Dr. Emily Davis',
        facility: 'Central Lab',
        priority: 'routine',
        orderedBy: 'Dr. Emily Davis',
        completedBy: 'Lab Tech - Mike Johnson',
        visitId: 'visit-2025-06-15',
        visitDate: '2025-06-15',
        isBaseline: false,
        trendDirection: 'improving'
      },
      {
        id: '5',
        date: '2025-05-20',
        testName: 'Chest X-Ray',
        category: 'imaging',
        subcategory: 'Radiology',
        results: [
          { name: 'Findings', value: 'Clear', unit: '', referenceRange: 'Normal', status: 'normal' },
          { name: 'Impression', value: 'No acute findings', unit: '', referenceRange: 'Normal', status: 'normal' }
        ],
        status: 'normal',
        doctor: 'Dr. Michael Chen',
        facility: 'Radiology Center',
        priority: 'routine',
        orderedBy: 'Dr. Michael Chen',
        completedBy: 'Dr. Radiology Specialist',
        visitId: 'visit-2025-05-20',
        visitDate: '2025-05-20',
        previousResultId: '5-prev',
        isBaseline: false,
        trendDirection: 'stable'
      },
      {
        id: '6',
        date: '2025-04-10',
        testName: 'Liver Function Tests',
        category: 'blood',
        subcategory: 'Chemistry',
        results: [
          { name: 'ALT', value: '35', unit: 'U/L', referenceRange: '7-56', status: 'normal' },
          { name: 'AST', value: '28', unit: 'U/L', referenceRange: '10-40', status: 'normal' },
          { name: 'Bilirubin', value: '0.8', unit: 'mg/dL', referenceRange: '0.1-1.2', status: 'normal' }
        ],
        status: 'normal',
        doctor: 'Dr. Sarah Johnson',
        facility: 'Central Lab',
        priority: 'routine',
        orderedBy: 'Dr. Sarah Johnson',
        completedBy: 'Lab Tech - Lisa Brown',
        visitId: 'visit-2025-04-10',
        visitDate: '2025-04-10',
        isBaseline: true,
        trendDirection: 'stable'
      }
    ],
    consultations: [
      {
        id: '1',
        date: '2025-10-05',
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        diagnosis: 'Hypertension management',
        notes: 'Blood pressure stable, continue current medication. Patient reports feeling well.',
        prescriptions: ['Lisinopril 10mg daily'],
        followUpDate: '2025-11-05'
      },
      {
        id: '2',
        date: '2025-09-28',
        doctor: 'Dr. Emily Davis',
        specialty: 'General Physician',
        diagnosis: 'Common Cold',
        notes: 'Viral upper respiratory infection. Rest and hydration recommended.',
        prescriptions: ['Acetaminophen as needed']
      },
      {
        id: '3',
        date: '2025-09-15',
        doctor: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        diagnosis: 'Annual skin check',
        notes: 'No suspicious lesions found. Continue regular skin monitoring.',
        followUpDate: '2026-09-15'
      }
    ],
    conditions: [
      {
        id: '1',
        name: 'Hypertension',
        status: 'active',
        diagnosedDate: '2023-05-15',
        diagnosedBy: 'Dr. Sarah Johnson',
        severity: 'moderate',
        description: 'High blood pressure managed with medication',
        treatmentPlan: 'Lisinopril 10mg daily, regular monitoring',
        lastReviewed: '2025-10-05'
      },
      {
        id: '2',
        name: 'Type 2 Diabetes',
        status: 'active',
        diagnosedDate: '2022-08-20',
        diagnosedBy: 'Dr. Emily Davis',
        severity: 'mild',
        description: 'Diabetes well controlled with diet and exercise',
        treatmentPlan: 'Diet modification, regular exercise, quarterly monitoring',
        lastReviewed: '2025-07-10'
      }
    ],
    allergies: [
      {
        id: '1',
        allergen: 'Penicillin',
        severity: 'severe',
        reaction: 'Severe rash and difficulty breathing',
        discoveredDate: '2020-03-15',
        status: 'active'
      },
      {
        id: '2',
        allergen: 'Peanuts',
        severity: 'moderate',
        reaction: 'Hives and stomach upset',
        discoveredDate: '2019-11-22',
        status: 'active'
      }
    ],
    immunizations: [
      {
        id: '1',
        vaccine: 'COVID-19 Booster',
        date: '2024-10-15',
        administeredBy: 'CVS Pharmacy',
        location: 'CVS Store #1234',
        nextDue: '2025-10-15',
        status: 'completed'
      },
      {
        id: '2',
        vaccine: 'Flu Vaccine',
        date: '2024-09-20',
        administeredBy: 'Dr. Emily Davis',
        location: 'Family Health Clinic',
        nextDue: '2025-09-20',
        status: 'completed'
      },
      {
        id: '3',
        vaccine: 'Tetanus',
        date: '2023-06-10',
        administeredBy: 'Urgent Care Center',
        location: 'Urgent Care #567',
        nextDue: '2028-06-10',
        status: 'completed'
      }
    ],
    procedures: [
      {
        id: '1',
        name: 'Echocardiogram',
        date: '2024-12-15',
        performedBy: 'Dr. Sarah Johnson',
        facility: 'Cardiology Center',
        type: 'diagnostic',
        notes: 'Normal heart function, no abnormalities detected'
      },
      {
        id: '2',
        name: 'Annual Physical Exam',
        date: '2024-08-20',
        performedBy: 'Dr. Emily Davis',
        facility: 'Family Health Clinic',
        type: 'diagnostic',
        notes: 'Comprehensive health assessment, all systems normal'
      }
    ],
    visits: [
      {
        id: 'visit-2025-09-20',
        date: '2025-09-20',
        doctorId: 'doc-1',
        doctorName: 'Dr. Sarah Johnson',
        visitType: 'consultation',
        reason: 'Routine checkup and lab review',
        diagnosis: 'Healthy - No acute issues',
        labResults: [],
        notes: 'Patient is in good health. Lab results show normal values. Continue current lifestyle.',
        status: 'completed',
        followUpRequired: false,
        doctorResponse: {
          id: 'response-1',
          doctorId: 'doc-1',
          doctorName: 'Dr. Sarah Johnson',
          responseDate: '2025-09-21',
          responseType: 'review',
          title: 'Lab Results Review - September 2025',
          content: 'I have reviewed your recent lab results from September 20th. All values are within normal ranges. Your Complete Blood Count shows excellent values with hemoglobin at 14.2 g/dL, which is perfect. Continue with your current diet and exercise routine.',
          priority: 'low',
          status: 'reviewed',
          recommendations: [
            'Continue current exercise routine',
            'Maintain balanced diet',
            'Schedule next routine checkup in 6 months'
          ],
          lifestyleAdvice: [
            'Continue regular exercise',
            'Maintain current diet',
            'Stay hydrated'
          ]
        }
      },
      {
        id: 'visit-2025-08-15',
        date: '2025-08-15',
        doctorId: 'doc-1',
        doctorName: 'Dr. Sarah Johnson',
        visitType: 'consultation',
        reason: 'Lipid panel review and cholesterol management',
        diagnosis: 'Hyperlipidemia - Mild elevation',
        labResults: [],
        notes: 'Patient has mild elevation in cholesterol levels. Discussed dietary modifications and exercise.',
        status: 'completed',
        followUpRequired: true,
        followUpDate: '2025-11-15',
        doctorResponse: {
          id: 'response-2',
          doctorId: 'doc-1',
          doctorName: 'Dr. Sarah Johnson',
          responseDate: '2025-08-16',
          responseType: 'recommendation',
          title: 'Cholesterol Management Plan',
          content: 'Your lipid panel shows elevated cholesterol levels (Total: 205 mg/dL, LDL: 135 mg/dL). While not critical, we should address this to prevent future cardiovascular issues. I recommend dietary modifications and increased physical activity.',
          priority: 'medium',
          status: 'action_required',
          recommendations: [
            'Reduce saturated fat intake',
            'Increase fiber consumption',
            'Exercise at least 30 minutes daily',
            'Follow up in 3 months for repeat lipid panel'
          ],
          lifestyleAdvice: [
            'Limit red meat and processed foods',
            'Include more fruits and vegetables',
            'Consider Mediterranean diet',
            'Regular cardiovascular exercise'
          ],
          followUpDate: '2025-11-15'
        }
      },
      {
        id: 'visit-2025-07-10',
        date: '2025-07-10',
        doctorId: 'doc-2',
        doctorName: 'Dr. Emily Davis',
        visitType: 'routine_checkup',
        reason: 'Annual physical examination',
        diagnosis: 'Healthy - No concerns',
        labResults: [],
        notes: 'Annual physical examination completed. Patient reports feeling well. Blood glucose levels are normal.',
        status: 'completed',
        followUpRequired: false,
        doctorResponse: {
          id: 'response-3',
          doctorId: 'doc-2',
          doctorName: 'Dr. Emily Davis',
          responseDate: '2025-07-11',
          responseType: 'review',
          title: 'Annual Physical Examination Results',
          content: 'Your annual physical examination is complete and shows excellent results. Your blood glucose levels are normal (95 mg/dL fasting, HbA1c 5.8%), which is great news for diabetes prevention. Continue your healthy lifestyle.',
          priority: 'low',
          status: 'reviewed',
          recommendations: [
            'Continue current lifestyle',
            'Annual physical examination next year',
            'Monitor blood pressure regularly'
          ],
          lifestyleAdvice: [
            'Maintain current exercise routine',
            'Continue balanced diet',
            'Regular blood pressure monitoring'
          ]
        }
      }
    ],
    lastUpdated: '2025-10-05'
  };

  async getMedicalRecord(patientId: string): Promise<MedicalRecord> {
    await this.delay(500);
    return this.mockData;
  }

  async getVitalSigns(patientId: string): Promise<VitalSigns[]> {
    await this.delay(300);
    return this.mockData.vitalSigns;
  }

  async getLabResults(patientId: string): Promise<LabResult[]> {
    await this.delay(300);
    return this.mockData.labResults;
  }

  async getConsultations(patientId: string): Promise<Consultation[]> {
    await this.delay(300);
    return this.mockData.consultations;
  }

  async getConditions(patientId: string): Promise<MedicalCondition[]> {
    await this.delay(300);
    return this.mockData.conditions;
  }

  async getAllergies(patientId: string): Promise<Allergy[]> {
    await this.delay(300);
    return this.mockData.allergies;
  }

  async getImmunizations(patientId: string): Promise<Immunization[]> {
    await this.delay(300);
    return this.mockData.immunizations;
  }

  async getProcedures(patientId: string): Promise<Procedure[]> {
    await this.delay(300);
    return this.mockData.procedures;
  }

  async getHealthTrends(patientId: string, metric: string, period: string = '6months'): Promise<HealthTrend[]> {
    await this.delay(400);
    
    // Mock trend data
    const trends: HealthTrend[] = [
      {
        metric: 'Blood Pressure',
        trend: 'stable',
        change: -2,
        period: '6months',
        significance: 'low'
      },
      {
        metric: 'Weight',
        trend: 'stable',
        change: 1,
        period: '6months',
        significance: 'low'
      },
      {
        metric: 'Cholesterol',
        trend: 'improving',
        change: -15,
        period: '6months',
        significance: 'moderate'
      }
    ];

    return trends;
  }

  async exportMedicalRecords(patientId: string, format: 'pdf' | 'csv' | 'json'): Promise<Blob> {
    await this.delay(1000);
    
    // Mock export functionality
    const data = JSON.stringify(this.mockData, null, 2);
    return new Blob([data], { type: 'application/json' });
  }

  async addVitalSigns(patientId: string, vitalSigns: Omit<VitalSigns, 'id'>): Promise<VitalSigns> {
    await this.delay(500);
    
    const newVitalSigns: VitalSigns = {
      id: Date.now().toString(),
      ...vitalSigns
    };
    
    this.mockData.vitalSigns.unshift(newVitalSigns);
    return newVitalSigns;
  }

  async updateCondition(patientId: string, conditionId: string, updates: Partial<MedicalCondition>): Promise<MedicalCondition> {
    await this.delay(500);
    
    const conditionIndex = this.mockData.conditions.findIndex(c => c.id === conditionId);
    if (conditionIndex !== -1) {
      this.mockData.conditions[conditionIndex] = { ...this.mockData.conditions[conditionIndex], ...updates };
      return this.mockData.conditions[conditionIndex];
    }
    
    throw new Error('Condition not found');
  }

  async addAllergy(patientId: string, allergy: Omit<Allergy, 'id'>): Promise<Allergy> {
    await this.delay(500);
    
    const newAllergy: Allergy = {
      id: Date.now().toString(),
      ...allergy
    };
    
    this.mockData.allergies.push(newAllergy);
    return newAllergy;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'abnormal': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'due': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  getBMI(weight: number, height: number): number {
    const heightInMeters = height * 0.0254; // Convert inches to meters
    return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }

  getBMICategory(bmi: number): { category: string; color: string } {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  }

  // Lab Results Grouping Methods
  async getGroupedLabResults(patientId: string, options: LabGroupingOptions): Promise<LabGroup[]> {
    await this.delay(300);
    
    const record = this.mockData;
    let results = [...record.labResults];

    // Apply filters
    if (options.filters) {
      if (options.filters.category) {
        results = results.filter(r => options.filters!.category!.includes(r.category));
      }
      if (options.filters.status) {
        results = results.filter(r => options.filters!.status!.includes(r.status));
      }
      if (options.filters.priority) {
        results = results.filter(r => options.filters!.priority!.includes(r.priority));
      }
      if (options.filters.doctor) {
        results = results.filter(r => options.filters!.doctor!.includes(r.doctor));
      }
    }

    // Apply date range filter
    if (options.dateRange) {
      results = results.filter(r => {
        const resultDate = new Date(r.date);
        const startDate = new Date(options.dateRange!.start);
        const endDate = new Date(options.dateRange!.end);
        return resultDate >= startDate && resultDate <= endDate;
      });
    }

    // Group results
    const groups = this.groupLabResults(results, options.groupBy);
    
    // Sort groups
    groups.forEach(group => {
      group.results = this.sortLabResults(group.results, options.sortBy, options.sortOrder);
    });

    return groups.sort((a, b) => {
      if (options.sortBy === 'date') {
        const aDate = new Date(a.dateRange.start);
        const bDate = new Date(b.dateRange.start);
        return options.sortOrder === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
      }
      return a.name.localeCompare(b.name);
    });
  }

  private groupLabResults(results: LabResult[], groupBy: string): LabGroup[] {
    const groups: { [key: string]: LabResult[] } = {};

    results.forEach(result => {
      let groupKey: string;
      
      switch (groupBy) {
        case 'category':
          groupKey = result.category;
          break;
        case 'subcategory':
          groupKey = result.subcategory;
          break;
        case 'date':
          groupKey = this.getDateGroupKey(result.date);
          break;
        case 'doctor':
          groupKey = result.doctor;
          break;
        case 'facility':
          groupKey = result.facility;
          break;
        case 'status':
          groupKey = result.status;
          break;
        case 'priority':
          groupKey = result.priority;
          break;
        case 'visit':
          groupKey = result.visitId || `Visit ${result.date}`;
          break;
        default:
          groupKey = result.category;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(result);
    });

    return Object.entries(groups).map(([key, groupResults]) => {
      const dates = groupResults.map(r => new Date(r.date));
      const statuses = groupResults.map(r => r.status);
      
      return {
        id: key.toLowerCase().replace(/\s+/g, '-'),
        name: key,
        category: groupResults[0].category,
        subcategory: groupBy === 'subcategory' ? key : groupResults[0].subcategory,
        results: groupResults,
        dateRange: {
          start: new Date(Math.min(...dates.map(d => d.getTime()))).toISOString(),
          end: new Date(Math.max(...dates.map(d => d.getTime()))).toISOString()
        },
        status: this.getGroupStatus(statuses),
        trend: this.calculateGroupTrend(groupResults)
      };
    });
  }

  private getDateGroupKey(date: string): string {
    const dateObj = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) return 'Last Week';
    if (diffDays <= 30) return 'Last Month';
    if (diffDays <= 90) return 'Last 3 Months';
    if (diffDays <= 180) return 'Last 6 Months';
    if (diffDays <= 365) return 'Last Year';
    return 'Older';
  }

  private getGroupStatus(statuses: string[]): 'normal' | 'abnormal' | 'critical' {
    if (statuses.includes('critical')) return 'critical';
    if (statuses.includes('abnormal')) return 'abnormal';
    return 'normal';
  }

  private calculateGroupTrend(results: LabResult[]): 'improving' | 'stable' | 'declining' | undefined {
    if (results.length < 2) return undefined;
    
    // Simple trend calculation based on status progression
    const sortedResults = results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstStatus = sortedResults[0].status;
    const lastStatus = sortedResults[sortedResults.length - 1].status;

    if (firstStatus === 'critical' && lastStatus === 'normal') return 'improving';
    if (firstStatus === 'normal' && lastStatus === 'critical') return 'declining';
    return 'stable';
  }

  private sortLabResults(results: LabResult[], sortBy: string, sortOrder: 'asc' | 'desc'): LabResult[] {
    return results.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'status':
          const statusOrder = { 'critical': 3, 'abnormal': 2, 'normal': 1 };
          comparison = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
          break;
        case 'testName':
          comparison = a.testName.localeCompare(b.testName);
          break;
        case 'priority':
          const priorityOrder = { 'stat': 3, 'urgent': 2, 'routine': 1 };
          comparison = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  async getLabResultCategories(patientId: string): Promise<string[]> {
    await this.delay(100);
    const record = this.mockData;
    return [...new Set(record.labResults.map(r => r.category))];
  }

  async getLabResultSubcategories(patientId: string, category?: string): Promise<string[]> {
    await this.delay(100);
    const record = this.mockData;
    let results = record.labResults;
    
    if (category) {
      results = results.filter(r => r.category === category);
    }
    
    return [...new Set(results.map(r => r.subcategory))];
  }

  async getLabResultDoctors(patientId: string): Promise<string[]> {
    await this.delay(100);
    const record = this.mockData;
    return [...new Set(record.labResults.map(r => r.doctor))];
  }

  async getLabResultFacilities(patientId: string): Promise<string[]> {
    await this.delay(100);
    const record = this.mockData;
    return [...new Set(record.labResults.map(r => r.facility))];
  }

  // Previous Results and Trend Analysis
  async getPreviousResults(patientId: string, testName: string, currentDate: string): Promise<LabResult[]> {
    await this.delay(200);
    const record = this.mockData;
    
    return record.labResults
      .filter(result => 
        result.testName === testName && 
        new Date(result.date) < new Date(currentDate)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getBaselineResults(patientId: string): Promise<LabResult[]> {
    await this.delay(200);
    const record = this.mockData;
    
    return record.labResults
      .filter(result => result.isBaseline)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getTrendAnalysis(patientId: string, testName: string): Promise<{
    testName: string;
    currentResult?: LabResult;
    previousResults: LabResult[];
    trend: 'improving' | 'stable' | 'declining' | 'no_data';
    trendDetails: {
      direction: string;
      significance: 'low' | 'moderate' | 'high';
      recommendation?: string;
    };
  }> {
    await this.delay(300);
    const record = this.mockData;
    
    const allResults = record.labResults
      .filter(result => result.testName === testName)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (allResults.length === 0) {
      return {
        testName,
        previousResults: [],
        trend: 'no_data',
        trendDetails: {
          direction: 'No data available',
          significance: 'low'
        }
      };
    }

    const currentResult = allResults[allResults.length - 1];
    const previousResults = allResults.slice(0, -1);

    // Calculate trend based on status progression
    let trend: 'improving' | 'stable' | 'declining' | 'no_data' = 'stable';
    let significance: 'low' | 'moderate' | 'high' = 'low';
    let recommendation = '';

    if (previousResults.length > 0) {
      const previousResult = previousResults[previousResults.length - 1];
      
      if (previousResult.status === 'critical' && currentResult.status === 'normal') {
        trend = 'improving';
        significance = 'high';
        recommendation = 'Excellent improvement! Continue current treatment.';
      } else if (previousResult.status === 'abnormal' && currentResult.status === 'normal') {
        trend = 'improving';
        significance = 'moderate';
        recommendation = 'Good improvement. Monitor for continued progress.';
      } else if (previousResult.status === 'normal' && currentResult.status === 'critical') {
        trend = 'declining';
        significance = 'high';
        recommendation = 'Immediate attention required. Contact your doctor.';
      } else if (previousResult.status === 'normal' && currentResult.status === 'abnormal') {
        trend = 'declining';
        significance = 'moderate';
        recommendation = 'Monitor closely. Consider follow-up testing.';
      } else {
        trend = 'stable';
        significance = 'low';
        recommendation = 'Continue current monitoring schedule.';
      }
    }

    return {
      testName,
      currentResult,
      previousResults,
      trend,
      trendDetails: {
        direction: trend === 'improving' ? 'Improving' : trend === 'declining' ? 'Declining' : 'Stable',
        significance,
        recommendation
      }
    };
  }

  async getVisitSummary(patientId: string, visitId: string): Promise<{
    visitId: string;
    visitDate: string;
    tests: LabResult[];
    summary: {
      totalTests: number;
      normalResults: number;
      abnormalResults: number;
      criticalResults: number;
      followUpRequired: number;
    };
    trends: {
      improving: number;
      stable: number;
      declining: number;
    };
  }> {
    await this.delay(300);
    const record = this.mockData;
    
    const visitTests = record.labResults.filter(result => result.visitId === visitId);
    
    const summary = {
      totalTests: visitTests.length,
      normalResults: visitTests.filter(r => r.status === 'normal').length,
      abnormalResults: visitTests.filter(r => r.status === 'abnormal').length,
      criticalResults: visitTests.filter(r => r.status === 'critical').length,
      followUpRequired: visitTests.filter(r => r.followUpRequired).length
    };

    const trends = {
      improving: visitTests.filter(r => r.trendDirection === 'improving').length,
      stable: visitTests.filter(r => r.trendDirection === 'stable').length,
      declining: visitTests.filter(r => r.trendDirection === 'declining').length
    };

    return {
      visitId,
      visitDate: visitTests[0]?.visitDate || '',
      tests: visitTests,
      summary,
      trends
    };
  }

  // Visit and Doctor Response Methods
  async getVisits(patientId: string): Promise<Visit[]> {
    await this.delay(300);
    const record = this.mockData;
    return record.visits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getVisitById(patientId: string, visitId: string): Promise<Visit | null> {
    await this.delay(200);
    const record = this.mockData;
    const visit = record.visits.find(v => v.id === visitId);
    if (visit) {
      // Populate lab results for this visit
      visit.labResults = record.labResults.filter(lab => lab.visitId === visitId);
    }
    return visit || null;
  }

  async getDoctorResponses(patientId: string): Promise<DoctorResponse[]> {
    await this.delay(300);
    const record = this.mockData;
    const responses: DoctorResponse[] = [];
    
    record.visits.forEach(visit => {
      if (visit.doctorResponse) {
        responses.push(visit.doctorResponse);
      }
    });
    
    record.labResults.forEach(lab => {
      if (lab.doctorResponse) {
        responses.push(lab.doctorResponse);
      }
    });
    
    return responses.sort((a, b) => new Date(b.responseDate).getTime() - new Date(a.responseDate).getTime());
  }

  async getDoctorResponseById(patientId: string, responseId: string): Promise<DoctorResponse | null> {
    await this.delay(200);
    const responses = await this.getDoctorResponses(patientId);
    return responses.find(r => r.id === responseId) || null;
  }

  async getVisitsByDoctor(patientId: string, doctorId: string): Promise<Visit[]> {
    await this.delay(300);
    const record = this.mockData;
    return record.visits.filter(v => v.doctorId === doctorId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getUpcomingFollowUps(patientId: string): Promise<Visit[]> {
    await this.delay(300);
    const record = this.mockData;
    const now = new Date();
    
    return record.visits.filter(visit => 
      visit.followUpRequired && 
      visit.followUpDate && 
      new Date(visit.followUpDate) > now
    ).sort((a, b) => new Date(a.followUpDate!).getTime() - new Date(b.followUpDate!).getTime());
  }
}

export const medicalRecordsService = new MedicalRecordsService();
