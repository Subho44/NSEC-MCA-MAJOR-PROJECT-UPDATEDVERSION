import { useEffect, useState } from "react";
import axios from "axios";
import CourseForm from "../components/Courseform";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "instructor")) {
      alert("Only admin or instructor can edit course");
      navigate("/login");
      return;
    }

    getSingleCourse();
  }, [id]);

  const getSingleCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5500/api/courses/${id}`);
      const data = res.data;

      setFormData({
        title: data.title || "",
        instructor: data.instructor || "",
        price: data.price || "",
        duration: data.duration || "",
        category: data.category || "",
        description: data.description || "",
      });

      setOldImages(data.images || []);
    } catch (error) {
      alert("Failed to load course");
    }
  };

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
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => data.append("images", img));

      await axios.put(`http://localhost:5500/api/courses/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      alert("Course updated successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <CourseForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handelFile={handleFileChange}
          btnText="Update Course"
        />

        {previewImages.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg border"
              />
            ))}
          </div>
        ) : (
          oldImages.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {oldImages.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5500/uploads/${img}`}
                  alt="old"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EditCourse;