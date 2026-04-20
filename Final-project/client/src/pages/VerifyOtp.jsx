import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const email = location.state?.email || "";

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:5500/api/auth/verify-otp", { email, otp });
      alert("OTP verified successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Verify failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold text-indigo-600">Verify OTP</h2>
        <p className="text-gray-600 text-sm">OTP sent to: {email}</p>
        <input type="text" placeholder="Enter OTP" className="w-full border p-3 rounded-lg text-center" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={handleVerify} className="w-full bg-indigo-600 text-white py-3 rounded-lg">Verify OTP</button>
      </div>
    </div>
  );
};

export default VerifyOtp;
