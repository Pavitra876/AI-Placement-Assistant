import { useState } from 'react'
import { askGemini } from '../services/gemini'

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAnalyze() {
    if (!resume.trim()) {
      alert('Please paste your resume text first!')
      return
    }
    setLoading(true)
    setResponse('')
    try {
      const reply = await askGemini(
        `Analyze this resume for an MCA student applying to IT companies. Give: strengths, weaknesses, missing sections, and 5 improvement tips.\n\nResume:\n${resume}`,
        'You are a placement assistant for MCA students in India. Give honest, structured resume feedback.'
      )
      setResponse(reply)
    } catch (e) {
      setResponse('Error connecting to AI. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-400 mb-2">Resume Analyzer</h2>
      <p className="text-gray-400 text-sm mb-6">Paste your resume and get instant AI feedback</p>

      <textarea
        value={resume}
        onChange={e => setResume(e.target.value)}
        placeholder="Paste your resume text here..."
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white text-sm resize-none focus:outline-none focus:border-purple-500 h-48"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-3 bg-purple-700 hover:bg-purple-600 disabled:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-purple-400 text-xs font-medium mb-3">Resume Feedback</p>
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  )
}