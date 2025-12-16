import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { clearCart } = useContext(CartContext); // Use clearCart context
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, product, rentType, duration, totalAmount, deliverySlot } = location.state || {};

    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        paymentMethod: "COD",
    });
    const [error, setError] = useState("");

    const items = cart || (product ? [{ product, rentType, duration, totalRent: totalAmount }] : []);

    if (items.length === 0) {
        return <div className="p-10 text-center">No checkout data found. Go back to cart.</div>;
    }

    const grandTotal = items.reduce((acc, item) => acc + item.totalRent, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            for (const item of items) {
                const rentTypeMap = {
                    "1 Day": "day",
                    "1 Week": "week",
                };

                const orderData = {
                    product: item.product._id,
                    rentType: rentTypeMap[item.rentType] || item.rentType, // Fallback to existing if not mapped
                    duration: item.duration,
                    totalAmount: item.totalRent,
                    deliverySlot,
                    address: formData.address,
                    phone: formData.phone,
                };

                await axios.post("http://localhost:4999/api/orders", orderData, config);
            }

            if (cart) {
                clearCart(); // Clear cart after successful checkout if coming from cart
            }
            navigate("/my-orders");
        } catch (err) {
            setError(err.response?.data?.message || "Checkout failed");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-6 p-4 bg-gray-50 rounded space-y-4">
                {items.map((item, idx) => (
                    <div key={idx} className="border-b pb-2">
                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        <p>Type: {item.rentType}</p>
                        <p>Duration: {item.duration} {item.rentType}(s)</p>
                        <p className="font-bold">Price: ₹{item.totalRent}</p>
                    </div>
                ))}
                <div className="pt-2 text-xl font-bold text-right">
                    Grand Total: ₹{grandTotal}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Delivery Address</label>
                    <textarea
                        name="address"
                        required
                        className="w-full border p-2 rounded"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        required
                        className="w-full border p-2 rounded"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Payment Method</label>
                    <select
                        name="paymentMethod"
                        className="w-full border p-2 rounded"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                    >
                        <option value="COD">Cash on Delivery</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
