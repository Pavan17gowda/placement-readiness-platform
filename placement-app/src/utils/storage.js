// localStorage utilities for history management

const STORAGE_KEY = 'placement_analysis_history';

export function saveAnalysis(analysisData) {
  const history = getHistory();
  const entry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...analysisData
  };
  
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return entry;
}

export function getHistory() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getAnalysisById(id) {
  const history = getHistory();
  return history.find(item => item.id === id);
}

export function deleteAnalysis(id) {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
