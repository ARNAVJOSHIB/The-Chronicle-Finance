import type { ModelType } from '../types';
import { getRandomInsight } from './insightData';

export interface AIInsightRequest {
  model_type: ModelType | string;
  model_results: any;
  user_notes?: string | null;
}

export interface AIInsightResponse {
  insight: string;
  generated_at: string;
}

export async function generateAIInsight(req: AIInsightRequest): Promise<AIInsightResponse> {
  // Simulate a slight delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    insight: getRandomInsight(req.model_type),
    generated_at: new Date().toISOString()
  };
}
