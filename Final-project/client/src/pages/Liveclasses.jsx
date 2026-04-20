import { useEffect, useState } from "react";
import axios from "axios";

const LiveClasses = () => {
  const [classes, setClasses] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5500/api/live");
    setClasses(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">Live Classes</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div key={c._id} className="bg-white p-5 shadow rounded-xl">
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p>Instructor: {c.instructor}</p>
            <p>Date: {c.date}</p>
            <p>Time: {c.time}</p>
            <a href={c.meetingLink} target="_blank" rel="noreferrer" className="block bg-green-600 text-white text-center py-2 mt-3 rounded">
              Join Class
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
