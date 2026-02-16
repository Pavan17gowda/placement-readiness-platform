// localStorage utilities for history management

const STORAGE_KEY = 'placement_analysis_history';

export function saveAnalysis(analysisData) {
  try {
    const history = getHistory();
    const entry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      company: analysisData.company || '',
      role: analysisData.role || '',
      jdText: analysisData.jdText || '',
      extractedSkills: analysisData.extractedSkills || {},
      checklist: analysisData.checklist || {},
      plan: analysisData.plan || [],
      questions: analysisData.questions || [],
      readinessScore: analysisData.readinessScore || 0,
      companyIntel: analysisData.companyIntel || null,
      skillConfidenceMap: analysisData.skillConfidenceMap || {},
      liveReadinessScore: analysisData.liveReadinessScore || analysisData.readinessScore || 0
    };
    
    history.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return entry;
  } catch (error) {
    console.error('Failed to save analysis:', error);
    return null;
  }
}

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Validate and filter corrupted entries
    const valid = parsed.filter(entry => {
      return entry && 
             typeof entry.id === 'string' && 
             typeof entry.jdText === 'string' &&
             entry.jdText.length > 0;
    });
    
    return valid;
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function getAnalysisById(id) {
  try {
    const history = getHistory();
    return history.find(item => item.id === id);
  } catch (error) {
    console.error('Failed to get analysis:', error);
    return null;
  }
}

export function updateAnalysis(id, updates) {
  try {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
      history[index] = { 
        ...history[index], 
        ...updates,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return history[index];
    }
    return null;
  } catch (error) {
    console.error('Failed to update analysis:', error);
    return null;
  }
}

export function deleteAnalysis(id) {
  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete analysis:', error);
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}
