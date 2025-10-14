// Load AI instructions from instructions.txt file

export async function loadInstructions(): Promise<string> {
  try {
    const response = await fetch('/instructions.txt');
    if (!response.ok) {
      throw new Error('Failed to load instructions.txt');
    }
    const instructions = await response.text();
    return instructions.trim();
  } catch (error) {
    console.error('Error loading instructions:', error);
    // Fallback instructions
    return `You are a compassionate AI medical intake assistant.
Ask about symptoms, medications, allergies, and medical history.
Ask one question at a time. Keep responses brief.`;
  }
}

// Cache the instructions
let cachedInstructions: string | null = null;

export async function getInstructions(): Promise<string> {
  if (!cachedInstructions) {
    cachedInstructions = await loadInstructions();
  }
  return cachedInstructions;
}

