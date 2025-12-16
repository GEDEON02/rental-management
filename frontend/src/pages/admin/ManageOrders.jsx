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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4999/api/orders/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      // Refresh orders
      const { data } = await axios.get("http://localhost:4999/api/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>All Rentals</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order) => (
          <div key={order._id} className="card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff' }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Order ID: {order._id}</span>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                background: order.status === 'approved' ? '#d1fae5' : order.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                color: order.status === 'approved' ? '#065f46' : order.status === 'rejected' ? '#991b1b' : '#92400e',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Product Details</h4>
                <p><strong>Product:</strong> {order.product?.name}</p>
                <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
                <p><strong>Duration:</strong> {order.duration} {order.rentType}(s)</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Delivery Details</h4>
                <p><strong>Address:</strong> {order.address || 'N/A'}</p>
                <p><strong>Phone:</strong> {order.phone || 'N/A'}</p>
                <p><strong>Slot:</strong> {order.deliverySlot}</p>
              </div>
            </div>

            {order.status === 'pending' && (
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => updateStatus(order._id, 'approved')}
                  style={{ padding: "8px 16px", background: "#10b981", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(order._id, 'rejected')}
                  style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageOrders;
