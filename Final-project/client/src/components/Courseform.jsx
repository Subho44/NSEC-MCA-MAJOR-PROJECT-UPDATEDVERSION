const CourseForm = ({
  formData,
  handleChange,
  handleSubmit,
  handelFile,
  btnText,
}) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 text-center">{btnText}</h2>

      <input type="text" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="w-full border p-3 rounded-lg" required />
      <input type="text" name="instructor" placeholder="Instructor Name" value={formData.instructor} onChange={handleChange} className="w-full border p-3 rounded-lg" required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-3 rounded-lg" required />
      <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} className="w-full border p-3 rounded-lg" required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-3 rounded-lg" required />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        className="w-full border p-3 rounded-lg"
        required
      ></textarea>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handelFile}
        className="w-full border p-3 rounded-lg"
      />

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
        {btnText}
      </button>
    </form>
  );
};

export default CourseForm;