import { useState } from "react";
import axios from "axios";

function Chatboat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please type your interest");
      return;
    }

    setChat((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5500/api/recommend-course", {
        message,
      });

      setChat((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
      setMessage("");
    } catch {
      setChat((prev) => [...prev, { sender: "bot", text: "Server error" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">AI Course Finder</h1>
          <p className="mt-2 text-white/80">
            Smart course recommendation using Groq AI
          </p>
        </div>

        <div className="h-[450px] overflow-y-auto bg-white/20 rounded-2xl p-5 mt-6">
          {chat.length === 0 && (
            <div className="text-center text-white/90 mt-36">
              Ask: Which course is best for frontend development?
            </div>
          )}

          {chat.map((item, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-2xl max-w-[85%] ${
                item.sender === "user"
                  ? "bg-white text-indigo-700 ml-auto"
                  : "bg-black/40 text-white mr-auto"
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                {item.text}
              </pre>
            </div>
          ))}

          {loading && (
            <div className="bg-black/40 text-white p-4 rounded-2xl w-fit">
              AI is thinking...
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <input
            className="flex-1 px-5 py-4 rounded-2xl outline-none bg-white text-gray-800"
            placeholder="Tell me your interest..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900"
          >
            Recommend
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatboat;