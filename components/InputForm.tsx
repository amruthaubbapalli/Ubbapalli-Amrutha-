
import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (resumeText: string, jobDescription: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resumeText, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resume" className="block text-lg font-medium text-text-secondary mb-2">
          Paste Your Resume Text
        </label>
        <textarea
          id="resume"
          rows={10}
          className="w-full p-4 bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition duration-200 text-text-primary placeholder-text-secondary/50"
          placeholder="Paste the full text of your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="job-description" className="block text-lg font-medium text-text-secondary mb-2">
          Paste the Job Description
        </label>
        <textarea
          id="job-description"
          rows={10}
          className="w-full p-4 bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition duration-200 text-text-primary placeholder-text-secondary/50"
          placeholder="Paste the job description text here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-secondary transition-all duration-300 disabled:bg-base-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Relevance'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
