'use client';

import React from 'react';
import { ToolStatus } from '@/types';

interface ToolStatusDashboardProps {
  tools: ToolStatus[];
  isVisible?: boolean;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export const ToolStatusDashboard: React.FC<ToolStatusDashboardProps> = ({ 
  tools, 
  isVisible = true, 
  isExpanded = false,
  onToggleExpanded 
}) => {
  const getStatusColor = (status: ToolStatus['status']) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'in_use': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'disabled': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'not_configured': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: ToolStatus['status']) => {
    switch (status) {
      case 'available': return '✅';
      case 'in_use': return '🔄';
      case 'success': return '✅';
      case 'error': return '❌';
      case 'disabled': return '⏸️';
      case 'not_configured': return '⚠️';
      default: return '❓';
    }
  };

  const getStatusText = (status: ToolStatus['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'in_use': return 'In Use';
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'disabled': return 'Disabled';
      case 'not_configured': return 'Not Configured';
      default: return 'Unknown';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Tool Status Dashboard</h3>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-gray-500">
            {tools.filter(t => t.status === 'success').length}/{tools.length} tools ready
          </div>
          {onToggleExpanded && (
            <button
              onClick={onToggleExpanded}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title={isExpanded ? "Collapse dashboard" : "Expand dashboard"}
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
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${getStatusColor(tool.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tool.icon}</span>
                  <span className="font-medium text-sm">{tool.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{getStatusIcon(tool.status)}</span>
                  <span className="text-xs font-medium">{getStatusText(tool.status)}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Calls:</span>
                  <span className="font-mono">{tool.callCount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Success Rate:</span>
                  <span className="font-mono">
                    {tool.callCount > 0 ? Math.round((tool.successCount / tool.callCount) * 100) : 0}%
                  </span>
                </div>
                
                {tool.isDemoMode && (
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Demo Mode
                  </div>
                )}
                
                {!tool.isConfigured && (
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                    Not Configured
                  </div>
                )}
                
                {tool.errorMessage && (
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded truncate" title={tool.errorMessage}>
                    {tool.errorMessage}
                  </div>
                )}
                
                {tool.lastUsed && (
                  <div className="text-xs text-gray-500">
                    Last used: {new Date(tool.lastUsed).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 