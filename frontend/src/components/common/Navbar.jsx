import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "var(--bg-card)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>
        TechRentals
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/products" style={{ color: "var(--text-muted)" }}>
          Browse
        </Link>
        
        {user ? (
          <>
            {user.role === "admin" ? (
              <Link to="/admin/dashboard" style={{ color: "var(--secondary)" }}>
                Admin
              </Link>
            ) : (
              <Link to="/dashboard" style={{ color: "white" }}>
                Dashboard
              </Link>
            )}
            <span style={{ color: "white" }}>Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "var(--primary)",
                padding: "0.4rem 1rem",
                borderRadius: "6px",
                color: "white",
              }}
            >
              Register
            </Link>
          </>
        )}
        
        {user && user.role !== "admin" && (
          <Link to="/cart" style={{ position: "relative", color: "white" }}>
            🛒
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "var(--secondary)",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                {cart.length}
              </span>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
