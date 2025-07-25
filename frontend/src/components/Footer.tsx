'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-card/80 backdrop-blur-md border-t border-border/50 px-6 py-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-sm text-muted-foreground mb-2">
          © 2025 Josh Courtney. All rights reserved.
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://joshcourtney.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            My Site
          </a>
          <a
            href="https://github.com/clash402"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/joshcourtney402/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}; 