import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = (deliverySlot) => {
    if (!user) {
      alert("Please login to checkout");
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: {
        cart,
        deliverySlot
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.totalRent, 0);
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products" style={{ marginTop: "20px", display: "inline-block" }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Your Cart ({cart.length} items)</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.map((item, index) => (
          <div key={index} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3>{item.product.name}</h3>
              <p style={{ color: "var(--text-muted)" }}>
                {item.duration} {item.rentType}(s) @ {item.rentType === 'day' ? item.product.rentPerDay : item.product.rentPerWeek}/{item.rentType}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "5px" }}>₹{item.totalRent}</p>
              <button
                onClick={() => removeFromCart(item.product._id)}
                style={{ background: "transparent", color: "var(--secondary)", padding: 0 }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", padding: "20px", background: "var(--bg-card)", borderRadius: "12px" }}>
        <h3 style={{ marginBottom: "20px" }}>Delivery Options</h3>
        <div className="form-group">
          <label className="form-label">Select Delivery Slot</label>
          <select
            className="form-input"
            id="deliverySlot"
            defaultValue="Standard Delivery (24-48 hrs)"
          >
            <option value="Instant (2-4 hrs) - ₹199">⚡ Instant (2-4 hrs) - ₹199</option>
            <option value="Same Day (Evening) - ₹99">Same Day (Evening) - ₹99</option>
            <option value="Standard Delivery (24-48 hrs)">Standard Delivery (24-48 hrs) - FREE</option>
          </select>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "10px" }}>
            * Instant delivery available for Mumbai users only.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "40px", textAlign: "right" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          Grand Total: <span style={{ color: "var(--primary)" }}>₹{calculateTotal()}</span>
        </h3>
        <button
          onClick={() => {
            const slot = document.getElementById("deliverySlot").value;
            handleCheckout(slot);
          }}
          style={{ fontSize: "1.1rem", padding: "1rem 3rem" }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
