import { Link, useLocation } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const location = useLocation();
  const submission = location.state?.contactSubmission;

  return (
    <div className="home-container">
      <section className="home-hero">
        <span className="home-badge">Software Engineering • Full-Stack Development • AI Solutions</span>

        <h2>Building Modern Software and Intelligent Digital Experiences</h2>

        <p className="home-intro">
          I design and develop full-stack web applications, backend systems, and
          AI-powered solutions that solve real-world problems with clarity,
          structure, and purpose.
        </p>

        <p className="home-subtext">
          From responsive frontend interfaces to scalable backend architecture, I
          build technology that is functional, user-focused, and ready for real
          use.
        </p>

        <div className="home-buttons">
          <Link to="/project">
            <button className="home-btn home-btn--primary">View My Projects</button>
          </Link>

          <Link to="/about">
            <button className="home-btn home-btn--secondary">Learn More About Me</button>
          </Link>
        </div>
      </section>

      {submission && (
        <section className="home-submission-section">
          <div className="home-submission-card">
            <h3>Message Received ✅</h3>

            <p>
              <strong>Name:</strong> {submission.firstName} {submission.lastName}
            </p>

            {submission.phone && (
              <p>
                <strong>Phone:</strong> {submission.phone}
              </p>
            )}

            <p>
              <strong>Email:</strong> {submission.email}
            </p>

            <p>
              <strong>Message:</strong> {submission.message}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}