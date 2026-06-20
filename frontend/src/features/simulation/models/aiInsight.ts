import type { ModelType } from '../types';

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
  const response = await fetch('/api/ai-insight', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate AI insight`);
  }

  return response.json();
}
