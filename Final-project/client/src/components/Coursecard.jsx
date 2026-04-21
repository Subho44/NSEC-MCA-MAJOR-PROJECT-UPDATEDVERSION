import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CourseCard = ({ course, onDelete }) => {
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = async () => {
    const cartCourse = {
      courseId: course._id,
      title: course.title,
      price: course.price,
      image: course.images?.[0] || "",
    };

    if (!user) {
      navigate("/login", {
        state: {
          from: "cart",
          course: cartCourse,
        },
      });
      return;
    }

    if (user.role !== "student") {
      alert("Only students can add to cart");
      return;
    }

    try {
      await axios.post("http://localhost:5500/api/cart/add", {
        userId: user._id,
        course: cartCourse,
      });
      alert("Added to cart");
      navigate("/cart");
    } catch (error) {
      alert("Add to cart failed");
    }
  };

  const imageUrl =
    course.images && course.images.length > 0
      ? `http://localhost:5500/uploads/${course.images[activeImage]}`
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={course.title}
          className="w-full h-52 object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          ₹{course.price}
        </span>
      </div>

      {course.images?.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {course.images.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5500/uploads/${img}`}
              onMouseEnter={() => setActiveImage(i)}
              className={`w-14 h-14 rounded-md object-cover cursor-pointer border ${
                activeImage === i ? "border-blue-600" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      <div className="p-4">
        <h2 className="font-bold text-lg">{course.title}</h2>
        <p className="text-sm text-gray-500">👨‍🏫 {course.instructor}</p>
        <p className="text-sm text-gray-500 mb-2">⏱ {course.duration}</p>
        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
          {course.category}
        </span>

        <div className="flex gap-2 mt-4 flex-wrap">
          {user?.role === "student" && (
            <>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Buy Now
              </button>
            </>
          )}

          {(user?.role === "admin" || user?.role === "instructor") && onDelete && (
            <button
              onClick={() => onDelete(course._id)}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;