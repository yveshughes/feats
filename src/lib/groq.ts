import { Groq } from 'groq-sdk';

let groqClient: Groq;

export async function getGroqClient() {
  if (groqClient) return groqClient;

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key is not set in environment variables");
  }

  groqClient = new Groq({
    apiKey: apiKey,
  });

  return groqClient;
}

export interface AnalysisScale {
  title: string;
  description: string;
  rating: number;
  explanation: string;
}

export interface AnalysisResult {
  scales: AnalysisScale[];
}

export async function analyzeImage(imageUrl: string): Promise<AnalysisResult> {
  const client = await getGroqClient();

  const prompt = `Analyze the following image: ${imageUrl}

  Provide an analysis based on the FEATS (Formal Elements Art Therapy Scale) criteria:
  1. Prominence of Color
  2. Color Fit
  3. Implied Energy
  4. Space
  5. Integration
  6. Logic
  7. Realism
  8. Problem-Solving
  9. Developmental Level
  10. Details of Objects & Environment
  11. Line Quality
  12. Person
  13. Rotation
  14. Perseveration

  For each criterion, provide:
  - A title (the criterion name)
  - A brief description of what the criterion measures
  - A rating from 0 to 5
  - A brief explanation for the rating

  Format the response as a JSON object with the following structure:
  {
    "scales": [
      {
        "title": "Criterion Name",
        "description": "Brief description of what this criterion measures",
        "rating": 0-5,
        "explanation": "Brief explanation for the rating"
      },
      ...
    ]
  }`;

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama2-70b-4096',
  });

  const content = chatCompletion.choices[0].message.content;
  if (!content) {
    throw new Error("No content received from Groq API");
  }

  const result = JSON.parse(content) as AnalysisResult;
  return result;
}






