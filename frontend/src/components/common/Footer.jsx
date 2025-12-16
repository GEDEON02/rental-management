function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "20px",
        textAlign: "center",
        background: "var(--bg-card)",
        color: "var(--text-muted)",
        fontSize: "0.9rem",
      }}
    >
      <p>&copy; {new Date().getFullYear()} TechRentals. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
