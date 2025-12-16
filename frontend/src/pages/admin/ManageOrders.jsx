import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
           headers: {
             Authorization: `Bearer ${user.token}`,
           },
        };
        const { data } = await axios.get("http://localhost:4999/api/orders", config);
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    if (user && user.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>All Rentals</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order) => (
           <div key={order._id} className="card">
             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Order ID: {order._id}</span>
                <span style={{ color: order.status === 'active' ? 'var(--primary)' : 'var(--text-muted)' }}>{order.status.toUpperCase()}</span>
             </div>
             <p>User: {order.user?.name} ({order.user?.email})</p>
             <p>Product: {order.product?.name}</p>
             <p>Duration: {order.duration} {order.rentType}(s)</p>
             <p>Total: ₹{order.totalAmount}</p>
             <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "10px" }}>
               Date: {new Date(order.createdAt).toLocaleDateString()}
             </p>
           </div>
        ))}
      </div>
    </div>
  );
}

export default ManageOrders;
