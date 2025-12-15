import { useState } from "react";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Products from "./pages/user/Products";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";


function App() {
  const [cart, setCart] = useState([]);

  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

const renderPage = () => {
  console.log("Current page:", page);

  if (page === "login") return <Login goTo={setPage} />;
  if (page === "register") return <Register goTo={setPage} />;

  if (page === "products") {
    console.log("Rendering Products");
    return (
      <Products
        viewProduct={(product) => {
          setSelectedProduct(product);
          setPage("details");
        }}
        addToCart={(item) => {
          setCart([...cart, item]);
          alert("Added to cart");
        }}
        goTo={setPage}
      />
    );
  }

  if (page === "details") {
    console.log("Rendering ProductDetails");
    return (
      <ProductDetails
        product={selectedProduct}
        goBack={() => setPage("products")}
      />
    );
  }
if (page === "cart")
  return <Cart cart={cart} goBack={() => setPage("products")} />;

  // 🔴 SAFETY DEFAULT — NEVER REMOVE THIS
  return <Home goTo={setPage} />;
};

  return (
    <div>
      <Navbar />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
