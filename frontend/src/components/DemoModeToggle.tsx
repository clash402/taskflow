'use client';

import React, { useState } from 'react';
import { DemoModeSettings } from '@/types';

interface DemoModeToggleProps {
  settings: DemoModeSettings;
  onSettingsChange: (settings: DemoModeSettings) => void;
}

export const DemoModeToggle: React.FC<DemoModeToggleProps> = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newSettings: DemoModeSettings = {
      ...settings,
      enabled: !settings.enabled,
      externalActionsDisabled: !settings.enabled, // Always disable external actions when demo mode is enabled
      safetyMessage: !settings.enabled 
        ? 'Demo mode enabled - external actions will be simulated' 
        : undefined
    };
    onSettingsChange(newSettings);
  };

  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-yellow-600">🛡️</div>
          <h3 className="font-semibold text-gray-800 text-sm">Safety & Demo Mode</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Demo Mode</span>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 ${
              settings.enabled ? 'bg-yellow-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                settings.enabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title={isExpanded ? "Collapse details" : "Expand details"}
          >
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-700">External actions disabled for safety</span>
            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>

          {isExpanded && (
            <div className="text-xs text-gray-600 space-y-0.5 pl-4">
              <p>• GitHub API calls will be simulated</p>
              <p>• Slack webhooks will be mocked</p>
              <p>• File system operations will be virtual</p>
              <p>• All reasoning and planning remains real</p>
            </div>
          )}

          {settings.safetyMessage && (
            <div className="p-1.5 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
              <div className="flex items-center space-x-1">
                <span>ℹ️</span>
                <span>{settings.safetyMessage}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {!settings.enabled && (
        <div className="text-xs text-gray-600">
          <p>Enable demo mode to safely test the agent without making real external API calls.</p>
        </div>
      )}
    </div>
  );
}; 