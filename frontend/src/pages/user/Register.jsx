function Register({ goTo }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input type="text" placeholder="Name" /><br /><br />
      <input type="email" placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button>Register</button>

      <p>
        Already have an account?
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => goTo("login")}
        >
          {" "}Login
        </span>
      </p>
    </div>
  );
}

export default Register;
