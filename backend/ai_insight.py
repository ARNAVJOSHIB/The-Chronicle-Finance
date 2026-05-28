from groq import Groq
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime
import json
import os
from db import get_db_connection

# AI Insight Generator
class AIInsightGenerator:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if self.api_key:
            self.client = Groq(api_key=self.api_key)

    def generate_insight(self, model_results: Dict[str, Any], model_type: str) -> str:
        """
        Generate financial insights based on model results using Groq
        """
        if not self.api_key:
            return "AI insights not configured. Please set your Groq API key."

        prompt = f"""
        Analyze the following {model_type} simulation results and provide a professional financial editorial insight.
        
        DATA TO ANALYZE:
        {json.dumps(model_results, indent=2)}

        REQUIREMENTS:
        1. Reference at least 2 specific numbers from the results (e.g., Final Amount, NPV, Mean Value, or specific yearly cash flows).
        2. Explain the significance of these numbers in a professional, editorial tone.
        3. Do NOT provide generic financial advice or "random quotes". Focus strictly on the data provided.
        4. Maximum 100 words.
        5. Tone: Premium financial newspaper (The Economist / Financial Times).
        """

        try:
            response = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a professional financial analyst writing premium editorial insights.",
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model="llama-3.1-8b-instant",
                temperature=0.7,
                max_tokens=200
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Unable to generate insight: {str(e)}"

# Create a router for AI insights
ai_insight_router = APIRouter()

class AIInsightRequest(BaseModel):
    model_type: str
    model_results: Dict[str, Any]
    user_id: Optional[int] = None
    simulation_id: Optional[int] = None

class AIInsightResponse(BaseModel):
    insight: str
    generated_at: datetime

# Initialize the AI insight generator
ai_insight_generator = AIInsightGenerator()

@ai_insight_router.post("/ai-insight", response_model=AIInsightResponse)
async def generate_ai_insight(request: AIInsightRequest):
    insight = ai_insight_generator.generate_insight(
        request.model_results,
        request.model_type
    )

    return AIInsightResponse(
        insight=insight,
        generated_at=datetime.now()
    )