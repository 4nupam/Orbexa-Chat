import { useState } from "react";
import "./App.css"
export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAstro = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:5000/api/askOrbexa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      if (!res.ok) {
        if (res.status === 429) {
          setAnswer("🚫 Rate limit exceeded . Please Visit Later !!.");
        } else {
          setAnswer(`Error: ${res.status} ${res.statusText}`);
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      setAnswer(data.answer || "No answer received.");
    } catch (err) {
      setAnswer("Error fetching answer. Please try again.");
      console.error(err);
    }

    setLoading(false);
    setQuestion(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      
      {/* Header */}
      <header className="p-4 text-center text-2xl sm:text-3xl font-bold border-b border-purple-700 bg-black/40 backdrop-blur-md">
        ✨ Orbexa Chat ✨
      </header>

      {/* Chat Area */}
     <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col items-center justify-center">
  {answer ? (
    <div className="p-5 sm:p-6 bg-gradient-to-br from-purple-800/80 via-purple-900/80 to-black/80 rounded-2xl shadow-xl border border-purple-600 max-w-2xl w-full animate-fadeIn">
      <p className="text-sm sm:text-base leading-relaxed text-purple-100">
        {answer}
      </p>
    </div>
  ) : (
    <div className="p-8 sm:p-10 bg-gradient-to-br from-purple-800/50 via-purple-900/50 to-black/60 rounded-3xl shadow-lg border border-purple-500 text-center max-w-xl animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-wide mb-3">
        Dominate • Innovate • Elevate
      </h2>
      <p className="text-base sm:text-lg text-purple-100 leading-relaxed italic">
        Design that stops time — Development that moves mountains.
      </p>
      <div className="mt-4 flex justify-center">
        <span className="h-1 w-16 bg-purple-500 rounded-full"></span>
      </div>
    </div>
  )}
</main>


      {/* Input Area (Fixed at Bottom) */}
      <div className="p-4 border-t border-purple-700 bg-black/50 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto w-full">
          <textarea
            className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-600 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={2}
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={askAstro}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500 disabled:bg-gray-600 text-sm sm:text-base font-semibold shadow-lg transition-all"
          >
            {loading ? "🔮 Thinking..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
}
