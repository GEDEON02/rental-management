import { useState } from "react";

function AddProduct({ goTo, addProduct }) {
  const [name, setName] = useState("");
  const [dayRent, setDayRent] = useState("");
  const [weekRent, setWeekRent] = useState("");

  const handleAdd = () => {
    addProduct({
      id: Date.now(),
      name,
      dayRent,
      weekRent,
    });

    alert("Product added");
    goTo("admin-dashboard");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        type="number"
        placeholder="Rent per day"
        value={dayRent}
        onChange={(e) => setDayRent(e.target.value)}
      /><br /><br />

      <input
        type="number"
        placeholder="Rent per week"
        value={weekRent}
        onChange={(e) => setWeekRent(e.target.value)}
      /><br /><br />

      <button onClick={handleAdd}>Add</button>
      <button onClick={() => goTo("admin-dashboard")}>Back</button>
    </div>
  );
}

export default AddProduct;
