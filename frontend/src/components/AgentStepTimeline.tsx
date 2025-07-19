'use client';

import React from 'react';

interface AgentStep {
  id: string;
  step: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
}

interface AgentStepTimelineProps {
  steps: AgentStep[];
}

export const AgentStepTimeline: React.FC<AgentStepTimelineProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Agent Steps</h3>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              step.status === 'completed' ? 'bg-green-500' :
              step.status === 'running' ? 'bg-yellow-500' :
              step.status === 'failed' ? 'bg-red-500' :
              'bg-gray-300'
            }`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{step.step}</p>
              <p className="text-xs text-gray-500">{step.timestamp}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              step.status === 'completed' ? 'bg-green-100 text-green-800' :
              step.status === 'running' ? 'bg-yellow-100 text-yellow-800' :
              step.status === 'failed' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 