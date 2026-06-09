import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {
    if (!question) return;

    setAnswer(
      `You asked: "${question}"

Suggested Placement Preparation:

1. Learn Aptitude
2. Practice SQL
3. Learn Python
4. Build Projects
5. Prepare HR Questions
6. Practice Mock Interviews`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-cyan-500/20">

        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-3">
          🚀 AI Placement Assistant
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Ask anything about placements, interviews, skills, projects and careers.
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Ask a placement question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none"
          />

          <button
            onClick={askAI}
            className="px-6 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold"
          >
            Ask AI
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 min-h-[250px]">
          <h2 className="text-cyan-300 text-xl font-semibold mb-3">
            AI Response
          </h2>

          <pre className="whitespace-pre-wrap text-slate-200">
            {answer || "Your AI response will appear here..."}
          </pre>
        </div>

      </div>
    </div>
  );
}

export default App;