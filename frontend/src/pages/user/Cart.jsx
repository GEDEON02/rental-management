function Cart({ cart, goBack }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{item.product.name}</h3>
          <p>Rent Type: {item.rentType}</p>
          <p>Duration: {item.duration}</p>
          <p>Total: ₹{item.totalRent}</p>
        </div>
      ))}

      <button onClick={goBack}>Back to Products</button>
    </div>
  );
}

export default Cart;
