import { Anthropic } from '@anthropic-ai/sdk';
import { OpenAI } from 'openai';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are FlightsVsFares's AI Trip Advisor — a concise, practical flight search strategist.

When a user describes their trip:
1. Give an honest budget reality check for their route and dates
2. Suggest the best booking window (specific date ranges if possible)
3. Offer one routing hack or nearby airport alternative if relevant
4. Keep your response under 4 sentences. Be direct, not fluffy.

Format: use **bold** for key labels like Budget check:, Best window:, Hack:
Never recommend specific airlines. Never promise exact prices. Always caveat with "typically" or "historically".`;

const MAX_TOKENS = 1000;
const PROVIDER   = process.env.AI_PROVIDER ?? 'anthropic';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai    = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const deepseek  = new OpenAI({ apiKey: process.env.DEEPSEEK_API_KEY, baseURL: 'https://api.deepseek.com' });
const gemini    = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const ollama    = new OpenAI({ apiKey: 'ollama', baseURL: 'http://localhost:11434/v1' });

async function callAnthropic(message) {
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: message }],
  });
  return res.content[0].text;
}

async function callOpenAICompatible(client, model, message) {
  const res = await client.chat.completions.create({
    model,
    max_tokens: MAX_TOKENS,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user',   content: message },
    ],
  });
  return res.choices[0].message.content;
}

async function callGemini(message) {
  const res = await gemini.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: message,
    config: { systemInstruction: SYSTEM_PROMPT, maxOutputTokens: MAX_TOKENS },
  });
  return res.text;
}

const providers = {
  anthropic: (msg) => callAnthropic(msg),
  openai:    (msg) => callOpenAICompatible(openai,   'gpt-4o',                               msg),
  deepseek:  (msg) => callOpenAICompatible(deepseek, 'deepseek-chat',                        msg),
  gemini:    (msg) => callGemini(msg),
  ollama:    (msg) => callOpenAICompatible(ollama,   process.env.OLLAMA_MODEL ?? 'llama3.3', msg),
};

export async function askFlightAdvisor(message) {
  const handler = providers[PROVIDER];
  if (!handler) throw new Error(`Unknown AI_PROVIDER: "${PROVIDER}". Must be anthropic, openai, deepseek, gemini, or ollama.`);
  return handler(message);
}
