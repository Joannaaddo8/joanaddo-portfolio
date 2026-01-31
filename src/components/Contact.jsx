import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contact.css";

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ Captures + redirects back to Home with the values
    navigate("/", { state: { contactSubmission: formData } });
  }

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>

      <section className="contact-info">
        <h3>Contact Information</h3>

        <p><strong>Name:</strong> Joanna Addo</p>
        <p><strong>Email:</strong> jaddo8@my.centennialcollege.ca</p>
        <p><strong>Location:</strong> Toronto, ON</p>

        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/joanna-addo"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/joanna-addo
          </a>
        </p>

        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/Joannaaddo8"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Joannaaddo8
          </a>
        </p>
      </section>

      <hr />

      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
