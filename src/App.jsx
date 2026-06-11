import { useState } from 'react'
import Sidebar from './components/Sidebar'
import AskAI from './components/AskAI'
import InterviewPrep from './components/InterviewPrep'
import ResumeAnalyzer from './components/ResumeAnalyzer'
import SkillRoadmap from './components/SkillRoadmap'
import Companies from './components/Companies'

function App() {
  const [tab, setTab] = useState('ask')

  const pages = {
    ask: <AskAI />,
    interview: <InterviewPrep />,
    resume: <ResumeAnalyzer />,
    roadmap: <SkillRoadmap />,
    companies: <Companies />
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar active={tab} onSelect={setTab} />
      <main className="flex-1 overflow-y-auto p-6">
        {pages[tab]}
      </main>
    </div>
  )
}

export default App