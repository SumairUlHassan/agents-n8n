import Groq from "groq-sdk";

export async function callGroqLLM<T = any>(
  systemPrompt: string,
  userPrompt: string,
  model = "llama-3.3-70b-versatile"
): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured in process.env");
  }

  const groq = new Groq({ apiKey });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content || "{}";
    return JSON.parse(content) as T;
  } catch (err) {
    console.warn(`Groq primary model ${model} failed, trying fallback model...`, err);
    try {
      const fallbackCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        response_format: { type: "json_object" },
      });
      const content = fallbackCompletion.choices[0]?.message?.content || "{}";
      return JSON.parse(content) as T;
    } catch (fallbackErr) {
      console.error("Groq LLM call error:", fallbackErr);
      throw new Error(`Groq Live AI Execution Error: ${fallbackErr instanceof Error ? fallbackErr.message : "API Call failed"}`);
    }
  }
}
