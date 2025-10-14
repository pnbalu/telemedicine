// Google AI (Gemini) Service for direct API calls
// For production, this should be in the backend agent

interface GoogleAIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GoogleAIService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  private instructions: string;

  constructor(apiKey: string, instructions?: string) {
    this.apiKey = apiKey;
    this.instructions = instructions || `You are a compassionate AI medical intake assistant.
Ask about symptoms, medications, allergies, and medical history.
Ask one question at a time. Keep responses brief.`;
  }

  setInstructions(instructions: string) {
    this.instructions = instructions;
  }

  async generateResponse(prompt: string, conversationHistory: string[] = []): Promise<string> {
    try {
      const model = 'gemini-2.0-flash-exp';
      const url = `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`;

      // Build conversation context
      const context = conversationHistory.length > 0
        ? `Previous conversation:\n${conversationHistory.join('\n')}\n\n`
        : '';

      const systemPrompt = `${this.instructions}

${context}Patient: ${prompt}

AI Assistant:`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 200,
            topP: 0.9,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE'
            }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Google AI API error:', error);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GoogleAIResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text.trim();
      }

      throw new Error('No response generated');
    } catch (error) {
      console.error('Google AI Service error:', error);
      throw error;
    }
  }

  async generateMedicalGreeting(patientName: string): Promise<string> {
    const greeting = await this.generateResponse(
      `Start a medical intake conversation with ${patientName}`,
      []
    );
    return greeting;
  }

  static isConfigured(): boolean {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    return !!(apiKey && apiKey !== 'your-google-api-key-here');
  }

  static async createInstance(instructions?: string): Promise<GoogleAIService | null> {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    
    if (!apiKey || apiKey === 'your-google-api-key-here') {
      console.warn('Google API Key not configured');
      return null;
    }

    return new GoogleAIService(apiKey, instructions);
  }

  static getInstance(): GoogleAIService | null {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    
    if (!apiKey || apiKey === 'your-google-api-key-here') {
      console.warn('Google API Key not configured');
      return null;
    }

    return new GoogleAIService(apiKey);
  }
}

export const googleAI = GoogleAIService.getInstance();

