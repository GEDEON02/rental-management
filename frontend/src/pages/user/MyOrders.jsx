import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("http://localhost:4999/api/orders/myorders", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded shadow-sm bg-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{order.product?.name}</h3>
                                    <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-sm font-bold ${order.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p><span className="font-medium">Rent Type:</span> {order.rentType}</p>
                                    <p><span className="font-medium">Duration:</span> {order.duration}</p>
                                    <p><span className="font-medium">Total Amount:</span> ₹{order.totalAmount}</p>
                                </div>
                                <div>
                                    <p><span className="font-medium">Ordered On:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Delivery Slot:</span> {order.deliverySlot}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
