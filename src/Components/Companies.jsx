import { useState } from 'react'
import { askGemini } from '../services/gemini'

const companies = [
  { name: 'TCS', icon: '🔵' },
  { name: 'Infosys', icon: '🟢' },
  { name: 'Wipro', icon: '🟡' },
  { name: 'Accenture', icon: '🟣' },
  { name: 'Cognizant', icon: '🔴' },
  { name: 'HCL', icon: '🟠' },
  { name: 'Tech Mahindra', icon: '⚫' },
  { name: 'Capgemini', icon: '🔷' },
]

export default function Companies() {
  const [selected, setSelected] = useState(null)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSelect(company) {
    setSelected(company)
    setLoading(true)
    setResponse('')
    try {
      const reply = await askGemini(
        `Give a complete placement guide for ${company} for MCA freshers. Include: recruitment process, rounds, topics to prepare, difficulty level, salary, and top tips to crack it.`,
        'You are a placement assistant for MCA students in India. Give detailed company-specific placement info.'
      )
      setResponse(reply)
    } catch (e) {
      setResponse('Error connecting to AI. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-400 mb-2">Company-wise Preparation</h2>
      <p className="text-gray-400 text-sm mb-6">Click any company to get full placement guide</p>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {companies.map(c => (
          <button
            key={c.name}
            onClick={() => handleSelect(c.name)}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors
              ${selected === c.name
                ? 'border-purple-500 bg-purple-900 text-white'
                : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-purple-500'
              }`}
          >
            <div className="text-2xl mb-1">{c.icon}</div>
            {c.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-purple-400 text-sm">Loading {selected} placement guide...</p>
        </div>
      )}

      {response && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-purple-400 text-xs font-medium mb-3">{selected} — Placement Guide</p>
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  )
}