import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getAllProducts } from "../../services/productService";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getAllProducts().then((data) => setProducts(data));
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`http://localhost:4999/api/products/${id}`, config);
      loadProducts();
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Manage Products</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {products.map((product) => (
          <div key={product._id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3>{product.name}</h3>
              <p style={{ color: "var(--text-muted)" }}>₹{product.rentPerDay}/day - ₹{product.rentPerWeek}/week</p>
            </div>
            <button 
              onClick={() => deleteProduct(product._id)}
              style={{ backgroundColor: "#ef4444" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;
