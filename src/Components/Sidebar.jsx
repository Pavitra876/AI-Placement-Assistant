export default function Sidebar({ active, onSelect }) {
  const navItems = [
    { id: 'ask', label: 'Ask AI', icon: '🤖' },
    { id: 'interview', label: 'Interview Prep', icon: '📋' },
    { id: 'resume', label: 'Resume Analyzer', icon: '📄' },
    { id: 'roadmap', label: 'Skill Roadmap', icon: '🗺️' },
    { id: 'companies', label: 'Companies', icon: '🏢' },
  ]

  return (
    <div className="w-56 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-4">
      <div className="mb-8">
        <h1 className="text-purple-400 text-lg font-semibold">PlaceAI</h1>
        <p className="text-gray-500 text-xs mt-1">Placement Assistant</p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors
              ${active === item.id
                ? 'bg-purple-700 text-white font-medium'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}