import { useEffect, useState } from "react";
import ProductCard from "../../components/user/ProductCard";
import { getAllProducts } from "../../services/productService";

function Products({ viewProduct, addToCart, goTo }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Products</h2>

      <button onClick={() => goTo("cart")}>Go to Cart</button>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
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
