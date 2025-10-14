// AI-Powered Symptom Triage Service
export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description?: string;
}

export interface SymptomAnalysis {
  triageLevel: 'emergency' | 'urgent' | 'routine' | 'self-care';
  possibleConditions: Array<{
    name: string;
    probability: number;
    description: string;
    recommendations: string[];
  }>;
  recommendedAction: string;
  recommendedSpecialty?: string;
  urgencyScore: number; // 0-100
  aiConfidence: number; // 0-100
  warningFlags: string[];
  suggestedTests?: string[];
  timestamp: Date;
}

export interface PatientContext {
  age: number;
  gender: string;
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  vitalSigns?: {
    temperature?: number;
    heartRate?: number;
    bloodPressure?: string;
    oxygenSaturation?: number;
  };
}

class AISymptomService {
  // Simulated AI model - In production, this would call a real AI API
  private symptomDatabase = {
    fever: { severity: 5, emergencyKeywords: ['high', 'persistent', 'with confusion'] },
    cough: { severity: 3, emergencyKeywords: ['blood', 'severe breathing difficulty'] },
    'chest pain': { severity: 9, emergencyKeywords: ['crushing', 'radiating', 'sudden'] },
    headache: { severity: 4, emergencyKeywords: ['worst ever', 'with vision changes', 'sudden severe'] },
    'difficulty breathing': { severity: 8, emergencyKeywords: ['severe', 'sudden', 'with chest pain'] },
    nausea: { severity: 2, emergencyKeywords: ['with severe abdominal pain', 'with blood'] },
    fatigue: { severity: 2, emergencyKeywords: ['with chest pain', 'sudden severe'] },
    'sore throat': { severity: 2, emergencyKeywords: ['difficulty swallowing', 'with rash'] },
    rash: { severity: 3, emergencyKeywords: ['spreading rapidly', 'with fever and confusion'] },
    dizziness: { severity: 4, emergencyKeywords: ['with fainting', 'with chest pain'] },
    'abdominal pain': { severity: 5, emergencyKeywords: ['severe', 'with vomiting blood'] },
    'back pain': { severity: 3, emergencyKeywords: ['with leg weakness', 'with loss of bowel control'] },
  };

  /**
   * Analyzes symptoms using AI algorithms to provide triage recommendations
   */
  async analyzeSymptoms(
    symptoms: Symptom[],
    patientContext: PatientContext
  ): Promise<SymptomAnalysis> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate urgency based on symptoms
    const urgencyScore = this.calculateUrgencyScore(symptoms, patientContext);
    const triageLevel = this.determineTriageLevel(urgencyScore, symptoms);
    const warningFlags = this.identifyWarningFlags(symptoms, patientContext);
    
    // Generate possible conditions
    const possibleConditions = this.generatePossibleConditions(symptoms, patientContext);
    
    // Determine recommended action
    const recommendedAction = this.getRecommendedAction(triageLevel, symptoms);
    const recommendedSpecialty = this.getRecommendedSpecialty(symptoms, possibleConditions);
    
    // Suggest diagnostic tests
    const suggestedTests = this.suggestDiagnosticTests(symptoms, possibleConditions);
    
    // Calculate AI confidence
    const aiConfidence = this.calculateConfidence(symptoms, patientContext);

    return {
      triageLevel,
      possibleConditions,
      recommendedAction,
      recommendedSpecialty,
      urgencyScore,
      aiConfidence,
      warningFlags,
      suggestedTests,
      timestamp: new Date(),
    };
  }

  private calculateUrgencyScore(symptoms: Symptom[], context: PatientContext): number {
    let score = 0;
    
    symptoms.forEach(symptom => {
      const symptomName = symptom.name.toLowerCase();
      const dbSymptom = this.symptomDatabase[symptomName as keyof typeof this.symptomDatabase];
      
      if (dbSymptom) {
        score += dbSymptom.severity * 5;
        
        // Check for emergency keywords in description
        if (symptom.description) {
          dbSymptom.emergencyKeywords.forEach(keyword => {
            if (symptom.description!.toLowerCase().includes(keyword)) {
              score += 20;
            }
          });
        }
        
        // Severity multiplier
        if (symptom.severity === 'severe') score += 15;
        else if (symptom.severity === 'moderate') score += 7;
      }
    });
    
    // Age factor
    if (context.age > 65 || context.age < 5) {
      score += 10;
    }
    
    // Vital signs
    if (context.vitalSigns) {
      if (context.vitalSigns.temperature && context.vitalSigns.temperature > 103) score += 15;
      if (context.vitalSigns.heartRate && context.vitalSigns.heartRate > 120) score += 10;
      if (context.vitalSigns.oxygenSaturation && context.vitalSigns.oxygenSaturation < 92) score += 20;
    }
    
    return Math.min(score, 100);
  }

  private determineTriageLevel(
    urgencyScore: number,
    symptoms: Symptom[]
  ): 'emergency' | 'urgent' | 'routine' | 'self-care' {
    // Check for specific emergency symptoms
    const emergencySymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding'];
    const hasEmergencySymptom = symptoms.some(s => 
      emergencySymptoms.some(es => s.name.toLowerCase().includes(es))
    );
    
    if (hasEmergencySymptom || urgencyScore >= 75) return 'emergency';
    if (urgencyScore >= 50) return 'urgent';
    if (urgencyScore >= 25) return 'routine';
    return 'self-care';
  }

  private identifyWarningFlags(symptoms: Symptom[], context: PatientContext): string[] {
    const flags: string[] = [];
    
    // Check for red flag combinations
    const symptomNames = symptoms.map(s => s.name.toLowerCase());
    
    if (symptomNames.includes('chest pain') && symptomNames.includes('difficulty breathing')) {
      flags.push('Cardiac emergency possible - Seek immediate medical attention');
    }
    
    if (symptomNames.includes('headache') && symptomNames.includes('fever') && symptomNames.includes('rash')) {
      flags.push('Possible meningitis - Seek emergency care immediately');
    }
    
    if (context.age > 65 && symptoms.some(s => s.severity === 'severe')) {
      flags.push('Higher risk due to age - Close monitoring recommended');
    }
    
    if (context.vitalSigns?.temperature && context.vitalSigns.temperature > 103) {
      flags.push('High fever detected - Medical evaluation needed');
    }
    
    return flags;
  }

  private generatePossibleConditions(
    symptoms: Symptom[],
    context: PatientContext
  ): Array<{ name: string; probability: number; description: string; recommendations: string[] }> {
    const conditions = [];
    const symptomNames = symptoms.map(s => s.name.toLowerCase());
    
    // Simple rule-based matching (in production, this would use ML models)
    if (symptomNames.includes('fever') && symptomNames.includes('cough')) {
      conditions.push({
        name: 'Upper Respiratory Infection',
        probability: 75,
        description: 'Common viral or bacterial infection affecting the respiratory system',
        recommendations: [
          'Rest and hydration',
          'Over-the-counter fever reducers',
          'Monitor symptoms for worsening',
          'Consult doctor if symptoms persist beyond 7 days'
        ]
      });
      conditions.push({
        name: 'Influenza',
        probability: 60,
        description: 'Viral infection causing fever, body aches, and respiratory symptoms',
        recommendations: [
          'Antiviral medications if within 48 hours of symptom onset',
          'Rest and fluids',
          'Isolate from others',
          'Monitor for complications'
        ]
      });
    }
    
    if (symptomNames.includes('chest pain')) {
      conditions.push({
        name: 'Cardiac Event (Requires Emergency Evaluation)',
        probability: 85,
        description: 'Possible heart-related condition requiring immediate assessment',
        recommendations: [
          'Call 911 immediately',
          'Do not drive yourself to hospital',
          'Take aspirin if available and not allergic',
          'Stay calm and rest'
        ]
      });
    }
    
    if (symptomNames.includes('headache') && symptomNames.includes('fatigue')) {
      conditions.push({
        name: 'Tension Headache',
        probability: 70,
        description: 'Common headache often caused by stress or muscle tension',
        recommendations: [
          'Over-the-counter pain relievers',
          'Rest in quiet, dark room',
          'Stress management techniques',
          'Ensure adequate sleep and hydration'
        ]
      });
      conditions.push({
        name: 'Migraine',
        probability: 45,
        description: 'Neurological condition causing severe headaches',
        recommendations: [
          'Prescription migraine medications',
          'Avoid triggers',
          'Rest in dark, quiet environment',
          'Consult neurologist for management plan'
        ]
      });
    }
    
    if (symptomNames.includes('sore throat') && symptomNames.includes('fever')) {
      conditions.push({
        name: 'Strep Throat',
        probability: 65,
        description: 'Bacterial infection requiring antibiotic treatment',
        recommendations: [
          'Throat swab test needed',
          'Antibiotics if positive',
          'Pain relief with lozenges',
          'Complete full course of antibiotics'
        ]
      });
    }
    
    if (symptomNames.includes('abdominal pain') && symptomNames.includes('nausea')) {
      conditions.push({
        name: 'Gastroenteritis',
        probability: 70,
        description: 'Inflammation of stomach and intestines',
        recommendations: [
          'Stay hydrated with clear fluids',
          'BRAT diet (Bananas, Rice, Applesauce, Toast)',
          'Rest',
          'Seek care if unable to keep fluids down'
        ]
      });
    }
    
    // If no specific patterns matched, add general condition
    if (conditions.length === 0) {
      conditions.push({
        name: 'General Illness',
        probability: 50,
        description: 'Symptoms suggest a general illness requiring evaluation',
        recommendations: [
          'Monitor symptoms closely',
          'Stay hydrated',
          'Rest adequately',
          'Consult healthcare provider for proper diagnosis'
        ]
      });
    }
    
    return conditions.sort((a, b) => b.probability - a.probability);
  }

  private getRecommendedAction(triageLevel: string, symptoms: Symptom[]): string {
    switch (triageLevel) {
      case 'emergency':
        return '🚨 Seek Emergency Care Immediately - Call 911 or go to the nearest emergency room. These symptoms may indicate a serious condition requiring immediate medical attention.';
      case 'urgent':
        return '⚠️ Schedule Urgent Care Visit - Contact your healthcare provider or visit an urgent care facility within 24 hours. These symptoms require prompt medical evaluation.';
      case 'routine':
        return '📅 Schedule Regular Appointment - Book an appointment with your primary care physician within 1-3 days. While not urgent, these symptoms should be evaluated by a healthcare professional.';
      case 'self-care':
        return '💚 Self-Care Recommended - These symptoms may be manageable at home with rest, hydration, and over-the-counter medications. Monitor symptoms and seek care if they worsen or persist.';
      default:
        return 'Consult with a healthcare provider for appropriate guidance.';
    }
  }

  private getRecommendedSpecialty(
    symptoms: Symptom[],
    conditions: Array<{ name: string }>
  ): string {
    const symptomNames = symptoms.map(s => s.name.toLowerCase()).join(' ');
    const conditionNames = conditions.map(c => c.name.toLowerCase()).join(' ');
    
    if (symptomNames.includes('chest') || conditionNames.includes('cardiac')) {
      return 'Cardiologist';
    }
    if (symptomNames.includes('skin') || symptomNames.includes('rash')) {
      return 'Dermatologist';
    }
    if (symptomNames.includes('headache') && symptoms.some(s => s.severity === 'severe')) {
      return 'Neurologist';
    }
    if (symptomNames.includes('breathing') || symptomNames.includes('cough')) {
      return 'Pulmonologist';
    }
    
    return 'General Physician';
  }

  private suggestDiagnosticTests(
    symptoms: Symptom[],
    conditions: Array<{ name: string }>
  ): string[] {
    const tests: string[] = [];
    const symptomNames = symptoms.map(s => s.name.toLowerCase());
    
    if (symptomNames.includes('chest pain')) {
      tests.push('ECG (Electrocardiogram)', 'Cardiac Enzymes Blood Test', 'Chest X-Ray');
    }
    if (symptomNames.includes('fever')) {
      tests.push('Complete Blood Count (CBC)', 'Blood Culture');
    }
    if (symptomNames.includes('cough') || symptomNames.includes('difficulty breathing')) {
      tests.push('Chest X-Ray', 'Pulse Oximetry', 'Spirometry');
    }
    if (symptomNames.includes('abdominal pain')) {
      tests.push('Abdominal Ultrasound', 'Complete Blood Count', 'Urinalysis');
    }
    if (symptomNames.includes('headache') && symptoms.some(s => s.severity === 'severe')) {
      tests.push('CT Scan', 'MRI', 'Neurological Examination');
    }
    
    return [...new Set(tests)]; // Remove duplicates
  }

  private calculateConfidence(symptoms: Symptom[], context: PatientContext): number {
    let confidence = 60; // Base confidence
    
    // More symptoms = higher confidence
    confidence += Math.min(symptoms.length * 5, 20);
    
    // Patient history provided = higher confidence
    if (context.medicalHistory.length > 0) confidence += 5;
    if (context.currentMedications.length > 0) confidence += 5;
    
    // Vital signs provided = higher confidence
    if (context.vitalSigns) confidence += 10;
    
    return Math.min(confidence, 95); // Cap at 95%
  }

  /**
   * Get common symptoms for autocomplete/suggestions
   */
  getCommonSymptoms(): string[] {
    return [
      'Fever',
      'Cough',
      'Headache',
      'Sore Throat',
      'Fatigue',
      'Nausea',
      'Vomiting',
      'Diarrhea',
      'Abdominal Pain',
      'Chest Pain',
      'Difficulty Breathing',
      'Dizziness',
      'Rash',
      'Joint Pain',
      'Muscle Aches',
      'Back Pain',
      'Runny Nose',
      'Congestion',
      'Loss of Appetite',
      'Chills',
      'Night Sweats',
      'Weight Loss',
      'Swelling',
      'Numbness',
      'Tingling'
    ];
  }
}

export const aiSymptomService = new AISymptomService();

