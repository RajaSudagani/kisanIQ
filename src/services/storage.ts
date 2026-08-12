import { AnalysisResponse } from '../../server/types.js';

const STORAGE_KEY = 'kisaniq_field_history_v1';

export function saveAnalysisToHistory(analysis: AnalysisResponse): void {
  try {
    const existing = getAnalysisHistory();
    // Filter duplicates by ID
    const updated = [analysis, ...existing.filter(item => item.id !== analysis.id)].slice(0, 20); // Keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save analysis to localStorage', e);
  }
}

export function getAnalysisHistory(): AnalysisResponse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clearAnalysisHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
