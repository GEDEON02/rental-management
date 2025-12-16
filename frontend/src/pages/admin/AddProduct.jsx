import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    pricing: [
      { tenure: "1 Day", price: "" },
      { tenure: "1 Week", price: "" },
    ],
  });
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (index, value) => {
    const newPricing = [...formData.pricing];
    newPricing[index].price = value;
    setFormData({ ...formData, pricing: newPricing });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post("http://localhost:4999/api/products", formData, config);
      alert("Product created!");
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Failed to create product");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Add New Product</h2>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              className="form-input"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          
          <h3>Pricing Strategy</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            {formData.pricing.map((item, index) => (
              <div key={index} className="form-group">
                <label className="form-label">{item.tenure} Price (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={item.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          
          <button type="submit" style={{ width: "100%", marginTop: "20px" }}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
