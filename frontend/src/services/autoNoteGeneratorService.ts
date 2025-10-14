// Automatic Note Generator for Doctors
// AI-powered clinical documentation assistant

export interface ConsultationData {
  patientId: string;
  patientName: string;
  chiefComplaint: string;
  symptoms: string[];
  duration: string;
  vitalSigns: {
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    weight?: number;
    height?: number;
  };
  physicalExam?: string;
  medications?: string[];
  allergies?: string[];
  medicalHistory?: string[];
  familyHistory?: string[];
  socialHistory?: string;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  providerId: string;
  date: Date;
  type: 'SOAP' | 'Progress' | 'Discharge' | 'Initial' | 'Follow-up';
  sections: {
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
  };
  icd10Codes?: Array<{ code: string; description: string }>;
  cptCodes?: Array<{ code: string; description: string }>;
  prescriptions?: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  followUp?: {
    timeframe: string;
    instructions: string;
  };
  generatedAt: Date;
  modifiedAt?: Date;
  isFinalized: boolean;
}

export interface DifferentialDiagnosis {
  condition: string;
  probability: number;
  supportingFactors: string[];
  againstFactors: string[];
  recommendedTests: string[];
}

export interface TreatmentSuggestion {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  rationale: string;
  alternatives: string[];
  contraindications: string[];
  interactions: string[];
}

class AutoNoteGeneratorService {
  /**
   * Generate comprehensive SOAP note from consultation data
   */
  async generateSOAPNote(data: ConsultationData): Promise<ClinicalNote> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing

    const subjective = this.generateSubjective(data);
    const objective = this.generateObjective(data);
    const assessment = await this.generateAssessment(data);
    const plan = await this.generatePlan(data);

    return {
      id: `NOTE-${Date.now()}`,
      patientId: data.patientId,
      providerId: 'DR-001',
      date: new Date(),
      type: 'SOAP',
      sections: {
        subjective,
        objective,
        assessment,
        plan
      },
      icd10Codes: await this.suggestICD10Codes(data),
      cptCodes: await this.suggestCPTCodes(data),
      prescriptions: await this.generatePrescriptions(data),
      followUp: {
        timeframe: '2 weeks',
        instructions: 'Return if symptoms worsen or do not improve within 5-7 days.'
      },
      generatedAt: new Date(),
      isFinalized: false
    };
  }

  /**
   * Generate Subjective section
   */
  private generateSubjective(data: ConsultationData): string {
    let text = `Chief Complaint: ${data.chiefComplaint}\n\n`;
    
    text += `History of Present Illness: `;
    text += `Patient presents with ${data.chiefComplaint.toLowerCase()} of ${data.duration} duration. `;
    
    if (data.symptoms.length > 0) {
      text += `Associated symptoms include ${data.symptoms.join(', ').toLowerCase()}. `;
    }

    if (data.medicalHistory && data.medicalHistory.length > 0) {
      text += `\n\nPast Medical History: ${data.medicalHistory.join(', ')}.`;
    }

    if (data.medications && data.medications.length > 0) {
      text += `\n\nCurrent Medications: ${data.medications.join(', ')}.`;
    }

    if (data.allergies && data.allergies.length > 0) {
      text += `\n\nAllergies: ${data.allergies.join(', ')}.`;
    }

    if (data.familyHistory && data.familyHistory.length > 0) {
      text += `\n\nFamily History: ${data.familyHistory.join(', ')}.`;
    }

    if (data.socialHistory) {
      text += `\n\nSocial History: ${data.socialHistory}`;
    }

    return text;
  }

  /**
   * Generate Objective section
   */
  private generateObjective(data: ConsultationData): string {
    let text = 'Vital Signs:\n';
    
    const vitals = data.vitalSigns;
    if (vitals.temperature) text += `- Temperature: ${vitals.temperature}°F\n`;
    if (vitals.bloodPressure) text += `- Blood Pressure: ${vitals.bloodPressure} mmHg\n`;
    if (vitals.heartRate) text += `- Heart Rate: ${vitals.heartRate} bpm\n`;
    if (vitals.respiratoryRate) text += `- Respiratory Rate: ${vitals.respiratoryRate} breaths/min\n`;
    if (vitals.oxygenSaturation) text += `- Oxygen Saturation: ${vitals.oxygenSaturation}%\n`;
    if (vitals.weight) text += `- Weight: ${vitals.weight} lbs\n`;
    if (vitals.height) text += `- Height: ${vitals.height} inches\n`;

    if (data.physicalExam) {
      text += `\nPhysical Examination:\n${data.physicalExam}`;
    } else {
      text += '\nPhysical Examination: Patient appears in no acute distress. Alert and oriented x3.';
    }

    return text;
  }

  /**
   * Generate Assessment section using AI
   */
  private async generateAssessment(data: ConsultationData): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const differentials = await this.generateDifferentialDiagnosis(data);
    
    let text = 'Differential Diagnosis:\n\n';
    
    differentials.forEach((diff, index) => {
      text += `${index + 1}. ${diff.condition} (${diff.probability}% probability)\n`;
      text += `   Supporting: ${diff.supportingFactors.join(', ')}\n`;
      if (diff.againstFactors.length > 0) {
        text += `   Against: ${diff.againstFactors.join(', ')}\n`;
      }
      text += '\n';
    });

    text += `\nMost Likely Diagnosis: ${differentials[0].condition}\n`;
    text += `Rationale: Based on clinical presentation, symptom pattern, and physical examination findings.`;

    return text;
  }

  /**
   * Generate Plan section
   */
  private async generatePlan(data: ConsultationData): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const treatments = await this.generateTreatmentSuggestions(data);
    
    let text = 'Treatment Plan:\n\n';
    text += '1. Pharmacological Management:\n';
    
    treatments.forEach(treatment => {
      text += `   - ${treatment.medication} ${treatment.dosage} ${treatment.frequency} for ${treatment.duration}\n`;
      text += `     Rationale: ${treatment.rationale}\n`;
    });

    text += '\n2. Non-Pharmacological Interventions:\n';
    text += '   - Rest and adequate hydration\n';
    text += '   - Symptom monitoring\n';
    text += '   - Activity modification as needed\n';

    text += '\n3. Diagnostic Studies:\n';
    const tests = this.recommendDiagnosticTests(data);
    tests.forEach(test => {
      text += `   - ${test}\n`;
    });

    text += '\n4. Patient Education:\n';
    text += '   - Discussed diagnosis, treatment plan, and expected course\n';
    text += '   - Reviewed medication instructions and potential side effects\n';
    text += '   - Provided written instructions\n';

    text += '\n5. Follow-up:\n';
    text += '   - Return in 2 weeks or sooner if symptoms worsen\n';
    text += '   - Call office for any concerns or questions\n';

    return text;
  }

  /**
   * Generate differential diagnoses
   */
  async generateDifferentialDiagnosis(data: ConsultationData): Promise<DifferentialDiagnosis[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simulate AI-powered differential diagnosis
    const differentials: DifferentialDiagnosis[] = [];

    const symptoms = data.symptoms.map(s => s.toLowerCase());
    const chiefComplaint = data.chiefComplaint.toLowerCase();

    // Example logic (in production, use advanced ML models)
    if (chiefComplaint.includes('fever') || symptoms.includes('fever')) {
      if (symptoms.includes('cough')) {
        differentials.push({
          condition: 'Upper Respiratory Infection',
          probability: 75,
          supportingFactors: ['Fever present', 'Cough present', 'Common presentation'],
          againstFactors: [],
          recommendedTests: ['Rapid flu test', 'Chest X-ray if severe']
        });
        differentials.push({
          condition: 'Influenza',
          probability: 60,
          supportingFactors: ['Fever', 'Respiratory symptoms', 'Seasonal pattern'],
          againstFactors: ['No confirmed exposure'],
          recommendedTests: ['Rapid influenza diagnostic test']
        });
        differentials.push({
          condition: 'Pneumonia',
          probability: 35,
          supportingFactors: ['Fever', 'Cough'],
          againstFactors: ['No dyspnea reported', 'Vital signs stable'],
          recommendedTests: ['Chest X-ray', 'CBC', 'Blood cultures']
        });
      }
    }

    if (chiefComplaint.includes('headache')) {
      differentials.push({
        condition: 'Tension Headache',
        probability: 70,
        supportingFactors: ['Common presentation', 'Bilateral pain pattern'],
        againstFactors: [],
        recommendedTests: ['None if typical presentation']
      });
      differentials.push({
        condition: 'Migraine',
        probability: 50,
        supportingFactors: ['Severity', 'Associated symptoms'],
        againstFactors: ['No aura reported'],
        recommendedTests: ['Consider imaging if atypical']
      });
    }

    // Default if no specific conditions matched
    if (differentials.length === 0) {
      differentials.push({
        condition: 'Acute Illness',
        probability: 60,
        supportingFactors: ['Acute onset', 'Clinical presentation'],
        againstFactors: [],
        recommendedTests: ['Based on clinical judgment']
      });
    }

    return differentials.sort((a, b) => b.probability - a.probability);
  }

  /**
   * Generate treatment suggestions
   */
  async generateTreatmentSuggestions(data: ConsultationData): Promise<TreatmentSuggestion[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const suggestions: TreatmentSuggestion[] = [];

    // Example treatment logic
    if (data.chiefComplaint.toLowerCase().includes('pain') || 
        data.symptoms.some(s => s.toLowerCase().includes('pain'))) {
      suggestions.push({
        medication: 'Acetaminophen',
        dosage: '500mg',
        frequency: 'Every 6 hours as needed',
        duration: '5 days',
        rationale: 'For pain relief and fever reduction',
        alternatives: ['Ibuprofen 400mg', 'Naproxen 250mg'],
        contraindications: ['Liver disease', 'Alcohol use'],
        interactions: ['Warfarin - monitor INR']
      });
    }

    if (data.symptoms.some(s => s.toLowerCase().includes('fever'))) {
      suggestions.push({
        medication: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'Every 8 hours with food',
        duration: '3-5 days',
        rationale: 'Anti-inflammatory and antipyretic effects',
        alternatives: ['Acetaminophen', 'Naproxen'],
        contraindications: ['Active GI bleeding', 'Severe renal impairment'],
        interactions: ['Aspirin', 'ACE inhibitors', 'Anticoagulants']
      });
    }

    return suggestions;
  }

  /**
   * Suggest ICD-10 codes
   */
  async suggestICD10Codes(data: ConsultationData): Promise<Array<{ code: string; description: string }>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const codes = [];

    if (data.chiefComplaint.toLowerCase().includes('fever')) {
      codes.push({ code: 'R50.9', description: 'Fever, unspecified' });
    }
    if (data.symptoms.some(s => s.toLowerCase().includes('cough'))) {
      codes.push({ code: 'R05', description: 'Cough' });
    }
    if (data.chiefComplaint.toLowerCase().includes('headache')) {
      codes.push({ code: 'R51', description: 'Headache' });
    }
    if (data.symptoms.some(s => s.toLowerCase().includes('pain'))) {
      codes.push({ code: 'R52', description: 'Pain, unspecified' });
    }

    // Default if no specific codes
    if (codes.length === 0) {
      codes.push({ code: 'Z00.00', description: 'Encounter for general adult medical examination' });
    }

    return codes;
  }

  /**
   * Suggest CPT codes for billing
   */
  async suggestCPTCodes(data: ConsultationData): Promise<Array<{ code: string; description: string }>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    // Example CPT codes based on complexity
    return [
      { code: '99213', description: 'Office/outpatient visit, established patient, level 3' },
      { code: '99214', description: 'Office/outpatient visit, established patient, level 4' }
    ];
  }

  /**
   * Generate prescription details
   */
  async generatePrescriptions(data: ConsultationData): Promise<Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>> {
    const treatments = await this.generateTreatmentSuggestions(data);
    
    return treatments.map(t => ({
      medication: t.medication,
      dosage: t.dosage,
      frequency: t.frequency,
      duration: t.duration,
      instructions: `Take ${t.dosage} ${t.frequency}. ${t.rationale}.`
    }));
  }

  /**
   * Recommend diagnostic tests
   */
  private recommendDiagnosticTests(data: ConsultationData): string[] {
    const tests: string[] = [];

    if (data.symptoms.some(s => s.toLowerCase().includes('cough'))) {
      tests.push('Chest X-ray');
    }
    if (data.vitalSigns.temperature && data.vitalSigns.temperature > 101) {
      tests.push('Complete Blood Count (CBC)');
      tests.push('Blood cultures');
    }

    if (tests.length === 0) {
      tests.push('None indicated at this time');
    }

    return tests;
  }

  /**
   * Summarize consultation transcript
   */
  async summarizeTranscript(transcript: string): Promise<{
    chiefComplaint: string;
    symptoms: string[];
    duration: string;
    keyFindings: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate NLP extraction
    return {
      chiefComplaint: 'Fever and cough',
      symptoms: ['Fever', 'Cough', 'Fatigue'],
      duration: '3 days',
      keyFindings: [
        'Patient reports fever starting 3 days ago',
        'Productive cough with clear sputum',
        'No shortness of breath',
        'Vital signs stable'
      ]
    };
  }

  /**
   * Generate patient-friendly summary
   */
  async generatePatientSummary(note: ClinicalNote): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 400));

    let summary = 'Your Visit Summary\n\n';
    summary += `Date: ${note.date.toLocaleDateString()}\n\n`;
    summary += 'What You Told Us:\n';
    summary += `${note.sections.subjective?.substring(0, 200)}...\n\n`;
    summary += 'What We Found:\n';
    summary += 'Your vital signs were checked and physical examination was performed.\n\n';
    summary += 'Diagnosis:\n';
    if (note.icd10Codes) {
      summary += note.icd10Codes.map(c => `- ${c.description}`).join('\n');
    }
    summary += '\n\nTreatment Plan:\n';
    if (note.prescriptions) {
      note.prescriptions.forEach(rx => {
        summary += `- ${rx.medication}: ${rx.instructions}\n`;
      });
    }
    summary += '\n' + note.followUp?.instructions;

    return summary;
  }

  /**
   * Validate and check for completeness
   */
  validateNote(note: ClinicalNote): {
    isComplete: boolean;
    missingFields: string[];
    suggestions: string[];
  } {
    const missingFields: string[] = [];
    const suggestions: string[] = [];

    if (!note.sections.subjective || note.sections.subjective.length < 50) {
      missingFields.push('Subjective - needs more detail');
    }
    if (!note.sections.objective || note.sections.objective.length < 30) {
      missingFields.push('Objective - needs vital signs or exam findings');
    }
    if (!note.sections.assessment) {
      missingFields.push('Assessment - diagnosis required');
    }
    if (!note.sections.plan) {
      missingFields.push('Plan - treatment plan required');
    }
    if (!note.icd10Codes || note.icd10Codes.length === 0) {
      suggestions.push('Add ICD-10 codes for billing');
    }
    if (!note.cptCodes || note.cptCodes.length === 0) {
      suggestions.push('Add CPT codes for billing');
    }

    return {
      isComplete: missingFields.length === 0,
      missingFields,
      suggestions
    };
  }
}

export const autoNoteGeneratorService = new AutoNoteGeneratorService();

