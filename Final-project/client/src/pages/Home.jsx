import { useEffect, useState } from "react";
import axios from "axios";
import CourseList from "../components/Courselist";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [search, setSearch] = useState("");

  const getCourses = async () => {
    const res = await axios.get("http://localhost:5500/api/courses");
    setCourses(res.data);
    setAllCourses(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim() === "") {
        setCourses(allCourses);
      } else {
        const res = await axios.get(`http://localhost:5500/api/courses/search/${search}`);
        setCourses(res.data);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, allCourses]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/courses/${id}`);
      getCourses();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-10 mb-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-2">E-Learning Platform</h1>
          <p>Explore courses, join live classes, and purchase easily</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <input
            type="text"
            placeholder="Search course by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <CourseList courses={courses} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
