import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 onClick={() => navigate("/")} className="text-2xl font-bold text-blue-600 cursor-pointer">
          E-Learning
        </h1>

        <div className="flex gap-4 items-center flex-wrap">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
          <Link to="/live-classes" className="hover:text-blue-600">Live Classes</Link>

          {token && (
            <>
              <Link to="/add-course" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Course</Link>
              <Link to="/add-live-class" className="bg-purple-600 text-white px-4 py-2 rounded-lg">Create Live</Link>
            </>
          )}

          {!token ? (
            <>
              <Link to="/register" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">Register</Link>
              <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg">Login</Link>
            </>
          ) : (
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
