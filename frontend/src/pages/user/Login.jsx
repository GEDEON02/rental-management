function Login({ goTo }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input type="email" placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button>Login</button>

      <p>
        Don’t have an account?
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => goTo("register")}
        >
          {" "}Register
        </span>
      </p>
    </div>
  );
}

export default Login;
