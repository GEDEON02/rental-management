import { useState } from "react";

function ProductCard({ product, onView, onAdd }) 

 {
  const [rentType, setRentType] = useState("day");
  const [duration, setDuration] = useState(1);

  const totalRent =
    rentType === "day"
      ? duration * product.rentPerDay
      : duration * product.rentPerWeek;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        width: "250px",
        marginBottom: "15px",
      }}
    >
      <h3>{product.name}</h3>

      <p>₹{product.rentPerDay} / day</p>
      <p>₹{product.rentPerWeek} / week</p>

      <label>Rent Type:</label>
      <select
        value={rentType}
        onChange={(e) => setRentType(e.target.value)}
      >
        <option value="day">Per Day</option>
        <option value="week">Per Week</option>
      </select>

      <br /><br />

      <label>Duration:</label>
      <input
        type="number"
        min="1"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <p><strong>Total: ₹{totalRent}</strong></p>

      <button
  onClick={() =>
    onAdd({
      product,
      rentType,
      duration,
      totalRent,
    })
  }
>
  Add to Cart
</button>

      <button onClick={() => onView(product)}>
  View Details
</button>

    </div>
  );
}

export default ProductCard;
