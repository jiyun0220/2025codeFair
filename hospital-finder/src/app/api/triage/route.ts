import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: Array<{ role: 'system'|'user'|'assistant'; content: string }>; };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
    }

    const system = {
      role: 'system',
      content: [
        'You are a concise symptom triage assistant for an Emergency Room finder app in Korea.',
        'Always include a short safety disclaimer that this is not medical advice.',
        'Ask focused follow-up questions (duration, severity, age, key symptoms, risk factors).',
        'If red-flag symptoms are present (chest pain, stroke signs, severe bleeding, anaphylaxis, severe breathing difficulty, altered mental status), advise immediate ER visit.',
        'Otherwise, give a short recommendation: ER now / see clinic soon / home care with watchouts.',
        'Use Korean. Keep each reply under 6 sentences. Bullet points preferred.'
      ].join('\n')
    };

    const payload = {
      model: 'gpt-4o-mini',
      messages: [system, ...(messages || [])],
      temperature: 0.2,
      max_tokens: 400,
    };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: 'Upstream error', detail: text }, { status: 500 });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ content });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
