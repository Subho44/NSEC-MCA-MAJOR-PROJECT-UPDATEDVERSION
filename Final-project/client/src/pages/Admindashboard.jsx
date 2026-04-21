import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5500/api/admin/dashboard").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">Users: {data.totalUsers}</div>
        <div className="bg-white shadow rounded-xl p-6">Courses: {data.totalCourses}</div>
        <div className="bg-white shadow rounded-xl p-6">Orders: {data.totalOrders}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;