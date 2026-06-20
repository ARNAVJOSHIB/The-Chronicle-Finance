import type { SavedSimulation, ModelType } from '../types';

const STORAGE_KEY = 'chronicle:simulations';
const COUNTER_KEY = 'chronicle:sim_counter';

function getSimulations(): SavedSimulation[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSimulations(sims: SavedSimulation[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sims));
  }
}

function getNextId(): number {
  if (typeof window === 'undefined') return 1;
  const counter = localStorage.getItem(COUNTER_KEY);
  const nextId = counter ? parseInt(counter, 10) + 1 : 1;
  localStorage.setItem(COUNTER_KEY, nextId.toString());
  return nextId;
}

export const simulationStore = {
  saveSimulation: async (data: { model_type: ModelType; parameters: any; results: any; user_id?: string | null }): Promise<SavedSimulation> => {
    const sims = getSimulations();
    const newSim: SavedSimulation = {
      id: getNextId(),
      user_id: data.user_id || null,
      model_type: data.model_type,
      parameters: data.parameters,
      results: data.results,
      notes: null,
      created_at: new Date().toISOString()
    };
    sims.push(newSim);
    saveSimulations(sims);
    return newSim;
  },

  getSimulation: async (id: number): Promise<SavedSimulation> => {
    const sims = getSimulations();
    const sim = sims.find(s => s.id === id);
    if (!sim) throw new Error('Simulation not found');
    return sim;
  },

  getUserSimulations: async (userId?: string): Promise<SavedSimulation[]> => {
    const sims = getSimulations();
    // Local storage is per-browser, but we keep the API contract
    const filtered = sims.filter(s => !userId || s.user_id === userId || !s.user_id);
    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getAllSimulations: async (modelType?: ModelType): Promise<SavedSimulation[]> => {
    const sims = getSimulations();
    const filtered = modelType ? sims.filter(s => s.model_type === modelType) : sims;
    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  saveNotes: async (simulationId: number, notes: string): Promise<void> => {
    const sims = getSimulations();
    const index = sims.findIndex(s => s.id === simulationId);
    if (index === -1) throw new Error('Simulation not found');
    sims[index].notes = notes;
    saveSimulations(sims);
  }
};
