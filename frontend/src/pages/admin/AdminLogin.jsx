import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        alert("Not authorized as admin");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "400px", border: "1px solid var(--secondary)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "var(--secondary)" }}>Admin Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ width: "100%", backgroundColor: "var(--secondary)" }}>
            Login to Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
