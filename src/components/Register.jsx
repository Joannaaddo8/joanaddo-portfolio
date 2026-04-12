import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/users`;

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsError(false);
        setMessage("Registration successful. Redirecting to login...");

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setIsError(true);
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      setIsError(true);
      setMessage("Something went wrong while creating your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-page__content">
        <div className="auth-page__intro">
          <span className="auth-page__eyebrow">Create Account</span>
          <h2>Build Your Admin Access</h2>
          <p>
            Register to securely access the portfolio dashboard and manage your
            projects, services, and contact entries.
          </p>

          <div className="auth-page__highlights">
            <div className="auth-highlight">
              <h3>Professional Control</h3>
              <p>Manage your portfolio content from a single private space.</p>
            </div>

            <div className="auth-highlight">
              <h3>Secure Credentials</h3>
              <p>Your account is used to access protected admin features.</p>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <h3>Register</h3>
          <p className="auth-card__subtext">Create your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />

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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {message && (
            <p className={isError ? "auth-error" : "auth-success"}>
              {message}
            </p>
          )}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}