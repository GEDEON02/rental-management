function Home({ goTo }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Electronics Rental System</h1>
      <p>Welcome to the rental store</p>

      <button onClick={() => goTo("login")}>
        Login
      </button>

      <button
        onClick={() => goTo("register")}
        style={{ marginLeft: "10px" }}
      >
        Register
      </button>
      <button onClick={() => goTo("products")}>
  View Products
</button>

    </div>
  );
}

export default Home;
