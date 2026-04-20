const Feature = () => {
  const features = [
    "Email OTP Authentication",
    "Course Upload with Multiple Images",
    "Search and View Courses",
    "Cart and COD Order System",
    "Live Class Integration",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Features</h2>
        <ul className="space-y-3 text-gray-700">
          {features.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feature;
