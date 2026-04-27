import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feature from "./pages/Feauture";
import AddCourse from "./pages/Addcourse";
import EditCourse from "./pages/Editcourse";
import SingleCourse from "./pages/Singelcourse";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import LiveClasses from "./pages/Liveclasses";
import AddLiveClass from "./pages/Addliveclass";
import Admindashboard from "./pages/Admindashboard";
import Instructordashboard from "./pages/Instructordashboard";
import Studentdashboard from "./pages/Studentdashboard";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/f" element={<Feature />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/edit-course/:id" element={<EditCourse />} />
          <Route path="/course/:id" element={<SingleCourse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/live-classes" element={<LiveClasses />} />
          <Route path="/add-live-class" element={<AddLiveClass />} />
           <Route path="/admin-dashboard" element={<Admindashboard />} />
           <Route path="/instructor-dashboard" element={<Instructordashboard />} />
           <Route path="/student-dashboard" element={<Studentdashboard />} />
           <Route path="/chat" element={<Chat/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
