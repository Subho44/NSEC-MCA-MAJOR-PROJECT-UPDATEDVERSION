import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (location.state?.from === "cart" && location.state?.course) {
        await axios.post("http://localhost:5500/api/cart/add", {
          userId: res.data.user._id,
          course: location.state.course,
        });
        alert("Login successful and course added to cart");
        navigate("/cart");
      } else {
        alert("Login successful");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-green-600">Login</h2>
        <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full border p-3 rounded-lg" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-green-600 text-white py-3 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
