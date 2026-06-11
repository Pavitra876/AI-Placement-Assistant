const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export async function askGemini(userPrompt, systemContext = '') {
  const fullPrompt = systemContext
    ? `${systemContext}\n\nStudent question: ${userPrompt}`
    : userPrompt;

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }]
    })
  });
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}