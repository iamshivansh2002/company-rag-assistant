import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

export default function App() {
  // Chat messages history
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm the TechNova HR Assistant. Ask me anything about company policies." }
  ]);
  const [input, setInput] = useState("");       // Current input value
  const [loading, setLoading] = useState(false); // Show "Thinking..." while waiting for response
  const [showSuggestions, setShowSuggestions] = useState(true); // Hide suggestions after first message
  const bottomRef = useRef(null); // Used to auto-scroll to latest message

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Send message to backend and get response
  async function sendMessage(text) {
    const question = text || input;
    if (!question.trim()) return;

    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    // Call backend RAG endpoint
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    setLoading(false);
  }

  // Quick suggestion buttons shown at start
  const suggestions = [
    "How many sick leaves do I get?",
    "What are the working hours?",
    "How does the promotion policy work?",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-[640px] flex flex-col h-[580px] bg-white rounded-2xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-200 flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-green-500" /> {/* Online indicator */}
          <span className="font-medium text-sm">TechNova HR Assistant</span>
          <span className="text-xs text-gray-400">Powered by company policy</span>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-none">
          {messages.map((m, i) => (
            <div
              key={i}
              // User messages align right, bot messages align left
              className={`flex gap-2.5 items-end ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar — HR or You */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0
                  ${m.role === "bot" ? "bg-gray-100 text-gray-500" : "bg-blue-600 text-white"}`}
              >
                {m.role === "bot" ? "HR" : "You"}
              </div>

              {/* Message bubble — bot renders markdown, user renders plain text */}
              <div
                className={`max-w-[75%] px-3.5 py-2.5 text-sm leading-relaxed
                  ${m.role === "bot"
                    ? "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm"
                    : "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                  }`}
              >
                {m.role === "bot" ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text}
              </div>
            </div>
          ))}

          {/* Loading indicator while waiting for backend */}
          {loading && (
            <div className="flex gap-2.5 items-end">
              <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] font-medium">
                HR
              </div>
              <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-gray-100 text-sm text-gray-400">
                Thinking...
              </div>
            </div>
          )}

          {/* Invisible div to scroll into view */}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips — only shown before first message */}
        {showSuggestions && (
          <div className="flex gap-2 flex-wrap px-5 pb-3">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-gray-200 flex gap-2 items-center">
          <input
            className="flex-1 px-3.5 py-2.5 rounded-full border border-gray-200 text-sm outline-none font-sans focus:border-blue-400 transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter key
            placeholder="Ask a policy question..."
          />
          {/* Send button */}
          <button
            onClick={() => sendMessage()}
            className="w-9 h-9 rounded-full bg-blue-600 border-none cursor-pointer flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}



