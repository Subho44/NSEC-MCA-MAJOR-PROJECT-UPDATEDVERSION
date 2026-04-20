import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseForm from "../components/Courseform";
import { useNavigate, Link } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      images.forEach((img) => data.append("images", img));

      await axios.post("http://localhost:5500/api/courses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      alert("Course added successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Add course failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-block mb-4 text-blue-600 font-medium">← Back to Home</Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CourseForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handelFile={handleFileChange}
            btnText={loading ? "Adding..." : "Add Course"}
          />

          {previewImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Image Preview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previewImages.map((src, index) => (
                  <img key={index} src={src} alt="preview" className="w-full h-32 object-cover rounded-lg border shadow" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
