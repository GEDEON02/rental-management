function ManageOrders({ orders, goTo }) {
  return (
    <div>
      <h2>Manage Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((o, index) => (
        <div key={index}>
          Product: {o.product.name} | User Rent: {o.rentType}
        </div>
      ))}

      <br />
      <button onClick={() => goTo("admin-dashboard")}>Back</button>
    </div>
  );
}

export default ManageOrders;
