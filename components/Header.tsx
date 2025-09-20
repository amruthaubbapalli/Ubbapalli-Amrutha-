
import React from 'react';
import { FileTextIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center border-b border-base-300">
        <div className="flex justify-center items-center gap-4 mb-2">
            <FileTextIcon className="w-10 h-10 text-brand-accent"/>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brand-secondary to-brand-accent text-transparent bg-clip-text">
                Resume Relevance Analyzer
            </h1>
        </div>
      <p className="text-lg text-text-secondary">
        Instantly score your resume against any job description with AI.
      </p>
    </header>
  );
};

export default Header;
