import { useState } from 'react'
import { askGemini } from '../services/gemini'

export default function SkillRoadmap() {
  const [company, setCompany] = useState('')
  const [days, setDays] = useState('30')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!company.trim()) {
      alert('Please enter a company name!')
      return
    }
    setLoading(true)
    setResponse('')
    try {
      const reply = await askGemini(
        `Create a ${days}-day placement preparation roadmap for an MCA student targeting ${company}. Format it week by week with daily focus areas, topics to study, and resources.`,
        'You are a placement assistant for MCA students in India. Give a detailed, practical roadmap.'
      )
      setResponse(reply)
    } catch (e) {
      setResponse('Error connecting to AI. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-400 mb-2">Skill Roadmap Generator</h2>
      <p className="text-gray-400 text-sm mb-6">Get a personalized day-by-day preparation plan</p>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="text-gray-400 text-xs mb-1 block">Target Company</label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="e.g. TCS, Infosys, Google..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex-1">
          <label className="text-gray-400 text-xs mb-1 block">Number of Days</label>
          <select
            value={days}
            onChange={e => setDays(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-purple-700 hover:bg-purple-600 disabled:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {loading ? 'Generating...' : 'Generate Roadmap'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-purple-400 text-xs font-medium mb-3">
            {days}-Day Roadmap for {company}
          </p>
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  )
}