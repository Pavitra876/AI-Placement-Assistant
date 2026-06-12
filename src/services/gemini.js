export async function askGemini(userPrompt, systemContext = '') {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_KEY}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'Placement Assistant'
    },
    body: JSON.stringify({
      model: 'openrouter/auto',
      messages: [
        { role: 'system', content: systemContext || 'You are a placement assistant for MCA and engineering students in India. Give structured practical answers.' },
        { role: 'user', content: userPrompt }
      ]
    })
  });
  const data = await res.json();
  console.log('Response:', JSON.stringify(data));
  return data.choices[0].message.content;
}