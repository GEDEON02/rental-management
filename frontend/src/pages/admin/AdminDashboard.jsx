function AdminDashboard({ goTo }) {
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => goTo("add-product")}>
        Add Product
      </button><br /><br />

      <button onClick={() => goTo("manage-products")}>
        Manage Products
      </button><br /><br />

      <button onClick={() => goTo("manage-orders")}>
        Manage Orders
      </button><br /><br />

      <button onClick={() => goTo("home")}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
