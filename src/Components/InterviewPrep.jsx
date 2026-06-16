import { useState } from 'react'
import { askGemini } from '../services/gemini'

const companies = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'HCL']
const roles = ['Software Developer', 'Web Developer', 'Data Analyst', 'Testing']

export default function InterviewPrep() {
  const [company, setCompany] = useState('TCS')
  const [role, setRole] = useState('Software Developer')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    setResponse('')
    try {
      const reply = await askGemini(
        `Generate 10 interview questions for an MCA fresher applying to ${company} for ${role} role. Include 5 technical and 5 HR questions with brief answers.`,
        'You are a placement assistant for MCA students in India. Give structured practical answers.'
      )
      setResponse(reply)
    } catch (e) {
      setResponse('Error connecting to AI. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-400 mb-2">Interview Preparation</h2>
      <p className="text-gray-400 text-sm mb-6">Get company-specific interview questions instantly</p>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="text-gray-400 text-xs mb-1 block">Select Company</label>
          <select
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            {companies.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-gray-400 text-xs mb-1 block">Select Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-purple-700 hover:bg-purple-600 disabled:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {loading ? 'Generating...' : 'Generate Questions'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-5">
          <p className="text-purple-400 text-xs font-medium mb-3">Interview Questions for {company}</p>
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  )
}