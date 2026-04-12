import { useState } from "react";
import { createReference } from "../api/referenceApi";
import "../styles/contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    setLoading(true);

    try {
      const result = await createReference(formData);

      if (result.success) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setError(result.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setError("Something went wrong while sending your message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-page__header">
        <h2>Contact Me</h2>
        <p>
          Have a project, collaboration, or opportunity in mind? Send me a
          message and I’ll get back to you.
        </p>
      </div>

      <div className="contact-page__card">
        <form onSubmit={handleSubmit} className="contact-page__form">
          <div className="contact-page__row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-page__row">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="contact-page__button"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {error && (
          <div className="contact-page__success">
            <h3>Message Not Sent</h3>
            <p>{error}</p>
          </div>
        )}

        {submitted && (
          <div className="contact-page__success">
            <h3>Message Received</h3>
            <p>
              Thank you. Your message has been sent successfully.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}