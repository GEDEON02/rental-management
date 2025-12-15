
console.log("Products rendered");
import ProductCard from "../../components/user/ProductCard";

function Products({ viewProduct, addToCart, goTo }) {
  const products = [
    {
      id: 1,
      name: "Laptop",
      rentPerDay: 500,
      rentPerWeek: 3000,
    },
    {
      id: 2,
      name: "Camera",
      rentPerDay: 400,
      rentPerWeek: 2500,
    },
    {
      id: 3,
      name: "Television",
      rentPerDay: 300,
      rentPerWeek: 1800,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Products</h2>

      {/* GO TO CART BUTTON */}
      <button
        onClick={() => goTo("cart")}
        style={{ marginBottom: "15px" }}
      >
        Go to Cart
      </button>

      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={viewProduct}
            onAdd={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
export default Products;