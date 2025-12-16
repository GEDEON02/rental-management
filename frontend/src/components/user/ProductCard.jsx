import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";

function ProductCard({ product }) {
  const [rentType, setRentType] = useState("day");
  const [duration, setDuration] = useState(1);
  const { addToCart } = useContext(CartContext);

  const pricing = product.pricing || [];
  if (pricing.length === 0 && (product.rentPerDay || product.rentPerWeek)) {
     if(product.rentPerDay) pricing.push({price: product.rentPerDay});
     else if(product.rentPerWeek) pricing.push({price: product.rentPerWeek});
  }

  const handleAddToCart = () => {
    addToCart({
      product,
      rentType,
      duration,
      totalRent,
    });
    alert("Added to cart!");
  };

  return (
    <div className="card">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "contain", borderRadius: "8px", marginBottom: "15px" }}
        />
      )}
      <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "15px" }}>
        {product.description?.substring(0, 60)}...
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        {pricing.length > 0 ? (
           <span style={{ color: "var(--primary)" }}>From ₹{pricing[0].price}</span>
        ) : (
           <span style={{ color: "var(--primary)" }}>Flexible Pricing</span>
        )}
      </div>

      <Link to={`/products/${product._id}`}>
        <button
          style={{
            width: "100%",
            background: "var(--primary)",
            padding: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
