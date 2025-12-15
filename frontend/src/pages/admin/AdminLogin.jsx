function AdminLogin({ goTo }) {
  const handleLogin = () => {
    // Temporary admin login
    goTo("admin-dashboard");
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <input type="email" placeholder="Admin Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
