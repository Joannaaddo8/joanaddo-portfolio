import joanPhoto from "../assets/images/joan.png";
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-container">
      <h2>About Me</h2>

      <img
        src={joanPhoto}
        alt="Joanna Addo"
        className="about-photo"
      />

      <h3>Joanna Addo</h3>

      {/* ✅ Resume PDF link (rubric requirement) */}
      <p className="about-resume">
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          View Resume (PDF)
        </a>
      </p>

      <p>
        I’m a Software Engineering Technology – Artificial Intelligence (Co-op)
        student at Centennial College with a strong interest in building reliable,
        data-driven software systems. I enjoy translating requirements into
        clean, working applications and continuously improving them through
        testing and iteration.
      </p>

      <p>
        I have hands-on experience developing desktop and web applications using
        C#, Python, JavaScript, and SQL. My academic and project work emphasizes
        object-oriented design, modular class libraries, validation, and
        maintainable code across the software development lifecycle.
      </p>

      <p>
        I’m currently strengthening my full-stack and AI-focused skills while
        applying a quality-driven mindset shaped by structured testing,
        debugging, and real-world team collaboration.
      </p>

      <h4>Technical Skills</h4>
      <ul className="about-list">
        <li>C#, .NET, WinForms (desktop applications)</li>
        <li>JavaScript, HTML/CSS, React (web development)</li>
        <li>Python, REST APIs, data-driven applications</li>
        <li>SQL, Oracle Database, relational data concepts</li>
        <li>Git/GitHub, Visual Studio, VS Code</li>
      </ul>

      <h4>Highlights</h4>
      <ul className="about-list">
        <li>Software Engineering Technology – AI (Co-op) student, GPA 4.1 / 4.5</li>
        <li>Built core class libraries and major UI components for academic projects</li>
        <li>Strong interest in software quality, testing, and maintainable systems</li>
        <li>Actively developing portfolio projects and refining UI/UX</li>
      </ul>

      <p className="about-cta">
        You can explore my work on the{" "}
        <a href="/project">Projects</a> page or get in touch through the{" "}
        <a href="/contact">Contact</a> page.
      </p>
    </div>
  );
}
