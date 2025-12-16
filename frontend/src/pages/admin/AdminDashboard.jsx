import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Admin Dashboard</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        <Link to="/admin/add-product">
          <div className="card" style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
            <h3>Add Product</h3>
            <p>Create new electronics listing</p>
          </div>
        </Link>
        
        <Link to="/admin/manage-products">
          <div className="card" style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
             <h3>Manage Products</h3>
             <p>Edit or delete existing products</p>
          </div>
        </Link>
        
        <Link to="/admin/manage-orders">
          <div className="card" style={{ textAlign: "center", padding: "40px", cursor: "pointer" }}>
             <h3>Manage Orders</h3>
             <p>View active rentals and returns</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
