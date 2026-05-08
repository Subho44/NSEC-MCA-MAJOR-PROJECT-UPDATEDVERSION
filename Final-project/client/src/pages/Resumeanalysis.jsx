import { useState } from "react";
import axios from "axios";

function Resumeanalysis() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    career: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const inputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateResume = async () => {
    if (!form.name || !form.email || !form.career || !form.skills) {
      alert("Name, Email, Career Goal and Skills required");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await axios.post("http://localhost:5500/api/resume", form);

      setResult(res.data.result);
    } catch (error) {
      setResult(
        error.response?.data?.message ||
          "Server error. Please check backend and Groq API key."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["name", "Full Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["location", "Location"],
    ["career", "Career Goal Example: MERN Stack Developer"],
    ["skills", "Skills Example: HTML, CSS, JS, React, Node, MongoDB"],
    ["education", "Education Details"],
    ["experience", "Experience / Internship Details"],
    ["projects", "Project Details"],
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-8 shadow-xl mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            ATS Friendly Resume Builder
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Enter Your Details
            </h2>

            <div className="space-y-4">
              {fields.map(([name, label]) =>
                name === "skills" ||
                name === "education" ||
                name === "experience" ||
                name === "projects" ? (
                  <textarea
                    key={name}
                    name={name}
                    placeholder={label}
                    value={form[name]}
                    onChange={inputChange}
                    rows="3"
                    className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    key={name}
                    name={name}
                    placeholder={label}
                    value={form[name]}
                    onChange={inputChange}
                    className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )
              )}
            </div>

            <button
              onClick={generateResume}
              disabled={loading}
              className="w-full mt-6 bg-blue-700 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Generate ATS Resume"}
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              AI Resume Output
            </h2>

            <div className="bg-slate-50 border rounded-2xl p-5 min-h-[600px] whitespace-pre-wrap leading-7 text-slate-800">
              {loading && "AI is creating your ATS-friendly resume..."}

              {!loading &&
                !result &&
                "Your ATS resume, score, suggestions and course roadmap will show here."}

              {!loading && result}
            </div>

            {result && (
              <button
                onClick={() => window.print()}
                className="w-full mt-5 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800"
              >
                Print / Save as PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumeanalysis;