'use client';

import React from 'react';
import { DemoModeSettings } from '@/types';

interface DemoModeToggleProps {
  settings: DemoModeSettings;
  onSettingsChange: (settings: DemoModeSettings) => void;
}

export const DemoModeToggle: React.FC<DemoModeToggleProps> = ({ settings, onSettingsChange }) => {
  const handleToggle = () => {
    const newSettings: DemoModeSettings = {
      ...settings,
      enabled: !settings.enabled,
      safetyMessage: !settings.enabled 
        ? 'Demo mode enabled - external actions will be simulated' 
        : undefined
    };
    onSettingsChange(newSettings);
  };

  const handleExternalActionsToggle = () => {
    const newSettings: DemoModeSettings = {
      ...settings,
      externalActionsDisabled: !settings.externalActionsDisabled,
      safetyMessage: !settings.externalActionsDisabled 
        ? 'External actions disabled for safety' 
        : 'External actions enabled'
    };
    onSettingsChange(newSettings);
  };

  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-yellow-600">🛡️</div>
          <h3 className="font-semibold text-gray-800">Safety & Demo Mode</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Demo Mode</span>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
              settings.enabled ? 'bg-yellow-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Disable External Actions</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Recommended
              </span>
            </div>
            <button
              onClick={handleExternalActionsToggle}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 ${
                settings.externalActionsDisabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  settings.externalActionsDisabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>• GitHub API calls will be simulated</p>
            <p>• Slack webhooks will be mocked</p>
            <p>• File system operations will be virtual</p>
            <p>• All reasoning and planning remains real</p>
          </div>

          {settings.safetyMessage && (
            <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
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