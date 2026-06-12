import { useState } from 'react'
import { askGemini } from '../services/gemini'
export default function AskAI() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAsk() {
    if (!question.trim()) return
    setLoading(true)
    setResponse('')
    try {
      const reply = await askGemini(question,
        'You are a placement assistant for MCA and engineering students in India. Give structured, practical answers with aptitude topics, coding topics, interview tips and roadmap where relevant.')
      setResponse(reply)
    } catch (e) {
      setResponse('Error connecting to AI. Check your API key in .env file.')
    }
    setLoading(false)
  }
  console.log('Key:', import.meta.env.VITE_GEMINI_KEY)
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-400 mb-2">Ask AI</h2>
      <p className="text-gray-400 text-sm mb-6">Ask anything about placements, companies, or interview prep</p>

      <textarea
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white text-sm resize-none focus:outline-none focus:border-purple-500 h-28"
        placeholder="e.g. How do I prepare for TCS placement in 30 days?"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-3 bg-purple-700 hover:bg-purple-600 disabled:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-purple-400 text-xs font-medium mb-3">AI Response</p>
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  )
}