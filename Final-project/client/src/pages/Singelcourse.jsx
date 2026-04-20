import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5500/api/courses/${id}`).then((res) => setCourse(res.data));
  }, [id]);

  if (!course) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={course.images?.[activeImage] ? `http://localhost:5500/uploads/${course.images[activeImage]}` : "https://via.placeholder.com/600x400?text=No+Image"}
            alt={course.title}
            className="w-full h-80 object-cover rounded-2xl shadow-md mb-4"
          />

          {course.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {course.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5500/uploads/${img}`}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    activeImage === index ? "border-blue-600" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">{course.title}</h2>
            <p className="mb-2 text-gray-700"><span className="font-semibold">Instructor:</span> {course.instructor}</p>
            <p className="mb-2 text-gray-700"><span className="font-semibold">Duration:</span> {course.duration}</p>
            <p className="mb-2 text-gray-700"><span className="font-semibold">Category:</span> {course.category}</p>
            <p className="mb-4 text-gray-700"><span className="font-semibold">Description:</span> {course.description}</p>
            <div className="text-3xl font-bold text-green-600 mb-6">₹{course.price}</div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
