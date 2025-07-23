'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-6 py-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-sm text-gray-600 mb-2">
          © 2025 Josh Courtney. All rights reserved.
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://joshcourtney.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            My Site
          </a>
          <a
            href="https://github.com/clash402"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/joshcourtney402/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}; 