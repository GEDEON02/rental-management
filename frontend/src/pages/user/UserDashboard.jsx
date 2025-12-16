import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:4999/api/orders/myorders",
          config
        );
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

  const calculateRemainingDays = (startDate, duration, rentType) => {
    const start = new Date(startDate);
    const now = new Date();
    
    // Calculate total rental duration in milliseconds
    const durationInDays = rentType === 'week' ? duration * 7 : duration;
    const totalDurationMs = durationInDays * 24 * 60 * 60 * 1000;
    
    // End date
    const endDate = new Date(start.getTime() + totalDurationMs);
    
    // Remaining time
    const diffMs = endDate - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>My Dashboard</h2>
      
      <div style={{ background: "var(--bg-card)", padding: "20px", borderRadius: "12px", marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h3>Welcome, {user.name}</h3>
                <p style={{ color: "var(--text-muted)" }}>{user.email}</p>
            </div>
        </div>
      </div>
      
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
          {orders.map((order) => {
             const remainingDays = calculateRemainingDays(order.startDate, order.duration, order.rentType);
             
             return (
              <div key={order._id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>{order.product?.name || "Product Removed"}</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--primary)" }}>
                      Total Paid: ₹{order.totalAmount}
                    </p>
                     <p style={{ color: "var(--text-muted)" }}>
                      Duration: {order.duration} {order.rentType}(s)
                    </p>
                  </div>
                </div>
                
                <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "15px 0" }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                     <span style={{ 
                       padding: "4px 12px", 
                       borderRadius: "20px", 
                       background: order.status === 'active' ? "rgba(16, 185, 129, 0.2)" : "rgba(100, 116, 139, 0.2)",
                       color: order.status === 'active' ? "#34d399" : "#94a3b8",
                       fontSize: "0.85rem"
                     }}>
                       {order.status.toUpperCase()}
                     </span>
                   </div>
                   
                   {order.status === 'active' && (
                     <div>
                       <span style={{ color: remainingDays <= 2 ? "#ef4444" : "white" }}>
                         {remainingDays} Days Remaining
                       </span>
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
