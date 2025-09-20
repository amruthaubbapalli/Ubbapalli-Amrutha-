
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    relevanceScore: { type: Type.INTEGER, description: "Relevance score from 0-100." },
    verdict: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Verdict: High, Medium, or Low." },
    missingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of key skills from the job description that are missing from the resume."
    },
    missingCertifications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of key certifications mentioned in the job description that are missing from the resume. If none are mentioned, return an empty array."
    },
    missingProjects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Suggestions for types of projects the candidate could build to better match the role, based on the job description. For example, 'A project using React with state management libraries'."
    },
    feedback: { type: Type.STRING, description: "A short, constructive paragraph (2-3 sentences) offering personalized feedback to the candidate on how to improve their resume for this specific job role." }
  },
  required: ['relevanceScore', 'verdict', 'missingSkills', 'missingCertifications', 'missingProjects', 'feedback']
};

export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert AI Technical Recruiter. Your task is to analyze the provided resume text against the provided job description.
    Provide a detailed analysis in a strict JSON format that adheres to the provided schema.

    The analysis should include:
    1.  \`relevanceScore\`: An integer score from 0 to 100 representing how well the resume matches the job description. 100 is a perfect match.
    2.  \`verdict\`: A verdict of "High", "Medium", or "Low" suitability based on the score. High: >75, Medium: 50-75, Low: <50.
    3.  \`missingSkills\`: An array of strings listing key skills from the job description that are missing from the resume.
    4.  \`missingCertifications\`: An array of strings listing key certifications from the job description that are missing from the resume. If none are mentioned or missing, return an empty array.
    5.  \`missingProjects\`: An array of strings suggesting types of projects the candidate could work on to better match the role, based on the job description.
    6.  \`feedback\`: A short, constructive paragraph (2-3 sentences) offering personalized feedback to the candidate on how to improve their resume for this specific job role.

    Resume Text:
    ---
    ${resumeText}
    ---

    Job Description:
    ---
    ${jobDescription}
    ---

    Return ONLY the JSON object. Do not include any other text, markdown formatting, or explanations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonString);
    return result;

  } catch (error) {
    console.error("Error analyzing resume with Gemini API:", error);
    throw new Error("Failed to get a valid analysis from the AI. The response may have been blocked or malformed.");
  }
};
