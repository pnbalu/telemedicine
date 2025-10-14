// Voice-Enabled Assistant Service for Telemedicine
// Provides speech recognition, text-to-speech, and voice command handling

export interface VoiceCommand {
  command: string;
  intent: string;
  entities: Record<string, any>;
  confidence: number;
  timestamp: Date;
}

export interface VoiceResponse {
  text: string;
  action?: {
    type: 'navigate' | 'search' | 'call' | 'schedule' | 'info';
    data: any;
  };
  audioUrl?: string;
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  isFinal: boolean;
  language: string;
}

class VoiceAssistantService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening = false;
  private onTranscriptCallback: ((result: TranscriptionResult) => void) | null = null;

  constructor() {
    this.initializeSpeechRecognition();
    this.initializeSpeechSynthesis();
  }

  /**
   * Initialize Web Speech API for speech recognition
   */
  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        const isFinal = result.isFinal;

        if (this.onTranscriptCallback) {
          this.onTranscriptCallback({
            text: transcript,
            confidence,
            isFinal,
            language: 'en-US'
          });
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }

  /**
   * Initialize Text-to-Speech synthesis
   */
  private initializeSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  /**
   * Start listening for voice commands
   */
  startListening(onTranscript?: (result: TranscriptionResult) => void): boolean {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return false;
    }

    if (onTranscript) {
      this.onTranscriptCallback = onTranscript;
    }

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      return false;
    }
  }

  /**
   * Stop listening for voice commands
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Check if currently listening
   */
  getIsListening(): boolean {
    return this.isListening;
  }

  /**
   * Convert text to speech
   */
  speak(text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate || 1.0;
      utterance.pitch = options?.pitch || 1.0;
      utterance.volume = options?.volume || 1.0;

      if (options?.voice) {
        const voices = this.synthesis.getVoices();
        const selectedVoice = voices.find(v => v.name === options.voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis.speak(utterance);
    });
  }

  /**
   * Stop current speech
   */
  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Get available voices
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.synthesis) {
      return this.synthesis.getVoices();
    }
    return [];
  }

  /**
   * Parse voice command using NLP (Natural Language Processing)
   */
  async parseCommand(text: string): Promise<VoiceCommand> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const lowercaseText = text.toLowerCase();
    let intent = 'unknown';
    let entities: Record<string, any> = {};
    let confidence = 0.8;

    // Intent detection
    if (lowercaseText.includes('book') && (lowercaseText.includes('appointment') || lowercaseText.includes('consultation'))) {
      intent = 'book_appointment';
      entities = { action: 'book_appointment' };
    } else if (lowercaseText.includes('prescription') || lowercaseText.includes('medication')) {
      intent = 'view_prescription';
      entities = { action: 'view_prescription' };
    } else if (lowercaseText.includes('doctor') || lowercaseText.includes('physician')) {
      intent = 'find_doctor';
      entities = { action: 'find_doctor' };
    } else if (lowercaseText.includes('symptom') || lowercaseText.includes('feel') || lowercaseText.includes('pain')) {
      intent = 'symptom_checker';
      entities = { action: 'symptom_checker' };
    } else if (lowercaseText.includes('call') || lowercaseText.includes('video')) {
      intent = 'start_consultation';
      entities = { action: 'start_consultation' };
    } else if (lowercaseText.includes('medical record') || lowercaseText.includes('history')) {
      intent = 'view_records';
      entities = { action: 'view_records' };
    } else if (lowercaseText.includes('help')) {
      intent = 'help';
      entities = { action: 'help' };
    } else if (lowercaseText.includes('cancel') || lowercaseText.includes('stop')) {
      intent = 'cancel';
      entities = { action: 'cancel' };
    }

    return {
      command: text,
      intent,
      entities,
      confidence,
      timestamp: new Date()
    };
  }

  /**
   * Generate voice response based on command
   */
  async generateResponse(command: VoiceCommand): Promise<VoiceResponse> {
    await new Promise(resolve => setTimeout(resolve, 200));

    let response: VoiceResponse = {
      text: "I'm sorry, I didn't understand that. Could you please rephrase?"
    };

    switch (command.intent) {
      case 'book_appointment':
        response = {
          text: 'I can help you book an appointment. Would you like to see available doctors?',
          action: {
            type: 'navigate',
            data: { route: '/patient/book-appointment' }
          }
        };
        break;

      case 'view_prescription':
        response = {
          text: 'Opening your prescriptions. You can view all your medications and refill requests here.',
          action: {
            type: 'navigate',
            data: { route: '/patient/prescription-tracking' }
          }
        };
        break;

      case 'find_doctor':
        response = {
          text: 'Looking for a doctor? Let me show you available specialists.',
          action: {
            type: 'navigate',
            data: { route: '/patient/book-appointment' }
          }
        };
        break;

      case 'symptom_checker':
        response = {
          text: 'I can help analyze your symptoms using AI. Let me open the symptom checker for you.',
          action: {
            type: 'navigate',
            data: { route: '/patient/ai-symptom-checker' }
          }
        };
        break;

      case 'start_consultation':
        response = {
          text: 'Starting video consultation. Please wait while I connect you.',
          action: {
            type: 'call',
            data: { route: '/video-call' }
          }
        };
        break;

      case 'view_records':
        response = {
          text: 'Opening your medical records. Here you can view your health history.',
          action: {
            type: 'navigate',
            data: { route: '/patient/medical-records' }
          }
        };
        break;

      case 'help':
        response = {
          text: 'I can help you with booking appointments, viewing prescriptions, checking symptoms, finding doctors, or accessing your medical records. What would you like to do?'
        };
        break;

      case 'cancel':
        response = {
          text: 'Okay, cancelling the current action.'
        };
        break;
    }

    return response;
  }

  /**
   * Medical dictation for clinical notes
   */
  async transcribeMedicalDictation(audioBlob: Blob): Promise<string> {
    // In production, this would call a medical-specific speech-to-text API
    // that understands medical terminology
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return "Sample transcribed medical note: Patient presents with acute onset headache. Duration: 3 days. Severity: moderate to severe. Associated symptoms include photophobia and nausea. No history of similar episodes. Vital signs stable.";
  }

  /**
   * Format medical text with proper punctuation and structure
   */
  formatMedicalNote(text: string): string {
    // Basic formatting - in production would use advanced NLP
    let formatted = text.trim();
    
    // Capitalize first letter of sentences
    formatted = formatted.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    
    // Add periods if missing
    if (!formatted.endsWith('.')) {
      formatted += '.';
    }
    
    return formatted;
  }

  /**
   * Extract medical entities from text (medications, symptoms, diagnoses)
   */
  async extractMedicalEntities(text: string): Promise<{
    symptoms: string[];
    medications: string[];
    diagnoses: string[];
    procedures: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));

    // Simulated medical NER (Named Entity Recognition)
    const symptoms: string[] = [];
    const medications: string[] = [];
    const diagnoses: string[] = [];
    const procedures: string[] = [];

    const lowercaseText = text.toLowerCase();

    // Common symptoms
    const symptomKeywords = ['headache', 'fever', 'cough', 'pain', 'nausea', 'fatigue', 'dizziness'];
    symptomKeywords.forEach(symptom => {
      if (lowercaseText.includes(symptom)) {
        symptoms.push(symptom);
      }
    });

    // Common medications
    const medicationKeywords = ['aspirin', 'ibuprofen', 'acetaminophen', 'lisinopril', 'metformin', 'atorvastatin'];
    medicationKeywords.forEach(med => {
      if (lowercaseText.includes(med)) {
        medications.push(med);
      }
    });

    // Common diagnoses
    const diagnosisKeywords = ['hypertension', 'diabetes', 'migraine', 'infection', 'flu', 'cold'];
    diagnosisKeywords.forEach(diagnosis => {
      if (lowercaseText.includes(diagnosis)) {
        diagnoses.push(diagnosis);
      }
    });

    return { symptoms, medications, diagnoses, procedures };
  }
}

export const voiceAssistantService = new VoiceAssistantService();

