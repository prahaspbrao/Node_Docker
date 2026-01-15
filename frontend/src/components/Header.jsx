import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>BlogAPP</h2>

      <nav>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;

/* 👇 THIS WAS MISSING 👇 */
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#111827",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "#fff",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "500",
  },
  logout: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
