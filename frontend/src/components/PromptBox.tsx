'use client';

import React from 'react';

interface PromptBoxProps {
  onSubmit?: (prompt: string) => void;
}

export const PromptBox: React.FC<PromptBoxProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && prompt.trim()) {
      onSubmit(prompt.trim());
      setPrompt('');
      // Reset textarea height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim()) {
        onSubmit?.(prompt.trim());
        setPrompt('');
        // Reset textarea height after submission
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  };

  return (
    <div className="loop-card">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <h2 className="text-xl font-semibold text-foreground">Create New Task</h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col space-y-4">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your task prompt here..."
            className="loop-textarea min-h-[44px] max-h-[300px] overflow-y-auto"
            rows={1}
          />
          <button
            type="submit"
            className="loop-button-accent w-full px-6 py-3 font-medium"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  );
}; 