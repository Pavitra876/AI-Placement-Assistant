import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import AskAI from './Components/AskAI'
import InterviewPrep from './Components/InterviewPrep'
import ResumeAnalyzer from './Components/ResumeAnalyzer'
import SkillRoadmap from './Components/SkillRoadmap'
import Companies from './Components/Companies'

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