import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Token cost calculation utilities
export const TOKEN_COSTS = {
  'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
  'gpt-3.5-turbo': { input: 0.0015, output: 0.002 }, // per 1K tokens
  'claude-3-opus': { input: 0.015, output: 0.075 }, // per 1K tokens
  'claude-3-sonnet': { input: 0.003, output: 0.015 }, // per 1K tokens
  'claude-3-haiku': { input: 0.00025, output: 0.00125 }, // per 1K tokens
} as const;

export function calculateTokenCost(
  model: keyof typeof TOKEN_COSTS,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = TOKEN_COSTS[model];
  const inputCost = (inputTokens / 1000) * costs.input;
  const outputCost = (outputTokens / 1000) * costs.output;
  return inputCost + outputCost;
}

export function formatCost(cost: number): string {
  if (cost < 0.01) {
    return `$${(cost * 1000).toFixed(2)}m`; // millicents
  }
  return `$${cost.toFixed(4)}`;
}

// Text formatting utilities
export function formatTimestamp(timestamp: string | Date): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
