'use client';

import React from 'react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border/50 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="loop-avatar animate-glow">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-foreground">LOOP</h1>
            <span className="text-xs text-muted-foreground font-mono">v1.0</span>
          </div>
        </div>
        
        {onReset && (
          <button
            onClick={onReset}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-200"
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