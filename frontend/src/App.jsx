import { useState } from "react";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// USER PAGES
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Products from "./pages/user/Products";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";

// ADMIN PAGES
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";

function App() {
  // USER STATE
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ADMIN STATE
  const [adminProducts, setAdminProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const renderPage = () => {
    console.log("Current page:", page);

    // ---------- USER AUTH ----------
    if (page === "login") return <Login goTo={setPage} />;
    if (page === "register") return <Register goTo={setPage} />;

    // ---------- USER FLOW ----------
    if (page === "products")
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

    if (page === "details")
      return (
        <ProductDetails
          product={selectedProduct}
          goBack={() => setPage("products")}
        />
      );

    if (page === "cart")
      return <Cart cart={cart} goBack={() => setPage("products")} />;

    // ---------- ADMIN FLOW ----------
    if (page === "admin-login")
      return <AdminLogin goTo={setPage} />;

    if (page === "admin-dashboard")
      return <AdminDashboard goTo={setPage} />;

    if (page === "add-product")
      return (
        <AddProduct
          goTo={setPage}
          addProduct={(product) =>
            setAdminProducts([...adminProducts, product])
          }
        />
      );

    if (page === "manage-products")
      return (
        <ManageProducts
          products={adminProducts}
          deleteProduct={(id) =>
            setAdminProducts(adminProducts.filter((p) => p.id !== id))
          }
          goTo={setPage}
        />
      );

    if (page === "manage-orders")
      return <ManageOrders orders={orders} goTo={setPage} />;

    // ---------- DEFAULT ----------
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
