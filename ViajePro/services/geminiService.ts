import { GoogleGenAI } from "@google/genai";
import type { Anomaly } from '../types';

// WARNING: This is a simulated API key for demonstration purposes as requested.
// In a real application, you should NEVER hardcode API keys directly in the source code.
// Use environment variables and secure key management practices.
const SIMULATED_API_KEY = "AIzaSyChjPVuOfVq4BmzbjTVwlbGzSgq8QNKbOo";

if (!SIMULATED_API_KEY) {
  console.warn("API_KEY is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: SIMULATED_API_KEY! });

export const generateTripSummary = async (anomalies: Anomaly[]): Promise<string> => {
  if (!SIMULATED_API_KEY) {
    return "AI Summary is disabled. Please configure your API_KEY.";
  }
  
  if (anomalies.length === 0) {
    return "No anomalies were recorded on this trip.";
  }

  const promptAnomalies = anomalies.map(a => {
    const locationInfo = a.location ? `\n  Coordinates: ${a.location.lat.toFixed(6)}, ${a.location.lng.toFixed(6)}` : '';
    return `- Anomaly: ${a.defect} (${a.element})\n  Severity: ${a.level}\n  Location: PK ${a.pk}${locationInfo}\n  Notes: ${a.notes}`
  }
  ).join('\n');

  const prompt = `
    You are a railway maintenance supervisor's assistant.
    Based on the following list of anomalies recorded during a train cabin inspection, write a concise summary report.
    The report should be in Spanish.
    Start with a brief overview, then highlight the most severe issues (IAL level) first.
    The tone should be professional and direct.

    Anomalies recorded:
    ${promptAnomalies}

    Generate the summary report now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error generating AI summary. Please check the console for details.";
  }
};