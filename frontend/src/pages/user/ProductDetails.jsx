import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productService";
import CartContext from "../../context/CartContext";

const getPricingOptions = (product) => {
  if (product.pricing && product.pricing.length > 0) {
    return product.pricing;
  }
  // Legacy support
  if (product.rentPerDay || product.rentPerWeek) {
    const options = [];
    if (product.rentPerDay) options.push({ tenure: "1 Day", price: product.rentPerDay });
    if (product.rentPerWeek) options.push({ tenure: "1 Week", price: product.rentPerWeek });
    return options;
  }
  return [];
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Cart Logic
  const [rentType, setRentType] = useState("");
  const [duration, setDuration] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;
  if (!product) return <div style={{ padding: "20px" }}>Product not found</div>;

  const pricingOptions = getPricingOptions(product);

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <Link to="/products" style={{ color: "var(--text-muted)", marginBottom: "20px", display: "inline-block" }}>
        &larr; Back to Products
      </Link>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "20px" }}>
         <div style={{ background: "var(--bg-card)", height: "400px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", overflow: "hidden" }}>
           {product.image ? (
             <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
           ) : (
             "No Image Available"
           )}
        </div>
        
        <div>
          <h1 style={{ marginBottom: "15px" }}>{product.name}</h1>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "30px" }}>
            {product.description || "No description available."}
          </p>
          
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px", fontSize: "1.1rem" }}>
             <span style={{ color: "var(--primary)" }}>Flexible Tenure Options Available</span>
          </div>
          
          <div className="card" style={{ padding: "25px" }}>
            <h3 style={{ marginBottom: "20px" }}>Rent this item</h3>
            
            <div style={{ marginBottom: "20px" }}>
              <label className="form-label">Select Tenure</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {pricingOptions.length > 0 ? (
                  pricingOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setRentType(option.tenure)}
                      style={{
                        background: rentType === option.tenure ? "var(--primary)" : "var(--bg-dark)",
                        border: "1px solid var(--text-muted)",
                        color: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.9rem"
                      }}
                    >
                      {option.tenure}<br/>
                      <span style={{ fontWeight: "bold" }}>₹{option.price}</span>
                    </button>
                  ))
                ) : (
                   <p style={{color: 'var(--text-muted)'}}>No pricing available.</p>
                )}
              </div>
            </div>
            
            {rentType && (
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label">Quantity / Multiplier</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "5px" }}>
                  Example: Select '1 Day' and Quantity '2' for 2 Days.
                </p>
              </div>
            )}
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Total: ₹{(pricingOptions.find(p => p.tenure === rentType)?.price || 0) * duration}
              </span>
              <button 
                onClick={() => {
                   if (!rentType) {
                     alert("Please select a rental tenure first.");
                     return;
                   }
                   const price = pricingOptions.find(p => p.tenure === rentType)?.price;
                   
                   if(!price) {
                     alert("Price not found for selected tenure.");
                     return;
                   }
                   
                   addToCart({
                      product,
                      rentType,
                      duration: parseInt(duration), 
                      totalRent: price * duration,
                   });
                   alert("Added to cart!");
                }} 
                style={{ padding: "0.8rem 2rem", cursor: "pointer", background: rentType ? "var(--primary)" : "var(--text-muted)" }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
