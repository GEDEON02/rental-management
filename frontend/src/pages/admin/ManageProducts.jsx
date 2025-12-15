function ManageProducts({ products, deleteProduct, goTo }) {
  return (
    <div>
      <h2>Manage Products</h2>

      {products.length === 0 && <p>No products available</p>}

      {products.map((p) => (
        <div key={p.id}>
          <b>{p.name}</b> | Day: ₹{p.dayRent} | Week: ₹{p.weekRent}
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}

      <br />
      <button onClick={() => goTo("admin-dashboard")}>Back</button>
    </div>
  );
}

export default ManageProducts;
