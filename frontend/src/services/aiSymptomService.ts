// AI-Powered Symptom Analysis Service
export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description?: string;
  bodyLocation?: string;
  triggers?: string[];
  relievingFactors?: string[];
  associatedSymptoms?: string[];
}

export interface VitalSigns {
  temperature?: number;
  heartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation?: number;
  respiratoryRate?: number;
  weight?: number;
  height?: number;
}

export interface PatientContext {
  age: number;
  gender: string;
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  vitalSigns?: VitalSigns;
  lifestyle?: {
    smoking: boolean;
    alcohol: string;
    exercise: string;
    diet: string;
  };
  recentTravel?: string;
  exposureHistory?: string[];
}

export interface Condition {
  name: string;
  probability: number;
  description: string;
  recommendations: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  riskFactors: string[];
  differentialDiagnoses: string[];
}

export interface SymptomAnalysis {
  triageLevel: 'emergency' | 'urgent' | 'routine' | 'self-care';
  possibleConditions: Condition[];
  recommendedAction: string;
  recommendedSpecialty?: string;
  urgencyScore: number; // 0-100
  aiConfidence: number; // 0-100
  warningFlags: string[];
  suggestedTests?: string[];
  followUpRecommendations: string[];
  emergencyIndicators: string[];
  riskAssessment: {
    overallRisk: 'low' | 'medium' | 'high';
    riskFactors: string[];
    mitigationStrategies: string[];
  };
  timestamp: Date;
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon: string;
  symptoms: string[];
}

export interface BodySystem {
  id: string;
  name: string;
  locations: BodyLocation[];
}

export interface BodyLocation {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  commonSymptoms: string[];
}

// Enhanced symptom database with more comprehensive data
const enhancedSymptomDatabase = {
  // Cardiovascular symptoms
  'chest pain': {
    severity: 9,
    emergencyKeywords: ['crushing', 'radiating', 'sudden', 'severe', 'pressure'],
    bodySystems: ['cardiovascular', 'respiratory'],
    conditions: ['myocardial infarction', 'angina', 'pericarditis', 'pneumonia'],
    redFlags: ['radiating to arm/jaw', 'with nausea/sweating', 'crushing pressure']
  },
  'heart palpitations': {
    severity: 6,
    emergencyKeywords: ['irregular', 'rapid', 'with chest pain'],
    bodySystems: ['cardiovascular'],
    conditions: ['arrhythmia', 'atrial fibrillation', 'anxiety'],
    redFlags: ['with chest pain', 'irregular rhythm', 'dizziness']
  },
  'shortness of breath': {
    severity: 8,
    emergencyKeywords: ['severe', 'sudden', 'at rest', 'with chest pain'],
    bodySystems: ['respiratory', 'cardiovascular'],
    conditions: ['pneumonia', 'heart failure', 'asthma', 'COPD', 'pulmonary embolism'],
    redFlags: ['at rest', 'sudden onset', 'with chest pain', 'blue lips']
  },

  // Respiratory symptoms
  'cough': {
    severity: 3,
    emergencyKeywords: ['blood', 'severe breathing difficulty', 'persistent'],
    bodySystems: ['respiratory'],
    conditions: ['common cold', 'bronchitis', 'pneumonia', 'asthma'],
    redFlags: ['blood in sputum', 'severe breathing difficulty', 'persistent >3 weeks']
  },
  'fever': {
    severity: 5,
    emergencyKeywords: ['high', 'persistent', 'with confusion', 'rigors'],
    bodySystems: ['general'],
    conditions: ['viral infection', 'bacterial infection', 'flu'],
    redFlags: ['>103°F', 'with confusion', 'persistent >3 days', 'rigors']
  },

  // Neurological symptoms
  'headache': {
    severity: 4,
    emergencyKeywords: ['worst ever', 'with vision changes', 'sudden severe'],
    bodySystems: ['neurological'],
    conditions: ['tension headache', 'migraine', 'cluster headache'],
    redFlags: ['worst headache ever', 'sudden severe onset', 'with vision changes']
  },
  'dizziness': {
    severity: 5,
    emergencyKeywords: ['severe', 'with chest pain', 'loss of consciousness'],
    bodySystems: ['neurological', 'cardiovascular'],
    conditions: ['vertigo', 'hypotension', 'anemia', 'inner ear problems'],
    redFlags: ['with chest pain', 'loss of consciousness', 'severe spinning']
  },
  'confusion': {
    severity: 8,
    emergencyKeywords: ['sudden', 'severe', 'with fever'],
    bodySystems: ['neurological'],
    conditions: ['delirium', 'stroke', 'infection', 'medication side effects'],
    redFlags: ['sudden onset', 'severe confusion', 'with fever']
  },

  // Gastrointestinal symptoms
  'abdominal pain': {
    severity: 6,
    emergencyKeywords: ['severe', 'sudden', 'with vomiting', 'rigid abdomen'],
    bodySystems: ['gastrointestinal'],
    conditions: ['gastritis', 'appendicitis', 'gallstones', 'ulcer'],
    redFlags: ['severe sudden pain', 'rigid abdomen', 'with vomiting', 'rebound tenderness']
  },
  'nausea': {
    severity: 3,
    emergencyKeywords: ['with severe abdominal pain', 'with blood'],
    bodySystems: ['gastrointestinal'],
    conditions: ['gastritis', 'food poisoning', 'migraine', 'pregnancy'],
    redFlags: ['with severe abdominal pain', 'with blood', 'persistent vomiting']
  },
  'diarrhea': {
    severity: 3,
    emergencyKeywords: ['with blood', 'severe dehydration', 'persistent'],
    bodySystems: ['gastrointestinal'],
    conditions: ['viral gastroenteritis', 'food poisoning', 'IBD'],
    redFlags: ['blood in stool', 'severe dehydration', 'persistent >3 days']
  },

  // Musculoskeletal symptoms
  'joint pain': {
    severity: 4,
    emergencyKeywords: ['severe', 'with swelling', 'inability to move'],
    bodySystems: ['musculoskeletal'],
    conditions: ['arthritis', 'gout', 'injury', 'autoimmune'],
    redFlags: ['severe swelling', 'inability to move joint', 'red hot joint']
  },
  'back pain': {
    severity: 4,
    emergencyKeywords: ['severe', 'with numbness', 'after trauma'],
    bodySystems: ['musculoskeletal'],
    conditions: ['muscle strain', 'herniated disc', 'sciatica'],
    redFlags: ['with numbness/weakness', 'after trauma', 'severe pain']
  }
};

const bodySystems: BodySystem[] = [
  {
    id: 'head',
    name: 'Head & Neck',
    locations: [
      { id: 'forehead', name: 'Forehead', coordinates: { x: 50, y: 20 }, commonSymptoms: ['headache', 'fever'] },
      { id: 'eyes', name: 'Eyes', coordinates: { x: 45, y: 25 }, commonSymptoms: ['vision changes', 'eye pain'] },
      { id: 'nose', name: 'Nose', coordinates: { x: 50, y: 30 }, commonSymptoms: ['nasal congestion', 'runny nose'] },
      { id: 'mouth', name: 'Mouth', coordinates: { x: 50, y: 35 }, commonSymptoms: ['sore throat', 'mouth pain'] },
      { id: 'neck', name: 'Neck', coordinates: { x: 50, y: 40 }, commonSymptoms: ['neck pain', 'swollen lymph nodes'] }
    ]
  },
  {
    id: 'chest',
    name: 'Chest & Heart',
    locations: [
      { id: 'chest', name: 'Chest', coordinates: { x: 50, y: 50 }, commonSymptoms: ['chest pain', 'shortness of breath'] },
      { id: 'heart', name: 'Heart', coordinates: { x: 45, y: 52 }, commonSymptoms: ['heart palpitations', 'chest pain'] },
      { id: 'lungs', name: 'Lungs', coordinates: { x: 50, y: 55 }, commonSymptoms: ['cough', 'shortness of breath'] }
    ]
  },
  {
    id: 'abdomen',
    name: 'Abdomen',
    locations: [
      { id: 'upper-abdomen', name: 'Upper Abdomen', coordinates: { x: 50, y: 65 }, commonSymptoms: ['stomach pain', 'nausea'] },
      { id: 'lower-abdomen', name: 'Lower Abdomen', coordinates: { x: 50, y: 75 }, commonSymptoms: ['abdominal pain', 'cramps'] },
      { id: 'right-side', name: 'Right Side', coordinates: { x: 60, y: 70 }, commonSymptoms: ['liver pain', 'gallbladder pain'] }
    ]
  },
  {
    id: 'extremities',
    name: 'Arms & Legs',
    locations: [
      { id: 'arms', name: 'Arms', coordinates: { x: 25, y: 60 }, commonSymptoms: ['arm pain', 'numbness'] },
      { id: 'legs', name: 'Legs', coordinates: { x: 50, y: 85 }, commonSymptoms: ['leg pain', 'swelling'] },
      { id: 'joints', name: 'Joints', coordinates: { x: 40, y: 70 }, commonSymptoms: ['joint pain', 'stiffness'] }
    ]
  }
];

const symptomCategories: SymptomCategory[] = [
  {
    id: 'pain',
    name: 'Pain & Discomfort',
    icon: '🩹',
    symptoms: ['headache', 'chest pain', 'abdominal pain', 'back pain', 'joint pain', 'muscle pain']
  },
  {
    id: 'respiratory',
    name: 'Breathing & Respiratory',
    icon: '🫁',
    symptoms: ['cough', 'shortness of breath', 'chest congestion', 'wheezing', 'sore throat']
  },
  {
    id: 'digestive',
    name: 'Digestive & Stomach',
    icon: '🍽️',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'constipation', 'abdominal pain', 'heartburn']
  },
  {
    id: 'neurological',
    name: 'Brain & Nervous System',
    icon: '🧠',
    symptoms: ['dizziness', 'confusion', 'memory problems', 'seizures', 'headache']
  },
  {
    id: 'cardiovascular',
    name: 'Heart & Circulation',
    icon: '❤️',
    symptoms: ['chest pain', 'heart palpitations', 'shortness of breath', 'dizziness']
  },
  {
    id: 'general',
    name: 'General Symptoms',
    icon: '🌡️',
    symptoms: ['fever', 'fatigue', 'weight loss', 'weight gain', 'sweating']
  }
];

class AISymptomService {
  // Simulate API delay
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Get common symptoms by category
  getSymptomCategories(): SymptomCategory[] {
    return symptomCategories;
  }

  // Get body systems for symptom location
  getBodySystems(): BodySystem[] {
    return bodySystems;
  }

  // Get common symptoms for autocomplete
  getCommonSymptoms(): string[] {
    return Object.keys(enhancedSymptomDatabase);
  }

  // Enhanced symptom analysis with more sophisticated logic
  async analyzeSymptoms(symptoms: Symptom[], context: PatientContext): Promise<SymptomAnalysis> {
    await this.delay(2000); // Simulate AI processing time

    const analysis = this.performAdvancedAnalysis(symptoms, context);
    return analysis;
  }

  private performAdvancedAnalysis(symptoms: Symptom[], context: PatientContext): SymptomAnalysis {
    // Calculate urgency score based on symptoms and context
    let urgencyScore = 0;
    const emergencyIndicators: string[] = [];
    const warningFlags: string[] = [];
    const possibleConditions: Condition[] = [];
    
    // Analyze each symptom
    symptoms.forEach(symptom => {
      const symptomData = enhancedSymptomDatabase[symptom.name.toLowerCase()];
      if (symptomData) {
        urgencyScore += symptomData.severity * 10;
        
        // Check for emergency keywords
        if (symptom.description) {
          symptomData.emergencyKeywords.forEach(keyword => {
            if (symptom.description.toLowerCase().includes(keyword)) {
              emergencyIndicators.push(`${symptom.name}: ${keyword}`);
              urgencyScore += 20;
            }
          });
        }

        // Add possible conditions
        symptomData.conditions.forEach(condition => {
          const existingCondition = possibleConditions.find(c => c.name === condition);
          if (existingCondition) {
            existingCondition.probability += 15;
          } else {
            possibleConditions.push({
              name: condition,
              probability: 25,
              description: this.getConditionDescription(condition),
              recommendations: this.getConditionRecommendations(condition),
              urgencyLevel: this.getConditionUrgency(condition),
              symptoms: [symptom.name],
              riskFactors: this.getConditionRiskFactors(condition, context),
              differentialDiagnoses: this.getDifferentialDiagnoses(condition)
            });
          }
        });
      }
    });

    // Adjust for patient context
    urgencyScore = this.adjustUrgencyForContext(urgencyScore, context);
    
    // Determine triage level
    const triageLevel = this.determineTriageLevel(urgencyScore, emergencyIndicators);
    
    // Calculate AI confidence
    const aiConfidence = this.calculateAIConfidence(symptoms, context, possibleConditions);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(triageLevel, possibleConditions, context);
    
    // Risk assessment
    const riskAssessment = this.performRiskAssessment(symptoms, context, possibleConditions);

    return {
      triageLevel,
      possibleConditions: possibleConditions.sort((a, b) => b.probability - a.probability),
      recommendedAction: recommendations.action,
      recommendedSpecialty: recommendations.specialty,
      urgencyScore: Math.min(100, urgencyScore),
      aiConfidence,
      warningFlags,
      suggestedTests: this.getSuggestedTests(possibleConditions),
      followUpRecommendations: this.getFollowUpRecommendations(triageLevel, possibleConditions),
      emergencyIndicators,
      riskAssessment,
      timestamp: new Date()
    };
  }

  private adjustUrgencyForContext(urgencyScore: number, context: PatientContext): number {
    // Age adjustments
    if (context.age > 65) urgencyScore += 10;
    if (context.age < 2) urgencyScore += 15;

    // Medical history adjustments
    if (context.medicalHistory.includes('diabetes')) urgencyScore += 5;
    if (context.medicalHistory.includes('heart disease')) urgencyScore += 10;
    if (context.medicalHistory.includes('cancer')) urgencyScore += 8;

    // Vital signs adjustments
    if (context.vitalSigns) {
      if (context.vitalSigns.temperature && context.vitalSigns.temperature > 103) urgencyScore += 15;
      if (context.vitalSigns.heartRate && context.vitalSigns.heartRate > 120) urgencyScore += 10;
      if (context.vitalSigns.oxygenSaturation && context.vitalSigns.oxygenSaturation < 95) urgencyScore += 20;
    }

    return urgencyScore;
  }

  private determineTriageLevel(urgencyScore: number, emergencyIndicators: string[]): 'emergency' | 'urgent' | 'routine' | 'self-care' {
    if (emergencyIndicators.length > 0 || urgencyScore >= 80) return 'emergency';
    if (urgencyScore >= 60) return 'urgent';
    if (urgencyScore >= 30) return 'routine';
    return 'self-care';
  }

  private calculateAIConfidence(symptoms: Symptom[], context: PatientContext, conditions: Condition[]): number {
    let confidence = 70; // Base confidence
    
    // More symptoms = higher confidence
    confidence += Math.min(20, symptoms.length * 5);
    
    // Complete context = higher confidence
    if (context.medicalHistory.length > 0) confidence += 5;
    if (context.vitalSigns) confidence += 10;
    
    // Reduce confidence for rare conditions
    conditions.forEach(condition => {
      if (condition.probability > 60) confidence += 5;
    });

    return Math.min(95, confidence);
  }

  private generateRecommendations(triageLevel: string, conditions: Condition[], context: PatientContext) {
    const recommendations = {
      action: '',
      specialty: ''
    };

    switch (triageLevel) {
      case 'emergency':
        recommendations.action = 'Seek immediate emergency medical care. Call 911 or go to the nearest emergency room.';
        recommendations.specialty = 'Emergency Medicine';
        break;
      case 'urgent':
        recommendations.action = 'Schedule an urgent appointment with a healthcare provider within 24-48 hours.';
        recommendations.specialty = this.getRecommendedSpecialty(conditions);
        break;
      case 'routine':
        recommendations.action = 'Schedule a routine appointment with your healthcare provider within 1-2 weeks.';
        recommendations.specialty = this.getRecommendedSpecialty(conditions);
        break;
      case 'self-care':
        recommendations.action = 'Monitor symptoms and try self-care measures. Contact a healthcare provider if symptoms worsen or persist.';
        recommendations.specialty = 'Primary Care';
        break;
    }

    return recommendations;
  }

  private getRecommendedSpecialty(conditions: Condition[]): string {
    const specialties = {
      'cardiovascular': ['myocardial infarction', 'angina', 'heart failure', 'arrhythmia'],
      'pulmonology': ['pneumonia', 'asthma', 'COPD', 'pulmonary embolism'],
      'gastroenterology': ['gastritis', 'appendicitis', 'gallstones', 'ulcer'],
      'neurology': ['migraine', 'stroke', 'seizures', 'confusion'],
      'rheumatology': ['arthritis', 'gout', 'autoimmune']
    };

    for (const [specialty, conditionNames] of Object.entries(specialties)) {
      if (conditions.some(condition => conditionNames.includes(condition.name))) {
        return specialty;
      }
    }

    return 'Primary Care';
  }

  private performRiskAssessment(symptoms: Symptom[], context: PatientContext, conditions: Condition[]): any {
    const riskFactors: string[] = [];
    const mitigationStrategies: string[] = [];
    let overallRisk: 'low' | 'medium' | 'high' = 'low';

    // Age-related risks
    if (context.age > 65) {
      riskFactors.push('Advanced age');
      mitigationStrategies.push('Regular health monitoring');
    }

    // Medical history risks
    if (context.medicalHistory.includes('diabetes')) {
      riskFactors.push('Diabetes');
      mitigationStrategies.push('Monitor blood sugar levels');
    }

    // Symptom-based risks
    symptoms.forEach(symptom => {
      if (symptom.severity === 'severe') {
        riskFactors.push(`Severe ${symptom.name}`);
        overallRisk = 'high';
      }
    });

    if (riskFactors.length > 3) overallRisk = 'high';
    else if (riskFactors.length > 1) overallRisk = 'medium';

    return {
      overallRisk,
      riskFactors,
      mitigationStrategies
    };
  }

  private getConditionDescription(condition: string): string {
    const descriptions: { [key: string]: string } = {
      'myocardial infarction': 'Heart attack - blockage of blood flow to the heart muscle',
      'pneumonia': 'Infection of the lungs causing inflammation',
      'asthma': 'Chronic respiratory condition causing airway inflammation',
      'migraine': 'Severe headache often accompanied by nausea and sensitivity to light',
      'gastritis': 'Inflammation of the stomach lining'
    };
    return descriptions[condition] || 'Condition requiring medical evaluation';
  }

  private getConditionRecommendations(condition: string): string[] {
    const recommendations: { [key: string]: string[] } = {
      'myocardial infarction': ['Seek immediate emergency care', 'Do not delay treatment'],
      'pneumonia': ['Rest and hydration', 'Antibiotics if bacterial', 'Monitor symptoms'],
      'asthma': ['Use inhaler as prescribed', 'Avoid triggers', 'Monitor breathing']
    };
    return recommendations[condition] || ['Consult healthcare provider', 'Monitor symptoms'];
  }

  private getConditionUrgency(condition: string): 'low' | 'medium' | 'high' | 'critical' {
    const urgentConditions = ['myocardial infarction', 'stroke', 'pulmonary embolism'];
    if (urgentConditions.includes(condition)) return 'critical';
    return 'medium';
  }

  private getConditionRiskFactors(condition: string, context: PatientContext): string[] {
    const riskFactors: string[] = [];
    if (context.age > 65) riskFactors.push('Advanced age');
    if (context.medicalHistory.includes('diabetes')) riskFactors.push('Diabetes');
    return riskFactors;
  }

  private getDifferentialDiagnoses(condition: string): string[] {
    // Simplified differential diagnoses
    return ['Alternative condition 1', 'Alternative condition 2'];
  }

  private getSuggestedTests(conditions: Condition[]): string[] {
    const tests: string[] = [];
    conditions.forEach(condition => {
      if (condition.name.includes('heart')) tests.push('ECG', 'Cardiac enzymes');
      if (condition.name.includes('lung')) tests.push('Chest X-ray', 'Blood tests');
    });
    return tests;
  }

  private getFollowUpRecommendations(triageLevel: string, conditions: Condition[]): string[] {
    const recommendations: string[] = [];
    
    if (triageLevel === 'emergency' || triageLevel === 'urgent') {
      recommendations.push('Follow up within 24-48 hours');
    } else {
      recommendations.push('Schedule follow-up appointment within 1-2 weeks');
    }
    
    recommendations.push('Monitor symptoms closely');
    recommendations.push('Contact healthcare provider if symptoms worsen');
    
    return recommendations;
  }

  // Get symptom suggestions based on input
  getSymptomSuggestions(input: string): string[] {
    const suggestions = Object.keys(enhancedSymptomDatabase).filter(symptom =>
      symptom.toLowerCase().includes(input.toLowerCase())
    );
    return suggestions.slice(0, 5);
  }

  // Validate vital signs
  validateVitalSigns(vitalSigns: VitalSigns): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];
    
    if (vitalSigns.temperature && (vitalSigns.temperature < 95 || vitalSigns.temperature > 105)) {
      warnings.push('Temperature outside normal range');
    }
    
    if (vitalSigns.heartRate && (vitalSigns.heartRate < 40 || vitalSigns.heartRate > 200)) {
      warnings.push('Heart rate outside normal range');
    }
    
    if (vitalSigns.oxygenSaturation && vitalSigns.oxygenSaturation < 95) {
      warnings.push('Low oxygen saturation');
    }
    
    return {
      valid: warnings.length === 0,
      warnings
    };
  }
}

export const aiSymptomService = new AISymptomService();
