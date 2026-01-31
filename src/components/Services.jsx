import "../styles/services.css";

export default function Services() {
  return (
    <section className="services">
      <header className="services__header">
        <h2>Services</h2>
        <p>Here are a few services I can offer based on my current skills.</p>
      </header>

      <ul className="services__list">
        <li>
          <h3>Web Development</h3>
          <p>Responsive websites using React, HTML, CSS, and JavaScript.</p>
        </li>

        <li>
          <h3>Desktop Applications</h3>
          <p>Python (Tkinter) and C# WinForms applications with solid UX.</p>
        </li>

        <li>
          <h3>API Integration</h3>
          <p>Connecting apps to REST APIs with validation and error handling.</p>
        </li>

        <li>
          <h3>Requirements & Documentation</h3>
          <p>SRS writing, use cases, UML diagrams, and traceability support.</p>
        </li>

        <li>
          <h3>Testing Mindset</h3>
          <p>Test planning, edge cases, and quality checks (ISTQB CTFL).</p>
        </li>
      </ul>
    </section>
  );
}
