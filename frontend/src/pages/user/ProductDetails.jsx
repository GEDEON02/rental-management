function ProductDetails({ product, goBack }) {
  if (!product) {
    return <p>No product selected</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={goBack}>← Back to Products</button>

      <h2>{product.name}</h2>

      <p><strong>Rent Per Day:</strong> ₹{product.rentPerDay}</p>
      <p><strong>Rent Per Week:</strong> ₹{product.rentPerWeek}</p>

      <p>
        This product is available for flexible rental options. You can rent it
        per day or per week depending on your needs.
      </p>
    </div>
  );
}

export default ProductDetails;
