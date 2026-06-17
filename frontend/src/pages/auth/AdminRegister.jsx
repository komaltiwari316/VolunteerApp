import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/adminauth/register", form);
      navigate("/admin-login", { replace: true });
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Register"
      subtitle="Create your admin account"
      footerLink={{
        text: "Already have an account?",
        label: "Login here",
        to: "/admin-login",
      }}
    >
      {error && <div className="alert alert--error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-field"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-field"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="form-field"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />

        <input
          className="form-field"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
        />

        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default AdminRegister;
