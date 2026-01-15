import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to BlogAPP ✍️</h1>
      <p style={styles.subtitle}>
        Write, share, and explore blogs from developers around the world.
      </p>

      <Link to="/signup">
        <button style={styles.button}>Get Started</button>
      </Link>
    </div>
  );
}

export default Welcome;

const styles = {
  container: {
    height: "calc(100vh - 70px)", // accounts for header
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "30px",
    maxWidth: "500px",
  },
  button: {
    padding: "12px 30px",
    fontSize: "1rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  loginText: {
    marginTop: "20px",
    fontSize: "0.95rem",
  },
};
