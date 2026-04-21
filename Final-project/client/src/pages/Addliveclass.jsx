import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLiveClass = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", instructor: "", date: "", time: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/live", form);
      alert("Live class created");
      navigate("/live-classes");
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-purple-600">Create Live Class</h2>
        <input type="text" placeholder="Class Title" className="w-full border p-3 rounded-lg" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="text" placeholder="Instructor" className="w-full border p-3 rounded-lg" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
        <input type="date" className="w-full border p-3 rounded-lg" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="time" className="w-full border p-3 rounded-lg" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg">Create Live Class</button>
      </form>
    </div>
  );
};

export default AddLiveClass;
