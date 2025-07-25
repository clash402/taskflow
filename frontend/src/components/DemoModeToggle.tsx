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
    <div className="w-full bg-gradient-to-r from-accent/5 to-loop-mint/5 border border-accent/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-accent">🛡️</div>
          <h3 className="font-semibold text-foreground text-sm">Safety & Demo Mode</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Demo Mode</span>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 ${
              settings.enabled ? 'bg-accent' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                settings.enabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded transition-all duration-200"
            title={isExpanded ? "Collapse details" : "Expand details"}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
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
            <span className="text-xs text-foreground">External actions disabled for safety</span>
            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full border border-green-200">
              Active
            </span>
          </div>

          {isExpanded && (
            <div className="text-xs text-muted-foreground space-y-0.5 pl-4">
              <p>• GitHub API calls will be simulated</p>
              <p>• Slack webhooks will be mocked</p>
              <p>• File system operations will be virtual</p>
              <p>• All reasoning and planning remains real</p>
            </div>
          )}

          {settings.safetyMessage && (
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg text-xs text-foreground">
              <div className="flex items-center space-x-1">
                <span>ℹ️</span>
                <span>{settings.safetyMessage}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {!settings.enabled && (
        <div className="text-xs text-muted-foreground">
          <p>Enable demo mode to safely test the agent without making real external API calls.</p>
        </div>
      )}
    </div>
  );
}; 