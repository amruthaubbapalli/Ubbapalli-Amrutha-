
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from './types';
import { analyzeResume } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (resumeText: string, jobDescription: string) => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both the resume text and the job description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysisResult(result);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-2xl border border-base-300">
          <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>
        
        <div className="mt-8">
          {isLoading && <Loader />}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {analysisResult && !isLoading && <ResultsDisplay result={analysisResult} />}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-text-secondary/50">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
