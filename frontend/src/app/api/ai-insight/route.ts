import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { model_type, model_results, user_notes } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ insight: "AI insights not configured. Please set your Groq API key." }, { status: 200 });
    }

    const notes_section = user_notes ? `\n        ANALYST NOTES:\n        ${user_notes}\n` : "";

    const prompt = `
        Analyze the following ${model_type} simulation results and provide a professional financial editorial insight.
        ${notes_section}
        DATA TO ANALYZE:
        ${JSON.stringify(model_results, null, 2)}

        REQUIREMENTS:
        1. Reference at least 2 specific numbers from the results (e.g., Final Amount, NPV, Mean Value, or specific yearly cash flows).
        2. Explain the significance of these numbers in a professional, editorial tone.
        3. Do NOT provide generic financial advice or "random quotes". Focus strictly on the data provided.
        4. If Analyst Notes are provided, incorporate their context or perspective into your analysis.
        5. Maximum 100 words.
        6. Tone: Premium financial newspaper (The Economist / Financial Times).
        `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a professional financial analyst writing premium editorial insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const insight = data.choices[0]?.message?.content?.trim() || "Unable to generate insight.";

    return NextResponse.json({
      insight,
      generated_at: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("AI Insight Route Error:", error);
    return NextResponse.json({ error: "Unable to generate insight: " + error.message }, { status: 500 });
  }
}
