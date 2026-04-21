import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [payment, setPayment] = useState("COD");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async () => {
    if (!user) return;
    const res = await axios.get(`http://localhost:5500/api/cart/${user._id}`);
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart?.courses?.reduce((sum, item) => sum + item.price, 0) || 0;

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:5500/api/orders/place", {
        userId: user._id,
        paymentMethod: payment,
      });
      alert("Order placed");
      setCart(null);
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  if (!cart || !cart.courses || cart.courses.length === 0) {
    return <h2 className="text-center text-2xl mt-10">Cart Empty</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Cart</h2>

      {cart.courses.map((item, i) => (
        <div key={i} className="flex justify-between bg-white p-4 mb-3 shadow rounded-xl">
          <div className="flex gap-4">
            <img src={`http://localhost:5500/uploads/${item.image}`} className="w-20 h-20 object-cover rounded" />
            <div>
              <h3>{item.title}</h3>
              <p>₹{item.price}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white p-5 shadow rounded-xl mt-5">
        <h3 className="text-xl font-bold">Total: ₹{total}</h3>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={payment === "COD"} onChange={() => setPayment("COD")} />
            Cash On Delivery
          </label>
        </div>
        <button onClick={placeOrder} className="bg-green-600 text-white px-6 py-2 mt-4 rounded-lg">Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
