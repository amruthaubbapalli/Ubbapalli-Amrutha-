
export type Verdict = 'High' | 'Medium' | 'Low';

export interface AnalysisResult {
  relevanceScore: number;
  verdict: Verdict;
  missingSkills: string[];
  missingCertifications: string[];
  missingProjects: string[];
  feedback: string;
}
