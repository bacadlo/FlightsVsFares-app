import { askFlightAdvisor } from '@/lib/AIapis';

export async function POST(req) {
  const { message } = await req.json();
  if (!message?.trim()) return Response.json({ error: 'message is required' }, { status: 400 });
  try {
    const reply = await askFlightAdvisor(message);
    return Response.json({ reply });
  } catch (err) {
    console.error('[/api/chat]', err);
    return Response.json({ error: 'AI provider error' }, { status: 500 });
  }
}
