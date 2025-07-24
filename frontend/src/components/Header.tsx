'use client';

import React from 'react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🔄</div>
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
        </div>
        
        {onReset && (
          <button
            onClick={onReset}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Toggle dark mode"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}; 