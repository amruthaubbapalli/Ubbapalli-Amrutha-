
import React from 'react';
import { AnalysisResult, Verdict } from '../types';
import { CheckCircleIcon, XCircleIcon, LightbulbIcon, BriefcaseIcon } from './Icons';

const getVerdictColorClasses = (verdict: Verdict) => {
  switch (verdict) {
    case 'High':
      return 'bg-green-500 text-green-900';
    case 'Medium':
      return 'bg-yellow-500 text-yellow-900';
    case 'Low':
      return 'bg-red-500 text-red-900';
    default:
      return 'bg-gray-500 text-gray-900';
  }
};

const getScoreColor = (score: number) => {
    if (score > 75) return 'text-green-400';
    if (score > 50) return 'text-yellow-400';
    return 'text-red-400';
}

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 45; // r=45
  const offset = circumference - (score / 100) * circumference;
  const scoreColor = getScoreColor(score).replace('text-', '');

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-base-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50%"
          cy="50%"
        />
        <circle
          className={getScoreColor(score)}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50%"
          cy="50%"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
        <span className="text-sm text-text-secondary">Relevance Score</span>
      </div>
    </div>
  );
};

interface InfoCardProps {
    title: string;
    items: string[];
    icon: React.ReactNode;
    emptyText: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, icon, emptyText }) => (
    <div className="bg-base-200 p-6 rounded-lg border border-base-300 flex-1 min-w-[280px]">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-text-secondary">
            {icon}
            {title}
        </h3>
        {items.length > 0 ? (
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-brand-accent mr-2 mt-1 flex-shrink-0" />
                        <span className="text-text-primary">{item}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-text-secondary italic">{emptyText}</p>
        )}
    </div>
);


interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-lg border border-base-300 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-text-primary">Analysis Complete</h2>
                <div className="flex items-center gap-3">
                    <span className="text-lg text-text-secondary">Overall Fit:</span>
                    <span className={`px-4 py-1 rounded-full text-lg font-bold ${getVerdictColorClasses(result.verdict)}`}>
                        {result.verdict}
                    </span>
                </div>
            </div>
            <div className="flex-shrink-0">
                <ScoreGauge score={result.relevanceScore} />
            </div>
        </div>

        <div className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-lg border border-base-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-text-primary">
                <LightbulbIcon className="w-7 h-7 text-brand-accent"/>
                Personalized Feedback
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed">{result.feedback}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard 
                title="Missing Skills" 
                items={result.missingSkills} 
                icon={<XCircleIcon className="w-6 h-6"/>}
                emptyText="No critical skills appear to be missing. Great job!"
            />
            <InfoCard 
                title="Missing Certifications" 
                items={result.missingCertifications} 
                icon={<XCircleIcon className="w-6 h-6"/>}
                emptyText="No specific certifications were found missing."
            />
        </div>
        
         <div className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-lg border border-base-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-text-primary">
                <BriefcaseIcon className="w-7 h-7 text-brand-accent"/>
                Suggested Projects
            </h3>
             {result.missingProjects.length > 0 ? (
                <ul className="space-y-3">
                    {result.missingProjects.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-brand-accent mr-3 mt-1 flex-shrink-0" />
                            <span className="text-text-secondary">{item}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-text-secondary italic">Your project experience seems well-aligned.</p>
            )}
        </div>
    </div>
  );
};

export default ResultsDisplay;
