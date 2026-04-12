import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { saveToken } from "../utils/auth";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const result = await loginUser(formData);

      if (result.success) {
        const token = result.token || result.data?.token;

        if (!token) {
          setIsError(true);
          setMessage("Login succeeded, but no token was returned.");
          setLoading(false);
          return;
        }

        saveToken(token);
        setIsError(false);
        setMessage("Login successful. Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 900);
      } else {
        setIsError(true);
        setMessage(result.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setIsError(true);
      setMessage("Something went wrong while trying to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-page__content">
        <div className="auth-page__intro">
          <span className="auth-page__eyebrow">Welcome Back</span>
          <h2>Access Your Dashboard</h2>
          <p>
            Sign in to manage your portfolio content, update projects and
            services, and stay in control of your professional site.
          </p>

          <div className="auth-page__highlights">
            <div className="auth-highlight">
              <h3>Manage Content</h3>
              <p>
                Access your private dashboard to update projects, services, and
                contact entries.
              </p>
            </div>

            <div className="auth-highlight">
              <h3>Secure Login</h3>
              <p>
                Your account gives you protected access to the admin features of
                your portfolio.
              </p>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <h3>Login</h3>
          <p className="auth-card__subtext">Login to access your dashboard</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && (
  <div className={isError ? "auth-error" : "auth-success"}>
    {isError ? "❌ " : "✅ "}
    {message}
  </div>
)}

          <p className="auth-switch">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
}