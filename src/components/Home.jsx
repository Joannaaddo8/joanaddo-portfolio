import { Link, useLocation } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const location = useLocation();
  const submission = location.state?.contactSubmission;

  return (
    <div className="home-container">
      {/* ===== Hero Section ===== */}
      <section className="home-hero">
        <h2>Welcome to My Portfolio</h2>

        <p className="home-intro">
          I’m passionate about coding and enjoy solving real-world problems using
          AI and software engineering, with a focus on making technology
          affordable, accessible, controlled, and safe.
        </p>

        <p className="home-subtext">
          Explore my journey, projects, and professional background below.
        </p>

        <div className="home-buttons">
          <Link to="/about">
            <button>Learn More About Me</button>
          </Link>

          <Link to="/project">
            <button>View My Projects</button>
          </Link>
        </div>
      </section>

      {/* ===== Message Confirmation Section (Rubric Requirement) ===== */}
      {submission && (
        <section className="home-submission-section">
          <div className="home-submission-card">
            <h3>Message Received ✅</h3>

            <p>
              <strong>Name:</strong>{" "}
              {submission.firstName} {submission.lastName}
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
