import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/adminauth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      navigate("/admin-dashboard", { replace: true });
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Sign in to manage volunteers and tasks"
      footerLink={{
        text: "Don't have an account?",
        label: "Register here",
        to: "/admin-register",
      }}
    >
      {error && <div className="alert alert--error">{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          className="form-field"
          type="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          className="form-field"
          type="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default AdminLogin;
